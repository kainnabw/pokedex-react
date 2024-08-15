import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

const PaginatedList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);  //informa se ainda há mais dados para carregar.

  //carrega novos dados quando a página é atualizada.
  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const response = await fetch(`https://api.example.com/data?page=${page}&limit=10`);
      const result = await response.json();

      //verifica se há novos itens disponíveis.
      //result é o array de itens retornado pela API.
      if (result.length > 0) {
        setData([...data, ...result]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  //é chamada quando o usuário rola até o final da lista.
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage(page + 1);
    }
  };
  //exibe um indicador de carregamento
  const renderFooter = () => {
    return loading ? (
      <View style={{ padding: 10 }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : null;
  };

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Text>{item.name}</Text>}
      keyExtractor={(item, index) => index.toString()} // fornece uma chave única para cada item. 
      ListFooterComponent={renderFooter}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default PaginatedList;