// App.js
import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios';
import SearchInput from './components/SearchInput';
import SearchResults from './components/SearchResult';

const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const fetchPokemons = async () => {
    if (query.trim() === '') return;

    setError(null);

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`);
      setResults([response.data]);
    } catch (err) {
      setError(err);
      setResults([]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centralizador}>
      <SearchInput

        value={query}
        onChangeText={setQuery}
        onSubmit={fetchPokemons}
      />
      <Button 
      style={styles.buttonConsult} 
      title="Buscar" 
      onPress={fetchPokemons}/>
      
      <SearchResults results={results} error={error} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D7D7D9',
    width: '100%',
    position:"absolute"
  },
  centralizador: {
    paddingTop:'15%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D7D7D9',
    width: '100%',
  },
  buttonConsult: {
    width:'60%',
    backgroundColor:'red'
  }
});

export default App;
