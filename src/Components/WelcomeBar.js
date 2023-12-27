import { Text, StyleSheet, View, Image } from 'react-native'
import React from 'react'

export default WelcomeBar = (props) => {
    return (<View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={props.logoUri}></Image>
        </View>
        <View style={styles.welcomeContainer}><Text style={styles.welcomeText}>Hi, {props.userName} 👋</Text></View>
    </View>
    )
}

const styles = StyleSheet.create({
    profileHeader: {
        height: 44,
        paddingHorizontal: 16,
        paddingVertical: 0,
        flexDirection: 'row',
        alignContent: 'center',
      },
      avatarContainer: {
        width: 44,
        height: 44,
        marginRight: 10,
      },
      avatar: {
        height:44,
        width: 44,
        borderRadius: 40
      },
      welcomeContainer: {
        alignItems: 'center',
        justifyContent: 'center'
      },
      welcomeText: {
        fontSize: 24,
        color: '#E00034',
      },
})