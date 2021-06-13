import React, { Component } from 'react'
import {
         Modal ,
         View, 
         Text, 
         StyleSheet, 
         TouchableWithoutFeedback, 
         TouchableOpacity,
         TextInput
        } from 'react-native'



const initialState = { desc: '' }

export default class AlterarStatus extends Component {
    
    state ={
        ...initialState  
      
    } 
    

    render () {
        return (            
            <Modal transparent={true}  visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'>
                <TouchableWithoutFeedback
                 onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}> Status do Pedido</Text>
                    <Text style={styles.texto}>{this.props.nome}</Text>
                    {/* <View style={{flexDirection:'row'}}>
                        <Text style={styles.texto}>Item:</Text>
                        <Text style={styles.texto}>{this.props.descricao}</Text>
                    </View> */}
                    
                    <View style={{flexDirection:'row'}}> 
                        <Text style={styles.texto}>{this.props.logradouro}</Text>
                        <Text style={styles.texto}>{this.props.bairro}</Text>
                        <Text style={styles.texto}>{this.props.numero}</Text>
                        <Text style={styles.texto}>{this.props.cidade}</Text>
                    </View>
                    
                    <Text style={styles.texto}>{this.props.forma_pagamento}</Text>                    
                    <TextInput style={styles.input}
                       placeholder="Informe status..."
                       onChangeText={this.props.onChangeText}
                       value={this.props.status}
                    ></TextInput>  
                    <View style={styles.buttons}> 
                        <TouchableOpacity onPress={this.props.onProdutos}>
                            <Text style={styles.button}>Produtos</Text>
                        </TouchableOpacity>                       
                        <TouchableOpacity onPress={this.props.onCancel}> 
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.props.onSalvar}>
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback
                 onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)'
    }    ,
    container: {
        backgroundColor: '#FFF',
    }   , 
    header: {
        // backgroundColor: '#8fbc8f',
        // backgroundColor: '#8b008b',
        backgroundColor: '#663399',
        color: '#FFF',
        textAlign: 'center',
        padding: 15,
        fontSize: 18,
    },
    input: {
        width: '90%',
        height: 40,
        marginTop: 20,
        marginLeft: 17,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#663399',
        borderRadius: 6,
        fontSize: 15, 
    },
    buttons:{
       flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button:{
        margin: 20,
        marginRight:30,
        color: '#663399',
    },
    texto: {
        fontSize: 15, 
        marginLeft: 5,
        color: '#000',
    }
  
})

