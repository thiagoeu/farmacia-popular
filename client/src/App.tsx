import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import { CustomFooter } from "./components/CustomFooter";
import { CustomNavbar } from "./components/CustomNavBar";
import { AppRoutes } from "./routes/AppRoutes";
import { Spinner } from "react-bootstrap";

function App() {
  const { loadUser, loading } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (loading) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
        <span className="ms-2">Carregando...</span>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <CustomNavbar />
      <main className="flex-grow-1">
        <AppRoutes />
      </main>
      <CustomFooter />
    </div>
  );
}

export default App;
