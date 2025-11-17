import React, { useState, useEffect, useContext } from 'react';
import { Button, Container, Card, Row, Col, Alert } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContextProvider';
import { UserContext } from '../context/UserContextProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SubscriptionPage() {
  const { theme } = useTheme();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    if (user?.access_token) {
      checkSubscription();
    }
  }, [user?.access_token]);

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

  const plans = [
    { id: 1, name: '1 Month', duration: 1, price: '₹99' },
    { id: 3, name: '3 Months', duration: 3, price: '₹249' },
    { id: 6, name: '6 Months', duration: 6, price: '₹449' },
    { id: 12, name: '1 Year', duration: 12, price: '₹799' }
  ];

  async function checkSubscription() {
    try {
      const response = await axios.post('http://localhost:1337/check-subscription', {
        token: user?.access_token
      });

      if (response.data.valid) {
        setSubscription(response.data.subscription);
        sessionStorage.setItem('MovieSubscribed' ,true);
        console.log(response.data.subscription);
      }
      
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  async function subscribe() {
    if (!selectedPlan) {
        notify('Please select a plan', 'error');
        return;
    }

    setSubmitting(true);

    try {
        const validTill = new Date();
        validTill.setMonth(validTill.getMonth() + selectedPlan);

        const response = await axios.post('http://localhost:1337/subscribe', {
        validTill: validTill.toISOString(),
        token: user.access_token
        });

        if (response.data.message === 'User subscribed successfully') {
        notify('Subscription successful!', 'success');
        setSubscription(response.data.subscription);
        setSelectedPlan(null);
        navigate('/home');
        } else {
        notify(response.data.message || 'Subscription failed', 'error');
        }
    } catch (err) {
        console.error(err);

        if (err.response) {
        if (err.response.status === 400) {
            notify(err.response.data.message || 'You are already subscribed', 'error');
        } else {
            notify('There was an error processing your request.', 'error');
        }
        } else {
        notify('Network error or server is unavailable', 'error');
        }
    } finally {
        setSubmitting(false);
    }
  }

  const handleSubscribe = () => {
    subscribe();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Container className={`d-flex justify-content-center align-items-center ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'} min-vh-100`}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className={`d-flex flex-column justify-content-center align-items-center ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'} min-vh-80 py-5`}>
      <div className="text-center mb-4">
        <h2>Subscription Portal</h2>
        <p className="mt-3">Welcome, <strong>{user.name}</strong></p>
      </div>

      {subscription ? (
        <Card className={`w-75 mb-4 ${theme === 'dark' ? 'bg-dark text-light border-success' : ''}`}>
          <Card.Body>
            <Alert variant="success">
              <Alert.Heading>✓ Active Subscription</Alert.Heading>
              <hr />
              <p className="mb-1">
                <strong>Subscribed On:</strong> {formatDate(subscription.subscribedAt)}
              </p>
              <p className="mb-0">
                <strong>Valid Until:</strong> {formatDate(subscription.validTill)}
              </p>
            </Alert>
            <p className="text-muted small">
              Your subscription is currently active and will remain valid until the date shown above.
            </p>
          </Card.Body>
        </Card>
      ) : (
        <div className="w-100">
          <Alert variant={theme === 'dark' ? 'secondary' : 'info'} className="text-center mb-4">
            <Alert.Heading>Subscribe to Access Movie DB Features</Alert.Heading>
            <p className="mb-0">Choose a plan below to get started</p>
          </Alert>

          <Row className="justify-content-center mb-4">
            {plans.map((plan) => (
              <Col key={plan.id} md={3} sm={6} className="mb-3">
                <Card
                  className={`h-75 ${selectedPlan === plan.duration ? 'border-primary border-3' : ''} ${theme === 'dark' ? 'bg-dark text-light' : ''}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedPlan(plan.duration)}
                >
                  <Card.Body className="text-center d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title className="mb-3">{plan.name}</Card.Title>
                      <Card.Text className="display-6 fw-bold text-primary">{plan.price}</Card.Text>
                      <Card.Text className="text-muted">
                        Valid for {plan.duration} month{plan.duration > 1 ? 's' : ''}
                      </Card.Text>
                    </div>
                    {selectedPlan === plan.duration && (
                      <div className="mt-3">
                        <span className="badge bg-primary fs-6">✓ Selected</span>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="text-center">
            <Button
              variant={theme === 'dark' ? 'outline-light' : 'outline-dark'}
              size="lg"
              className="px-5"
              onClick={handleSubscribe}
              disabled={!selectedPlan || submitting}
            >
              {submitting ? "Processing..." : "Subscribe Now"}
            </Button>
          </div>

          <Card className={`mt-4 w-75 mx-auto ${theme === 'dark' ? 'bg-dark text-light' : ''}`}>
            <Card.Body>
              <h5 className="mb-3">Subscription Benefits</h5>
              <ul className="mb-0">
                <li>✓ Access to premium features</li>
                <li>✓ Priority support</li>
                <li>✓ Exclusive content and updates</li>
                <li>✓ No advertisements</li>
              </ul>
            </Card.Body>
          </Card>
        </div>
      )}
    </Container>
  );
}

export default SubscriptionPage;