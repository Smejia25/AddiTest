// @ts-nocheck
import { createDrawerNavigator } from "@react-navigation/drawer"
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { ILead } from "app/models"
import * as Screens from "app/screens"
import { colors } from "app/theme"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"

export type AppStackParamList = {
  Root: { screen: "Prospects" | "leads" }
  Settings: undefined
  LeadDetail: {
    lead: ILead
  }
}

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

const Stack = createNativeStackNavigator<AppStackParamList>()
const Drawer = createDrawerNavigator()

const DrawerStack = observer(function DrawerStack() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Leads" component={Screens.LeadsScreen} />
      <Drawer.Screen name="Prospects" component={Screens.ProspectsScreen} />
    </Drawer.Navigator>
  )
})

const AppStack = observer(function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true, navigationBarColor: colors.background }}>
      <Stack.Screen name="Root" component={DrawerStack} options={{ headerShown: false }} />
      <Stack.Screen
        name="LeadDetail"
        options={{ title: "Lead Detail" }}
        component={Screens.LeadDetailScreen}
      />
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  return (
    <NavigationContainer theme={colorScheme === "dark" ? DarkTheme : DefaultTheme} {...props}>
      <AppStack />
    </NavigationContainer>
  )
})
