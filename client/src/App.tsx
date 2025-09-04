import { CustomFooter } from './components/CustomFooter';
import { CustomNavbar } from './components/CustomNavBar';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar sempre em cima */}
      <CustomNavbar />

      {/* Conteúdo principal cresce para empurrar o footer */}
      <main className="flex-grow-1 d-flex justify-content-center align-items-center"></main>

      {/* Footer sempre no final */}
      <CustomFooter />
    </div>
  );
}

export default App;
