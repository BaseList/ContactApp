/* eslint-disable prettier/prettier */
import React from 'react';
import {  createStackNavigator, createAppContainer } from 'react-navigation';
import SplashScreen from '@Screen/SplashScreen';
import MemberHome from '@Screen/Home';
import MemberAdd from '@Screen/Home/ContactAdd';
import MemberEdit from '@Screen/Home/ContactEdit';
import MemberDetail from '@Screen/Home/ContactDetail';

import NavigationService from '@Service/Navigation';

const AppNav = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
    },
    MemberHome: {
      screen: MemberHome,
    },
    MemberDetail: {
      screen: MemberDetail,
    },
    MemberAdd: {
      screen: MemberAdd,
    },
    MemberEdit: {
      screen: MemberEdit,
    }
  },
  {
    headerMode: 'none',
    initialRouteName: 'SplashScreen',
  }
);

const RootApp = createAppContainer(AppNav);

export default class App extends React.Component {
  render() {
    return (
      <RootApp ref={(r) => {NavigationService.setTopLevelNavigator(r);}}/>
    );
  }
}
