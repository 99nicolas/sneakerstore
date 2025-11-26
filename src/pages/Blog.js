import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const blogArticles = [
  {
    id: 1,
    title: "Las mejores zapatillas para correr en 2024",
    date: "15 de Octubre, 2025",
    image: "https://via.placeholder.com/400x250/3498db/FFFFFF?text=Running+Shoes",
    excerpt: "Descubre cuáles son las zapatillas más recomendadas por expertos para running este año. Tecnología, comodidad y rendimiento en una sola review.",
    author: "María González"
  },
  {
    id: 2,
    title: "Cómo cuidar tus zapatillas de ante",
    date: "10 de Octubre, 2025",
    image: "https://via.placeholder.com/400x250/e74c3c/FFFFFF?text=Suede+Care",
    excerpt: "El ante es un material delicado que requiere cuidados especiales. Te enseñamos los mejores tips para mantener tus sneakers como nuevas.",
    author: "Carlos Ruiz"
  },
  {
    id: 3,
    title: "Historia de las Air Jordan",
    date: "5 de Octubre, 2025",
    image: "https://via.placeholder.com/400x250/000000/FFFFFF?text=Air+Jordan",
    excerpt: "Un recorrido por la historia de una de las líneas de zapatillas más icónicas del mundo. Desde 1985 hasta hoy.",
    author: "Ana Martínez"
  },
  {
    id: 4,
    title: "Tendencias en sneakers para esta temporada",
    date: "1 de Octubre, 2025",
    image: "https://via.placeholder.com/400x250/2ecc71/FFFFFF?text=Sneaker+Trends",
    excerpt: "Conoce las últimas tendencias en el mundo de las zapatillas. Colores, estilos y marcas que están dominando el mercado.",
    author: "Luis Fernández"
  },
  {
    id: 5,
    title: "Zapatillas sostenibles: el futuro está aquí",
    date: "25 de Septiembre, 2025",
    image: "https://via.placeholder.com/400x250/27ae60/FFFFFF?text=Eco+Sneakers",
    excerpt: "Las marcas están apostando por la sostenibilidad. Descubre las mejores opciones eco-friendly del mercado.",
    author: "Patricia López"
  },
  {
    id: 6,
    title: "Guía completa: ¿Qué talla elegir?",
    date: "20 de Septiembre, 2025",
    image: "https://via.placeholder.com/400x250/f39c12/FFFFFF?text=Size+Guide",
    excerpt: "No más errores al comprar online. Aprende a medir tu pie correctamente y encuentra tu talla perfecta en cualquier marca.",
    author: "Roberto Sánchez"
  }
];

function Blog() {
  return (
    <Container>
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">📝 Blog de Sneaker Store</h1>
        <p className="lead text-muted">
          Artículos, guías y noticias sobre el mundo de las zapatillas
        </p>
      </div>
      
      <Row xs={1} md={2} lg={3} className="g-4">
        {blogArticles.map((article) => (
          <Col key={article.id}>
            <Card className="h-100 shadow-sm hover-shadow" style={{ cursor: 'pointer' }}>
              <Card.Img 
                variant="top" 
                src={article.image}
                alt={article.title}
                style={{ height: '200px', objectFit: 'contain' }}
              />
              <Card.Body className="d-flex flex-column">
                <div className="mb-2">
                  <small className="text-muted">
                    📅 {article.date} | ✍️ {article.author}
                  </small>
                </div>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text className="flex-grow-1 text-muted">
                  {article.excerpt}
                </Card.Text>
                <button 
                  className="btn btn-outline-primary mt-2" 
                  onClick={(e) => e.preventDefault()}
                >
                  Leer más →
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Blog;
