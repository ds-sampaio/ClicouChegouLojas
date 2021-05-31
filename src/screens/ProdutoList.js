import React, { Component } from 'react'
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Platform,
    Alert
} from 'react-native'

// import Icon from 'react-native-vector-icons/FontAwesome'
import { Icon } from 'react-native-elements'
import axios from 'axios'

import moment from 'moment'
import 'moment/locale/pt-br'

import { server, showError} from '../common'
import Produto from '../component/Produto'

const initialState = {
    produtos: [],
    pedido: null
}

export default class ProdutoList extends Component {  
    
    state = {
        ...initialState
    }
    

    loadProdutos = async () => {
        try {                    
          const res = await axios.get(`${server}/produtos`)          
          this.setState({produtos: res.data})
        } catch(e) {
            showError(e)
        }
  }

    componentDidMount = () => {
        this.loadProdutos()
    }

    render() {        
        return (                
                <View style={styles.container}>                  
                    <View style={styles.cabecalho}>                              
                        <View style={[styles.iconBar ,{flexDirection:'row'}]}>                              
                            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name='chevron-left' size={27} color='#FFF' />
                            </TouchableOpacity>
                            <Text style={styles.Header}>
                                Produtos
                            </Text> 
                            <TouchableOpacity onPress={() => console.warn('chamar cadastro de produto')}>
                                <Icon name='add' size={27} color='#FFF' />
                            </TouchableOpacity>                            
                        </View>                                          
                    </View>                 
                    <View style={styles.produtoList}>                 
                       <FlatList data={this.state.produtos}
                            keyExtractor={item => `${item.id_produtos}`}
                            renderItem={({item}) => <Produto {...item} /> } 
                       />
                    </View>
                    
                    
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,     
    },
    Header: {
        fontSize: 28,
         color: '#fff',
        textAlign: 'center', 
        textAlignVertical: 'center',
        // marginTop: '1%',
    },
    cabecalho: {
        backgroundColor: '#663399', //'#ffd700', 
        flex: 1,
    },
    produtoList: {
        flex: 9,
    },
    iconBar: {        
        flexDirection: 'row',
         marginHorizontal: 20,
        marginLeft: '2%',
        // top: '1%',
         justifyContent: 'space-between',
        marginTop: Platform.OS === 'ios' ? 30 : 10,
    }
})