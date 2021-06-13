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

import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'

import moment from 'moment'
import 'moment/locale/pt-br'

import { server, showError} from '../common'
import Pedido from '../component/Pedido'
import AlterarStatus from './AlterarStatus'
import ItensPedido from './ItensPedido'

const initialState = {
    showdonePedidos: true,
    showAlteraStatus: false,
    visiblePedidos: [],
    pedidos: [],
    pedido: null,
    status: ''
}

export default class PedidoList extends Component {

    state = {
        ...initialState
    }

    closeControlPanel = () => {
        this._drawer.close()
      };

    openControlPanel = () => {
        this._drawer.open()
      };

    // Metodo que puxa todos os pedidos do banco de dados  
    loadTasks = async () => {
          try {
            // const maxDate = moment()
            //     .add({ days: this.props.daysAhead})
            //     .format('YYYY-MM-DD 23:59:59')
            // const res = await axios.get(`${server}/pedidos?date=${maxDate}`)
            const maxDate = moment().endOf('day').toDate()
            const res = await axios.get(`${server}/vendas`) //pedidoloja
            // console.warn(res.data)
            this.setState({pedidos: res.data})
          } catch(e) {
              showError(e)
          }
    }
   
    toggleFilter = () => {
        this.setState({showdonePedidos: !this.state.showdonePedidos}, this.filterPedidos())
    }

    // togglePedido = async  pedidoid => {
    //     try {
    //         console.warn(pedidoid)
    //          await axios.put(`${server}/pedidos/${pedidoid}`,{  
    //             id_pedido: pedidoid,                
    //             id_cliente: this.state.id_cliente,
    //             id_produtos: this.state.id_produtos,   
    //             status: this.state.status,
    //         })
    //         await this.loadTasks()
    //     } catch(e) {
    //         showError(e)
    //     }
    // }
    togglePedido = async  pedidoid => {
        try {
            const pedidos = [...this.state.pedidos]
            let pedido = pedidos.find(value => {
                return value.id_pedido === pedidoid
            })
            console.warn(pedido.id_cliente)
            await axios.put(`${server}/vendas/${pedido.id_cliente}`,{ 
                status: this.state.status,
            })
            await this.loadTasks()
        } catch(e) {
            showError(e)
        }
    }

    togglePedidoFechou = async  pedidoid => {
        try {
            const pedidos = [...this.state.pedidos]
            let pedido = pedidos.find(value => {
                return value.id_pedido === pedidoid
            })
            await axios.put(`${server}/vendas/${pedido.id_cliente}`,{ 
                fechou: !pedido.fechou,
            })

            // console.warn(!pedido.fechou)
            // await axios.put(`${server}/pedidos/${pedidoid}`,{
            //     id_pedido: pedidoid,                
            //     id_cliente: this.state.id_cliente,
            //     id_produtos: this.state.id_produtos,
            //     fechou: !pedido.fechou,
            // })
            await this.loadTasks()
        } catch(e) {
            showError(e)
        }
    }

    toggleStatus = pedidoid => {
        const pedidos = [...this.state.pedidos]
        let showAlteraStatus = showAlteraStatus
        let pedido = pedidos.find(value => {
            return value.id_pedido === pedidoid
        })

        // pedidos.forEach(pedido => {
        //     if (pedido.id === pedidoid) {
        //         console.warn(this.state.pedidos[pedidoid])
        //         showAlteraStatus = true
        //     }
        // })

        this.setState({ showAlteraStatus })             
        this.setState({ pedido: pedido })   
        this.setState({ status: pedido.status })  
        
        // console.log(this.state.pedido)
    }


    componentDidMount = () => {
        this.filterPedidos()
        this.loadTasks()
    }

    filterPedidos = () => {
        let visiblePedidos = null
        if (this.state.showdonePedidos) {
            visiblePedidos = [...this.state.pedidos]
        } else {
             const pending = pedido => pedido.fechou === null
             visiblePedidos = this.setState.pedidos.filter(pending)
        }

        this.setState({ visiblePedidos })
    }

   
    render() {        
        const today = moment().locale('pt-br').format('ddd,D [de] MMMM')
        return (                
                <View style={styles.container}>
                    {
                        this.state.pedido !== null ? (
                            <AlterarStatus 
                                descricao={this.state.pedido.descricao} 
                                logradouro={this.state.pedido.logradouro}
                                status={this.state.status}
                                tel_cuidador={this.state.pedido.tel_cuidador}
                                bairro={this.state.pedido.bairro}
                                numero={this.state.pedido.numero}
                                forma_pagamento="Dinheiro"
                                cidade={this.state.pedido.cidade}
                                nome={this.state.pedido.nome}
                                isVisible={this.state.showAlteraStatus}
                                id_usuario={this.state.pedido.id_cliente}
                                onChangeText={text => this.setState({status: text})}
                            onCancel={() => this.setState({ showAlteraStatus: false })}
                            onSalvar={() => {
                                this.togglePedido(this.state.pedido.id_pedido)
                                this.setState({ showAlteraStatus: false })
                                }                               
                            }
                            onProdutos={() => {                                
                                this.props.navigation.navigate('ItensPedido',this.state.pedido)   
                                this.setState({ showAlteraStatus: false })                               
                               }
                            } />
                        ) : null         
                    }   

                    <View style={styles.cabecalho}>                        
                         <View style={styles.iconBar}>
                            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name='bars' size={27} color='#FFF' />
                            </TouchableOpacity>
                         </View>  
                           
                        <Text style={styles.Header}>
                            Clicou Chegou                 
                        </Text> 
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.detalhe}>    
                                Loja              
                            </Text> 
                            <Icon name="shopping-cart" size={27} color='#FFF' />
                        </View>
                        
                        
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                 
                    <View style={styles.pedidoList}>
                      {/* <FlatList data={this.state.visiblePedidos} */}
                        <FlatList data={this.state.pedidos}
                        keyExtractor={item => `${item.id_pedido}`}
                        renderItem={({item}) => <Pedido {...item} onTogglePedido={this.togglePedidoFechou} toggleStatus={this.toggleStatus} /> } />
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
        marginTop: '3%',
    },
    pedidoList: {
        flex: 7,
    },
    title: {
        fontSize: 25,
         color: '#fff',
        justifyContent: 'flex-end',
        marginLeft: 10,
    },
    subtitle: {
        fontSize: 22,
         color: '#fff',
        justifyContent: 'flex-end',  
        marginLeft: 10,      
    },
    iconBar: {        
        flexDirection: 'row',
        marginHorizontal: 20,
        marginLeft: '1%',
        top: '1%',
        // justifyContent: 'flex-end',
        // marginTop: Platform.OS === 'ios' ? 30 : 10
    },
    detalhe: {
         color: '#FFF',
        fontSize: 25,
        marginLeft: '65%',  
    },
    cabecalho: {
        backgroundColor: '#663399', //'#ffd700', 
        flex: 3,
    }
})