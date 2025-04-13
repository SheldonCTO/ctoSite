import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { readToken } from "@/lib/authenticate"; // Adjust path to your JWT helper
import { Button } from 'react-bootstrap';
import Image from "next/image";

export default function Records() {
  const [records, setRecords] = useState([]);
  const router = useRouter();
  const token = readToken();
  const { option } = router.query;

  useEffect(() => {
    const fetchRecords = async () => {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      console.log("Headers:", headers);
    
      try {
        const res = await fetch("https://cto-react.vercel.app/api/record", {
          method: "GET",
          headers,
        });
    
        if (res.ok) {
          const data = await res.json();
          console.log("Fetched records:", data);
    
          // Directly set records since the response is now an array
          setRecords(data);
        } else if (res.status === 401) {
          console.error("Unauthorized: Token might be invalid or expired");
          alert("Session expired. Please log in again.");
          router.push("/login"); // Redirect to login page
        } else {
          console.error("Error fetching records:", res.status, await res.text());
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };
    

    fetchRecords();
  }, [token]);

  return (
    <>
      <div>
        <h2 style={{ marginTop: "95px" }}>{option}</h2>
        {token && <>{token.userName}</>}&nbsp;{" "}
        {option === "Climbing Records" && (
          <div className="record-container">
            {records.map((record) => (
              <div className="record-card" key={record._id}>
                {record.image && (
                  <a
                    href={record.URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "inline-block" }}
                  >
                    <img
                      alt={record.title}
                      src={`data:${record.contentType};base64,${record.image}`}
                      style={{ width: "100%", maxHeight: "300px" }}
                    />
                  </a>
                )}
                <p>{record.title}</p>
                <p>{record.location}</p>
                <p>{record.grade}</p>
              </div>
            ))}

            {token && <Button href="./newRecord">New Record</Button>}
          </div>
        )}
        {option === "My Coaching" && (
          <div className="coaching-container">
            <Image
              src="/coaching.jpg"
              alt="Climbing Coach"
              width={600}
              height={500}
            />
            <p className="coaching-intro">
              I have 13 years of experience in both Sport Climbing and
              Traditional Climbing, including climbing in local gyms and on rock
              walls across five different countries.
              <br />
              I am a registered Sport Climbing Coach with HKCMCU, a member of
              UIAA, IFSC, and SF&OC.
              <br />
              My highest achievements include reaching a Sport Climbing level of
              7c (French Grade) and a Traditional Climbing level of HVS 5a
              (British Trad Grade). Additionally, I have successfully completed
              a 7-pitch Traditional Multi-pitch Climb.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
