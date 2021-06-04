import React, { Component } from 'react'
import {
         View, 
         Text, 
         StyleSheet, 
         TouchableOpacity,
         TextInput,
         ScrollView
        } from 'react-native'

import axios from 'axios'   
import { server, showError, showSuccess} from '../common'  


export default class Loja extends Component {   
    
    state = {
        id: 0,
        logradouro: '',
        bairro: '',
        numero: '',
        telefone: '',
        razao_social: '',
        status: '',
        password: '',
        cnpj_cpf: '',
        email   : ''
    }    


    constructor(props){
        super(props);

        this.state = { lojas: [] };
    }
    

    loadloja = async () => {
        try {                    
          const res = await axios.get(`${server}/loja`)          
          this.setState(res.data[0]) 
        } catch(e) {
            showError(e)
        }
    }

    componentDidMount = () => {
        this.loadloja()
    }
    

    async handleButtonPress(){ 
        try {
            await axios.put(`${server}/loja`,{
                logradouro: this.state.logradouro,
                bairro: this.state.bairro,
                numero: this.state.numero,
                telefone: this.state.telefone,
                razao_social: this.state.razao_social,
                status: this.state.status,
                cnpj_cpf: this.state.cnpj_cpf,
                email   : this.state.email
            })
            await this.loadloja()
            showSuccess('Dados atualizados!')
            this.props.navigation.goBack()
        } catch(e) {
            showError(e)
        }                  
     }


    render() {        
        return (                
                <View style={styles.container}>                  
                    <View style={styles.cabecalho}>  
                        <Text style={styles.title}>Informações sobre a Loja</Text>                                                                                    
                    </View> 
                    <View style={styles.detalhe}>
                        <ScrollView>
                        <Text style={styles.text}>Razão Social</Text>
                            <TextInput style={styles.input}    
                                onChangeText={value => this.setState({razao_social: value})}
                                value={this.state.razao_social}
                            ></TextInput>  
                            <Text style={styles.text}>CNPJ ou CPF</Text>
                            <TextInput style={styles.input}    
                                onChangeText={value => this.setState({cnpj_cpf: value})}
                                value={this.state.cnpj_cpf}
                            ></TextInput>  
                            <Text style={styles.text}>Logradouro</Text>
                            <TextInput style={styles.input}    
                                onChangeText={value => this.setState({logradouro: value})}
                                value={this.state.logradouro}
                            ></TextInput>  
                            <Text style={styles.text}>Bairro</Text>
                            <TextInput style={styles.input}    
                                onChangeText={value => this.setState({bairro: value})}
                                value={this.state.bairro}
                            ></TextInput>  
                            <Text style={styles.text}>Telefone</Text>
                            <TextInput style={styles.input}    
                                onChangeText={value => this.setState({telefone: value})}
                                value={this.state.telefone}
                            ></TextInput>  
                            <Text style={styles.text}>E-Mail</Text>
                            <TextInput style={styles.input}    
                                onChangeText={value => this.setState({email: value})}
                                value={this.state.email}
                            ></TextInput>    
                            <Text style={styles.text}>Status</Text>
                            <TextInput style={styles.input}    
                                onChangeText={value => this.setState({status: value})}
                                value={this.state.status}
                            ></TextInput>  
                            <TouchableOpacity onPress={() => this.handleButtonPress()}>    
                                <View style={styles.button}>
                                        <Text style={styles.buttonText}>Salvar</Text>
                                </View>                              
                            </TouchableOpacity>  
                        </ScrollView>                               
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
    title: {
        marginTop: 9,
       fontSize: 25,
       color: '#FFF',
       alignItems: 'center',
       justifyContent: 'center',
       marginLeft: '10%',
    },
    detalhe: {
        flex: 9,
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
        fontSize: 20,           
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