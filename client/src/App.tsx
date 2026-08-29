// Direção Infra Pulse: layout público com narrativa de serviço, CTA recorrente e rota dedicada /dashcam.
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Dashcam from "./pages/Dashcam";
import NotFound from "./pages/NotFound";

function Router() {
  return <Switch><Route path="/" component={Dashcam} /><Route path="/dashcam" component={Dashcam} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="dark"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
