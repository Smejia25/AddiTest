import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, Text } from "react-native"
import { observer } from "mobx-react-lite"
import { colors } from "app/theme"

export interface InfoTextProps {

  text: string
  label: string
  style?: StyleProp<ViewStyle>
}


export const InfoText = observer(function InfoText(props: InfoTextProps) {
  const { style, text, label } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <Text style={$label}>{label}</Text>
      <Text style={$text}>{text}</Text>
    </View>
  )
})

const $label: TextStyle = {
  fontSize: 15,
  color: colors.palette.neutral500,
}

const $text: TextStyle = {
  fontSize: 17,
  fontWeight: "400",
  color: colors.text,
}

const $container: ViewStyle = {
  justifyContent: "center",
}
