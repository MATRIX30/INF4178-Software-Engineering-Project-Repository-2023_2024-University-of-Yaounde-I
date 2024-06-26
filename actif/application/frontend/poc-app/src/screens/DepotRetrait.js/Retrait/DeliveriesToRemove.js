import React from 'react'
import { View, FlatList } from 'react-native'
import { DistanceIcon, PacketIcon } from '../../../components/SvgIcons'
import ButtonActif from '../../../components/ButtonActif'
import { COLORS, SIZES, STYLES } from '../../../constants/theme'
import LivreurListItem from '../../../components/LivreurListItem'

const deliveries = [
    {
        Idpoc: 'PO123476',
        ville: "Yaounde",
        address: "Nsimeyong",
        nbcolis: 14,
    },
    {
        Idpoc: 'PO123472',
        ville: "Yaounde",
        address: "Nsimeyong 2",
        nbcolis: 12,
    },
    {
        Idpoc: 'PO123473',
        ville: "Yaounde",
        address: "Awae",
        nbcolis: 15,
    },
]

const DeliveriesToRemove = ({ navigation }) => {
    return (
        <View style={[STYLES.mainLayout]}>
            <FlatList
                data={deliveries} renderItem={(item) => <LivreurListItem
                    iconStartLeft={"account"}
                    iconEndLeft={<PacketIcon color={COLORS.black} size={25} />}
                    key={item?.Idpoc} data={item} />} />
        </View>
    )
}

export default DeliveriesToRemove
