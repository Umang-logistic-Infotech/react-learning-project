import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Card, Row, Col } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContextProvider';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SubscribeUserPage() {
  const { theme } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const storedUser = sessionStorage.getItem("userContext");
      if (!storedUser) {
        toast.error("User not found. Please login again");
        navigate("/login");
        return;
      }

      const userData = JSON.parse(storedUser);
      const userEmail = userData.acce;

      const response = await axios.get(`http://localhost:1337/users/${userId}`);
      setUserDetails(response.data);
    } catch (err) {
      toast.error("Failed to fetch user details");
    }
  };

  const plans = [
    { id: 1, name: '1 Month', duration: 1, price: '$9.99' },
    { id: 3, name: '3 Months', duration: 3, price: '$24.99' },
    { id: 6, name: '6 Months', duration: 6, price: '$44.99' }
  ];

  const handleSubscribe = async () => {
    if (!selectedPlan) {
      toast.error("Please select a plan");
      return;
    }

    const subscribedAt = new Date();
    const validTill = new Date();
    validTill.setMonth(validTill.getMonth() + selectedPlan);

    const payload = {
      userId: userDetails.id,
      subscribedAt: subscribedAt,
      validTill: validTill
    };

    try {
      const response = await axios.post('http://localhost:1337/subscriptions', payload);
      if (response.status === 201) {
        toast.success("Subscription created successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme,
        });
        navigate("/TheMovieDB");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Error occurred. Please try again");
      }
    }
  };

  if (!userDetails) {
    return (
      <Container className={`d-flex justify-content-center align-items-center ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'} min-vh-100`}>
        <div>Loading...</div>
      </Container>
    );
  }

  return (
    <Container className={`d-flex flex-column justify-content-center align-items-center ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'} min-vh-100`}>
      <div className="text-center mb-4">
        <h2>Subscribe to Access Movies</h2>
        <p className="mt-3">
          <strong>Name:</strong> {userDetails.name}
        </p>
        <p>
          <strong>Email:</strong> {userDetails.email}
        </p>
      </div>

      <Row className="w-100 justify-content-center">
        {plans.map((plan) => (
          <Col key={plan.id} md={3} className="mb-3">
            <Card
              className={`h-100 ${selectedPlan === plan.duration ? 'border-primary border-3' : ''} ${theme === 'dark' ? 'bg-dark text-light' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedPlan(plan.duration)}
            >
              <Card.Body className="text-center">
                <Card.Title>{plan.name}</Card.Title>
                <Card.Text className="display-6">{plan.price}</Card.Text>
                <Card.Text className="text-muted">
                  Valid for {plan.duration} month{plan.duration > 1 ? 's' : ''}
                </Card.Text>
                {selectedPlan === plan.duration && (
                  <div className="text-primary fw-bold">✓ Selected</div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Button
        variant={theme === 'dark' ? 'outline-light' : 'outline-dark'}
        size="lg"
        className="mt-4 px-5"
        onClick={handleSubscribe}
        disabled={!selectedPlan}
      >
        Subscribe Now
      </Button>

      <div className="mt-3 text-center">
        <span><a href="/Home">Back to Home</a></span>
      </div>
    </Container>
  );
}

export default SubscribeUserPage;