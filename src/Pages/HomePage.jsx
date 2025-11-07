import Sidebar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserContextProvider from '../context/UserContextProvider';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

export default function HomePage() {
  return (
    <UserContextProvider>
      <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
        <Header />
        <div className="d-flex flex-grow-1" style={{ overflow: 'hidden' }}>
          <Sidebar />
          <main
            className="flex-grow-1"
            style={{
              overflowY: 'auto',
              overflowX: 'hidden',
              height: 'calc(100vh - 73px)',
            }}
          >
            <Container>
              <Outlet />
            </Container>
          </main>
        </div>
        <div className="d-flex flex-column">
          <Footer />
        </div>
      </div>
    </UserContextProvider>
  )
}