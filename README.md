# Sneaker Store

Una aplicación web moderna de comercio electrónico para la venta de zapatillas deportivas, construida con React y Bootstrap.

## Características

### Funcionalidades Principales
- 🛍️ **Catálogo de Productos**: Visualización de zapatillas con imágenes, descripciones y precios
- 🔍 **Búsqueda y Filtros**: Sistema de búsqueda en tiempo real y filtrado por marca
- 🛒 **Carrito de Compras**: Gestión completa del carrito con cantidades ajustables
- 💳 **Proceso de Checkout**: Formulario completo para datos personales, dirección de entrega y pago
- ✅ **Confirmación de Compra**: Páginas de éxito y error para el proceso de pago
- 📱 **Diseño Responsivo**: Interfaz optimizada para móviles, tabletas y escritorios
- 👤 **Sistema de Autenticación**: Login para usuarios y administradores
- 🎨 **Detalles de Producto**: Página dedicada con información completa y selección de tallas

### Características Técnicas
- React 19.2.0
- Bootstrap 5.3.8 y React-Bootstrap 2.10.10
- Navegación basada en estado (SPA)
- Pruebas unitarias con Jest y React Testing Library
- Validación de formularios
- Diseño mobile-first

## Instalación

Este proyecto fue creado con [Create React App](https://github.com/facebook/create-react-app).

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn

### Pasos de Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/99nicolas/sneakerstore.git
cd sneakerstore
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm start
```

La aplicación se abrirá en [http://localhost:3000](http://localhost:3000).

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### `npm start`

Ejecuta la aplicación en modo de desarrollo.\
Abre [http://localhost:3000](http://localhost:3000) para verla en tu navegador.

La página se recargará cuando hagas cambios.\
También verás cualquier error de lint en la consola.

### `npm test`

Lanza el corredor de pruebas en modo interactivo.\
Ver más sobre [ejecutar pruebas](https://facebook.github.io/create-react-app/docs/running-tests).

### `npm run build`

Construye la aplicación para producción en la carpeta `build`.\
Empaqueta correctamente React en modo de producción y optimiza la construcción para el mejor rendimiento.

La construcción está minificada y los nombres de archivo incluyen los hashes.\
¡Tu aplicación está lista para ser desplegada!

Ver más sobre [despliegue](https://cra.link/deployment).

## Estructura del Proyecto

```
sneakerstore/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Footer.js
│   │   ├── Navigation.js
│   │   └── SneakerCard.js
│   ├── data/
│   │   └── sneakers.js
│   ├── pages/
│   │   ├── About.js
│   │   ├── Admin.js
│   │   ├── AdminLogin.js
│   │   ├── Blog.js
│   │   ├── Cart.js
│   │   ├── Checkout.js
│   │   ├── CheckoutSuccess.js
│   │   ├── CheckoutFailure.js
│   │   ├── Home.js
│   │   ├── Login.js
│   │   └── ProductDetail.js
│   ├── App.js
│   ├── App.test.js
│   └── index.js
├── package.json
└── README.md
```

## Pruebas

El proyecto incluye pruebas unitarias para los componentes principales:

- **App.test.js**: Prueba de renderizado principal
- **Home.test.js**: Pruebas de búsqueda y filtrado de productos
- **Checkout.test.js**: Pruebas del formulario de checkout
- **CheckoutSuccess.test.js**: Pruebas de la página de éxito
- **CheckoutFailure.test.js**: Pruebas de la página de error

Ejecutar todas las pruebas:
```bash
npm test
```

Ejecutar pruebas con cobertura:
```bash
npm test -- --coverage
```

## Características de Diseño Responsivo

### Mobile (< 576px)
- Navegación colapsable
- Carrito en formato de tarjetas
- Formularios de una columna
- Imágenes optimizadas

### Tablet (576px - 991px)
- Grid de 2 columnas para productos
- Navegación expandible
- Formularios de dos columnas

### Desktop (≥ 992px)
- Grid de 3 columnas para productos
- Tabla completa para el carrito
- Formularios multi-columna
- Navegación completa siempre visible

## Funcionalidades Futuras

- Integración con pasarela de pago real
- Base de datos persistente
- Sistema de reviews y calificaciones
- Wishlist / Lista de deseos
- Historial de pedidos
- Notificaciones por email
- Integración con servicios de envío

## Tecnologías Utilizadas

- **React**: Framework principal
- **Bootstrap**: Framework CSS
- **React-Bootstrap**: Componentes de Bootstrap para React
- **Jest**: Framework de pruebas
- **React Testing Library**: Utilidades de prueba para React

## Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## Contacto

Para preguntas o sugerencias, por favor abre un issue en el repositorio.

---

Desarrollado con ❤️ usando React y Bootstrap
