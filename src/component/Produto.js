import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native'
import {  Avatar } from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'

import moment from 'moment'
import 'moment/locale/pt-br'

import { server, showError} from '../common'

const initialState = {
    showdonePedidos: true,
    showAlteraStatus: false,
    visiblePedidos: [],
    pedidos: [],
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
                        <TouchableWithoutFeedback onPress={() => console.warn('ok')}>
                            <View>
                                <Text style={styles.desc}>{props.descricao}</Text>
                                <View style={{flexDirection:'row'}}>   
                                    <Text style={styles.desc}>R$</Text> 
                                    <Text style={styles.desc}>{props.preco}</Text> 
                                </View>
                            </View>
                        </TouchableWithoutFeedback>                       
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
})