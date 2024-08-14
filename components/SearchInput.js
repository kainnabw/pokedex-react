import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const SearchInput = ({ value, onChangeText, onSubmit }) => {
    const textoMinusculo = (text) => {
        onChangeText(text.toLowerCase());
      };
    return (
      <TextInput
        style={styles.input}
        placeholder="nome ou id do pokemon"
        value={value}
        onChangeText={textoMinusculo}
        onSubmitEditing={onSubmit}
      />
    );
  };

  const styles = StyleSheet.create({
    input: {
      height: 40,
      width:'80%',
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      textAlign:'center',
      margin: 10,
    },
  });
  
  export default SearchInput;