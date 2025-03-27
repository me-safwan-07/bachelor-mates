import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
                {children}
            <Footer />
        </>
    );
};

export default AppLayout;