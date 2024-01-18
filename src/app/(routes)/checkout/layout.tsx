import OrderSummary from "@/components/checkout/order-summary";
import Steps from "@/components/checkout/steps";

export default function CheckoutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="container2 mx-auto p-4">
            <Steps />
            <div className='lg:px-10 w-full gap-4 flex pt-16'>
                <div className="w-[55%]">
                    {children}
                </div>
                <div className='w-[45%]'>
                    <OrderSummary />
                </div>
            </div>
        </div>
    );
}
