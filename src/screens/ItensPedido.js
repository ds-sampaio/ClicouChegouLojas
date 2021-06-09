import React, { Component } from 'react'
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Platform,
    Alert,
    StatusBar,
    SafeAreaView
} from 'react-native'


// import Icon from 'react-native-vector-icons/FontAwesome'
import { Icon } from 'react-native-elements'
import axios from 'axios'
import { server, showError} from '../common'
import Itens from '../component/Itens'

const initialState = {
    produtos: [],
}

export default class ProdutoList extends Component { 

    state = {
        ...initialState
    }

    
    loadProdutos = async () => {
        
        try {                    
          const res = await axios.post(`${server}/itenspedidos`,{
            id_usuario: this.props.route.params
        })         
          this.setState({produtos: res.data})
        } catch(e) {
            showError(e)
        }
    }

    componentDidMount = () => {
        this.loadProdutos()
    }

    render () {

        return (  
            <View>
                <Text style={styles.title}>Listagem de Itens</Text> 
                <View style={styles.item}>
                <FlatList data={this.state.produtos}
                keyExtractor={item => `${item.id_pedido}`}
                renderItem={({item}) => <Itens {...item} /> } />
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#663399',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10,
    },
    title: {
      fontSize: 30,
      alignItems: 'center',
      justifyContent: 'center',
      color:  '#663399',
      marginLeft: '10%',
    },   
  });
