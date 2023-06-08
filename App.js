import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import Home from "./Home";
import Settings from "./Settings";
import Recipes from "./Recipes";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Shopping List") {
              iconName = focused ? "ios-list" : "ios-list-outline";
            } else if (route.name === "Expiration Date") {
              iconName = focused ? "hourglass" : "hourglass-outline";
            } else if (route.name === "Recipes") {
              iconName = focused ? "pizza" : "pizza-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "slateblue",
          tabBarInactiveTintColor: "#000",
        })}
      >
        <Tab.Screen name="Shopping List" component={Home} />
        <Tab.Screen name="Expiration Date" component={Settings} />
        <Tab.Screen name="Recipes" component={Recipes} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
