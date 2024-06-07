import { colors } from "app/theme"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { Icon } from "./Icon"

export interface CheckProps {
  size?: number
  style?: StyleProp<ViewStyle>
  checked?: boolean | undefined
}

export const Check = observer(function Check(props: CheckProps) {
  const { style, size = 22, checked } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      {typeof checked === "undefined" ? (
        ""
      ) : checked ? (
        <Icon icon="check" size={size} color="green" />
      ) : (
        <Icon icon="x" size={size} color="red" />
      )}
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  borderWidth: 1,
  borderColor: colors.palette.neutral500,
  borderRadius: 20,
  padding: 1,
  minWidth: 26,
  minHeight: 26,
}
