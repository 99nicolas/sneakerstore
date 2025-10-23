import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Checkout from './Checkout';

describe('Checkout Component', () => {
  // Datos de prueba con precios en CLP
  const mockCart = [
    {
      id: 1,
      name: 'Air Max Classic',
      brand: 'Nike',
      price: 116990, // Precio en CLP
      quantity: 2,
      image: 'test.jpg'
    }
  ];

  const mockOnCheckoutComplete = jest.fn();
  const mockOnNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders checkout form with all required fields', () => {
    render(
      <Checkout 
        cart={mockCart} 
        onCheckoutComplete={mockOnCheckoutComplete}
        onNavigate={mockOnNavigate}
      />
    );

    expect(screen.getByText(/Finalizar Compra/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ingresa tu nombre/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ingresa tu apellido/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/tu@email.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/123-456-7890/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Calle y número/i)).toBeInTheDocument();
  });

  test('displays order summary with cart items', () => {
    render(
      <Checkout 
        cart={mockCart} 
        onCheckoutComplete={mockOnCheckoutComplete}
        onNavigate={mockOnNavigate}
      />
    );

    expect(screen.getByText(/Resumen del Pedido/i)).toBeInTheDocument();
    expect(screen.getByText('Air Max Classic')).toBeInTheDocument();
    expect(screen.getByText(/Cantidad: 2/i)).toBeInTheDocument();
  });

  test('calculates total correctly', () => {
    render(
      <Checkout 
        cart={mockCart} 
        onCheckoutComplete={mockOnCheckoutComplete}
        onNavigate={mockOnNavigate}
      />
    );

    // Verificar que el total esté formateado en CLP
    expect(screen.getByText(/Pagar \$233\.980/i)).toBeInTheDocument();
  });

  test('shows validation errors when submitting empty form', async () => {
    render(
      <Checkout 
        cart={mockCart} 
        onCheckoutComplete={mockOnCheckoutComplete}
        onNavigate={mockOnNavigate}
      />
    );

    const submitButton = screen.getByText(/Pagar \$/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Por favor ingresa tu nombre/i)).toBeInTheDocument();
    });
  });

  test('shows empty cart message when cart is empty', () => {
    render(
      <Checkout 
        cart={[]} 
        onCheckoutComplete={mockOnCheckoutComplete}
        onNavigate={mockOnNavigate}
      />
    );

    expect(screen.getByText(/No hay productos en el carrito/i)).toBeInTheDocument();
    expect(screen.getByText(/Ir a la tienda/i)).toBeInTheDocument();
  });

  test('navigates back to cart when clicking "Volver al Carrito"', () => {
    render(
      <Checkout 
        cart={mockCart} 
        onCheckoutComplete={mockOnCheckoutComplete}
        onNavigate={mockOnNavigate}
      />
    );

    const backButton = screen.getByText(/Volver al Carrito/i);
    fireEvent.click(backButton);
    
    expect(mockOnNavigate).toHaveBeenCalledWith('cart');
  });

  test('processes checkout with valid form data', async () => {
    jest.useFakeTimers();
    
    render(
      <Checkout 
        cart={mockCart} 
        onCheckoutComplete={mockOnCheckoutComplete}
        onNavigate={mockOnNavigate}
      />
    );

    // Fill form fields using placeholders
    fireEvent.change(screen.getByPlaceholderText(/Ingresa tu nombre/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Ingresa tu apellido/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/tu@email.com/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/123-456-7890/i), { target: { value: '123456789' } });
    fireEvent.change(screen.getByPlaceholderText(/Calle y número/i), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByPlaceholderText(/Ciudad/i), { target: { value: 'New York' } });
    fireEvent.change(screen.getByPlaceholderText(/Estado/i), { target: { value: 'NY' } });
    fireEvent.change(screen.getByPlaceholderText(/12345/i), { target: { value: '10001' } });
    fireEvent.change(screen.getByPlaceholderText(/1234 5678 9012 3456/i), { target: { value: '1234567890123456' } });
    fireEvent.change(screen.getByPlaceholderText(/Nombre como aparece en la tarjeta/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/MM\/AA/i), { target: { value: '12/25' } });
    fireEvent.change(screen.getByPlaceholderText('123'), { target: { value: '123' } });

    const submitButton = screen.getByText(/Pagar \$/i);
    fireEvent.click(submitButton);

    // Fast-forward timers
    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(mockOnCheckoutComplete).toHaveBeenCalled();
    });

    jest.useRealTimers();
  });
});
