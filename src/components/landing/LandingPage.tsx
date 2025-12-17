import { useNavigate } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center">
      <div className="text-center animate-fade-in">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-2xl bg-card shadow-lg flex items-center justify-center border border-border">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-sidebar flex items-center justify-center">
                <div className="flex gap-0.5">
                  <div className="w-1.5 h-4 bg-sidebar rounded-sm"></div>
                  <div className="w-1.5 h-6 bg-primary rounded-sm"></div>
                  <div className="w-1.5 h-5 bg-sidebar rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-foreground mb-2">MBA Institute</h1>
        <p className="text-muted-foreground text-lg mb-8">Excellence in Business Education</p>

        {/* CTA Button */}
        <Button 
          variant="admin" 
          size="lg" 
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <LayoutDashboard className="w-5 h-5" />
          Access Admin Dashboard
        </Button>

        {/* Description */}
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Comprehensive admin panel with real-time synchronization<br />
          Manage courses, faculty, admissions, and analytics
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
