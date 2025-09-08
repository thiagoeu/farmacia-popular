import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaPills } from 'react-icons/fa';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <Container className="text-center">
        <FaPills size={80} className=" mb-3" />

        <h1 className="mb-3 fw-bold display-4">Farmácia Popular</h1>

        <p className="lead text-muted mb-4">
          Farmácia acessível, cuidado garantido, uma iniciativa do governo
          federal.
        </p>

        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate('/products')}
          className="px-4 py-2 shadow"
        >
          Ver Produtos
        </Button>

        <div className="mt-5">
          <p className="text-muted fst-italic">
            Cuidado • Atendimento qualificado • Produtos de qualidade
          </p>
        </div>
      </Container>
    </div>
  );
};
