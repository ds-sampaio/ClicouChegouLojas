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
    SafeAreaView,
    ScrollView
} from 'react-native'


// import Icon from 'react-native-vector-icons/FontAwesome'
import { Icon } from 'react-native-elements'
import axios from 'axios'
import { server, showError} from '../common'
import Vendas from './vendas'

const initialState = {
    vendas: [],
}

export default class ListHistorico extends Component { 

    state = {
        ...initialState
    }

    
    loadVendas = async () => {
        
        try {                    
          const res = await axios.get(`${server}/retorno`)         
          this.setState({vendas: res.data})
        } catch(e) {
            showError(e)
        }
    }

    componentDidMount = () => {
        this.loadVendas()
    }

    render () {
        // console.warn(this.props.route.params.fechou)
        return (  
            // <ScrollView>
               <View>                  
                <Text style={styles.title}>Vendas</Text>                               
                <View style={styles.item}>
                <FlatList data={this.state.vendas}
                  keyExtractor={item => `${item.id_usuario}`}
                  renderItem={({item}) => <Vendas {...item} /> } />
                </View>
              </View> 
            // </ScrollView>
            
            
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
      fontSize: 25,
      // alignItems: 'center',
      // justifyContent: 'center',
      color:  '#663399',
       marginLeft: '5%',
    },   
    texto: {
      fontSize: 20,
      alignItems: 'center',
      justifyContent: 'center',
      color:  '#FFF',
      marginLeft: '10%',
    },
    group: {
      backgroundColor: '#000',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10,
    },
  });
