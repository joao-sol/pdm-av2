import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import QueryInput from '../src/components/QueryInput';

describe('Componente QueryInput', () => {
  it('renderiza o campo de entrada corretamente', () => {
    render(<QueryInput value="" onChangeText={() => {}} />);
    
    const input = screen.getByTestId('search-input');
    expect(input).toBeTruthy();
  });

  it('exibe o valor fornecido', () => {
    render(<QueryInput value="teste" onChangeText={() => {}} />);
    
    const input = screen.getByTestId('search-input');
    expect(input.props.value).toBe('teste');
  });

  it('chama onChangeText quando o texto é alterado', () => {
    const mockOnChangeText = jest.fn();
    render(<QueryInput value="" onChangeText={mockOnChangeText} />);
    
    const input = screen.getByTestId('search-input');
    fireEvent.changeText(input, 'novo texto');
    
    expect(mockOnChangeText).toHaveBeenCalledTimes(1);
    expect(mockOnChangeText).toHaveBeenCalledWith('novo texto');
  });

  it('usa placeholder padrão quando não fornecido', () => {
    render(<QueryInput value="" onChangeText={() => {}} />);
    
    const input = screen.getByTestId('search-input');
    expect(input.props.placeholder).toBe('Buscar...');
  });

  it('usa placeholder personalizado quando fornecido', () => {
    render(<QueryInput value="" onChangeText={() => {}} placeholder="Pesquisar itens..." />);
    
    const input = screen.getByTestId('search-input');
    expect(input.props.placeholder).toBe('Pesquisar itens...');
  });

  it('usa testID padrão quando não fornecido', () => {
    render(<QueryInput value="" onChangeText={() => {}} />);
    
    const input = screen.getByTestId('search-input');
    expect(input).toBeTruthy();
  });

  it('usa testID personalizado quando fornecido', () => {
    render(<QueryInput value="" onChangeText={() => {}} testID="custom-input" />);
    
    const input = screen.getByTestId('custom-input');
    expect(input).toBeTruthy();
  });

  it('atualiza o valor quando props mudam', () => {
    const { rerender } = render(<QueryInput value="inicial" onChangeText={() => {}} />);
    
    let input = screen.getByTestId('search-input');
    expect(input.props.value).toBe('inicial');
    
    rerender(<QueryInput value="atualizado" onChangeText={() => {}} />);
    
    input = screen.getByTestId('search-input');
    expect(input.props.value).toBe('atualizado');
  });
});
