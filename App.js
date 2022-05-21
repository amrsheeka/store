import { onAuthStateChanged } from "firebase/auth";
import Home from "./Components/Pages/Home";
import { auth } from "./db/Config";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import Login from "./Components/Users/Login";
import Register from "./Components/Users/Register";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Cart from "./Components/cart/Cart";
import Adress from "./Components/cart/Adress";
import { getAuth } from "firebase/auth";
import Admin from "./Components/Admin/Admin";
import EditP from "./Components/Admin/EditP";
import Edit from "./Components/Admin/Edit";
import ProfileItem from "./Components/Pages/ProfileItem";
import Fpage from "./Components/Pages/Fpage";
import Product from "./Components/items/Product";
import Profile from "./Components/Pages/Profile";
import Search from "./Components/Pages/Search";
import AddP from "./Components/Admin/AddP";
import { ImageBackground } from "react-native-web";
import OrderHistory from "./Components/Pages/OrderHistory";
import UserEditInPro from "./Components/Pages/UserEditInPro";
import EditUserInfo from "./Components/Admin/EditUserInfo";
import UserSite from "./Components/Admin/UserSite";
import OrderL from './Components/Admin/OrderL';
import History from './Components/Admin/History';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const CartNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerBackground: () => (
            <View style={{ backgroundColor: "white" }}>
              <Image
                source={require("./assets/megan.png")}
                style={{ width: 80, height: 80, alignSelf: "center" }}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={{
          headerBackground: () => (
            <View style={{ backgroundColor: "white" }}>
              <Image
                source={require("./assets/megan.png")}
                style={{ width: 80, height: 80, alignSelf: "center" }}
              />
            </View>
          ),
          headerTitle: () => null,
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
      <Tab.Screen
        name="Adress"
        component={Adress}
        options={{
          headerBackground: () => (
            <View style={{ backgroundColor: "white" }}>
              <Image
                source={require("./assets/megan.png")}
                style={{ width: 80, height: 80, alignSelf: "center" }}
              />
            </View>
          ),
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};
const HomeNav = () => {
  return (
    <Stack.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerBackground: () => (
            <View style={{ backgroundColor: "white" }}>
              <Image
                source={require("./assets/megan.png")}
                style={{ width: 80, height: 80, alignSelf: "center" }}
              />
            </View>
          ),
          tabBarIcon: () => (
            <Image
              source={require("./assets/home.png")}
              style={{ width: 20, height: 20 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={{
          headerBackground: () => (
            <View style={{ backgroundColor: "white" }}>
              <Image
                source={require("./assets/megan.png")}
                style={{ width: 80, height: 80, alignSelf: "center" }}
              />
            </View>
          ),
          headerTitle: () => null,
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

const ProfileNave = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require("./assets/userrrr.png")}
              style={{ width: 20, height: 20 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ProfileItem"
        component={(props) => <ProfileItem {...props} />}
        options={{
          
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={{
          headerBackground: () => (
            <View style={{ backgroundColor: "white" }}>
              <Image
                source={require("./assets/megan.png")}
                style={{ width: 80, height: 80, alignSelf: "center" }}
              />
            </View>
          ),
          headerTitle: () => null,
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
      <Stack.Screen
        name="OrderHistory"
        component={(props) => <OrderHistory {...props} />}
        options={{
          
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
      <Stack.Screen
        name="UserEditInPro"
        component={(props) => <UserEditInPro {...props} />}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default function App() {
  const auth = getAuth();
  const userr = auth.currentUser;
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setUser(user));
    return () => {
      unsub();
    };
  }, []);

  const [user, setUser] = useState(undefined);

  //console.log(user);
  if (user) {
    const email = userr.email;
    if (email == "admin@gmail.com") {
      console.log("app", email);
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Admin"
              component={Admin}
              options={{
                title: (
                  <Image
                    source={require("./assets/megan.png")}
                    style={{ width: 80, height: 80, alignSelf: "center" }}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="EditP"
              component={EditP}
              options={{
                title: (
                  <Image
                    source={require("./assets/megan.png")}
                    style={{ width: 80, height: 80, alignSelf: "center" }}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="UserSite"
              component={UserSite}
              options={{
                title: (
                  <Image
                    source={require("./assets/megan.png")}
                    style={{ width: 80, height: 80, alignSelf: "center" }}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="AddP"
              component={AddP}
              options={{
                title: (
                  <Image
                    source={require("./assets/megan.png")}
                    style={{ width: 80, height: 80, alignSelf: "center" }}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="Edit"
              component={Edit}
              options={{
                title: (
                  <Image
                    source={require("./assets/megan.png")}
                    style={{ width: 80, height: 80, alignSelf: "center" }}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="EditUserInfo"
              component={EditUserInfo}
              options={{
                title: (
                  <Image
                    source={require("./assets/megan.png")}
                    style={{ width: 80, height: 80, alignSelf: "center" }}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="OrderL"
              component={OrderL}
              options={{
                title: (
                  <Image
                    source={require("./assets/megan.png")}
                    style={{ width: 80, height: 80, alignSelf: "center" }}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="History"
              component={History}
              options={{
                title: (
                  <Image
                    source={require("./assets/megan.png")}
                    style={{ width: 80, height: 80, alignSelf: "center" }}
                  />
                ),
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="HomeNav"
              component={HomeNav}
              options={{
                headerBackground: () => (
                  <View style={{ backgroundColor: "white" }}>
                    <Image
                      source={require("./assets/megan.png")}
                      style={{ width: 80, height: 80, alignSelf: "center" }}
                    />
                  </View>
                ),
                headerShown: false,
                tabBarIcon: () => (
                  <Image
                    source={require("./assets/home.png")}
                    style={{ width: 20, height: 20 }}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Search"
              component={Search}
              options={{
                headerShown: false,
                // headerBackground: () => (
                //   // <View style={{ backgroundColor: "white" }}>
                //   //   <Image
                //   //     source={require("./assets/megan.png")}
                //   //     style={{ width: 80, height: 80, alignSelf: "center" }}
                //   //   />
                //   // </View>
                // ),
                tabBarIcon: () => (
                  <Image
                    source={require("./assets/search.png")}
                    style={{ width: 20, height: 20 }}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="CartNav"
              component={CartNav}
              options={{
                
                headerShown: false,
                tabBarIcon: () => (
                  <Image
                    source={require("./assets/shopping-cart.png")}
                    style={{ width: 20, height: 20 }}
                  />
                ),
              }}
            />
            
            <Tab.Screen
              name="ProfileNave"
              component={ProfileNave}
              options={{
                headerShown: false,
                tabBarIcon: () => (
                  <Image
                    source={require("./assets/userrrr.png")}
                    style={{ width: 20, height: 20 }}
                  />
                ),
              }}
            />
          
            
          </Tab.Navigator>
        </NavigationContainer>
      );
    }
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Fpage"
            component={Fpage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerTransparent: true,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerTransparent: true,
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      //<fpage />
    );
  }
}
const styles = StyleSheet.create({
  // navbar: {
  //   backgroundColor: "red",
  // },
});
