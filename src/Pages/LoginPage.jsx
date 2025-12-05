import React, { useState, useContext } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContextProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContextProvider';

function LoginPage() {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user,setUser } = useContext(UserContext);
  if(user.loggedIn){
    navigate('/home');
  }
  const notify = (message, type) => {
    const options = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored'
    };

    if (type === 'success') {
      toast.success(message, options);
    } else if (type === 'error') {
      toast.error(message, options);
    }
  };

async function authorize() {
  setLoading(true);
  const payload = { email, password };

  try {
    const response = await axios.post("http://localhost:1337/authorize", payload);


    if (response.data.message === 'Success') {
      const userData = {
        name: response.data.user.name,
        loggedIn: true,
        access_token: response.data.access_token
      };

      setUser(userData);
      sessionStorage.setItem('userContext', JSON.stringify(userData));
      notify("Login successful!", 'success');
      navigate("/home");

    } else if (response.data.message === 'Unauthorized') {
      notify("Invalid email or password", 'error');
    } else {
      notify("There was an issue with the login process.", 'error');
    }

  } catch (err) {
    console.error(err);

    if (err.response) {
      if (err.response.status === 401) {
        notify("Invalid email or password", 'error');
      } else {
        notify("There was an error processing your request.", 'error');
      }
    } else {
      notify("Network error or server is unavailable", 'error');
    }
  } finally {
    setLoading(false);
  }
}



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      notify("Please fill in both fields.", 'error');
      return;
    }
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
        <Button variant={theme === 'dark' ? 'outline-light' : 'outline-dark'} type="submit" className="w-100" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
        <div className="mt-3 text-center">
          <span>Don't have an account? <a href="/signup">Sign up</a></span>
        </div>
      </Form>
    </Container>
  );
}

export default LoginPage;
