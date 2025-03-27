import Navbar from "../components/Navbar";

const MovieDetailsLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col">
        <section className="flex flex-wrap md:flex-nowrap gap-8 p-4">
          
          <div className="flex-1">{children}</div>
        </section>

        <section className="p-4 bg-gray-100 flex flex-col items-center">
          <h2 className="text-lg font-semibold text-center">
            User Reviews & Ratings
          </h2>
        </section>
      </main>
    </div>
  );
};

export default MovieDetailsLayout;
