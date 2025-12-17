const departments = [
  { name: "Finance", percentage: 35, color: "bg-action-blue" },
  { name: "Marketing", percentage: 28, color: "bg-action-green" },
  { name: "Operations", percentage: 22, color: "bg-action-orange" },
  { name: "HR", percentage: 15, color: "bg-action-cyan" },
];

const DepartmentDistribution = () => {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Department Distribution</h3>

      <div className="space-y-5">
        {departments.map((dept, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{dept.name}</span>
              <span className="text-sm text-muted-foreground">{dept.percentage}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${dept.color}`}
                style={{ width: `${dept.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentDistribution;
