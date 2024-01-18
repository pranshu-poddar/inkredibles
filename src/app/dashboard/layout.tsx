import DashboardNavigation from "@/components/dashboard/dashboard-navigation";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="container2 pt-10">
            <DashboardNavigation />
            <div className="pt-10">
                {children}
            </div>
        </div>
    );
}
