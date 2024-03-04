import Sidebar from "@/components/user/sidebar";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="container2 sm:pt-10">
            <div className="md:px-10 flex sm:flex-row flex-col relative gap-8">
                <Sidebar />
                {children}
            </div>
        </div>
    );
}
