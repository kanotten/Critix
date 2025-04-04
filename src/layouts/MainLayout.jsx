import Footer from "..//components/Footer";
import Navbar from "../components/NavWithPoster";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
