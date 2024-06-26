import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS, SIZES } from '../constants/theme'
import { Avatar } from 'react-native-paper'
import { NotificationIcon } from './SvgIcons'

const Header = () => {
    return (
        <View style={styles.Headerdisplay}>
            {/* Avatar and infos*/}
            <View style={styles.displayLeft}>
                <View style={styles.avatar}>
                    <Avatar.Image size={SIZES.avatar} style={{backgroundColor: COLORS.whiteSmoke}} source={"#"} />
                </View>
                <View>
                    <View><Text style={styles.name}>Furel Teguimene</Text></View>
                    <View><Text style={styles.id}>Id: 123456789</Text></View>
                </View>
            </View>

            <View style={styles.notification}>
                <NotificationIcon />
                <View style={styles.printNotif}><Text style={{fontSize: 10, color: COLORS.grey}}>2</Text></View>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    Headerdisplay: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingVertical: 10,
        borderBlockColor: COLORS.gray,
        borderBottomWidth: 2
    },
    displayLeft: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: "center",
    },
    avatar: {
        paddingEnd: 10,
    },
    name: {
        fontSize: SIZES.body,
        fontWeight: 'bold',
        color: COLORS.black
    },
    printNotif: {
        alignItems: 'center',
        width: 15,
        height: 15,
        borderRadius: 50,
        backgroundColor: COLORS.secondary,
        position: 'absolute',
        top: 15,
        left: 32
    },
    id: {
        fontSize: SIZES.body,
        color: COLORS.grey,
        textTransform: 'uppercase'
    },
    notification: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        width: 56,
        height: 56,
        backgroundColor: COLORS.whiteSmoke,
        position: 'relative'
    },
})
