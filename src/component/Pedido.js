import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

import moment from 'moment'
import 'moment/locale/pt-br'

export default props => {
    
    // const doneOrNotStyle = props.doneAt != null ?
    //    { textDecorationLine: 'line-through'} : {}

    const doneOrNotStyle = props.fechou  ?
       { textDecorationLine: 'line-through'} : {}   
    
    const date = moment(props.doneAt).locale('pt-br')
         .format('ddd, D [de] MMMM')

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback
                onPress={() => props.onTogglePedido(props.id_pedido)}>
                <View style={styles.checkContainer}>
                    {getCheckView(props.fechou)}
                </View>
      
            </TouchableWithoutFeedback>           
            
            <TouchableWithoutFeedback 
               onPress={() => props.toggleStatus(props.id_pedido)}>
                <View>                    
                    <Text style={[styles.desc,doneOrNotStyle]}>{props.descricao}</Text>
                    <Text style={[styles.desc,doneOrNotStyle]}>{props.nome}</Text>
                    <Text style={styles.date}>{date}</Text>
                </View>  
            </TouchableWithoutFeedback>          
        </View>
    )
}

function getCheckView(fechou) {
    if(fechou) {
        return (
            <View style={styles.done}>
                <Icon name='check' size={20} color='#FFF'></Icon>
            </View>
        )
    } else {
        return (
            <View style={styles.pending}></View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems:  'center',
        paddingVertical: 10,
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center',
    },
    desc: {
        color: '#222',
        fontSize: 15,
    },
    date: {
        color: '#555',  
        fontSize: 12,      
    }
})