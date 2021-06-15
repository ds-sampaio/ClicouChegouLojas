import React, { Component } from 'react'
import {
         View, 
         Text, 
         StyleSheet, 
         TouchableOpacity,
         TextInput
        } from 'react-native'

import axios from 'axios'   
import { server, showError, showSuccess} from '../common'     
      

export default class FormProduto extends Component {
    
    state = {
        id_produtos: 0,
        id_loja: 0,
        descricao: '',
        cod_barras: '',
        imagem: '',
        preco: 0,        
        id_produto: 0,       
    }    

    async componentDidMount(){
        if (this.props.route.params.type !== 'cadastro') {
            const id_produto = this.props.route.params.id_produtos ? this.props.route.params : 0
            const id = id_produto.id_produtos
            try {         
                const res = await axios.get(`${server}/produtos/${id}`)              
                this.setState(res.data[0]) 
            } catch(e) {
                showError(e)
            }
        }
          
    } 
    

    loadProdutos = async () => {
        try {         
            const res = await axios.get(`${server}/produtos/${this.state.id_produtos}`)              
            this.setState(res.data[0]) 
        } catch(e) {
            showError(e)
        }
   }

    async handleButtonPress(){ 
        console.warn(this.state.descricao)
        if (this.props.route.params.type === 'cadastro') {
            try {
                await axios.post(`${server}/produtos`,{
                    descricao: this.state.descricao,
                    cod_barras: this.state.cod_barras,
                    preco: this.state.preco,
                    imagem: this.state.imagem,
               
            })
                showSuccess('Produto cadastrado')
                this.props.navigation.goBack()
            } catch(e){
                showError(e)
            } 
        } else {
            console.warn('update')
            try {
                await axios.put(`${server}/produtos/${this.state.id_produtos}`,{
                    descricao: this.state.descricao,
                    cod_barras: this.state.cod_barras,
                    preco: this.state.preco,
                    imagem: this.state.imagem,
                })
                await this.loadProdutos()
            } catch(e) {
                showError(e)
            }
        }   
                  
     }
  
    render () {                  

        return (     
            <View style={styles.container}>
                <View>                              
                    <View style={styles.header}>                               
                        <Text style={styles.title}>
                            Produtos
                        </Text>                                                        
                    </View>                                          
                </View> 
                {this.state.dados === null ? (
                   <Text style={styles.text}>Carregando...</Text> 
                ) : (
                    <View style={styles.detalhe}>  
                    <Text style={styles.text}>Descrição do produto</Text>
                    <TextInput style={styles.input}    
                        onChangeText={value => this.setState({descricao: value})}
                        value={this.state.descricao}
                    ></TextInput>             
                    <Text style={styles.text}>Código de barras</Text>   
                    <TextInput style={styles.input}
                        placeholder="Código de barras"
                        onChangeText={value => this.setState({cod_barras: value})}
                        value={this.state.cod_barras}
                    ></TextInput>  
                    <Text style={styles.text}>Preço</Text>  
                    <TextInput style={styles.input}
                        placeholder="Preço"
                        onChangeText={value => this.setState({preco: value})}
                        keyboardType="numeric"
                        value={this.state.preco.toString()}
                    ></TextInput>  
                    <Text style={styles.text}>Imagem</Text>  
                    <TextInput style={styles.input}
                        placeholder="Imagem"
                        onChangeText={value => this.setState({imagem: value})}
                        value={this.state.imagem}
                    ></TextInput> 
                     <TouchableOpacity onPress={() => this.handleButtonPress()}>    
                       <View style={styles.button}>
                            <Text style={styles.buttonText}>Salvar</Text>
                       </View>                              
                     </TouchableOpacity>                                           
                </View>  
                )}
                 
            </View>

            
           
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
      backgroundColor: '#663399', 
      height: 50,      
    },
    title: {
        marginTop: 4,
       fontSize: 25,
       color: '#FFF',
       alignItems: 'center',
       left: '37%'
    },
    detalhe: {
        flex: 7,
    },
    input: {
        width: '90%',
        height: 40,
        marginLeft: 17,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#663399',
        borderRadius: 6,
        fontSize: 15, 
    },
    buttonText: {
        color: '#FFF',
        fontSize: 20        
    },
    button: {
        backgroundColor: '#663399',
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10, 
        width: '90%',
        marginLeft: 17,

    },
    text: {
        color: '#663399',
        marginTop: 10,
        marginLeft: 17,
    }
  
})

