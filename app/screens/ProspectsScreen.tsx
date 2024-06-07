import { FlashList } from "@shopify/flash-list"
import { ListItem } from "app/components"
import { ILead, useStores } from "app/models"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, ViewStyle } from "react-native"
import { colors } from "../theme"
import { AppStackScreenProps } from "app/navigators"

interface LeadsScreenProps extends AppStackScreenProps<"Root"> {}

export const ProspectsScreen: FC<LeadsScreenProps> = observer(function ProspectsScreen() {
  const rootStore = useStores()
  const prospects = rootStore.Prospects

  return (
    <View style={$container}>
      <FlashList
        data={prospects.slice()}
        renderItem={({ item }: { item: ILead }) => <ListItem lead={item} />}
        estimatedItemSize={200}
        ItemSeparatorComponent={() => <View style={$separator} />}
      />
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.secondary100,
  padding: 15,
}

const $separator: ViewStyle = {
  height: 5,
}
