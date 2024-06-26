import React, { useEffect, useState } from 'react'
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View, Button, ScrollView, FlatList } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import Title from '../../../../components/Title'
import HeaderFormLiv from '../../../../components/HeaderFormLiv'
import { COLORS, SIZES, STYLES } from '../../../../constants/theme'
import InputDimensions from '../../../../components/InputDimensions'
import { Col, Row } from '../../../../components/GridView'
import ObjectActif from '../../../../components/ObjectActif'
import ButtonActif from '../../../../components/ButtonActif'
import InputActif from '../../../../components/InputActif'
import NewObject from './NewObject'
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ImagePicker from '../../../../components/ImagePicker'
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'
import useAuthUser from '../../../../hooks/useAuthUser'


const PacketInformation = ({ route }) => {
    /* navigation params */
    const params = route.params;
    const pocIndentedId = params?.pocIndentedId;
    const globalFormState = params?.globalFormState;

    const auth = useAuthUser();
    const [objects, setObjects] = useState(null)

    /* form yup validation 2 */
    const schema = yup.object().shape({
        length: yup
            .number()
            .min(1)
            .required('Ce champ est obligatore'),
        width: yup
            .number()
            .min(1)
            .required('Ce champ est obligatore'),
        height: yup
            .number()
            .min(1)
            .required('Ce champ est obligatore'),
        weight: yup
            .number().positive("Cette valeur doit être positive")
            .min(1, "Ce champ doit contenir au moins une valeur")
            .required('Ce champ est obligatore'),
        description: yup
            .string(),
        packetValue: yup
            .number()
            .min(1)
            .required('Ce champ est obligatore'),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            // length: 0,
            width: 0,
            height: 0,
            weight: 0,
            description: ''
        },
    });

    /* conversion des objets dans un tableau */
    let objectArray = [];
    objects && objects?.map((o) => {
        objectArray.push(o)
    })

    /* post function */
    const onPressSend = async (formData) => {
        try {
            let newFormState = {
                packet: {
                    customerSender: globalFormState?.expeditor,
                    customerReceiver: globalFormState?.receptor,
                    value: formData?.packetValue,
                    pocId: auth?.id, //auth id
                    height: formData?.height,
                    width: formData?.width,
                    description: formData?.description,
                    items: objectArray?.length === 0 ? [] : objectArray
                },
                pocSourceId: auth?.id, //auth id
                pocIndentedId: pocIndentedId
            }

            navigation.navigate('recapitulatifLivraison', { globalFormState: newFormState, pocIndentedId: pocIndentedId, objects: objectArray })
        } catch (error) {
            console.log(error);
        }

    };


    /* Modal properties */
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const navigation = useNavigation()

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

            <View style={[STYLES.mainLayout]}>
                {/* Section Title */}
                <HeaderFormLiv title={"Informations sur le paquet"} />

                {/* Section dimensions */}
                <View style={styles.dimenssions}>
                    <Title text={"Dimensions et Poids du paquet"} size={SIZES.body} color={COLORS.black} />
                    <Row style={{ marginTop: 4 }}>
                        <Col numRows={2}>
                            <View style={styles.inputBlock}>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <InputDimensions label={"Longueur"} dimenssionLabel={"m"} value={value} onchangeText={onChange} />
                                    )}
                                    name="length"
                                />
                                {errors.length && <Text numberOfLines={1} style={styles.errorYup}>{errors.length.message}</Text>}
                            </View>
                        </Col>
                        <Col numRows={2}>
                            <View style={styles.inputBlock}>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <InputDimensions label={"Largeur"} dimenssionLabel={"m"} value={value} onchangeText={onChange} />
                                    )}
                                    name="width"
                                />
                                {errors.width && <Text numberOfLines={1} style={styles.errorYup}>{errors.width.message}</Text>}
                            </View>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }}>
                        <Col numRows={2}>
                            <View style={styles.inputBlock}>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <InputDimensions label={"Hauteur"} dimenssionLabel={"m"} value={value} onchangeText={onChange} />
                                    )}
                                    name="height"
                                />
                                {errors.height && <Text numberOfLines={1} style={styles.errorYup}>{errors.height.message}</Text>}
                            </View>
                        </Col>
                        <Col numRows={2}>
                            <View style={styles.inputBlock}>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <InputDimensions label={"Poids"} dimenssionLabel={"kg"} value={value} onchangeText={onChange} />
                                    )}
                                    name="weight"
                                />
                                {errors.weight && <Text numberOfLines={1} style={styles.errorYup}>{errors.weight.message}</Text>}
                            </View>
                        </Col>
                    </Row>
                </View>

                {/* Section Objects */}
                <View style={styles.objectSection}>
                    <Title text={"Objets"} size={SIZES.body} color={COLORS.black} />
                    <FlatList
                        ListEmptyComponent={<Text style={{ color: COLORS.black, textAlign: 'center' }}>Aucune données pour l'instant</Text>}
                        data={objects}
                        renderItem={(item, index) => <ObjectActif index={index} item={item} />}
                    />
                    <View style={styles.button}>
                        <ButtonActif
                            background={COLORS.black}
                            borderColor={''}
                            icon={'plus'}
                            onPress={showModal}
                            textColor={COLORS.white}
                            title={"Ajouter"}
                        />
                    </View>
                </View>

                {/* Packet image */}
                <View style={styles.imagePacketSection}>
                    <Title text={"Images du paquet"} size={SIZES.body} color={COLORS.black} />
                    <View
                        style={styles.upload}>
                        <View>
                            <MaterialCommunityIcons name='camera-image' color={COLORS.secondary} size={40} />
                        </View>
                        <View style={styles.leftPicker}>
                            <View>
                                <Text style={styles.text}>Photos entières du contenu du paquet</Text>
                            </View>
                            <ImagePicker title={"Cliquer pour prendre une image"} type={'camera'} />
                        </View>
                    </View>
                </View>
                <View style={styles.imagePacketSection}>
                    <Title text={"Valeur du paquet (FCFA)"} size={SIZES.body} color={COLORS.black} />
                    <View style={{}}>
                        <Controller
                            control={control}
                            rules={{
                                required: false,
                            }}
                            render={({ field: { onChange, value } }) => (
                                <InputActif
                                    text={value}
                                    onChangeText={onChange}
                                    keyboardType={'numeric'}
                                    // multiline={true}
                                    // style={styles.description}
                                    placeholder={"Entrer la valeur du paquet (FCFA)"}
                                />
                            )}
                            name="packetValue"
                        />
                        {errors?.packetValue && <Text numberOfLines={1} style={styles.errorYup}>{errors?.packetValue?.message}</Text>}
                      {/* {  console.log("🚀 ~ PacketInformation ~ packetValue:", formData?.packetValue)} */}
                    </View>
                </View>

                {/* Description */}
                <View style={styles.imagePacketSection}>
                    <Title text={"Description (facultatif)"} size={SIZES.body} color={COLORS.black} />
                    <View style={styles.inputBlock}>
                        <Controller
                            control={control}
                            rules={{
                                required: false,
                            }}
                            render={({ field: { onChange, value } }) => (
                                <InputActif
                                    text={value}
                                    onChangeText={onChange}
                                    multiline={true}
                                    style={styles.description}
                                    placeholder={"Décrire le paquet"}
                                />
                            )}
                            name="description"
                        />
                        {errors.description && <Text numberOfLines={1} style={styles.errorYup}>{errors.description.message}</Text>}
                    </View>
                </View>

                <View style={{ marginTop: 20 }}>
                    <ButtonActif
                        background={COLORS.primary}
                        borderColor={''}
                        reverse={true}
                        icon={'arrow-right'}
                        style={{ borderRadius: SIZES.buttonRadius }}
                        // onPress={() => navigation.navigate("ReceiverInformation")}
                        textColor={COLORS.black}
                        title={"Suivant"}
                        onPress={handleSubmit(onPressSend)}
                    />
                </View>
                <NewObject setObjects={setObjects} style={styles.modal} visible={visible} hideModal={hideModal} />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default PacketInformation

const styles = StyleSheet.create({
    divider: {
        marginVertical: 5,
        color: COLORS.gray,
        height: 1.5
    },
    leftPicker: {
        display: 'flex',
        flexDirection: 'column',
        marginStart: 5
    },
    upload: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.black,
        borderRadius: 7,
        padding: 10,
        borderStyle: 'dashed',
        marginTop: 5,
    },
    description: {
        height: 100,
        backgroundColor: COLORS.whiteSmoke,
        borderRadius: SIZES.radius,
        marginTop: 7,
        width: '100%'
    },
    imagePacketSection: {
        marginTop: 10
    },
    modal: {
        padding: SIZES.padding,
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 8
    },
    dimenssions: {
        marginTop: 30
    },
    objectSection: {
        marginTop: 20
    },
    text: {
        color: COLORS.black,
        fontSize: SIZES.body
    },
    inputDimension: {
        height: 20,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4
    },
    errorYup: {
        color: COLORS.secondary,
        paddingStart: 5,
        marginTop: "1%",
        width: 160
    },
    inputBlock: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%'
    }
})