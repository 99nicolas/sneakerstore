import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const blogArticles = [
  {
    id: 1,
    title: "Las Jordan 1 más caras vendidas en StockX",
    date: "15 de Octubre, 2025",
    image: "https://images-wp.stockx.com/news/wp-content/uploads/2020/02/air-jordan-1-dunk-sole-pe-1986-lateral-e1646837291193.jpeg",
    excerpt: "Descubre las Air Jordan 1 que han alcanzado precios astronómicos en el mercado de reventa. Desde las Chicago hasta las Fragment, conoce las colaboraciones más codiciadas.",
    author: "María González"
  },
  {
    id: 2,
    title: "Cómo autenticar tus Yeezy: Guía definitiva",
    date: "10 de Octubre, 2025",
    image: "https://ichef.bbci.co.uk/news/480/cpsprodpb/DAFA/production/_98885065_fakeyeezy's.jpg.webp",
    excerpt: "En el mundo del reselling, saber identificar réplicas es crucial. Te enseñamos todos los detalles que debes revisar para verificar la autenticidad de tus Yeezy.",
    author: "Carlos Ruiz"
  },
  {
    id: 3,
    title: "La historia del Nike Dunk: De cancha a ícono urbano",
    date: "5 de Octubre, 2025",
    image: "https://blog.klekt.com/wp-content/uploads/2021/04/1985-Nike-Dunk-High-min.jpg",
    excerpt: "Cómo un zapato de basketball de los 80s se convirtió en el sneaker más buscado por coleccionistas y en la joya de las colaboraciones con Travis Scott y Off-White.",
    author: "Ana Martínez"
  },
  {
    id: 4,
    title: "Drops más esperados: Lo que viene en sneakers limitados",
    date: "1 de Octubre, 2025",
    image: "https://justfreshkicks.com/wp-content/uploads/2025/01/morehorizontal-scaled.jpg",
    excerpt: "Calendario exclusivo de los próximos lanzamientos: New Balance 550, Nike SB collaborations y las Yeezy que romperán el mercado. Prepara tu billetera.",
    author: "Luis Fernández"
  },
  {
    id: 5,
    title: "Sneaker Reselling: ¿Inversión o burbuja?",
    date: "25 de Septiembre, 2025",
    image: "https://i.ytimg.com/vi/dJryzKeGwtU/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAJm97grrKPkrjp7kUP-OFcI9Esgg",
    excerpt: "Análisis del mercado secundario de sneakers. Cuánto puedes ganar con el reselling, qué modelos retienen valor y los secretos de los grandes revendedores de StockX y GOAT.",
    author: "Patricia López"
  },
  {
    id: 6,
    title: "Sneaker Bots: La batalla por los drops limitados",
    date: "20 de Septiembre, 2025",
    image: "https://i.insider.com/601052eb1d2df20018b70e81?width=700",
    excerpt: "Todo sobre el polémico mundo de los bots de compra. Cómo funcionan, por qué las marcas luchan contra ellos y estrategias reales para ganar drops sin romper las reglas.",
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
              <div style={{ padding: '15px 15px 0 15px' }}>
                <Card.Img 
                  variant="top" 
                  src={article.image}
                  alt={article.title}
                  style={{ height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                />
              </div>
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
