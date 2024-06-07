import { AutoImage, Button, Check, InfoText } from "app/components"
import { useStores } from "app/models"
import { AppStackScreenProps } from "app/navigators"
import { $button, $containers, $root, $title, colors } from "app/theme"
import { isProspect } from "app/utils/leads"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ImageStyle, Text, TextStyle, View, ViewStyle } from "react-native"

interface LeadDetailScreenProps extends AppStackScreenProps<"LeadDetail"> {}

export const LeadDetailScreen: FC<LeadDetailScreenProps> = observer(function LeadDetailScreen({
  route,
  navigation,
}) {
  const { lead } = route.params
  const rootStore = useStores()

  const runBackgroundChecks = () => {
    lead.getBackgroundChecks()
  }

  const score = () => {
    lead.getScore()
  }

  const promote = () => {
    rootStore.promote(lead)
    navigation.navigate("Root", { screen: "Prospects" })
  }

  return (
    <View style={$root}>
      <AutoImage
        source={{
          uri: lead.url,
        }}
        maxWidth={125}
        style={$profileImg}
      />
      <View style={$leadDetails}>
        <InfoText label="Lead Name" text={`${lead.firstName} ${lead.lastName}`} />
        <InfoText label="Email" text={`${lead.email} `} />
        <InfoText label="Birth Date" text={`${lead.birthDate} `} />
        <InfoText label="ID Number" text={`${lead.guid} `} />
      </View>
      <View style={$checksContainer}>
        <View style={$checkButtonContainer}>
          <Text style={$title}> Background Checks </Text>

          <Button
            text="Run Checks"
            disabled={lead.recordsCheck !== undefined && lead.registryCheck !== undefined}
            onPress={runBackgroundChecks}
            style={$button}
          />
        </View>
        <View style={$check}>
          <Text style={$checkText}> National registry Verification</Text>
          <Check checked={lead.registryCheck} />
        </View>

        <View style={$check}>
          <Text style={$checkText}> Judicial Records Verification </Text>
          <Check checked={lead.recordsCheck} />
        </View>

        <View style={$checkButtonContainer}>
          <Text style={$title}> Qualification Check </Text>

          <Button
            disabled={(!lead.recordsCheck && !lead.registryCheck) || !!lead.score}
            text="Get Score"
            onPress={score}
            style={$button}
          />
        </View>
        <View style={$check}>
          <Text style={$checkText}>{` Score: ${lead.score}`}</Text>
          <Check checked={isProspect(lead.score)} />
        </View>
        <Button
          disabled={!isProspect(lead.score)}
          text="Promote to Prospect"
          onPress={promote}
          style={{ ...$button, ...$promoteButton }}
        />
      </View>
    </View>
  )
})

const $profileImg: ImageStyle = {
  borderRadius: 10,
  alignSelf: "center",
  marginTop: 20,
}

const $promoteButton: ViewStyle = {
  alignSelf: "center",
}

const $leadDetails: ViewStyle = {
  ...$containers.column,
  alignItems: "flex-start",
  gap: 20,
  padding: 35,
}

const $checksContainer: ViewStyle = {
  flex: 1,
  ...$containers.column,
  alignItems: "flex-start",
  gap: 15,
  paddingHorizontal: 30,
}

const $checkButtonContainer: ViewStyle = {
  ...$containers.row,
  justifyContent: "space-between",
  width: "100%",
  alignItems: "baseline",
}

const $check: ViewStyle = {
  ...$containers.row,
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
}

const $checkText: TextStyle = {
  color: colors.textDim,
  paddingLeft: 10,
}
