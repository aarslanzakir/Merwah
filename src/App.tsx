import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import News from "./pages/News";
import Stories from "./pages/Stories";
import Fatwas from "./pages/Fatwas";
import CreateNews from "./pages/CreateNews";
import CreateStory from "./pages/CreateStory";
import CreateFatwa from "./pages/CreateFatwa";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AdminLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/new" element={<CreateNews />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/stories/new" element={<CreateStory />} />
            <Route path="/fatwas" element={<Fatwas />} />
            <Route path="/fatwas/new" element={<CreateFatwa />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AdminLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
