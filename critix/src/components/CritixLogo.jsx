const CritiXLogo = ({ size = 200 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bakgrunn */}
      <rect width="200" height="200" rx="20" fill="#111" />

      {/* Neon X */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        fontSize="80"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
        fill="url(#neonGrad)"
        transform="translate(0, 40)"
      >
        X
      </text>
      
      {/* Filmrull-element */}
      <circle cx="100" cy="100" r="50" stroke="#FF3D00" strokeWidth="4" fill="none" />
      <circle cx="100" cy="100" r="30" stroke="#FFD700" strokeWidth="4" fill="none" />

      {/* CritiX Tekst */}
      <text
        x="50%"
        y="170"
        textAnchor="middle"
        fontSize="40"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
        fill="#FFF"
      >
        CRITIX
      </text>
      
      {/* Gradient for Neon-effekt */}
      <defs>
        <linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#00FFFF", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#FF3D00", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default CritiXLogo;