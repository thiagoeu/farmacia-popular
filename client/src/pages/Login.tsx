import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LoginSchema } from "../shared/validations/loginSchema";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { Button, Form as BootstrapForm, Alert } from "react-bootstrap";

const Login: React.FC = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await login(values.email, values.password);
      navigate("/"); // Redireciona para a página inicial após login
    } catch (err) {
      setError("Falha ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <BootstrapForm.Group className="mb-3" controlId="formBasicEmail">
              <BootstrapForm.Label>Email</BootstrapForm.Label>
              <Field
                name="email"
                type="email"
                as={BootstrapForm.Control}
                placeholder="Digite seu email"
              />
              <ErrorMessage
                name="email"
                component={BootstrapForm.Text}
                className="text-danger"
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group className="mb-3" controlId="formBasicPassword">
              <BootstrapForm.Label>Senha</BootstrapForm.Label>
              <Field
                name="password"
                type="password"
                as={BootstrapForm.Control}
                placeholder="Digite sua senha"
              />
              <ErrorMessage
                name="password"
                component={BootstrapForm.Text}
                className="text-danger"
              />
            </BootstrapForm.Group>

            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
