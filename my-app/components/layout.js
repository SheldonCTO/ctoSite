

// export default function Layout(props) {
//   const router = useRouter();
//   let token = readToken();

//   function logout() {
//     removeToken();

//     router.push("/");
//   }
//   function CodingWorkDropdown() {
//     const [isOpen, setIsOpen] = useState(false); 
//     const dropdownRef = useRef(null); 
//     const router = useRouter();

//     const handleSelect = (eventKey) => {
//       setIsOpen(false); 
//       router.push({
//         pathname: "/coding",
//         query: { option: eventKey },
//       });
//     };

//     useEffect(() => {
//       const handleClickOutside = (event) => {
//         if (
//           dropdownRef.current &&
//           !dropdownRef.current.contains(event.target)
//         ) {
//           setIsOpen(false); 
//         }
//       };

//       document.addEventListener("mousedown", handleClickOutside);
//       return () => {
//         document.removeEventListener("mousedown", handleClickOutside);
//       };
//     }, []);

//     return (
//       <div ref={dropdownRef}>
//         <NavDropdown
//           id="coding-work-dropdown"
//           title="My Coding Work"
//           show={isOpen}
//           onClick={() => setIsOpen((prev) => !prev)} // 點擊切換下拉菜單開關
//           className="custom-dropdown"
//         >
//           <NavDropdown.Item onClick={() => handleSelect("boostrap")}>
//             Bootstrap
//           </NavDropdown.Item>
//           <NavDropdown.Item onClick={() => handleSelect("react")}>
//             React
//           </NavDropdown.Item>
//           <NavDropdown.Item onClick={() => handleSelect("gameOfLife")}>
//             Game Of Life
//           </NavDropdown.Item>
//           <NavDropdown.Item onClick={() => handleSelect("blog")}>
//             Blog
//           </NavDropdown.Item>
//         </NavDropdown>
//       </div>
//     );
//   }

//   function ClimbingWorkDropdown() {
//     const router = useRouter();

//     const handleSelect = (eventKey) => {
//       router.push({
//         pathname: "/climbing",
//         query: { option: eventKey },
//       });
//     };

//     return (
//       <NavDropdown
//         title="Climbing Work"
//         id="climbing-work-dropdown"
//         onSelect={handleSelect}
//         className="custom-dropdown"
//       >
//         <NavDropdown.Item eventKey="Climbing Records">
//           Climbing Records
//         </NavDropdown.Item>
//         <NavDropdown.Item eventKey="My Coaching">Coaching</NavDropdown.Item>
//       </NavDropdown>
//     );
//   }



import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { readToken, removeToken } from "@/lib/authenticate";

export default function Layout(props) {
  const router = useRouter();
  let token = readToken();

  function logout() {
    removeToken();

    router.push("/");
  }


  return (
    <>
      <Navbar
        bg="light"
        expand="lg"
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}
      >
        <Container>
          <div className="title-container">
            <Link href="/" passHref legacyBehavior>
              <Navbar.Brand>
                CTO Space, <br />
                My Life, My Work
              </Navbar.Brand>
            </Link>
            &nbsp;&nbsp;{token && <>- Welcome: {token.userName}</>}
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" style={{ display: "flex" }}>
              <Link href="/" passHref legacyBehavior>
                <Nav.Link >
                  &nbsp;&nbsp;&nbsp;Home&nbsp;&nbsp;&nbsp;
                </Nav.Link>
              </Link>
              <NavDropdown id="basic-nav-dropdown" title="My Coding Work">
                <NavDropdown.Item
                  onClick={() =>router.push({
                    pathname: "/coding",
                    query: { option: "boostrap" },
                  })}
                >
                  Bootstrap
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() =>router.push({
                    pathname: "/coding",
                    query: { option: "react" },
                  })}
                >
                  React
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() =>router.push({
                    pathname: "/coding",
                    query: { option: "gameOfLife" },
                  })}
                >
                  Game Of Life
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() =>router.push({
                    pathname: "/coding",
                    query: { option: "blog" },
                  })}
                >
                  Blog
                </NavDropdown.Item>
              </NavDropdown>
              &nbsp;&nbsp;&nbsp;
    
              <NavDropdown title="Climbing Work" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => router.push({
                      pathname: "/climbing",
                      query: { option: "Climbing Records" },
                    })
                }>
                  Climbing Records
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() =>
                    router.push({pathname: "/climbing",
                      query: { option: "My Coaching" },})
                }>
                  Coaching
                </NavDropdown.Item>
              </NavDropdown>
              <Link href="/about" passHref legacyBehavior>
                <Nav.Link >
                  &nbsp;&nbsp;&nbsp;About Me
                </Nav.Link>
              </Link>
              <Link href="/contact" passHref legacyBehavior>
                <Nav.Link >
                  &nbsp;&nbsp;&nbsp;Contact Me
                </Nav.Link>
              </Link>
            </Nav>
            <Nav className="ml-auto">
              {!token && (
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login</Nav.Link>
                </Link>
              )}
              {token && (
                <Nav.Link onClick={logout}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Logout
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {props.children}
      <br></br>
      <br></br>
      <br></br>
    </>
  );
}
