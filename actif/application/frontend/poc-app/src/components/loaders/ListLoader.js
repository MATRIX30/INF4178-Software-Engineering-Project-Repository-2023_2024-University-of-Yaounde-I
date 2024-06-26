import { Text } from "react-native-paper"
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { CardLivraisonLoader } from "./Skeletons";
import { COLORS } from "../../constants/theme";
export const ListLoader = ({ number, height }) => {

    const sk = <CardLivraisonLoader height={height}/>
    var sks = []
    // console.log("🚀 ~ file: ListLoader.js:18 ~ ListLoader ~ number:", number)
    for (let index = 0; index < number; index++) {
        // console.log("🚀 ~ file: ListLoader.js:19 ~ ListLoader ~ index:", index)
        sks.push(sk)

    }
        // console.log("🚀 ~ file: ListLoader.js:21 ~ ListLoader ~ sks:", sks)

    return (
        <>
            <Text style={{ color: COLORS.black, textAlign: 'center' }}>
                Chargement en cours
            </Text>

            {sks?.map((s) => {
                return s
            })}
        </>
    )
}