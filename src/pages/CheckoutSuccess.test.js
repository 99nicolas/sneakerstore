import { render, screen, fireEvent } from '@testing-library/react';
import CheckoutSuccess from './CheckoutSuccess';

describe('CheckoutSuccess Component', () => {
  // Datos de prueba con precios en CLP
  const mockOrderData = {
    orderId: 123456,
    total: 233991, // Precio en CLP
    date: '01/01/2024',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001'
  };

  const mockOnNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders success message and order details', () => {
    render(
      <CheckoutSuccess 
        orderData={mockOrderData}
        onNavigate={mockOnNavigate}
      />
    );

    expect(screen.getByText(/¡Compra Exitosa!/i)).toBeInTheDocument();
    expect(screen.getByText(/Tu pedido ha sido procesado correctamente/i)).toBeInTheDocument();
    expect(screen.getByText(`#${mockOrderData.orderId}`)).toBeInTheDocument();
    expect(screen.getByText(mockOrderData.date)).toBeInTheDocument();
    // Verificar formato CLP
    expect(screen.getByText(/\$233\.991/i)).toBeInTheDocument();
  });

  test('displays shipping information', () => {
    render(
      <CheckoutSuccess 
        orderData={mockOrderData}
        onNavigate={mockOnNavigate}
      />
    );

    expect(screen.getByText(`${mockOrderData.firstName} ${mockOrderData.lastName}`)).toBeInTheDocument();
    expect(screen.getByText(mockOrderData.address)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockOrderData.city))).toBeInTheDocument();
  });

  test('displays confirmation email message', () => {
    render(
      <CheckoutSuccess 
        orderData={mockOrderData}
        onNavigate={mockOnNavigate}
      />
    );

    expect(screen.getByText(new RegExp(mockOrderData.email))).toBeInTheDocument();
  });

  test('navigates to home when clicking "Continuar Comprando"', () => {
    render(
      <CheckoutSuccess 
        orderData={mockOrderData}
        onNavigate={mockOnNavigate}
      />
    );

    const continueButton = screen.getByText(/Continuar Comprando/i);
    fireEvent.click(continueButton);
    
    expect(mockOnNavigate).toHaveBeenCalledWith('home');
  });

  test('shows warning when no order data is provided', () => {
    render(
      <CheckoutSuccess 
        orderData={null}
        onNavigate={mockOnNavigate}
      />
    );

    expect(screen.getByText(/No hay información de pedido/i)).toBeInTheDocument();
    expect(screen.getByText(/Volver al inicio/i)).toBeInTheDocument();
  });

  test('has print receipt button', () => {
    render(
      <CheckoutSuccess 
        orderData={mockOrderData}
        onNavigate={mockOnNavigate}
      />
    );

    expect(screen.getByText(/Imprimir Recibo/i)).toBeInTheDocument();
  });
});
