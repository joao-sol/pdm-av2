import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

type QueryInputProps ={
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  testID?: string;
}

export default function QueryInput({
  value,
  onChangeText,
  placeholder = 'Buscar...',
  testID = 'search-input',
}: QueryInputProps) {
  return (
    <TextInput
      style={styles.searchInput}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      testID={testID}
    />
  );
}

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
});
