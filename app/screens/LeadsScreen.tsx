import { FlashList } from "@shopify/flash-list"
import { ListItem } from "app/components"
import { ILead, useStores } from "app/models"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, ViewStyle } from "react-native"
import { colors } from "../theme"
import { AppDrawerScreenProps,  } from "app/navigators"

interface LeadsScreenProps extends AppDrawerScreenProps<"Leads"> {}

export const LeadsScreen: FC<LeadsScreenProps> = observer(function LeadsScreen({ navigation }) {
  const rootStore = useStores()
  const leads = rootStore.leads

  return (
    <View style={$container}>
      <FlashList
        data={leads.slice()}
        renderItem={({ item }: { item: ILead }) => (
          <ListItem onPress={() => navigation.navigate("LeadDetail", { lead: item })} lead={item} />
        )}
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
