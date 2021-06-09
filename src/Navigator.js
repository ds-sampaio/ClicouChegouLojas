import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native'
 
import Auth from './screens/Auth'
import PedidoList from './screens/PedidoList'
import ProdutoList from './screens/ProdutoList'
import FormProduto from './screens/FormProduto'
import Loja from './screens/Loja'
import ItensPedido from './screens/ItensPedido'


import Menu from './screens/Menu'

const menuConfig = {
    initialRoutName: 'Tela Inicial',
    contentComponent: Menu,
    contentOptions: {
        labelStyle: {
            // fontFamily
            fontWeight: 'normal',
            fontsize: 20
        },
        activeLabelStyle: {
            color: '#080',
            fontWeight: 'bold',

        }
    }
}
 
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


function Root() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="ProdutoList" component={ProdutoList} />
        <Stack.Screen name="FormProduto" component={FormProduto} />       
      </Stack.Navigator>
    );
  }
 
const DrawerNavigator = props => {
    const { email, razao_social } = props.route.params
    return (
        <Drawer.Navigator drawerContentOptions={menuConfig} drawerContent={(props) => <Menu {...props} email={email} razao_social={razao_social}/>}> 
            <Drawer.Screen name="Hoje" options={{ title: 'Tela Inicial' }}>
                {props => <PedidoList {...props} title='Hoje' daysAhead={0} />}
            </Drawer.Screen>
            <Drawer.Screen name="Root" options={{ title: 'Produtos' }}>
                {props => <ProdutoList {...props} title='ProdutoList' daysAhead={0} />}
            </Drawer.Screen>
            <Drawer.Screen name="loja" options={{ title: 'Loja' }}>
            {props => <Loja {...props} title='ProdutoList' daysAhead={0} />}
            </Drawer.Screen>
          
        </Drawer.Navigator>
    );
};
 
const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Auth" component={Auth} />
            <Stack.Screen name="Home" component={DrawerNavigator} /> 
            <Stack.Screen name="Root" component={DrawerNavigator} /> 
            <Stack.Screen name="FormProduto" component={FormProduto} />
            <Stack.Screen name="Loja" component={DrawerNavigator} /> 
            <Stack.Screen name="ItensPedido" component={ItensPedido} />
        </Stack.Navigator>
    );
};
 
const Navigator = () => {
    return (
        <NavigationContainer>
            <AuthNavigator />
        </NavigationContainer>
    );
};
 
export default Navigator;