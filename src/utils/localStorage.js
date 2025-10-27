// Utilidades para manejar el almacenamiento local
// Maneja usuarios registrados, historial de compras y stock de productos

const STORAGE_KEYS = {
  USERS: 'sneakerstore_users',
  PURCHASES: 'sneakerstore_purchases',
  STOCK: 'sneakerstore_stock',
  CART: 'sneakerstore_cart',
  CURRENT_USER: 'sneakerstore_current_user'
};

// ===== MANEJO DE USUARIOS =====

/**
 * Obtiene todos los usuarios registrados
 */
export const getUsers = () => {
  try {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
    return [];
  }
};

/**
 * Guarda un nuevo usuario
 */
export const saveUser = (user) => {
  try {
    const users = getUsers();
    // Verificar si el usuario ya existe
    const existingUser = users.find(u => u.email === user.email);
    if (existingUser) {
      return { success: false, message: 'El usuario ya está registrado' };
    }
    
    users.push({
      ...user,
      id: Date.now(),
      registeredAt: new Date().toISOString()
    });
    
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return { success: true, message: 'Usuario registrado exitosamente' };
  } catch (error) {
    console.error('Error al guardar usuario:', error);
    return { success: false, message: 'Error al registrar usuario' };
  }
};

/**
 * Valida las credenciales de un usuario
 */
export const validateUser = (email, password) => {
  try {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    return user ? { success: true, user } : { success: false };
  } catch (error) {
    console.error('Error al validar usuario:', error);
    return { success: false };
  }
};

/**
 * Guarda el usuario actual en sesión
 */
export const setCurrentUser = (user) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } catch (error) {
    console.error('Error al guardar usuario actual:', error);
  }
};

/**
 * Obtiene el usuario actual en sesión
 */
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error al cargar usuario actual:', error);
    return null;
  }
};

/**
 * Cierra la sesión del usuario actual
 */
export const clearCurrentUser = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};

// ===== MANEJO DE STOCK =====

/**
 * Inicializa el stock con los datos iniciales de productos
 */
export const initializeStock = (initialSneakers) => {
  try {
    const existingStock = localStorage.getItem(STORAGE_KEYS.STOCK);
    if (!existingStock) {
      const stockData = {};
      initialSneakers.forEach(sneaker => {
        stockData[sneaker.id] = sneaker.stock;
      });
      localStorage.setItem(STORAGE_KEYS.STOCK, JSON.stringify(stockData));
    }
  } catch (error) {
    console.error('Error al inicializar stock:', error);
  }
};

/**
 * Obtiene el stock actual de todos los productos
 */
export const getStock = () => {
  try {
    const stock = localStorage.getItem(STORAGE_KEYS.STOCK);
    return stock ? JSON.parse(stock) : {};
  } catch (error) {
    console.error('Error al cargar stock:', error);
    return {};
  }
};

/**
 * Actualiza el stock de un producto
 */
export const updateStock = (productId, quantity) => {
  try {
    const stock = getStock();
    if (stock[productId] !== undefined) {
      stock[productId] = Math.max(0, stock[productId] + quantity);
      localStorage.setItem(STORAGE_KEYS.STOCK, JSON.stringify(stock));
      return { success: true, newStock: stock[productId] };
    }
    return { success: false, message: 'Producto no encontrado' };
  } catch (error) {
    console.error('Error al actualizar stock:', error);
    return { success: false, message: 'Error al actualizar stock' };
  }
};

/**
 * Establece el stock de un producto a un valor específico
 */
export const setStock = (productId, newStock) => {
  try {
    const stock = getStock();
    stock[productId] = Math.max(0, newStock);
    localStorage.setItem(STORAGE_KEYS.STOCK, JSON.stringify(stock));
    return { success: true, newStock: stock[productId] };
  } catch (error) {
    console.error('Error al establecer stock:', error);
    return { success: false, message: 'Error al establecer stock' };
  }
};

/**
 * Reduce el stock basado en los items del carrito
 */
export const reduceStockFromCart = (cartItems) => {
  try {
    const stock = getStock();
    const updates = [];
    
    // Verificar disponibilidad antes de reducir
    for (const item of cartItems) {
      if (stock[item.id] === undefined || stock[item.id] < item.quantity) {
        return { 
          success: false, 
          message: `Stock insuficiente para ${item.name}` 
        };
      }
    }
    
    // Reducir stock
    for (const item of cartItems) {
      stock[item.id] -= item.quantity;
      updates.push({ id: item.id, newStock: stock[item.id] });
    }
    
    localStorage.setItem(STORAGE_KEYS.STOCK, JSON.stringify(stock));
    return { success: true, updates };
  } catch (error) {
    console.error('Error al reducir stock:', error);
    return { success: false, message: 'Error al actualizar stock' };
  }
};

// ===== MANEJO DE COMPRAS =====

/**
 * Obtiene todas las compras realizadas
 */
export const getPurchases = () => {
  try {
    const purchases = localStorage.getItem(STORAGE_KEYS.PURCHASES);
    return purchases ? JSON.parse(purchases) : [];
  } catch (error) {
    console.error('Error al cargar compras:', error);
    return [];
  }
};

/**
 * Guarda una nueva compra
 */
export const savePurchase = (purchaseData) => {
  try {
    const purchases = getPurchases();
    const purchase = {
      ...purchaseData,
      id: Date.now(),
      purchaseDate: new Date().toISOString()
    };
    
    purchases.push(purchase);
    localStorage.setItem(STORAGE_KEYS.PURCHASES, JSON.stringify(purchases));
    return { success: true, purchase };
  } catch (error) {
    console.error('Error al guardar compra:', error);
    return { success: false, message: 'Error al guardar la compra' };
  }
};

/**
 * Obtiene las compras de un usuario específico
 */
export const getUserPurchases = (userEmail) => {
  try {
    const purchases = getPurchases();
    return purchases.filter(p => p.email === userEmail);
  } catch (error) {
    console.error('Error al cargar compras del usuario:', error);
    return [];
  }
};

// ===== MANEJO DE CARRITO =====

/**
 * Guarda el carrito actual
 */
export const saveCart = (cart) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  } catch (error) {
    console.error('Error al guardar carrito:', error);
  }
};

/**
 * Obtiene el carrito guardado
 */
export const getCart = () => {
  try {
    const cart = localStorage.getItem(STORAGE_KEYS.CART);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error al cargar carrito:', error);
    return [];
  }
};

/**
 * Limpia el carrito
 */
export const clearCart = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.CART);
  } catch (error) {
    console.error('Error al limpiar carrito:', error);
  }
};

// ===== UTILIDADES GENERALES =====

/**
 * Limpia todos los datos del local storage (útil para desarrollo/testing)
 */
export const clearAllData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Error al limpiar datos:', error);
  }
};
