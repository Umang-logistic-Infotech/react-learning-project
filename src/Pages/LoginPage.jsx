import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContextProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function LoginPage() {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function authorize() {
    const payload = { email, password };
    try {
      const response = await axios.post("http://localhost:5000/authorize", payload);
      if (response.data.message === 'success') {
        toast.success("Login successful!",{position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        });
        localStorage.setItem('token', response.data.access_token);
        navigate("/home");
      } else if (response.data.message === 'Unauthorized') {
        toast.error("You are not registered.. please Sign Up First",{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        });
      } else {
        toast.error("Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      toast.error("There was an error processing your request.");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    authorize();
  };

  return (
    <Container className={`d-flex justify-content-center align-items-center ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'} min-vh-100`}>
      <Form className="w-50" onSubmit={handleSubmit}>
        <h3 className="text-center mb-4">Login</h3>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant={theme === 'dark' ? 'outline-light' : 'outline-dark'} type="submit" className="w-100">
          Login
        </Button>
        <div className="mt-3 text-center">
          <span>Don't have an account? <a href="/signup">Sign up</a></span>
        </div>
      </Form>
    </Container>
  );
}

export default LoginPage;
