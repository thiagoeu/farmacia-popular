// src/pages/ProductDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Spinner,
  Alert,
} from 'react-bootstrap';
import { productService } from '../services/productService';
import type { Product } from '../shared/types/product';
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const productData = await productService.getProductById(parseInt(id));
        setProduct(productData);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao carregar produto');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error || 'Produto não encontrado'}</Alert>
        <Button variant="primary" onClick={() => navigate('/products')}>
          <FaArrowLeft /> Voltar para produtos
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Button
        variant="outline-secondary"
        onClick={() => navigate('/products')}
        className="mb-3"
      >
        <FaArrowLeft /> Voltar para produtos
      </Button>

      <Row>
        <Col md={8} className="mx-auto">
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <Card.Title as="h2">{product.name}</Card.Title>
                <Badge bg="secondary">Lote: {product.batch}</Badge>
              </div>

              {product.description && (
                <Card.Text className="mb-4">{product.description}</Card.Text>
              )}

              <Row className="mb-4">
                <Col md={6}>
                  <div className="mb-3">
                    <strong>Preço:</strong>
                    <h4 className="text-primary">
                      {formatPrice(product.price)}
                    </h4>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <strong>Estoque:</strong>
                    <Badge
                      bg={product.stock > 0 ? 'success' : 'danger'}
                      className="ms-2"
                    >
                      {product.stock > 0
                        ? `${product.stock} unidades`
                        : 'Esgotado'}
                    </Badge>
                  </div>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={6}>
                  <div className="text-muted">
                    <small>Criado em: {formatDate(product.createdAt)}</small>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="text-muted">
                    <small>
                      Atualizado em: {formatDate(product.updatedAt)}
                    </small>
                  </div>
                </Col>
              </Row>

              <div className="d-flex gap-2">
                <Button
                  variant="primary"
                  size="lg"
                  disabled={product.stock === 0}
                >
                  <FaShoppingCart /> Fazer Solicitação
                </Button>

                <Button
                  variant="outline-secondary"
                  size="lg"
                  onClick={() => navigate('/products')}
                >
                  Continuar Comprando
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
