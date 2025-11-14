import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContextProvider';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const payload = { name, email, password };

    try {
      const response = await axios.post('http://localhost:1337/users', payload);
      if (response.data.message === 'User registered successfully') {
        toast.success("Registration successful",{position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: {theme},
    });
        navigate("/login");
      }
    } catch (err) {
      toast.error("Error occurred. Please try again");
    }
  };


  return (
    <Container className={`d-flex justify-content-center align-items-center ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'} min-vh-100`}>
      <Form className="w-50" onSubmit={handleSubmit}>
        <h3 className="text-center mb-4">Sign Up</h3>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
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
        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant={theme === 'dark' ? 'outline-light' : 'outline-dark'} type="submit" className="w-100">
          Sign Up
        </Button>
        <div className="mt-3 text-center">
          <span>Already have an account? <a href="/login">Login</a></span>
        </div>
      </Form>
    </Container>
  );
}

export default SignUpPage;
