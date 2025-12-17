import { RefreshCw, Users, GraduationCap, Briefcase, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/dashboard/StatCard";
import RecentActivities from "@/components/dashboard/RecentActivities";
import QuickActions from "@/components/dashboard/QuickActions";
import EnrollmentTrends from "@/components/dashboard/EnrollmentTrends";
import DepartmentDistribution from "@/components/dashboard/DepartmentDistribution";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening at your institution.</p>
        </div>
        <Button variant="refresh" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh Data
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Active Students"
          value="1,247"
          change="+12% from last month"
          icon={Users}
          iconColorClass="icon-blue"
        />
        <StatCard
          title="Course Enrollment Rate"
          value="89.5%"
          change="+5.2% from last month"
          icon={GraduationCap}
          iconColorClass="icon-green"
        />
        <StatCard
          title="Placement Success"
          value="94.2%"
          change="+8.1% from last month"
          icon={Briefcase}
          iconColorClass="icon-orange"
        />
        <StatCard
          title="Faculty Strength"
          value="156"
          change="+3 from last month"
          icon={UserCheck}
          iconColorClass="icon-pink"
        />
      </div>

      {/* Activities and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivities />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EnrollmentTrends />
        <DepartmentDistribution />
      </div>
    </div>
  );
};

export default Dashboard;
