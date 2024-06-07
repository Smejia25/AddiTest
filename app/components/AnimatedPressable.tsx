import { observer } from "mobx-react-lite"
import * as React from "react"
import { Pressable, StyleProp, ViewStyle } from "react-native"
import Animated, { useSharedValue, withSpring } from "react-native-reanimated"
export interface AnimatedPressableProps {
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  children: React.ReactNode
}

const PressableContainer = Animated.createAnimatedComponent(Pressable)

export const AnimatedPressable = observer(function AnimatedPressable(
  props: AnimatedPressableProps,
) {
  const { style, onPress, children } = props
  const $styles = style

  const opacity = useSharedValue(1)

  const handlePressIn = () => {
    opacity.value = withSpring(0.5)
  }

  const handlePressOut = () => {
    opacity.value = withSpring(1)
  }

  return (
    <PressableContainer
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      // @ts-ignore
      style={{ opacity, ...$styles }}
    >
      {children}
    </PressableContainer>
  )
})
