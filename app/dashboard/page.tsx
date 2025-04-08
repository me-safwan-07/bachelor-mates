export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Welcome back! Here's an overview of your study materials and activity.
        </p>
      </div>
    </div>
  );
}