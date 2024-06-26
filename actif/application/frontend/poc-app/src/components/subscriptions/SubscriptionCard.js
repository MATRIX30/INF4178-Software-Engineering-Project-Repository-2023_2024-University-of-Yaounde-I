import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';
import IconActif from '../IconActif';
import ButtonActif from '../ButtonActif';
import { Text, TouchableRipple } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
const SubscriptionCard = ({ item, onPress, companyLogo, compactMode }) => {
    const { rate, title, description, minimumStock, mediumStock, maximumStock, accountType, image } = item;

    const defaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMYCdjZTz7aAFnUFAzMAzt493qFpCad22PZM2Fhnf2yA&s"

    const styles = StyleSheet.create({
        cardContainer: {
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10, // Reduce padding for less white space
            marginBottom: 10, // Adjust margin as needed
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,

        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        rating: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        accountText: {
            fontSize: 12,
            color: accountType?.color == COLORS.secondary ? COLORS.black : COLORS.white,
            backgroundColor: accountType?.color,
            padding: 4,
            borderRadius: SIZES.radius,
            fontWeight: '700'
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: 5, // Reduce margin for less white space
        },
        description: {
            fontSize: 14,
            color: '#777',
            marginTop: 5, // Reduce margin for less white space
        },
        stockInfo: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
        },
        stockLabel: {
            fontSize: 12,
            color: '#777',
            marginBottom: 5,
        },
        stockValue: {
            fontSize: 12,
            fontWeight: 'bold',
        },
        investButton: {
            backgroundColor: COLORS.secondary,
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 5,
            marginTop: 10, // Add margin for separation
        },
        investButtonText: {
            color: COLORS.black,
            fontSize: 16,
            fontWeight: 'bold',
        },
    });

    return (
        compactMode ?
            <TouchableRipple
                onPress={() => console.log('Pressed')}
                rippleColor={COLORS.secondary}
                style={[styles.cardContainer, { flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }]}
            >
                <View >
                    {/* <View style={styles.header}>
                <View style={styles.rating}>
                    <IconActif name="star" size={20} iconColor="#f1c40f" />
                    <Text style={{ marginLeft: 5, fontSize: 16, fontWeight: 'bold' }}>{rate}</Text>
                </View>
                <Text style={styles.accountText}>{accountType?.name}</Text>
            </View> */}
                    <View style={{
                        flexDirection: 'row',
                        gap: 10,
                        justifyContent: 'center'
                    }}>

                        {/* <Image source={{ uri: image || defaultImage }} style={{ width: 80, height: 50, resizeMode: 'contain', marginBottom: 10 }} /> */}
                        <Avatar.Image size={45} source={{ uri: image || defaultImage }} />
                        <View style={{ flexDirection: 'column', gap: 10 }}>

                            <Text style={styles.title}>{title}</Text>
                            {/* <Text ellipsizeMode='tail' style={styles.description}>{description}</Text> */}
                            <Text>Account creation </Text>
                            <Text style={{
                                color: COLORS.primary,
                                fontWeight: 'bold'

                            }}>5000XAF </Text>
                        </View>

                    </View>



                </View>
            </TouchableRipple>
            :
            <TouchableRipple
                onPress={() => console.log('Pressed')}
                rippleColor={COLORS.secondary}
                style={styles.cardContainer}
            >
                <View >
                    <View style={styles.header}>
                        <View style={styles.rating}>
                            <IconActif name="star" size={20} iconColor="#f1c40f" />
                            <Text style={{ marginLeft: 5, fontSize: 16, fontWeight: 'bold' }}>{rate}</Text>
                        </View>
                        <Text style={styles.accountText}>{accountType?.name}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        gap: 10,
                        justifyContent: 'space-between'
                    }}>

                        {/* <Image source={{ uri: image || defaultImage }} style={{ width: 80, height: 50, resizeMode: 'contain', marginBottom: 10 }} /> */}
                        <Avatar.Image size={45} source={{ uri: image || defaultImage }} />
                        <View style={{ flexDirection: 'column' }}>

                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.description}>{description}</Text>
                        </View>

                    </View>
                    <View style={styles.stockInfo}>
                        <View>
                            <Text style={styles.stockLabel}>Minimum Stock</Text>
                            <Text style={styles.stockValue}>{minimumStock}</Text>
                        </View>
                        <View>
                            <Text style={styles.stockLabel}>Medium Stock</Text>
                            <Text style={styles.stockValue}>{mediumStock}</Text>
                        </View>
                        <View>
                            <Text style={styles.stockLabel}>Maximum Stock</Text>
                            <Text style={styles.stockValue}>{maximumStock}</Text>
                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        paddingTop: 10,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderTopWidth: 1,
                        borderTopColor: COLORS.gray

                    }}>
                        <View>

                            <Text>Account creation </Text>
                            <Text style={{
                                color: COLORS.primary,
                                fontWeight: 'bold'

                            }}>5000XAF </Text>
                        </View>
                        <ButtonActif
                            title={"Invest"}
                            onPress={onPress}
                            // style={styles.investButton}
                            background={COLORS.secondary}
                            icon={"cash"}
                        />
                        {/* <TouchableOpacity style={styles.investButton} onPress={onPress}>
                    <Text style={styles.investButtonText}>Invest</Text>
                </TouchableOpacity> */}
                    </View>
                </View>
            </TouchableRipple>
    );

};

export default SubscriptionCard;
