import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { Modal, Text } from 'react-native-paper';
import { COLORS, SIZES } from '../../../../constants/theme';
import InputActif from '../../../../components/InputActif';
import ButtonActif from '../../../../components/ButtonActif';
import Title from '../../../../components/Title';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { PaperSelect } from 'react-native-paper-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const selectValidator = (value) => {
    if (!value || value.length <= 0) {
        return 'Please select a value.';
    }

    return '';
};

const NewObject = ({ visible, hideModal, style, setObjects }) => {

    const containerStyle = { backgroundColor: COLORS.white, padding: 20 };

    // manage select list
    const [type, setType] = useState({
        value: '',
        list: [
            { _id: 1, value: 'FRAGILE' },
            { _id: 2, value: 'SOLIDE' },
        ],
        selectedList: [],
        error: '',
    });

    useEffect(() => {
        let isMounted = true;
        let _getData = async () => {
            if (isMounted) {
                setType({
                    ...type,
                    value: 'AUTRES',
                    selectedList: [{ _id: '3', value: 'AUTRES' }],
                });
            }
        };

        _getData();
        return () => {
            isMounted = false;
        };
    }, []);

    /* form yup validation 2 */
    const schema = yup.object().shape({
        name: yup
            .string()
            .required('Ce champ est obligatore'),
        height: yup
            .number()
            .min(1)
            .required('Ce champ est obligatore'),
        width: yup
            .number()
            .min(1)
            .required('Ce champ est obligatore'),
        weight: yup
            .number().positive("Cette valeur doit être positive")
            .min(1, "Ce champ doit contenir au moins une valeur")
            .required('Ce champ est obligatore'),
        description: yup
            .string()
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema)
    });

    const [items, setItems] = useState([])
    /* post function */
    const onPressSend = (formData) => {

        try {
            setItems([...items, {
                "name": formData?.name,
                "height": parseInt(formData?.height),
                "width": parseInt(formData?.width),
                "weight": parseInt(formData?.weight),
                "type": type?.value,
                "description": formData?.description,
            }])
            hideModal()
            reset()
        } catch (e) { }
    };

    useEffect(() => {
        setObjects(items)
    }, [items])

    return (
        <Modal style={style} visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <View style={styles.modalTitle}>
                <Title text={"Ajouter un objet"} size={SIZES.h1} color={COLORS.secondary} />
            </View>
            <View style={styles.modalContent}>
                <View style={styles.inputBlock}>
                    <PaperSelect
                        label="Selectionner le type d'objet"
                        value={type.value}
                        onSelection={(value) => {
                            setType({
                                ...type,
                                value: value.text,
                                selectedList: value.selectedList,
                                error: '',
                            });
                        }}
                        arrayList={[...type.list]}
                        selectedArrayList={[...type.selectedList]}
                        errorText={type.error}
                        multiEnable={false}
                    />
                </View>
                <View style={styles.inputBlock}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, value } }) => (
                            <InputActif
                                text={value}
                                onChangeText={onChange}
                                label={"Nom"}
                                style={{ width: "100%" }}
                                placeholder={""}
                            />
                        )}
                        name="name"
                    />
                    {errors.name && <Text numberOfLines={1} style={styles.errorYup}>{errors.name.message}</Text>}
                </View>
                <View style={styles.inputBlock}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, value } }) => (
                            <InputActif
                                text={value}
                                onChangeText={onChange}
                                label={"Hauteur (m)"}
                                style={{ width: "100%" }}
                                keyboardType={'numeric'}
                                placeholder={""}
                            />
                        )}
                        name="height"
                    />
                    {errors.height && <Text numberOfLines={1} style={styles.errorYup}>{errors.height.message}</Text>}
                </View>
                {/* <View style={styles.inputBlock}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, value } }) => (
                            <InputActif
                                text={value}
                                onChangeText={onChange}
                                label={"Longueur (m)"}
                                style={{ width: "100%" }}
                                keyboardType={'numeric'}
                                placeholder={""}
                            />
                        )}
                        name="length"
                    />
                    {errors.length && <Text numberOfLines={1} style={styles.errorYup}>{errors.length.message}</Text>}
                </View> */}
                <View style={styles.inputBlock}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, value } }) => (
                            <InputActif
                                text={value}
                                onChangeText={onChange}
                                label={"Largeur (m)"}
                                style={{ width: "100%" }}
                                keyboardType={'numeric'}
                                placeholder={""}
                            />
                        )}
                        name="width"
                    />
                    {errors.width && <Text numberOfLines={1} style={styles.errorYup}>{errors.width.message}</Text>}
                </View>
                <View style={styles.inputBlock}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, value } }) => (
                            <InputActif
                                text={value}
                                onChangeText={onChange}
                                label={"Poids (kg)"}
                                style={{ width: "100%" }}
                                keyboardType={'numeric'}
                                placeholder={""}
                            />
                        )}
                        name="weight"
                    />
                    {errors.weight && <Text numberOfLines={1} style={styles.errorYup}>{errors.weight.message}</Text>}
                </View>
                <View style={styles.inputBlock}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, value } }) => (
                            <InputActif
                                text={value}
                                onChangeText={onChange}
                                label={"Description"}
                                multiline={true}
                                height={100}
                                style={{ width: "100%", marginTop: 7 }}
                                placeholder={""}
                            />
                        )}
                        name="description"
                    />
                    {errors.description && <Text numberOfLines={1} style={styles.errorYup}>{errors.description.message}</Text>}
                </View>
            </View>
            <View style={styles.button}>
                <ButtonActif
                    background={COLORS.secondary}
                    borderColor={''}
                    onPress={hideModal}
                    textColor={COLORS.white}
                    style={{ borderRadius: SIZES.buttonRadius }}
                    title={"Fermer"}
                />
                <ButtonActif
                    background={COLORS.primary}
                    borderColor={''}
                    onPress={handleSubmit(onPressSend)}
                    textColor={COLORS.black}
                    style={{ borderRadius: SIZES.buttonRadius }}
                    title={"Sauvegarder"}
                />
            </View>
        </Modal>
    );
}

export default NewObject

const styles = StyleSheet.create({
    modalTitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    modalContent: {
        marginTop: 3,
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8
    },
    errorYup: {
        color: COLORS.secondary,
        paddingStart: 5,
        marginTop: "1%",
        width: 160
    },
    inputBlock: {
        marginTop: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%'
    }
})
