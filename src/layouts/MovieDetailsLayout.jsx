import Navbar from "../components/Navbar";

const MovieDetailsLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col md:flex-row gap-8 p-4">
        {children}
      </main>
    </div>
  );
};

export default MovieDetailsLayout;
