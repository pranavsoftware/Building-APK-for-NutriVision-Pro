import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import DashboardScreen from '../screens/main/DashboardScreen';
import ScannerScreen from '../screens/main/ScannerScreen';
import HistoryScreen from '../screens/main/HistoryScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import ResultDetailsScreen from '../screens/main/ResultDetailsScreen';
import EditProfileScreen from '../screens/main/EditProfileScreen';
import SettingsScreen from '../screens/main/SettingsScreen';
import HelpSupportScreen from '../screens/main/HelpSupportScreen';
import AboutScreen from '../screens/main/AboutScreen';
import colors from '../styles/colors';
import typography from '../styles/typography';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DashboardStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="DashboardHome" component={DashboardScreen} />
    <Stack.Screen 
      name="ResultDetails" 
      component={ResultDetailsScreen}
      options={{
        headerShown: true,
        title: 'Food Details',
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: {
          fontWeight: typography.weightBold,
        },
      }}
    />
  </Stack.Navigator>
);

const ScannerStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="ScannerHome" component={ScannerScreen} />
    <Stack.Screen 
      name="ResultDetails" 
      component={ResultDetailsScreen}
      options={{
        headerShown: true,
        title: 'Analysis Results',
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: {
          fontWeight: typography.weightBold,
        },
      }}
    />
  </Stack.Navigator>
);

const HistoryStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="HistoryHome" component={HistoryScreen} />
    <Stack.Screen 
      name="ResultDetails" 
      component={ResultDetailsScreen}
      options={{
        headerShown: true,
        title: 'Food Details',
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: {
          fontWeight: typography.weightBold,
        },
      }}
    />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="ProfileHome" component={ProfileScreen} />
    <Stack.Screen 
      name="EditProfile" 
      component={EditProfileScreen}
      options={{
        headerShown: true,
        title: 'Edit Profile',
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: {
          fontWeight: typography.weightBold,
        },
      }}
    />
    <Stack.Screen 
      name="Settings" 
      component={SettingsScreen}
      options={{
        headerShown: true,
        title: 'Settings',
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: {
          fontWeight: typography.weightBold,
        },
      }}
    />
    <Stack.Screen 
      name="HelpSupport" 
      component={HelpSupportScreen}
      options={{
        headerShown: true,
        title: 'Help & Support',
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: {
          fontWeight: typography.weightBold,
        },
      }}
    />
    <Stack.Screen 
      name="About" 
      component={AboutScreen}
      options={{
        headerShown: true,
        title: 'About',
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: {
          fontWeight: typography.weightBold,
        },
      }}
    />
  </Stack.Navigator>
);

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Scanner') {
            iconName = focused ? 'scan' : 'scan-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: typography.caption,
          fontWeight: typography.weightMedium,
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardStack} />
      <Tab.Screen name="Scanner" component={ScannerStack} />
      <Tab.Screen name="History" component={HistoryStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
