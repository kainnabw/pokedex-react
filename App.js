import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import SearchInput from './components/SearchInput';
import SearchResults from './components/SearchResult';


//Usa dois tipos de busca: uma busca específica por consulta e uma busca geral com paginação.
const App = () => {
  const [query, setQuery] = useState(''); //query: Armazena o texto que o usuário digita para buscar um Pokémon específico.
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchType, setSearchType] = useState('general');

  const fetchPokemons = async () => {
    //Se a query estiver vazia, reseta a página e os resultados
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
      //Reduz a página atual em 1. 
      const offset = (page - 1) * 10;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
      const newResults = response.data.results || []; //A resposta da API 
      
      setResults(prevResults => [...prevResults, ...newResults]); // Atualiza o estado results com os novos dados
      setHasMore(newResults.length > 0);
    } catch (err) {
      setError(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }
// É utilizado para carregar e paginar uma lista de Pokémons.
  useEffect(() => {
    if (searchType === 'general') {
      fetchGeralPokemons();
      
    }
  }, [page]);
   // É utilizado para buscar um Pokémon específico com base na consulta fornecida.
  useEffect(() => {
    if (searchType === 'query') {
      fetchPokemons();
    }
  }, [query]);
  // Incrementa o número da página se houver mais resultados a serem carregados
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