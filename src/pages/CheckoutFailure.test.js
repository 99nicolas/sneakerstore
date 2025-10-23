import { render, screen, fireEvent } from '@testing-library/react';
import CheckoutFailure from './CheckoutFailure';

describe('CheckoutFailure Component', () => {
  const mockErrorData = {
    reason: 'Pago rechazado. Por favor, verifica tu método de pago.'
  };

  const mockOnNavigate = jest.fn();
  const mockOnRetry = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders failure message', () => {
    render(
      <CheckoutFailure 
        errorData={mockErrorData}
        onNavigate={mockOnNavigate}
        onRetry={mockOnRetry}
      />
    );

    expect(screen.getAllByText(/Pago Rechazado/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/No se pudo completar tu compra/i)).toBeInTheDocument();
  });

  test('displays error reason', () => {
    render(
      <CheckoutFailure 
        errorData={mockErrorData}
        onNavigate={mockOnNavigate}
        onRetry={mockOnRetry}
      />
    );

    expect(screen.getByText(mockErrorData.reason)).toBeInTheDocument();
  });

  test('displays default error message when no error data provided', () => {
    render(
      <CheckoutFailure 
        errorData={null}
        onNavigate={mockOnNavigate}
        onRetry={mockOnRetry}
      />
    );

    expect(screen.getByText(/Hubo un problema al procesar tu pago/i)).toBeInTheDocument();
  });

  test('shows helpful suggestions', () => {
    render(
      <CheckoutFailure 
        errorData={mockErrorData}
        onNavigate={mockOnNavigate}
        onRetry={mockOnRetry}
      />
    );

    expect(screen.getByText(/¿Qué puedes hacer\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Verifica que los datos de tu tarjeta sean correctos/i)).toBeInTheDocument();
    expect(screen.getByText(/Asegúrate de tener fondos suficientes/i)).toBeInTheDocument();
  });

  test('calls onRetry when clicking "Intentar Nuevamente"', () => {
    render(
      <CheckoutFailure 
        errorData={mockErrorData}
        onNavigate={mockOnNavigate}
        onRetry={mockOnRetry}
      />
    );

    const retryButton = screen.getByText(/Intentar Nuevamente/i);
    fireEvent.click(retryButton);
    
    expect(mockOnRetry).toHaveBeenCalled();
  });

  test('navigates to cart when clicking "Volver al Carrito"', () => {
    render(
      <CheckoutFailure 
        errorData={mockErrorData}
        onNavigate={mockOnNavigate}
        onRetry={mockOnRetry}
      />
    );

    const cartButton = screen.getByText(/Volver al Carrito/i);
    fireEvent.click(cartButton);
    
    expect(mockOnNavigate).toHaveBeenCalledWith('cart');
  });

  test('navigates to home when clicking "Continuar Comprando"', () => {
    render(
      <CheckoutFailure 
        errorData={mockErrorData}
        onNavigate={mockOnNavigate}
        onRetry={mockOnRetry}
      />
    );

    const homeButton = screen.getByText(/Continuar Comprando/i);
    fireEvent.click(homeButton);
    
    expect(mockOnNavigate).toHaveBeenCalledWith('home');
  });

  test('displays support contact information', () => {
    render(
      <CheckoutFailure 
        errorData={mockErrorData}
        onNavigate={mockOnNavigate}
        onRetry={mockOnRetry}
      />
    );

    expect(screen.getByText(/soporte@sneakerstore.com/i)).toBeInTheDocument();
    expect(screen.getByText(/1-800-SNEAKER/i)).toBeInTheDocument();
  });
});
