import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContextProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()

  async function authorize() {
        const payload = {
          email:email,
          password:password,
        }
        try {
            const response = await axios.post("https://api.escuelajs.co/api/v1/auth/login",payload);
            localStorage.setItem('token',response.data.access_token);
            navigate("/Home")
            
            alert("success");

        } catch (err) {
            console.error(err);
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
