import { Dimensions, StyleSheet } from "react-native";

export const COLORS = { 
  primary: "#FFC803",
  secondary: "#EE1F1F",
  white: "#f5f6fa",
  whiteSmoke: "#ffffff",
  cleanRed: "#FFECF0",
  black: "#000000",
  gray: "#E2E2E2",
  grey: "#727272",
  bg: 'rgba(0,0,0,0.025)',
  borderColor: "#707070",
  secondaryGray : "#F1F1F1"
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 10,
  buttonRadius: 20,
  radiusHeader: 20,
  padding: 24,
  cardRadius: 5,
  button : {
    radius: 20,

  },

  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 20,
  body: 17,
  input: 17,
  textButton: 17,
  pageTitle: 17,
  menuText: 12.1,
  topNav: 16,
  subText: 8.5,

  // Icons size width & height
  icon: 20,
  avatar: 40
};

export const STYLES = StyleSheet.create({
  mainLayout: {
    padding: 10,
    flex : 1,
     backgroundColor :  COLORS.bg,
    //  minHeight : Dimensions.get('screen').height
  },
  item: {
    flex: 2,
    width: Dimensions.get("screen").width / 2 - 13
  },
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  // Ajouts
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textStart: {
    alignSelf: "flex-start",
  },

  headerText: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    marginBottom: SIZES.base,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.borderRadius,
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.padding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.body,
    fontWeight: 'bold',
  },
});

export const FONTS = {
  // Aria
  fontFamily: "Arial, Helvetica, sans-serif"
};