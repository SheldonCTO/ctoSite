import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { authenticateUser } from "@/lib/authenticate";
import { useRouter } from 'next/router';


export default function Login(props) {

  const [warning, setWarning] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    try{
      await authenticateUser(user, password);
      router.push("/");
    }catch(err){
     setWarning(err.message);
    }

  }

  return (
    <>
    <div style={{
          position: "fixed",
          top: 40}}>
            <br />
            <br />
      <Card bg="light">
        <Card.Body >
          <h2 >Login</h2>
          <br />
          Enter your login information below:
        </Card.Body>
      </Card>

     

      <Form onSubmit={handleSubmit}>
        <Form.Group >
          <Form.Label>User:</Form.Label>
          <Form.Control 
          style={{width: "100%",
          padding: "12px 20px",
          margin: "8px 0",
          display: "inline-block",
          border: "1px solid #ccc",
          }}type="text" value={user} id="userName" name="userName" onChange={e => setUser(e.target.value)} />
        </Form.Group>
       
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control 
          style={{width: "100%",
          padding: "12px 20px",
          margin: "8px 0",
          display: "inline-block",
          border: "1px solid #ccc",
          }}type="password" value={password} id="password" name="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group  >

        {warning && <>
         
          <Alert variant='danger'>
            {warning}
          </Alert>
        </>}

        
        <Button variant="primary" className="pull-right" type="submit">Login</Button>
      </Form>
      </div>
    </>
  )
}