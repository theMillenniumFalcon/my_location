import React, { useState } from "react"
import { DefaultTheme, Provider as PaperProvider, BottomNavigation } from "react-native-paper"

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
const Stack = createStackNavigator()

import { HomeScreen } from "./src/screens/Home"
import { NearbyScreen } from "./src/screens/Nearby"
import { TraceRouteScreen } from "./src/screens/TraceRoute"

const TabsNavigation = () => {
  const [index, setIndex] = useState(1)
  const [routes] = React.useState([
    { key: "traceRoute", title: "Trace Route", icon: "pin" },
    { key: "home", title: "Home", icon: "home" },
    { key: "nearby", title: "Who's near me", icon: "map" },
  ])

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    nearby: NearbyScreen,
    traceRoute: TraceRouteScreen,
  })

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  )
}

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FAFAFA",
    secondary: "white",
    accent: "#F24744",
  },
}

function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <TabsNavigation />
      </NavigationContainer>
    </PaperProvider>
  )
}

export default App