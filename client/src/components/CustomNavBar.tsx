import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // ícone do usuário
import { Button } from 'react-bootstrap';

export const CustomNavbar: React.FC = () => {
  // Pega usuário e estado de autenticação do zustand
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  // Vai para a página de perfil
  const handleProfile = () => {
    navigate('/profile');
  };

  // Vai para a página de login
  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Navbar className="bg-body-tertiary mb-3" data-bs-theme="dark">
      <Container>
        {/* Marca da Navbar */}
        <Navbar.Brand onClick={() => navigate('/')}>
          Farmacia Popular
        </Navbar.Brand>

        {/* Menu à direita */}
        <Nav className="ms-auto">
          {isAuthenticated && user ? (
            // Dropdown mostrando o email do usuário e opções
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="secondary"
                id="dropdown-user"
                className="d-flex align-items-center"
              >
                {/* ícone do usuário */}
                <FaUserCircle size={24} className="me-2" />
                {user.email}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleProfile}>Perfil</Dropdown.Item>

                {/* Apenas admins veem essa opção */}
                {user.role === 'ADMIN' && (
                  <Dropdown.Item onClick={() => navigate('/admin')}>
                    Painel Admin
                  </Dropdown.Item>
                )}

                <Dropdown.Divider />
                <Dropdown.Item onClick={logout}>Sair</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            // Se não estiver logado, link para login
            <Nav.Link onClick={handleLogin}>
              <Button className="btn btn-primary">Fazer Login</Button>
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
