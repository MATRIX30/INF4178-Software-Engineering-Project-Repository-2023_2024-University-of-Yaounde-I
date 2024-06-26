import {COLORS, FONTS, SIZES} from '../../constants/theme';
import IconActif from '../../components/IconActif';
import {Text} from 'react-native-paper';
import {View, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ShowStockImage from '../../components/modals/ShowStockImage';
import {useState} from 'react';

const DetailsPaquet = ({data, paquet}) => {
  const navigation = useNavigation();

  /* Construction des valeur */
  let weight = 0;
  data?.length > 0 &&
    data?.map(item => {
      weight += item?.weight;
    });

  /* for stock images */
  const images = [
    {
      url: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/sample_img.png',
    },
    {
      url: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/sample_img.png',
    },
    {
      url: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/sample_img.png',
    },
    {
      url: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/sample_img.png',
    },
    // Add more image objects as needed
  ];

  const [visible, setVisible] = useState(false);

  return (
    <View>
      <ShowStockImage
        visible={visible}
        setVisible={setVisible}
        images={images}
      />
      <View
        style={{
          backgroundColor: COLORS.white,
          padding: 10,
          borderRadius: 10,
          gap: 10,
        }}>
        <View style={[myStyle.Display, {justifyContent: 'space-between'}]}>
          <View style={[myStyle.Display, {alignItems: 'center'}]}>
            <IconActif name={'weight-kilogram'} iconColor={COLORS.black} />
            <Text style={myStyle.text}>
              Poids :<Text style={{fontWeight: 'bold'}}> {weight}kg</Text>
            </Text>
          </View>
          <View style={[myStyle.Display, {alignItems: 'center'}]}>
            <IconActif name={'ruler'} iconColor={COLORS.black} />
            <Text style={myStyle.text}>Taille :</Text>
            <Text>
              L=
              <Text style={{fontWeight: 'bold'}}>{paquet?.height}m</Text>, l=
              <Text style={{fontWeight: 'bold'}}>{paquet?.width}m</Text>,{'\n'}
              H=
              <Text style={{fontWeight: 'bold'}}>{paquet?.height}m</Text>
            </Text>
          </View>
        </View>
        <View style={myStyle.Display}>
          <IconActif name={'package-variant'} iconColor={COLORS.black} />
          <Text style={myStyle.text}>
            Objet : <Text style={{fontWeight: 'bold'}}>{data?.length}</Text>
          </Text>
        </View>
        <View style={[myStyle.trajet, myStyle.grid]}>
          {data?.length > 0 &&
            data?.map((item, index) => {
              return (
                <View key={index + 1} style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      flex: 1,
                      borderBottomWidth: 1,
                      borderRightWidth: 1,
                      textAlign: 'center',
                      borderColor: COLORS.gray,
                    }}>
                    {index + 1}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      flex: 10,
                      borderBottomWidth: 1,
                      paddingLeft: 5,
                      borderColor: COLORS.gray,
                    }}>
                    ({item?.type}) {item?.name} | {item?.width} * {item?.height}
                    m | {item?.weight}kg
                  </Text>
                </View>
              );
            })}
        </View>
        <View style={myStyle.Display}>
          <IconActif name={'image-multiple'} iconColor={COLORS.black} />
          <Text style={myStyle.text}>
            Images du paquet (cliquer pour voir les images)
          </Text>
        </View>
        <View style={myStyle.Displayimage}>
          <StockImage
            setVisible={setVisible}
            uri={
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/sample_img.png'
            }
          />
          <StockImage
            setVisible={setVisible}
            uri={
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/sample_img.png'
            }
          />
          <StockImage
            setVisible={setVisible}
            uri={
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/sample_img.png'
            }
          />
          <StockImage
            setVisible={setVisible}
            uri={
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/sample_img.png'
            }
          />
        </View>

        <View style={myStyle.Display}>
          <IconActif
            name={'text-box-multiple-outline'}
            iconColor={COLORS.black}
          />
          <Text style={{fontWeight: 'bold'}}>Description</Text>
        </View>
        <Text style={myStyle.description}>{paquet?.description}</Text>
      </View>
    </View>
  );
};

const StockImage = ({setVisible, uri, image}) => {
  return (
    <View onTouchStart={() => setVisible(true)} style={myStyle.imageCard}>
      <Image style={myStyle.image} source={{uri: uri && uri}} />
    </View>
  );
};

const myStyle = StyleSheet.create({
  Display: {
    flexDirection: 'row',
    gap: 5,
    marginVertical: 2,
  },
  text: {color: COLORS.black},
  trajet: {
    borderWidth: 1,
    marginLeft: 20,
  },
  grid: {
    borderWidth: 2,
    width: '95%',
    flexDirection: 'column',
    borderRadius: 5,
    alignItems: 'center',
    borderColor: COLORS.gray,
    borderWidth: 1,
  },
  imageCard: {
    height: 70,
    width: 78,
    borderWidth: 1,
    borderColor: COLORS.gray,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  image: {
    height: 70,
    width: 78,
  },
  Displayimage: {
    borderWidth: 2,
    overflow: 'hidden',
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-evenly',
    marginLeft: 20,
    borderRadius: 5,
    alignItems: 'center',
    borderColor: COLORS.gray,
  },
  Display: {
    flexDirection: 'row',
    gap: 5,
    marginVertical: 2,
  },
  description: {
    fontFamily: FONTS.fontFamily,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.cardRadius,
    textAlign: 'left',
    padding: 5,
    backgroundColor: COLORS.whiteSmoke,
  },
});

export default DetailsPaquet;
