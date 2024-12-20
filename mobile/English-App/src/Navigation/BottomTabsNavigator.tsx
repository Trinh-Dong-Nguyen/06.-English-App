import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Icon } from "@rneui/themed";

import Home from "../screens/Home/Home";
import Profile from "../screens/Profile/Profile";

import Vocabulary from "../screens/Vocabulary";

import Grammar from "../screens/Grammar";
import Learning from "../screens/Learning";
import MainHeader from "../components/MainHeader";
const Tab = createMaterialBottomTabNavigator();

export default function BottomTabsNavigator() {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Reading"
        activeColor="#5D5FEF"
        inactiveColor="#A5A6F6"
        barStyle={{
          height: 60,
          marginBottom: 10,
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#FCDDEC",
        }}
      >
        <Tab.Screen
          name="home"
          component={Home} // change this to HomeScreen later
          options={{
            tabBarLabel: "Home",

            tabBarIcon: ({ color }) => (
              <Icon name="home" type="ant-design" color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="learning"
          component={Learning} // change this to LearningScreen later
          options={{
            tabBarLabel: "Learning",
            tabBarIcon: ({ color }) => (
              <Icon name="school" type="material" color={color} />
            ),
          }}
        />
        {/* <Tab.Screen
          name="vocabulary"
          component={Vocabulary} // change this to VocabularyScreen later
          options={{
            tabBarLabel: "Vocabulary",
            tabBarIcon: ({ color }) => (
              <Icon name="menu-book" type="material" color={color} />
            ),
          }}
        /> */}
        <Tab.Screen
          name="grammar"
          component={Grammar} // change this to GrammarScreen later
          options={{
            tabBarLabel: "Grammar",
            tabBarIcon: ({ color }) => (
              <Icon name="spellcheck" type="material" color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="profile"
          component={Profile} // change this to ProfileScreen later
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => (
              <Icon name="person-outline" type="material" color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
