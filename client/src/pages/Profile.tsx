import React from "react";
import { Card, Button } from "react-bootstrap";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export const Profile: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="text-center mt-5">
        <h2>Você não está logado.</h2>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center mt-5">
      <Card style={{ width: "24rem" }} className="text-center shadow-sm">
        <Card.Header>
          <h3>Perfil do Usuário</h3>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>ID:</strong> {user.id}
          </Card.Text>
          <Card.Text>
            <strong>Email:</strong> {user.email}
          </Card.Text>
          <Card.Text>
            <strong>Role:</strong> {user.role}
          </Card.Text>
          <div className="d-flex justify-content-around mt-4">
            <Button variant="primary" onClick={() => navigate("/edit-profile")}>
              Editar Perfil
            </Button>
            <Button variant="danger" onClick={logout}>
              Sair
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
