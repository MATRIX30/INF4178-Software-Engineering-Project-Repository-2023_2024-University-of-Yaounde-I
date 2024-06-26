import { View } from "react-native"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"

export const CardLivraisonLoader = ({height}) => {


    return (
            <SkeletonPlaceholder borderRadius={4}   >
                <SkeletonPlaceholder.Item flexDirection="row" justifyContent="center" alignItems="center" width={"100%"}>
                    {/* <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} /> */}
                    <SkeletonPlaceholder.Item  width={"100%"}>
                        {/* <SkeletonPlaceholder.Item width={"80%"} height={20} /> */}
                        <SkeletonPlaceholder.Item marginTop={5} alignSelf="center" width={"90%"} height={height || 120} />
                    </SkeletonPlaceholder.Item>

                </SkeletonPlaceholder.Item>
               

            </SkeletonPlaceholder>
    )




}