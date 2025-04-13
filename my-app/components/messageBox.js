import { useState } from "react";
import { useRouter } from "next/router";

export default function MessageBox() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://cto-react.vercel.app/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message sent successfully! Auto redirect to homepage after 3 sec");
        setFormData({ name: "", email: "", message: "" });

        // Redirect to homepage after 3 seconds
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("An error occurred while sending the message.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              margin: "8px 0",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              margin: "8px 0",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              margin: "8px 0",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <button type="submit">Send Message</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

