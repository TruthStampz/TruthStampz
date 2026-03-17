import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import Stamp from "@/pages/Stamp";
import Verify from "@/pages/Verify";
import Certificate from "@/pages/Certificate";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    }
  }
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/stamp" component={Stamp} />
      <Route path="/verify" component={Verify} />
      <Route path="/certificate/:id" component={Certificate} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Enforce dark mode on the document body for TruthStamp theme
  if (typeof document !== 'undefined') {
    document.documentElement.classList.add('dark');
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
