import React from "react";
import CritiXLogo from "./CritiXLogo";

const Footer = ({ darkMode }) => {
  return (
        <footer
        className={`w-full px-0 py-10 transition-colors duration-500 ${
        darkMode ? "bg-black text-white" : "bg-gray-100 text-gray-800"
        }`}
        >
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 text-center md:text-left text-sm font-medium">
        

        {/*Footer og Copy*/}
        <div className="md:col-span-1 flex flex-col items-start -ml-4">
        <CritiXLogo size={100} />
        <p className={`mt-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
        &copy; {new Date().getFullYear()} CritiX. All rights reserved.
        </p>
        </div>

        {/* Navigation */}
        <div className="space-y-2">
          <h3 className="text-base font-semibold mb-2">Navigation</h3>
          <ul className="space-y-1">
            {["Home", "About Us", "Contact", "Privacy Policy"].map((text, idx) => (
              <li key={idx}>
                <a
                  href={`/${text.toLowerCase().replace(/\s/g, "")}`}
                  className="inline-block border-b-2 border-transparent hover:border-current transition duration-300"
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Streaming Platforms */}
        <div className="space-y-2">
          <h3 className="text-base font-semibold mb-2">Platforms</h3>
          <ul className="space-y-1">
            {[
              ["IMDb", "https://www.imdb.com"],
              ["Netflix", "https://www.netflix.com"],
              ["HBO Max", "https://www.hbomax.com"],
              ["Prime Video", "https://www.primevideo.com"],
              ["Viaplay", "https://www.viaplay.com"],
              ["SkyShowtime", "https://www.skyshowtime.com"],
            ].map(([name, url], idx) => (
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

      {/* Sosiale medier */}
      <div className="mt-10 text-center space-x-4 text-sm">
        {[
          ["Facebook", "https://www.facebook.com"],
          ["Instagram", "https://www.instagram.com"],
        ].map(([name, url], idx) => (
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