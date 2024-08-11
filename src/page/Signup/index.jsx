import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    console.log("Signup form submitted");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        {
          email,
          password,
        }
      );

      console.log("Response:", response);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Signup successful!",
          timer: 1500,
          timerProgressBar: true,
        }).then(() => {
          console.log("Navigating to login");
          navigate("/login");
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
      });
    }
  };

  return (
    <Container className="mt-5" style={{ color: "#f3CB51" }}>
      <Row className="justify-content-md-center">
        <Col md={4}>
          <h2>Sign Up</h2>
          <Form onSubmit={handleSignup}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <div className="sign-up">
              <p>
                You Have an account?
                <Link className="navLink" to="/login">
                  Log in
                </Link>
              </p>
            </div>

            <Button
              variant="warning"
              type="submit"
              className="mt-3"
              onClick={() => navigate("/login")}
            >
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
