import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export const CustomNavbar = () => {
  return (
    <Navbar className="bg-body-tertiary mb-3" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Farmacia Popular</Navbar.Brand>
      </Container>
    </Navbar>
  );
};
