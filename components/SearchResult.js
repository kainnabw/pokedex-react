import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import SearchResultItem from './SearchResultItem';

const SearchResults = ({ results, error, onLoadMore }) => {
  const [resultsPokemon, setResultsPokemon] = useState([]);

  useEffect(() => {
    const resultInfoPokemons = async () => {
      if (results.length === 0) return;

      const infopokemons = [];
      
      try {
        for (const pokemon of results) {
          if (pokemon.name && pokemon.sprites) {
            infopokemons.push(pokemon);
          } else {
            const response = await axios.get(pokemon.url);
            infopokemons.push(response.data);
          }
        }
        setResultsPokemon(infopokemons);
      } catch (err) {
        console.error(err);
      }
    };

    resultInfoPokemons();
  }, [results]);

  if (error) {
    return <Text style={styles.error}>Erro ao buscar dados.</Text>;
  }

  if (resultsPokemon.length === 0) {
    return <Text style={styles.noResults}>Procure algum Pokémon</Text>;
  }

  return (
    <FlatList
      data={resultsPokemon}
      renderItem={({ item }) => <SearchResultItem item={item} />}
      keyExtractor={(item) => item.name}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={<ActivityIndicator size="large" color="#0000ff" />}
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
