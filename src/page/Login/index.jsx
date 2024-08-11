import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin123";

    try {
      if (email === adminEmail && password === adminPassword) {
        Swal.fire({
          icon: "success",
          title: "Admin login successful!",
        });
        localStorage.setItem("role", "admin");
        navigate("/data");
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/login`,
          {
            email,
            password,
          }
        );
        const { token } = response.data;

        if (response.status === 200 && token) {
          Swal.fire({
            icon: "success",
            title: "Login successful!",
          });
          localStorage.setItem("token", token);
          localStorage.setItem("id", response.data.data.id);
          localStorage.setItem("role", "user");
          navigate("/home");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid email or password",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Invalid email or password",
      });
    }
  };

  return (
    <Container className="mt-5" style={{ color: "#f3CB51" }}>
      <Row className="justify-content-md-center">
        <Col md={4}>
          <h2>Login</h2>
          <Form onSubmit={handleLogin}>
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
                Dont Have an account?
                <Link className="navLink" to="/">
                  Register
                </Link>
              </p>
            </div>

            <Button variant="warning" type="submit" className="mt-3">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
