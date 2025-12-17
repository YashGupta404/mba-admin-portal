import { TrendingUp } from "lucide-react";

const EnrollmentTrends = () => {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Enrollment Trends</h3>

      <div className="h-64 bg-muted/30 rounded-lg flex flex-col items-center justify-center">
        <TrendingUp className="w-12 h-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground text-center">
          Chart visualization would go here<br />
          <span className="text-sm">Showing enrollment data over time</span>
        </p>
      </div>
    </div>
  );
};

export default EnrollmentTrends;
