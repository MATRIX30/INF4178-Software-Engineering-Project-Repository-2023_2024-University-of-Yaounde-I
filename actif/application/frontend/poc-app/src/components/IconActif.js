import {Icon} from 'react-native-paper';
import {COLORS, SIZES} from '../constants/theme';
import {TouchableOpacity} from 'react-native';

const IconActif = ({name, iconColor, size, onPress, style}) => {
  return onPress ? (
    <TouchableOpacity onPress={onPress}>
      <Icon
        source={name || 'camera'}
        color={iconColor || COLORS.primary}
        size={size || SIZES.icon}
        // onPress={() => console.log('Pressed')}
        // onPress={onPress}
        style={[{borderRadius: SIZES.button.radius}, style]}
      />
    </TouchableOpacity>
  ) : (
    <Icon
      source={name || 'camera'}
      color={iconColor || COLORS.primary}
      size={size || SIZES.icon}
      // onPress={() => console.log('Pressed')}
      // onPress={onPress}
      style={[{borderRadius: SIZES.button.radius}, style]}
    />
  );
};

export default IconActif;
