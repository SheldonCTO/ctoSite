import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function NewRecord(props) {
  const [warning, setWarning] = useState("");
  const [title, setTitle] = useState("");
  const [URL, setURL] = useState("");
  const [location, setLocation] = useState("");
  const [grade, setGrade] = useState("");
  const [image, setImage] = useState(null);  // New state for image
  const router = useRouter();

  // Function to handle image upload
  const handleImageUpload = (file) => {
    setImage(file);
  };

  // Function to send the record data to the server
  async function handleSubmit(e) {
    e.preventDefault();

    // Create a FormData object to handle file upload along with other form data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("URL", URL);
    formData.append("location", location);
    formData.append("grade", grade);

    if (image) {
      formData.append("image", image); // Append the image file
    }

    try {
      // Send the data to your backend
      const response = await fetch("https://cto-react.vercel.app/api/record", {
        method: "POST",
        body: formData,  // Use FormData to send both text and file data
      });

      const data = await response.json();

      // Handle the response from the server
      if (response.ok) {
        setWarning({ message: data.message, type: "success" });
      } else {
        setWarning({ message: data.message, type: "danger" });
      }

    } catch (err) {
      setWarning({ message: "Something went wrong. Please try again.", type: "danger" });
    }
  }

  return (
    <>
    <div style={{ position: "fixed", top: 90 }}>
      <Card bg="light">
        <Card.Body>
          <h2 >New Record</h2>
          Enter your information below:
        </Card.Body>
      </Card>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>URL:</Form.Label>
          <Form.Control
            type="text"
            value={URL}
            id="URL"
            name="URL"
            onChange={(e) => setURL(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            value={title}
            id="title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Location:</Form.Label>
          <Form.Control
            type="text"
            value={location}
            id="location"
            name="location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Grade:</Form.Label>
          <Form.Control
            type="text"
            value={grade}
            id="grade"
            name="grade"
            onChange={(e) => setGrade(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Upload Image:</Form.Label>
          <Form.Control
            type="file"
            id="imageUpload"
            name="imageUpload"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files[0])} // Handle the selected image
          />
        </Form.Group>

        {warning && (
          <Alert variant={warning.type}>
            {warning.message}
          </Alert>
        )}

        <Button variant="primary" className="pull-right" type="submit">
          Submit
        </Button>
      </Form>
      </div>
    </>
  );
}
