import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import SearchFilter, { Item } from './src/components/SearchFilter';

const sampleItems: Item[] = [
  { id: '1', name: 'Maçã', category: 'Fruta' },
  { id: '2', name: 'Banana', category: 'Fruta' },
  { id: '3', name: 'Laranja', category: 'Fruta' },
  { id: '4', name: 'Cenoura', category: 'Vegetal' },
  { id: '5', name: 'Brócolis', category: 'Vegetal' },
  { id: '6', name: 'Espinafre', category: 'Vegetal' },
  { id: '7', name: 'Frango', category: 'Carne' },
  { id: '8', name: 'Carne Bovina', category: 'Carne' },
];

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.headerContainer}>
        <Text style={styles.header}>Filtro de Busca</Text>
      </SafeAreaView>
      
      <View style={styles.content}>
        <SearchFilter
          items={sampleItems}
          placeholder="Buscar alimentos..."
          onItemSelect={(item) => console.log('Selecionado:', item.name)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#007AFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#007AFF',
    color: '#fff',
  },
  content: {
    flex: 1,
  },
});
