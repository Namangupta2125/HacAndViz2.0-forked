import React from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Register from "@/pages/Register";
import AdminDashboard from "@/pages/Admin";
import SignupPage from "@/pages/Signup";
import LeaderboardPage from "./pages/leaderboard";
import JudgeLogin from "./pages/Judge_login";
import JudgeDashboard from "./pages/Judges/dashboard";
import JudgeScoring from "./pages/Judges/scores";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/judge-login" component={JudgeLogin} />
      <Route path="judge/dashboard" component={JudgeDashboard} />
      <Route path="/judge/score" component={JudgeScoring} />
      <Route path="/leaderboard" component={LeaderboardPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
