import Container from 'react-bootstrap/Container';

export const CustomFooter = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <Container className="text-center">
        <p className="mb-0">
          © {new Date().getFullYear()} Farmacia Popular. Todos os direitos
          reservados.
        </p>
      </Container>
    </footer>
  );
};
