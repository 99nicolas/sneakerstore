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
            <Card 
              className="h-100 border-0 shadow-lg overflow-hidden" 
              style={{ 
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                borderRadius: '16px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
              }}
            >
              <div 
                style={{ 
                  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                  padding: '25px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div 
                  style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                    pointerEvents: 'none'
                  }}
                />
                <Card.Img 
                  variant="top" 
                  src={article.image}
                  alt={article.title}
                  style={{ 
                    height: '240px', 
                    objectFit: 'cover', 
                    borderRadius: '12px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    position: 'relative',
                    zIndex: 1
                  }}
                />
              </div>
              <Card.Body className="d-flex flex-column p-4" style={{ background: '#fff' }}>
                <div className="mb-3">
                  <small 
                    style={{ 
                      color: '#6c757d',
                      fontSize: '0.85rem',
                      fontWeight: '500',
                      letterSpacing: '0.5px'
                    }}
                  >
                    📅 {article.date} | ✍️ {article.author}
                  </small>
                </div>
                <Card.Title 
                  style={{ 
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    marginBottom: '12px',
                    lineHeight: '1.4'
                  }}
                >
                  {article.title}
                </Card.Title>
                <Card.Text 
                  className="flex-grow-1" 
                  style={{ 
                    color: '#6c757d',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    marginBottom: '20px'
                  }}
                >
                  {article.excerpt}
                </Card.Text>
                <button 
                  className="btn btn-dark w-100" 
                  style={{
                    padding: '12px 24px',
                    fontWeight: '600',
                    fontSize: '0.95rem',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
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
