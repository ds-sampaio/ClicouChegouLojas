import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert,StatusBar } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

import moment from 'moment'
import 'moment/locale/pt-br'

export default props => {
    return (
        <View style={styles.container}>
            <View>    
            <Text style={styles.desc}>{props.datapedido}</Text>  
            <Text style={styles.desc}>Nº Pedido: 000{props.id_pedido}</Text>                
            <Text style={styles.desc}>{props.nome}</Text>
            <Text style={styles.desc}>{props.preco}</Text>
            </View>             
        </View>
    )
}



const styles = StyleSheet.create({
    // container: {
    //   flex: 1,
    //   marginTop: StatusBar.currentHeight || 0,
    // },
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems:  'center',
        paddingVertical: 10,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 25,
      padding: 10,
      color: '#000',
    },
    desc: {
        color: '#FFF',
        fontSize: 22,        
    },
  });