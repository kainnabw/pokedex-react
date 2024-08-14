import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import SearchInput from './components/SearchInput';
import SearchResults from './components/SearchResult';

const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchType, setSearchType] = useState('general');

  const fetchPokemons = async () => {
    if (query.trim() === ''){
      setPage(1);
      setResults([])
      setSearchType('general')
      return;
    } 

    setError(null);
    setSearchType('query');

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`);
      setResults([response.data]);
    } catch (err) {
      setError(err);
      setResults([]);
    }
  };

  const fetchGeralPokemons = async () => {
    if (loading) return;

    setLoading(true);
    setError(null);
    setSearchType('general');
    
    try {
      const offset = (page - 1) * 10;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
      const newResults = response.data.results || [];
      
      setResults(prevResults => [...prevResults, ...newResults]);
      setHasMore(newResults.length > 0);
    } catch (err) {
      setError(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (searchType === 'general') {
      fetchGeralPokemons();
      
    }
  }, [page]);

  useEffect(() => {
    if (searchType === 'query') {
      fetchPokemons();
    }
  }, [query]);

  const loadMorePokemons = () => {
    if (hasMore && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centralizador}>
        <SearchInput
          value={query}
          onChangeText={setQuery}
          // onSubmit={fetchPokemons}
        />
        <Button
          style={styles.buttonConsult}
          title="Buscar"
          onPress={fetchPokemons} />

        <SearchResults
          results={results}
          error={error}
          onLoadMore={loadMorePokemons}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D7D7D9',
    width: '100%',
  },
  centralizador: {
    paddingTop: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D7D7D9',
    width: '100%',
  },
  buttonConsult: {
    width: '60%',
    backgroundColor: 'red'
  }
});

export default App;
