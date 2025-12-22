import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import CoursesManagement from "./pages/CoursesManagement";
import FacultyManagement from "./components/faculty_management/FacultyManagement";
import Admissions from "./pages/Admissions";
import ContactEnquiry from "./pages/ContactEnquiry";
import StudentLife from "./pages/StudentLife";
import Placements from "./pages/Placements";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="courses" element={<CoursesManagement />} />
            <Route path="faculty" element={<FacultyManagement />} />
            <Route path="admissions" element={<Admissions />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="contact" element={<ContactEnquiry />} />
            <Route path="student-life" element={<StudentLife />} />
            <Route path="placements" element={<Placements />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
