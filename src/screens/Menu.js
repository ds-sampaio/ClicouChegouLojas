import React, { Component } from 'react'
import { Platform, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { Gravatar } from 'react-native-gravatar'

import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome'
import { CommonActions } from '@react-navigation/native';

export default props => {

    const logout = () => {
        delete axios.defaults.headers.common['Authorization']      
        props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: 'Auth',
                    },
                ],
            })
        )
    }

    return (
        <DrawerContentScrollView>
            <View style={styles.header}>
                <Text style={styles.title}>Clicou Chegou</Text>
                <Gravatar style={styles.avatar} 
                    options={{
                        email: props.email,
                        parameters: { "size": "200", "d": "mm" },
                        secure: true
                    }} />
                <View style={styles.userInfo}>
                    <Text style={styles.name}>
                        {props.razao_social}
                    </Text>
                    <Text style={styles.email}>
                        {props.email}
                    </Text>
                </View>
                <TouchableOpacity onPress={logout}>
                    <View style={styles.logoutIcon}>
                        <Text style={styles.desconectar}>Desconectar</Text>
                        {/* <Icon name='sign-out' size={30} color='#663399' /> */}
                    </View>
                </TouchableOpacity>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
         borderBottomWidth: 1,
        borderColor: '#DDD'
    },
    title: {
        color: '#663399',
        // fontFamily: commonStyles.fontFamily,
        fontSize: 30,
        paddingTop: Platform.OS === 'ios' ? 70 : 30,
        padding: 10
    },
    avatar: {
        width:50, height:50, borderWidth:3,
        borderColor:'white', borderRadius:50,
        left: 10,
    },
    userInfo: {
        marginLeft: 10,
    },
    name: {
        // fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        // color: commonStyles.colors.mainText,
        marginBottom: 5,
        color: '#663399',
    },
    email: {
        // fontFamily: commonStyles.fontFamily,
        fontSize: 15,
        // color: commonStyles.colors.subText,
        marginBottom: 10,
        color: '#663399',
    },
    logoutIcon: {
        marginLeft: 10,
        marginBottom: 10
    },
    desconectar: {        
        fontSize: 12,        
        marginBottom: 10,
        color: '#663399',
    },
})