const CritiXLogo = ({ size = 100, color = "#FF3D00" }) => {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Bakgrunnssirkel */}
        <circle cx="100" cy="100" r="95" stroke={color} strokeWidth="10" fill="black" />
  
        {/* CritiX tekst */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="50"
          fontWeight="bold"
          fill={color}
          fontFamily="Arial, sans-serif"
        >
          CritiX
        </text>
  
        {/* Filmklipp ikon */}
        <rect x="30" y="140" width="140" height="10" fill={color} />
        <rect x="30" y="160" width="140" height="10" fill={color} />
  
        {/* Play-knapp */}
        <polygon points="70,70 130,100 70,130" fill={color} />
      </svg>
    );
  };
  
  export default CritiXLogo;
