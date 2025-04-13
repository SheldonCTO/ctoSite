import Image from "next/image";
import Link from "next/link";

// pages/coding.js
import { useRouter } from "next/router";

export default function CodingPage() {
  const router = useRouter();
  const { option } = router.query;

  const websiteLinks = {
    react: "https://assignment6-lemon.vercel.app",
    boostrap: "https://bootstrap-beta-weld.vercel.app/",
    gameOfLife: "https://game-of-life-psi-eight.vercel.app/",
    blog: "https://example.com/option4",
  };

  return (
    <>
    <div style={{ marginTop: "75px" }}>
      <h1>
        Coding Work - {option}
      </h1>
  
      {option && websiteLinks[option] && (
  <Link href={websiteLinks[option]} passHref legacyBehavior>
    <a target="_blank" rel="noopener noreferrer">
      <div
        className="image-container"
        style={{ position: "absolute", width: "100vw", height: "100vh" }}
      >
        <Image
          src={`/${option}.png`}
          alt={`Option ${option}`}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
    </a>
  </Link>
)}

    </div>
    </>
  );
}
