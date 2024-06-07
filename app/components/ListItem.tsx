import { ILead } from "app/models"
import { colors } from "app/theme"
import * as React from "react"
import { ImageStyle, StyleProp, Text, TextStyle, View, ViewStyle } from "react-native"
import { AnimatedPressable } from "./AnimatedPressable"
import { AutoImage } from "./AutoImage"
import { Check } from "./Check"
import { observer } from "mobx-react-lite"
import { isProspect } from "app/utils/leads"

export interface ListItemProps {
  lead: ILead
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}

export const ListItem = observer(function ListItem(props: ListItemProps) {
  const { style, lead, onPress } = props
  const $styles = [$container, style]

  return (
    <AnimatedPressable onPress={onPress} style={$pressableContainer}>
      <View style={$styles}>
        <AutoImage
          source={{
            uri: lead.url,
          }}
          maxWidth={50}
          style={$image}
        />
        <Text>
          <Text style={$text}>{`${lead.firstName} ${lead.lastName}`}</Text>
          {"\n"}

          <Text>ID: {lead.guid}</Text>
        </Text>
        {
          <View style={$checksContainer}>
            <Check checked={lead.registryCheck} />
            <Check checked={lead.recordsCheck} />
            <Check checked={isProspect(lead.score)} />
          </View>
        }
      </View>
    </AnimatedPressable>
  )
})

const $pressableContainer = {
  backgroundColor: colors.background,
  borderRadius: 10,
}

const $image: ImageStyle = { borderRadius: 100, minHeight: 50, minWidth: 50 }

const $checksContainer: ViewStyle = { display: "flex", flexDirection: "row", gap: 4 }

const $container: ViewStyle = {
  justifyContent: "space-between",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 5,

  padding: 10,
}

const $text: TextStyle = {
  fontWeight: "600",
}
