import { StyleSheet, TextStyle, ViewStyle } from "react-native"
import { colors } from "./colors"

export const $title: TextStyle = {
  fontSize: 18,
  fontWeight: "500",
}

export const $root: ViewStyle = {
  flex: 1,
}

export const $button: ViewStyle = {
  padding: 10,
  backgroundColor: colors.palette.secondary200,
  borderRadius: 10,
}

export const $containers = StyleSheet.create({
  column: {
    display: "flex",
    flexDirection: "column",
    fontSize: 30,
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
})
