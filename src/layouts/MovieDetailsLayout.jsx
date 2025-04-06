import Navbar from "../components/NavWithPoster";
import Footer from "../components/Footer";

const MovieDetailsLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col md:flex-row gap-8 p-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MovieDetailsLayout;
