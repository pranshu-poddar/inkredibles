import Sidebar from "@/components/user/sidebar";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="container2 pt-10">
            <div className="px-10 flex relative gap-8">
                <Sidebar />
                {children}
            </div>
        </div>
    );
}
