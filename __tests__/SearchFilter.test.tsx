import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import SearchFilter, { Item } from '../src/components/SearchFilter';

describe('Componente SearchFilter', () => {
  const mockItems: Item[] = [
    { id: '1', name: 'Maçã', category: 'Fruta' },
    { id: '2', name: 'Banana', category: 'Fruta' },
    { id: '3', name: 'Cenoura', category: 'Vegetal' },
    { id: '4', name: 'Brócolis', category: 'Vegetal' },
    { id: '5', name: 'Frango', category: 'Carne' },
  ];

  it('renderiza todos os itens quando nenhum filtro é aplicado', () => {
    render(<SearchFilter items={mockItems} />);
    
    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
    expect(screen.getByTestId('item-3')).toBeTruthy();
    expect(screen.getByTestId('item-4')).toBeTruthy();
    expect(screen.getByTestId('item-5')).toBeTruthy();
    
    const resultsCount = screen.getByTestId('results-count');
    expect(resultsCount).toHaveTextContent('5 resultados encontrados');
  });

  it('filtra itens por consulta de busca (insensível a maiúsculas)', () => {
    render(<SearchFilter items={mockItems} />);
    
    const searchInput = screen.getByTestId('search-input');
    fireEvent.changeText(searchInput, 'maçã');
    
    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.queryByTestId('item-2')).toBeNull();
    expect(screen.queryByTestId('item-3')).toBeNull();
    
    const resultsCount = screen.getByTestId('results-count');
    expect(resultsCount).toHaveTextContent('1 resultado encontrado');
  });

  it('filtra itens por consulta de busca parcial', () => {
    render(<SearchFilter items={mockItems} />);
    
    const searchInput = screen.getByTestId('search-input');
    fireEvent.changeText(searchInput, 'an');
    
    // Deve corresponder a "Banana" e "Frango"
    expect(screen.getByTestId('item-2')).toBeTruthy();
    expect(screen.getByTestId('item-5')).toBeTruthy();
    expect(screen.queryByTestId('item-1')).toBeNull();
    
    const resultsCount = screen.getByTestId('results-count');
    expect(resultsCount).toHaveTextContent('2 resultados encontrados');
  });

  it('filtra itens por categoria', () => {
    render(<SearchFilter items={mockItems} />);
    
    const frutaCategory = screen.getByTestId('category-Fruta');
    fireEvent.press(frutaCategory);
    
    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
    expect(screen.queryByTestId('item-3')).toBeNull();
    expect(screen.queryByTestId('item-4')).toBeNull();
    expect(screen.queryByTestId('item-5')).toBeNull();
    
    const resultsCount = screen.getByTestId('results-count');
    expect(resultsCount).toHaveTextContent('2 resultados encontrados');
  });

  it('combina consulta de busca e filtro de categoria', () => {
    render(<SearchFilter items={mockItems} />);
    
    const searchInput = screen.getByTestId('search-input');
    const vegetalCategory = screen.getByTestId('category-Vegetal');
    
    fireEvent.changeText(searchInput, 'o');
    fireEvent.press(vegetalCategory);
    
    // Deve mostrar Cenoura e Brócolis (ambos contêm 'o' e são Vegetal)
    expect(screen.getByTestId('item-3')).toBeTruthy(); // Cenoura
    expect(screen.getByTestId('item-4')).toBeTruthy(); // Brócolis
    expect(screen.queryByTestId('item-1')).toBeNull();
    expect(screen.queryByTestId('item-5')).toBeNull(); // Frango contém 'o' mas é Carne
    
    const resultsCount = screen.getByTestId('results-count');
    expect(resultsCount).toHaveTextContent('2 resultados encontrados');
  });

  it('mostra mensagem de nenhum resultado quando nenhum item corresponde', () => {
    render(<SearchFilter items={mockItems} />);
    
    const searchInput = screen.getByTestId('search-input');
    fireEvent.changeText(searchInput, 'xyz');
    
    const noResults = screen.getByTestId('no-results');
    expect(noResults).toHaveTextContent('Nenhum item corresponde aos critérios de busca');
    
    const resultsCount = screen.getByTestId('results-count');
    expect(resultsCount).toHaveTextContent('0 resultados encontrados');
  });

  it('limpa todos os filtros quando o botão limpar é pressionado', () => {
    render(<SearchFilter items={mockItems} />);
    
    const searchInput = screen.getByTestId('search-input');
    const frutaCategory = screen.getByTestId('category-Fruta');
    
    // Aplicar filtros
    fireEvent.changeText(searchInput, 'maçã');
    fireEvent.press(frutaCategory);
    
    // Verificar se os filtros foram aplicados
    expect(screen.getByTestId('results-count')).toHaveTextContent('1 resultado encontrado');
    
    // Limpar filtros
    const clearButton = screen.getByTestId('clear-filters');
    fireEvent.press(clearButton);
    
    // Todos os itens devem estar visíveis novamente
    expect(screen.getByTestId('results-count')).toHaveTextContent('5 resultados encontrados');
    expect(searchInput.props.value).toBe('');
  });

  it('mostra o botão limpar apenas quando filtros são aplicados', () => {
    render(<SearchFilter items={mockItems} />);

    // Nenhum botão limpar inicialmente
    expect(screen.queryByTestId('clear-filters')).toBeNull();

    // Aplicar filtro de busca
    const searchInput = screen.getByTestId('search-input');
    fireEvent.changeText(searchInput, 'a');

    // O botão limpar deve aparecer
    expect(screen.getByTestId('clear-filters')).toBeTruthy();
  });

  it('chama o callback onItemSelect quando um item é pressionado', () => {
    const mockOnItemSelect = jest.fn();
    render(<SearchFilter items={mockItems} onItemSelect={mockOnItemSelect} />);
    
    const item = screen.getByTestId('item-1');
    fireEvent.press(item);
    
    expect(mockOnItemSelect).toHaveBeenCalledTimes(1);
    expect(mockOnItemSelect).toHaveBeenCalledWith(mockItems[0]);
  });

  it('renderiza botões de categoria para todas as categorias únicas', () => {
    render(<SearchFilter items={mockItems} />);
    
    expect(screen.getByTestId('category-all')).toBeTruthy();
    expect(screen.getByTestId('category-Fruta')).toBeTruthy();
    expect(screen.getByTestId('category-Vegetal')).toBeTruthy();
    expect(screen.getByTestId('category-Carne')).toBeTruthy();
  });

  it('usa texto de placeholder personalizado', () => {
    render(<SearchFilter items={mockItems} placeholder="Encontrar alimentos..." />);
    
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput.props.placeholder).toBe('Encontrar alimentos...');
  });

  it('alterna entre categorias corretamente', () => {
    render(<SearchFilter items={mockItems} />);
    
    // Selecionar categoria Fruta
    fireEvent.press(screen.getByTestId('category-Fruta'));
    expect(screen.getByTestId('results-count')).toHaveTextContent('2 resultados encontrados');
    
    // Mudar para categoria Vegetal
    fireEvent.press(screen.getByTestId('category-Vegetal'));
    expect(screen.getByTestId('results-count')).toHaveTextContent('2 resultados encontrados');
    
    // Mudar para categoria Carne
    fireEvent.press(screen.getByTestId('category-Carne'));
    expect(screen.getByTestId('results-count')).toHaveTextContent('1 resultado encontrado');
    
    // Voltar para Todos
    fireEvent.press(screen.getByTestId('category-all'));
    expect(screen.getByTestId('results-count')).toHaveTextContent('5 resultados encontrados');
  });
});
