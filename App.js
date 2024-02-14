import { StatusBar } from "expo-status-bar";
//react-nevigator
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//context
import ExpensesContextProvider from "./store/expense-contex";
//screens
import ManageExpenses from "./screens/ManageExpense";
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";
//other comps
import IconButton from "./components/UI/IconButton";
//style
import { GlobalStyles } from "./constants/styles";
//Icons
import { Ionicons } from "@expo/vector-icons";
const { primary500 } = GlobalStyles.colors;
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();
function ExpensesOverView() {
  return (
    <BottomTabs.Navigator
      screenOptions={({navigation})=>({
        headerStyle: { backgroundColor: primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageExpense");
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}
export default function App() {
  return (
    <>
    <StatusBar style="light" />
     <ExpensesContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpensesOverView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ManageExpense"
            component={ManageExpenses}
            //the "presentaion" property open the screen as modal on IOS, it doesn't has impact on android
            options={{ presentation: "modal" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpensesContextProvider>  
</>
  );
}
