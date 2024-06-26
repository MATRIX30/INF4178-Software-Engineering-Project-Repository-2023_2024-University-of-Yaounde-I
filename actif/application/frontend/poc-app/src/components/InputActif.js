import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {COLORS, SIZES} from '../constants/theme';

const InputActif = ({
  type,
  text,
  keyboardType,
  label,
  style,
  multiline,
  editable,
  onChangeText,
  placeholder,
  icon,
  height,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextInput
      mode="outlined"
      label={label}
      value={text}
      placeholder={placeholder}
      placeholderTextColor={COLORS.gray}
      onChangeText={onChangeText}
      style={{height: height, backgroundColor: COLORS.whiteSmoke, ...style}}
      outlineColor={COLORS.primary}
      outlineStyle={[
        {
          borderColor: COLORS.gray,
          borderRadius: SIZES.radius,
        },
      ]}
      activeOutlineColor={COLORS.black}
      keyboardType={keyboardType}
      multiline={multiline || false}
      editable={editable || true}
      secureTextEntry={
        showPassword == true ? type == 'text' : type == 'password'
      }
      right={
        (icon || type == 'password') && (
          <TextInput.Icon
            onPress={() => {
              showPassword ? setShowPassword(false) : setShowPassword(true);
            }}
            icon={
              type == 'password' ? (showPassword ? 'eye-off' : 'eye') : icon
            }
          />
        )
      }
    />
  );
};

export default InputActif;
