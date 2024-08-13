import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import SearchResultItem from './SearchResultItem';

const SearchResults = ({ results, error }) => {
    if (error) {
      return <Text style={styles.error}>Erro ao buscar dados.</Text>;
    }
  
    if (results.length === 0) {
      return <Text style={styles.noResults}>procure algum pokemon</Text>;
    }

    return (
        <FlatList
          data={results}
          renderItem={({ item }) => <SearchResultItem item={item} />}
          keyExtractor={(item) => item.name}
         
        />
      );
    };


    const styles = StyleSheet.create({
        error: {
          color: 'red',
          textAlign: 'center',
          marginTop: 20,
        },
        noResults: {
          textAlign: 'center',
          marginTop: 20,
          fontSize: 18,
          color: '#888',
        },
      });

      export default SearchResults;