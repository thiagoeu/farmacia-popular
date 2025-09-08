// src/pages/ProductList.tsx
import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Spinner,
  Alert,
  Badge,
  Pagination,
} from 'react-bootstrap';
import { useProductStore } from '../store/productStore';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaEye } from 'react-icons/fa';

export const ProductList: React.FC = () => {
  const {
    products,
    loading,
    error,
    filters,
    pagination,
    fetchProducts,
    setFilters,
    nextPage,
    prevPage,
  } = useProductStore();

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts(filters);
  }, [filters, fetchProducts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ search: searchTerm, page: 1 });
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setFilters({ search: undefined, page: 1 });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
        <p className="mt-2">Carregando produtos...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      {/* Header e Filtros */}
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Nossos Produtos</h1>

          {/* Barra de pesquisa */}
          <Form onSubmit={handleSearch} className="mb-3">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Buscar produtos por nome ou lote..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="primary" type="submit">
                <FaSearch /> Buscar
              </Button>
              {filters.search && (
                <Button variant="outline-secondary" onClick={handleClearSearch}>
                  Limpar
                </Button>
              )}
            </InputGroup>
          </Form>
        </Col>
      </Row>

      {/* Mensagem de erro */}
      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      {/* Info da paginação */}
      {products.length > 0 && (
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-muted">
            Mostrando {products.length} de {pagination.totalItems} produtos
          </span>
          <span className="text-muted">
            Página {pagination.currentPage} de {pagination.totalPages}
          </span>
        </div>
      )}

      {/* Lista de produtos */}
      <Row>
        {products.length === 0 ? (
          <Col className="text-center">
            <Alert variant="warning">
              {filters.search
                ? 'Nenhum produto encontrado.'
                : 'Nenhum produto disponível.'}
            </Alert>
          </Col>
        ) : (
          products.map((product) => (
            <Col key={product.id} xs={12} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.name}</Card.Title>

                  <div className="mb-2">
                    <Badge bg="secondary" className="me-2">
                      Lote: {product.batch}
                    </Badge>
                    <Badge bg={product.stock > 0 ? 'success' : 'danger'}>
                      {product.stock > 0
                        ? `Estoque: ${product.stock}`
                        : 'Esgotado'}
                    </Badge>
                  </div>

                  {product.description && (
                    <Card.Text className="text-muted flex-grow-1">
                      {product.description}
                    </Card.Text>
                  )}

                  <div className="mb-2">
                    <small className="text-muted">
                      Atualizado em: {formatDate(product.updatedAt)}
                    </small>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="text-primary mb-0">
                      {formatPrice(product.price)}
                    </h5>

                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => navigate(`/products/${product.id}`)}
                      >
                        <FaEye /> Detalhes
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        disabled={product.stock === 0}
                      >
                        <FaShoppingCart /> Solicitar
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* Paginação */}
      {pagination.totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.Prev
              onClick={prevPage}
              disabled={pagination.currentPage === 1}
            />

            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
              (page) => (
                <Pagination.Item
                  key={page}
                  active={page === pagination.currentPage}
                  onClick={() => setFilters({ page })}
                >
                  {page}
                </Pagination.Item>
              ),
            )}

            <Pagination.Next
              onClick={nextPage}
              disabled={pagination.currentPage === pagination.totalPages}
            />
          </Pagination>
        </div>
      )}
    </Container>
  );
};
