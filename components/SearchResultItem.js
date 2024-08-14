import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SearchResultItem = ({ item }) => {
    const weightInKg = (item.weight / 10).toFixed(1);
    const heightInM = (item.height / 10).toFixed(1);

    return (
      <View style={styles.item}>
       
       <View style={styles.textos}>
         <Text style={styles.name}>{item.name} :</Text>

         <Text style={styles.details}>Weight: {weightInKg} kg</Text>
        <Text style={styles.details}>Height: {heightInM} m</Text>

        <View style={styles.typeStyle}>
         {item.types.map((typeInfo, index) => (
            <Text key={index} style={styles.type}>
              {typeInfo.type.name}\
            </Text>
            
          ))}
        </View>

        

       </View>

        <Image
         source={{ uri: item.sprites.front_default }}
         style={styles.image}
        />
       
      </View>
    );
  };

  const styles = StyleSheet.create({
    item: {
      flexDirection: 'row',
      marginTop: '5%',
      alignItems: 'center',
      height: 240,
      width: '100%',
      backgroundColor: '#6C757D',
      borderRadius: 7,
    },
    image: {
      width: 150,
      height: 150,
      marginLeft: 120,
    },
    name: {
      fontSize: 25,
      marginBottom: 10,
    },
    type: {
        fontSize: 20,
        alignItems: 'center',
        marginLeft: 2,
        borderRadius: 7,
        marginRight: 2,
    },
    typeStyle: {
        backgroundColor: '#E5E5E5',
        padding: 4,
        alignItems: 'center',
        borderRadius: 7,
    },
    textos: {
        justifyContent: 'center',
        marginBottom: 50,
        marginLeft: 20,
    },
    details: {
        fontSize: 18,
        marginBottom: 5,
        backgroundColor:'red',
        alignItems:'center',
        backgroundColor: '#E5E5E5',
        padding: 4,
        alignItems: 'center',
        borderRadius: 7,
    }
  });
  
  export default SearchResultItem;
