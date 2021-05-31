import React, { Component } from 'react'
import {
    ImageBackground,
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Platform,
    Alert
} from 'react-native'

import axios from 'axios' 
import { CommonActions } from '@react-navigation/native';

import { server, showError, showSuccess} from '../common'

const initialState = {
    logradouro: '',
    bairro: '',
    numero: '',
    telefone: '',
    razao_social: '',
    status: '',
    password: '',
    cnpj_cpf: '',
    email: 'daiane@gmail.com',
    status: '',
    password: '123456',
    confirmPassword: '',
    stageNew: false
}

export default class Auth extends Component {
    state = {
        ...initialState
    }
    
    signinOrSignup = () => {
     if(this.state.stageNew){
         this.signup()
     } else {
        this.signin()
     }
    }

    signup = async () => {
        try {
            await axios.post(`${server}/signup`,{
                logradouro: this.state.logradouro,
                bairro: this.state.bairro,
                numero: this.state.numero,
                telefone: this.state.telefone,
                razao_social: this.state.razao_social,
                status: this.state.status,
                password: this.state.password,
                cnpj_cpf: this.state.cnpj_cpf,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
            })
            showSuccess('Loja cadastrada')
            this.setState({ ...initialState})
        } catch(e){
            showError(e)
        }
    }

    signin = async () => {
        try {
            const res = await axios.post(`${server}/signin`,{                
                
                email: this.state.email,
                password: this.state.password,
            })
            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
            
            //  this.props.navigation.navigate('Home')
            
            this.props.navigation.navigate('Home', res.data)
            // this.props.navigation.dispatch(
            //     CommonActions.reset({
            //         index: 0,
            //         routes: [
            //             {
            //                 name: 'PedidoList',
            //                 params: {name:res.data.razao_social , email: res.data.email },
            //             },
            //         ],
            //     })
            // )


        } catch(e) {
            showError(e)
        }
    }

    render() {
        const validation = []
        validation.push(this.state.email && this.state.email.includes('@'))
        validation.push(this.state.password && this.state.password.length >= 3)
        
        if(this.state.stageNew) {
            validation.push(this.state.razao_social && this.state.razao_social.trim().length >= 3)
            validation.push(this.state.confirmPassword)
            validation.push(this.state.password === this.state.confirmPassword)
        }

        const validForm = validation.reduce((t, a) => t && a)

        return (
            <View style={styles.background}>
                <Text style={styles.title}>Clicou Chegou</Text>
                <Text style={styles.subtitle}>Lojas</Text>                
                <View style={styles.formcontainer}>
                    <Text style={styles.detalhe}> 
                        {this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
                    </Text>
                    {this.state.stageNew &&
                       <TextInput 
                        placeholder='Razão Social'
                        clearButtonMode="always" 
                        value={this.state.razao_social}
                        style={styles.input}
                        onChangeText={razao_social => this.setState({razao_social})}>                           
                      </TextInput>                     
                      
                    }
                    {/* {this.state.stageNew &&
                       <TextInput 
                        placeholder='cnpj_cpf'
                        clearButtonMode="always" 
                        value={this.state.cnpj_cpf}
                        style={styles.input}
                        onChangeText={cnpj_cpf => this.setState({cnpj_cpf})}>                           
                      </TextInput>                     
                      
                    }
                    {this.state.stageNew &&
                       <TextInput 
                        placeholder='logradouro'
                        clearButtonMode="always" 
                        value={this.state.logradouro}
                        style={styles.input}
                        onChangeText={logradouro => this.setState({logradouro})}>                           
                      </TextInput>                     
                      
                    }
                    {this.state.stageNew &&
                       <TextInput 
                        placeholder='bairro'
                        clearButtonMode="always" 
                        value={this.state.bairro}
                        style={styles.input}
                        onChangeText={bairro => this.setState({bairro})}>                           
                      </TextInput>                     
                      
                    }
                    {this.state.stageNew &&
                       <TextInput 
                        placeholder='telefone'
                        clearButtonMode="always" 
                        value={this.state.telefone}
                        style={styles.input}
                        onChangeText={telefone => this.setState({telefone})}>                           
                      </TextInput>                     
                      
                    }                    */}
                    <TextInput 
                       placeholder='E-Mail'
                       clearButtonMode="always" 
                       value={this.state.email}
                       style={styles.input} 
                       onChangeText={email => this.setState({email})}>                           
                    </TextInput>
                    <TextInput 
                       placeholder='Senha'
                       clearButtonMode="always" 
                       value={this.state.password}
                       style={styles.input} secureTextEntry={true}
                       onChangeText={password => this.setState({password})}>                           
                    </TextInput>
                    {this.state.stageNew &&
                        <TextInput 
                        placeholder='Confirmação de Senha'
                        clearButtonMode="always" 
                        value={this.state.confirmPassword}
                        style={styles.input} secureTextEntry={true}
                        onChangeText={confirmPassword => this.setState({confirmPassword})}>                           
                     </TextInput>
                    }
                    <TouchableOpacity onPress={this.signinOrSignup}
                        disabled={!validForm}>
                        <View style={[styles.button, validForm ? {} : { backgroundColor: '#AAA' }]}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Registrar' : 'Entrar'} </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ padding: 10}}
                  onPress={
                      () => this.setState({ stageNew: !this.state.stageNew})
                  }>
                  <Text style={styles.buttonConta}>
                    {this.state.stageNew ? 'Ja possui conta?' : 'Ainda não possui conta'} 
                  </Text>    

                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,  
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: '#696969',     
    },
    title: {
        color: '#FFF',
        fontSize: 40,
        marginBottom: 10,
    },
    input: {
      marginTop: 10,
      height: 60,
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 24,
      fontSize: 16,
      alignItems: 'stretch',
      borderColor: '#8b008b',
      borderWidth: 2,      
    },
    formcontainer :{
        padding: 20,
        width: '90%',
      
    },
    subtitle: {
        color: '#FFF',
        fontSize: 30,
        marginBottom: 10,
        marginLeft: '70%',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 20        
    },
    button: {
        backgroundColor: '#8b008b',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10, 

    },
    detalhe: {
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 5,
    },
    buttonConta: {
        color: '#8b008b',
        fontSize: 15        
    },
})