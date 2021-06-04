import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity,Alert } from 'react-native'
import {  Avatar } from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'

import moment from 'moment'
import 'moment/locale/pt-br'

import { server, showError} from '../common'

import FormProduto from '../screens/FormProduto'

const initialState = {
    showdonePedidos: true,
    showAlteraStatus: false,
    visiblePedidos: [],
    produto: null,
    pedido: null,
    status: ''
}

export default props => { 

    return (                
            <View style={styles.container}>
                <View style={styles.concabecalhotainer}>  
                    <View style={{flexDirection:'row'}}>
                        <View > 
                            <Avatar
                                // size="large"
                                source={{
                                    uri:
                                    props.imagem,
                                }}
                                >                        
                            </Avatar>                                                                   
                        </View>
                        <View style={{flexDirection:'row'}}> 
                            <TouchableWithoutFeedback onPress={() => props.onloadFormproduto(props.id_produtos)}>                        
                                <View>
                                    <Text style={styles.desc}>{props.descricao}</Text>
                                    <View style={{flexDirection:'row'}}>   
                                        <Text style={styles.desc}>R$</Text> 
                                        <Text style={styles.desc}>{props.preco}</Text> 
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>   
                            <TouchableOpacity style={styles.navBarLeftButton} onPress={() => props.onDeleteproduto(props.id_produtos)}>
                                <Icon name='trash' size={27} color='#663399' />
                            </TouchableOpacity>  
                        </View>                                                                
                    </View>                                            
                </View>                    
            </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems:  'center',
        paddingVertical: 20,
    },
    Header: {
        fontSize: 28,
         color: '#fff',
        textAlign: 'center', 
        textAlignVertical: 'center',
        marginTop: '3%',
    },   
    cabecalho: {
        backgroundColor: '#000',//'#663399', 
        flex: 3,
    },
    desc: {
        color: '#222',
        fontSize: 15,
        marginLeft: 10,
    },
    navBarLeftButton: {
        paddingLeft: 8,   
        flexDirection: 'row',        
        justifyContent: 'flex-end'
      }
})