import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import paytmQR from "../../../public/assets/payt.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://bblzcyijscfszivrlyih.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJibHpjeWlqc2Nmc3ppdnJseWloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1ODExMTEsImV4cCI6MjA1OTE1NzExMX0.RqmAtrdhLPuZ3mgsBECNlOIERBz6AI5A9szSdvRvNoI"
);
const teamMemberSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  universityRollNumber: z
    .string()
    .min(2, { message: "University Roll Number is required" }),
  mobileNo: z
    .string()
    .min(10, { message: "Please enter a valid mobile number" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .refine((email) => email.toLowerCase().endsWith("@gla.ac.in"), {
      message: "Please use your GLA email ID only (ending with @gla.ac.in)",
    }),
  course: z.string().min(1, { message: "Course is required" }),
  yearOfStudy: z.string().min(1, { message: "Year of study is required" }),
  classSection: z.string().min(1, { message: "Class section is required" }),
  otherSection: z.string().optional(),
  accommodationType: z.enum(["Hosteler", "Day Scholar"], {
    required_error: "Please select accommodation type",
  }),
  hostelName: z.string().optional(),
});

const registerSchema = z.object({
  teamName: z.string().min(2, { message: "Team name is required" }),
  teamSize: z.enum(["3", "4"], {
    required_error: "Please select team size",
  }),
  paymentProof: z.any().refine((file) => file && file instanceof File, {
    message: "Payment screenshot is required",
  }),
  teamMembers: z
    .array(teamMemberSchema)
    .min(3, { message: "Minimum 3 team members required" })
    .max(4, { message: "Maximum 4 team members allowed" }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export default function Register() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [paymentImagePreview, setPaymentImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      teamName: "",
      teamSize: "3",
      paymentProof: undefined,
      teamMembers: [
        {
          name: "",
          universityRollNumber: "",
          mobileNo: "",
          email: "",
          course: "",
          yearOfStudy: "1",
          classSection: "",
          otherSection: "",
          accommodationType: "Day Scholar",
          hostelName: "",
        },
        {
          name: "",
          universityRollNumber: "",
          mobileNo: "",
          email: "",
          course: "",
          yearOfStudy: "1",
          classSection: "",
          otherSection: "",
          accommodationType: "Day Scholar",
          hostelName: "",
        },
        {
          name: "",
          universityRollNumber: "",
          mobileNo: "",
          email: "",
          course: "",
          yearOfStudy: "1",
          classSection: "",
          otherSection: "",
          accommodationType: "Day Scholar",
          hostelName: "",
        },
      ],
      termsAccepted: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "teamMembers",
    control: form.control,
  });

  // Update team member fields when team size changes
  const teamSize = form.watch("teamSize");

  React.useEffect(() => {
    const currentLength = fields.length;
    const targetLength = parseInt(teamSize);

    if (currentLength < targetLength) {
      // Add fields
      for (let i = currentLength; i < targetLength; i++) {
        append({
          name: "",
          universityRollNumber: "",
          mobileNo: "",
          email: "",
          course: "",
          yearOfStudy: "1",
          classSection: "",
          otherSection: "",
          accommodationType: "Day Scholar",
          hostelName: "",
        });
      }
    } else if (currentLength > targetLength) {
      // Remove fields
      for (let i = currentLength - 1; i >= targetLength; i--) {
        remove(i);
      }
    }
  }, [teamSize, fields.length, append, remove]);

  const handlePaymentImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      form.setValue("paymentProof", file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaymentImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      // 1. Upload payment proof to Supabase Storage
      const paymentFile = data.paymentProof;
      const fileExt = paymentFile.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `payment_proofs/${fileName}`;

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from("hackathon-uploads")
        .upload(filePath, paymentFile, {
          cacheControl: "3600",
          upsert: false,
          contentType: paymentFile.type,
        });

      if (uploadError) {
        throw new Error(
          `Error uploading payment proof: ${uploadError.message}`
        );
      }

      // Get public URL for the uploaded file
      const { data: publicUrlData } = supabase.storage
        .from("hackathon-uploads")
        .getPublicUrl(filePath);

      const paymentProofUrl = publicUrlData.publicUrl;

      // 2. Insert team data into teams table
      const teamData = {
        team_name: data.teamName,
        team_size: parseInt(data.teamSize),
        payment_proof_url: paymentProofUrl,
        terms_accepted: data.termsAccepted,
        created_at: new Date().toISOString(),
      };

      const { data: teamInsertData, error: teamInsertError } = await supabase
        .from("teams")
        .insert(teamData)
        .select();

      if (teamInsertError) {
        throw new Error(
          `Error inserting team data: ${teamInsertError.message}`
        );
      }

      const teamId = teamInsertData[0].id;

      // 3. Insert team members data into team_members table
      const teamMembersData = data.teamMembers.map((member) => ({
        team_id: teamId,
        name: member.name,
        university_roll_number: member.universityRollNumber,
        mobile_no: member.mobileNo,
        email: member.email,
        course: member.course,
        year_of_study: parseInt(member.yearOfStudy),
        class_section: member.classSection,
        other_section: member.otherSection || null,
        accommodation_type: member.accommodationType,
        hostel_name:
          member.accommodationType === "Hosteler" ? member.hostelName : null,
        created_at: new Date().toISOString(),
      }));

      const { error: membersInsertError } = await supabase
        .from("team_members")
        .insert(teamMembersData);

      if (membersInsertError) {
        throw new Error(
          `Error inserting team members: ${membersInsertError.message}`
        );
      }

      // Success!
      toast({
        title: "Registration successful!",
        description:
          "Thank you for registering for Hack and Viz 2.0. We'll be in touch soon!",
      });

      setTimeout(() => setLocation("/"), 2000);
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="flex-1 container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold mb-2">
              Register for Hack and Viz 2.0
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Join us for an unforgettable hackathon experience!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-6">
                <h3 className="font-semibold text-lg mb-2">Hack & Viz 2.0</h3>
                <p className="mb-4">
                  🚀 A 24-Hour Hackathon & 6-Hour Data Visualization Challenge
                  organized by Department of CEA powered by Datum Club GLA.
                </p>

                <div className="space-y-2">
                  <p>📌 Registration: First Come, First Serve Basis</p>
                  <p>💰 Fee: ₹100 per student</p>
                  <p>🎓 Eligibility: Open to 1st - 3rd Year students</p>
                  <p className="font-medium">👥 Team Composition:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Minimum 3 and maximum 4 members per team</li>
                    <li>
                      Recommended to have at least one student from each year
                    </li>
                    <li>
                      Payment will be teamwise (Rs. 100 per team member - 300 Rs
                      (for team of 3) and 400 Rs. (for team of 4)
                    </li>
                  </ul>
                  <p className="font-medium mt-2">Important Dates:</p>
                  <p>
                    📢 Problem Statement Release: 12th April 2025 (for both
                    Hackathon & Data Visualization Challenge)
                  </p>
                  <p>📅 Registration Last Day: 10th April 2025</p>
                  <p className="font-medium text-red-600 mt-2">
                    Make sure to register from GLA email ID only.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center mb-6">
                <div className="max-w-xs">
                  <h3 className="text-lg font-medium text-center mb-4">
                    Payment QR Code
                  </h3>
                  <div className="border rounded-lg overflow-hidden">
                    <img
                      src={paytmQR}
                      alt="Payment QR Code"
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="text-sm text-center mt-2">
                    Pay via UPI to 8617707685@pthdf
                  </p>
                </div>
              </div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Team Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-medium mb-4 pb-2 border-b">
                    Team Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="teamName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Team Name*</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your team name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="teamSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Team Size*</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select team size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="3">3 Members</SelectItem>
                              <SelectItem value="4">4 Members</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Team of 3: ₹300 | Team of 4: ₹400
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="paymentProof"
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>Payment Screenshot*</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={handlePaymentImageChange}
                              {...field}
                            />
                            {paymentImagePreview && (
                              <div className="mt-2 border rounded-md overflow-hidden">
                                <img
                                  src={paymentImagePreview}
                                  alt="Payment proof preview"
                                  className="max-h-40 max-w-full object-contain"
                                />
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormDescription>
                          Upload a screenshot of your payment (₹100 per team
                          member)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Team Members Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-medium mb-4 pb-2 border-b">
                    Team Members Information
                  </h3>

                  {fields.map((field, index) => (
                    <div key={field.id} className="border rounded-lg p-4">
                      <h4 className="font-medium text-lg mb-4">
                        Team Member {index + 1}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`teamMembers.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name*</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter full name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`teamMembers.${index}.universityRollNumber`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>University Roll Number*</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter roll number"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`teamMembers.${index}.mobileNo`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mobile No.*</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter mobile number"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`teamMembers.${index}.email`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email (GLA ID)*</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="example@gla.ac.in"
                                  type="email"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Must be a valid GLA email ID (@gla.ac.in)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`teamMembers.${index}.course`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Course*</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., B.Tech, BCA, M.Tech, EA, EB"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`teamMembers.${index}.yearOfStudy`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Year of Study*</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select year" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="1">1st Year</SelectItem>
                                  <SelectItem value="2">2nd Year</SelectItem>
                                  <SelectItem value="3">3rd Year</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`teamMembers.${index}.classSection`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Class Section*</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your section"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {form.watch(`teamMembers.${index}.classSection`) ===
                          "Other" && (
                          <FormField
                            control={form.control}
                            name={`teamMembers.${index}.otherSection`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Other Section*</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Please specify your section"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        <FormField
                          control={form.control}
                          name={`teamMembers.${index}.accommodationType`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Accommodation Type*</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select accommodation type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Hosteler">
                                    Hosteler
                                  </SelectItem>
                                  <SelectItem value="Day Scholar">
                                    Day Scholar
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {form.watch(
                          `teamMembers.${index}.accommodationType`
                        ) === "Hosteler" && (
                          <FormField
                            control={form.control}
                            name={`teamMembers.${index}.hostelName`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Hostel Name*</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter hostel name"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <FormField
                  control={form.control}
                  name="termsAccepted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="cursor-pointer">
                          I agree to the terms and conditions and code of
                          conduct for this event
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between pt-4">
                  <Button type="button" variant="outline" asChild>
                    <Link href="/">Back to Home</Link>
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                      ? "Registering..."
                      : "Register for Hack and Viz 2.0"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
