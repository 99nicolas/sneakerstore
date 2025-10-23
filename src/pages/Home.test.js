import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';

describe('Home Component', () => {
  const mockOnAddToCart = jest.fn();
  const mockOnViewDetails = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders home page with title and products', () => {
    render(
      <Home 
        onAddToCart={mockOnAddToCart}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.getByText(/Bienvenido a Sneaker Store/i)).toBeInTheDocument();
    expect(screen.getByText(/Encuentra las mejores zapatillas para tu estilo/i)).toBeInTheDocument();
    // Check for at least one product
    expect(screen.getByText(/Air Max Classic/i)).toBeInTheDocument();
  });

  test('renders search input', () => {
    render(
      <Home 
        onAddToCart={mockOnAddToCart}
        onViewDetails={mockOnViewDetails}
      />
    );

    const searchInput = screen.getByPlaceholderText(/Buscar zapatillas por nombre, marca o descripción.../i);
    expect(searchInput).toBeInTheDocument();
  });

  test('renders brand filter dropdown', () => {
    render(
      <Home 
        onAddToCart={mockOnAddToCart}
        onViewDetails={mockOnViewDetails}
      />
    );

    const filterSelect = screen.getByRole('combobox', { name: /Filtrar por marca/i });
    expect(filterSelect).toBeInTheDocument();
  });

  test('filters products by search term', () => {
    render(
      <Home 
        onAddToCart={mockOnAddToCart}
        onViewDetails={mockOnViewDetails}
      />
    );

    const searchInput = screen.getByPlaceholderText(/Buscar zapatillas por nombre, marca o descripción.../i);
    
    // Search for Nike
    fireEvent.change(searchInput, { target: { value: 'Nike' } });
    
    // Should show Nike products
    expect(screen.getByText(/Air Max Classic/i)).toBeInTheDocument();
    
    // Should not show other brands
    expect(screen.queryByText(/Ultra Boost/i)).not.toBeInTheDocument();
  });

  test('filters products by brand', () => {
    render(
      <Home 
        onAddToCart={mockOnAddToCart}
        onViewDetails={mockOnViewDetails}
      />
    );

    const filterSelect = screen.getByRole('combobox', { name: /Filtrar por marca/i });
    
    // Filter by Nike
    fireEvent.change(filterSelect, { target: { value: 'Nike' } });
    
    // Should show Nike products
    expect(screen.getByText(/Air Max Classic/i)).toBeInTheDocument();
    
    // Should not show other brands
    expect(screen.queryByText(/Ultra Boost/i)).not.toBeInTheDocument();
  });

  test('shows no results message when search returns no products', () => {
    render(
      <Home 
        onAddToCart={mockOnAddToCart}
        onViewDetails={mockOnViewDetails}
      />
    );

    const searchInput = screen.getByPlaceholderText(/Buscar zapatillas por nombre, marca o descripción.../i);
    
    // Search for non-existent product
    fireEvent.change(searchInput, { target: { value: 'NonExistentProduct' } });
    
    expect(screen.getByText(/No se encontraron productos/i)).toBeInTheDocument();
    expect(screen.getByText(/Intenta con otros términos de búsqueda/i)).toBeInTheDocument();
  });

  test('resets to all products when selecting "Todas las marcas"', () => {
    render(
      <Home 
        onAddToCart={mockOnAddToCart}
        onViewDetails={mockOnViewDetails}
      />
    );

    const filterSelect = screen.getByRole('combobox', { name: /Filtrar por marca/i });
    
    // Filter by Nike
    fireEvent.change(filterSelect, { target: { value: 'Nike' } });
    expect(screen.queryByText(/Ultra Boost/i)).not.toBeInTheDocument();
    
    // Reset to all brands
    fireEvent.change(filterSelect, { target: { value: 'Todas' } });
    expect(screen.getByText(/Ultra Boost/i)).toBeInTheDocument();
  });
});
