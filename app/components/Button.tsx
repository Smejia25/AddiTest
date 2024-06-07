import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, ViewStyle, Text } from "react-native"
import { AnimatedPressable } from "./AnimatedPressable"

export interface ButtonProps {

  onPress?: () => void
  text: string
  style?: StyleProp<ViewStyle>
  disabled?: boolean
}


export const Button = observer(function Button(props: ButtonProps) {
  const { style, text, onPress, disabled } = props

  const onPressed = () => {
    if (!disabled && onPress) onPress()
  }

  return (
    // @ts-expect-error
    <AnimatedPressable onPress={onPressed} style={{ ...style, ...(disabled ? $disabled : {}) }}>
      <Text>{text}</Text>
    </AnimatedPressable>
  )
})

const $disabled: ViewStyle = {
  opacity: 0.5,
}
