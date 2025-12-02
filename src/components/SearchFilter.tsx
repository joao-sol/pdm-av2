import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import QueryInput from './QueryInput';

export type Item = {
  id: string;
  name: string;
  category: string;
}

type SearchFilterProps = {
  items: Item[];
  placeholder?: string;
  onItemSelect?: (item: Item) => void;
}

export default function SearchFilter({
  items,
  placeholder = 'Buscar...',
  onItemSelect,
}: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(items.map((item) => item.category))];
    return uniqueCategories.sort();
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === null || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, selectedCategory]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
  };

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => onItemSelect?.(item)}
      testID={`item-${item.id}`}
    >
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemCategory}>{item.category}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Busca & Filtro</Text>
      <QueryInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={placeholder}
      />
      <View style={styles.categoriesContainer}>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === null && styles.categoryButtonActive,
          ]}
          onPress={() => setSelectedCategory(null)}
          testID="category-all"
        >
          <Text
            style={[
              styles.categoryButtonText,
              selectedCategory === null && styles.categoryButtonTextActive,
            ]}
          >
            Todos
          </Text>
        </TouchableOpacity>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}
            testID={`category-${category}`}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.categoryButtonTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount} testID="results-count">
          {filteredItems.length} {filteredItems.length !== 1 ? 'resultados encontrados' : 'resultado encontrado'}
        </Text>
        {(searchQuery || selectedCategory) && (
          <TouchableOpacity onPress={clearFilters} testID="clear-filters">
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        )}
      </View>
      {filteredItems.length === 0 ? (
        <Text style={styles.noResults} testID="no-results">
          Nenhum item corresponde aos critérios de busca
        </Text>
      ) : (
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          testID="results-list"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    margin: 10,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#333',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  resultsCount: {
    fontSize: 14,
    color: '#666',
  },
  clearText: {
    fontSize: 14,
    color: '#007AFF',
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemCategory: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  noResults: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 20,
  },
});
