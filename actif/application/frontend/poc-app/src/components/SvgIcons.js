import React from 'react'
import { View } from 'react-native'
import HomeSvg from "../../assets/icons/home.svg"
import DeliverySvg from "../../assets/icons/delivery-svgrepo-com.svg"
import PacketSvg from "../../assets/icons/package-svgrepo-com.svg"
import MailSendReceiveSvg from "../../assets/icons/mail-send-receive-symbolic-svgrepo-com.svg"
import MoreSvg from "../../assets/icons/more-circle-svgrepo-com.svg"
import NotificationSvg from "../../assets/icons/notification-bell-svgrepo-com.svg"
import ArrowRightSvg from "../../assets/icons/arrow-right-svgrepo-com.svg"
import CommissionSvg from "../../assets/icons/dividend-cap-gains-svgrepo-com.svg"
import WithdrawSvg from "../../assets/icons/withdraw-svgrepo-com.svg"
import DepositSvg from "../../assets/icons/deposit-svgrepo-com.svg"
import ScanSvg from "../../assets/icons/scan-svgrepo-com.svg"
import MenuSvg from "../../assets/icons/menu-svgrepo-com.svg"
import AccountSvg from "../../assets/icons/account-settings-svgrepo-com.svg"
import SignOutSvg from "../../assets/icons/sign-out-svgrepo-com.svg"
import DistanceSvg from "../../assets/icons/distance-svgrepo-com.svg"

import { COLORS, SIZES } from '../constants/theme'

const HomeIcon = ({ color, size }) => {
  return (
    <View>
      <HomeSvg strokeWidth={1.5} width={size ? size : SIZES.icon} height={size ? size : SIZES.icon} stroke={color} />
    </View>
  )
}

const DeliveryIcon = ({ color }) => {
  return (
    <View>
      <DeliverySvg strokeWidth={1.5} width={SIZES.icon} height={SIZES.icon} stroke={color} />
    </View>
  )
}

const PacketIcon = ({ color, size }) => {
  return (
    <View>
      <PacketSvg strokeWidth={1.5} width={size ? size : SIZES.icon} height={size ? size : SIZES.icon} stroke={color} />
    </View>
  )
}

const MailSendReceiveIcon = ({ color, size }) => {
  return (
    <View>
      <MailSendReceiveSvg strokeWidth={1.5} fill={"#1C274C"} width={size ? size : SIZES.icon} height={size ? size : SIZES.icon} stroke={color} />
    </View>
  )
}

const MoreCircleIcon = ({ color, size }) => {
  return (
    <View>
      <MoreSvg strokeWidth={1.5} width={size ? size : SIZES.icon} height={size ? size : SIZES.icon} stroke={color} />
    </View>
  )
}

const NotificationIcon = ({ color, size, onPress }) => {
  return (
    <View>
      <NotificationSvg onPress={onPress} strokeWidth={1.5} width={size ? size : 35.06} height={size ? size : 40} fill={color ? color : COLORS.cleanRed} />
    </View>
  )
}

const ArrowRightIcon = () => {
  return (
    <View>
      <ArrowRightSvg strokeWidth={1.5} width={21.42} height={17} fill={COLORS.primary} />
    </View>
  )
}

const DistanceIcon = ({color, size}) => {
  return (
    <View>
      <DistanceSvg strokeWidth={3} width={size ? size : SIZES.icon} height={size ? size : SIZES.icon} fill={color ? color : COLORS.primary} />
    </View>
  )
}

const CommissionIcon = () => {
  return (
    <View>
      <CommissionSvg strokeWidth={1.5} width={SIZES.icon} height={SIZES.icon} fill={COLORS.primary} />
    </View>
  )
}

const WithdrawIcon = () => {
  return (
    <View>
      <WithdrawSvg strokeWidth={1.5} width={SIZES.icon} height={SIZES.icon} fill={COLORS.primary} />
    </View>
  )
}

const DepositIcon = ({ color, }) => {
  return (
    <View>
      <DepositSvg strokeWidth={1.5} width={SIZES.icon} height={SIZES.icon} fill={color ? color : COLORS.primary} />
    </View>
  )
}

const ScanIcon = ({ size, color }) => {
  return (
    <View>
      <ScanSvg strokeWidth={1.5} width={size ? size : SIZES.icon} height={size ? size : SIZES.icon} fill={color ? color : COLORS.primary} />
    </View>
  )
}

const MenuIcon = ({ size }) => {
  return (
    <View>
      <MenuSvg strokeWidth={1.5} width={size ? size : SIZES.icon} height={size ? size : SIZES.icon} fill={COLORS.black} />
    </View>
  )
}

const AccountIcon = ({ size, color }) => {
  return (
    <View>
      <AccountSvg strokeWidth={1.5} width={size ? size : SIZES.icon} height={size ? size : SIZES.icon} fill={color ? color : COLORS.black} />
    </View>
  )
}

const SignOutIcon = ({ size, color }) => {
  return (
    <View>
      <SignOutSvg strokeWidth={1.5} width={size ? size : SIZES.icon} height={size ? size : SIZES.icon} fill={color ? color : COLORS.black} />
    </View>
  )
}





export { HomeIcon, DistanceIcon, SignOutIcon, AccountIcon, MenuIcon, ScanIcon, WithdrawIcon, DepositIcon, DeliveryIcon, PacketIcon, MailSendReceiveIcon, MoreCircleIcon, NotificationIcon, CommissionIcon, ArrowRightIcon }
