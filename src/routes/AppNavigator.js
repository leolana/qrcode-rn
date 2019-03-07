import React from 'react';
import {
  Router,
  Scene,
  Stack,
  Tabs,
} from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';

import SignUpContainer from '../containers/SignUp';
import SignUpComponent from '../components/SignUp';

import LoginContainer from '../containers/Login';
import LoginComponent from '../components/Login';

import ForgotPasswordContainer from '../containers/ForgotPassword';
import ForgotPasswordComponent from '../components/ForgotPassword';

import AppConfig from '../constants/config';

import RecipesContainer from '../containers/Recipes';
import RecipesComponent from '../components/Recipes';
import RecipeViewComponent from '../components/Recipe';

import LocaleContainer from '../containers/Locale';
import LocaleComponent from '../components/Locale';

import UpdateProfileContainer from '../containers/UpdateProfile';
import UpdateProfileComponent from '../components/UpdateProfile';

import MemberContainer from '../containers/Member';
import ProfileComponent from '../components/Profile';

import ScanScreen from '../components/ScanScreen';

const AppNavigator = (
  <Router>
    <Scene key="root">
      {/* Authentications */}
      <Scene
        hideNavBar
        key="login"
        title="LOGIN"
        {...DefaultProps.navbarProps}
        component={LoginContainer}
        Layout={LoginComponent}
      />

      <Scene
        back
        hideNavBar
        key="signUp"
        title="SIGN UP"
        {...DefaultProps.navbarProps}
        component={SignUpContainer}
        Layout={SignUpComponent}
      />

      <Scene
        back
        hideNavBar
        key="forgotPassword"
        title="FORGOT PASSWORD"
        {...DefaultProps.navbarProps}
        component={ForgotPasswordContainer}
        Layout={ForgotPasswordComponent}
      />

      {/* Main */}
      <Scene
        hideNavBar
        back
        clone
        key="recipe"
        title="RECIPE"
        {...DefaultProps.navbarProps}
        component={RecipesContainer}
        Layout={RecipeViewComponent}
      />

      {/* Tabs... */}
      <Scene
        hideNavBar
        key="tabbar"
      >
        <Tabs
          swipeEnabled
          type="replace"
          showLabel={false}
          {...DefaultProps.tabProps}
        >
          <Stack
            hideNavBar
            title={AppConfig.appName.toUpperCase()}
            icon={() => <Icon name="camera" {...DefaultProps.icons} />}
            {...DefaultProps.navbarProps}
          >
            <Scene key="home" component={ScanScreen} />
          </Stack>

          <Stack
            hideNavBar
            key="recipes"
            title="RECIPES"
            icon={() => <Icon name="book" {...DefaultProps.icons} />}
            {...DefaultProps.navbarProps}
          >
            <Scene key="recipes" component={RecipesContainer} Layout={RecipesComponent} />
          </Stack>

          <Stack
            hideNavBar
            key="profile"
            title="PROFILE"
            icon={() => <Icon name="contact" {...DefaultProps.icons} />}
            {...DefaultProps.navbarProps}
          >
            <Scene key="profileHome" component={MemberContainer} Layout={ProfileComponent} />
            <Scene
              back
              key="locale"
              title="CHANGE LANGUAGE"
              {...DefaultProps.navbarProps}
              component={LocaleContainer}
              Layout={LocaleComponent}
            />
            <Scene
              back
              key="updateProfile"
              title="UPDATE PROFILE"
              {...DefaultProps.navbarProps}
              component={UpdateProfileContainer}
              Layout={UpdateProfileComponent}
            />
          </Stack>
        </Tabs>
      </Scene>
    </Scene>
  </Router>
);

export default AppNavigator;
