import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import logoGif from '../../../../assets/EasyParkLogoGif.gif'

export const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={logoGif}/>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: "center"
    },
    logo: {
        width: 280,
        height: 280
    }
})