import { Link } from "react-router-dom";
import CritiXLogo from "./CritiXLogo";

const Footer = ({ darkMode }) => {
  const year = new Date().getFullYear();

  const platforms = [
    ["IMDb", "https://www.imdb.com"],
    ["Netflix", "https://www.netflix.com"],
    ["HBO Max", "https://www.hbomax.com"],
    ["Prime Video", "https://www.primevideo.com"],
    ["Viaplay", "https://www.viaplay.com"],
    ["SkyShowtime", "https://www.skyshowtime.com"],
  ];

  const socials = [
    ["Facebook", "https://www.facebook.com"],
    ["Instagram", "https://www.instagram.com"],
  ];

  return (
    <footer
      className={`w-full px-0 py-10 transition-colors duration-500 ${
        darkMode ? "bg-black text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 text-center md:text-left text-sm font-medium px-4">
        {/* Logo & Copyright */}
        <div className="md:col-span-1 flex flex-col items-start md:items-start">
          <CritiXLogo size={100} />
          <p
            className={`mt-2 text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            &copy; {year} CritiX. All rights reserved.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-base font-semibold mb-2">Navigation</h3>
          <ul className="space-y-1">
            <li>
              <Link
                to="/"
                className="inline-block border-b-2 border-transparent hover:border-current transition duration-300"
              >
                Home
              </Link>
            </li>
          </ul>
        </div>

        {/* Platforms */}
        <div>
          <h3 className="text-base font-semibold mb-2">Platforms</h3>
          <ul className="space-y-1">
            {platforms.map(([name, url], idx) => (
              <li key={idx}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border-b-2 border-transparent hover:border-current transition duration-300"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Social media */}
      <div className="mt-10 text-center space-x-4 text-sm">
        {socials.map(([name, url], idx) => (
          <a
            key={idx}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-b-2 border-transparent hover:border-current transition duration-300"
          >
            {name}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
