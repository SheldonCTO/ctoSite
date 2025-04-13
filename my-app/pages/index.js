import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";


export default function Home() {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true); 
  }, []);

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {isBrowser ? (
        <video
        autoPlay
        loop
        muted
        playsInline
        poster="/cover.jpg"
        style={{
          position: "absolute",
          
          margin: "10px",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src="/coverV2_fixed.mp4" type="video/mp4" />
      </video>
      
      ) : (
        <div
          style={{
            position: "absolute",
            top: 50,
            left: 0,
            margin: "50px",
            width: "100%",
            height: "100%",
            backgroundImage: "url('/cover.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: -1,
          }}
        />
      )}

      <div>
        <h1
          style={{
            margin: "10",
            font: "bold 50px Arial",
            color: "white",
            textAlign: "center",
            textShadow: "2px 2px 10px rgba(0, 0, 0, 0.8)",
          }}
        >
          Harness Your Power 
        </h1>
        <Button href="./about">About Me</Button>
      </div>
    </div>
  );
}
