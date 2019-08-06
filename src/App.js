/**
 * @flow
 */

import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import codePush from 'react-native-code-push';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// $FlowFixMe - flow is drunk again
import { useScreens } from 'react-native-screens';

import { HomeScreen } from './HomeScreen';
import { DetailsScreen } from './DetailsScreen';

useScreens();

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Home',
      },
    },
    Details: {
      screen: DetailsScreen,
      navigationOptions: {
        title: 'Details',
      },
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const AppNavigator = createAppContainer(RootStack);

const client = new ApolloClient({
  uri: 'https://graphql-pokemon.now.sh',
});

const AppContainer = () => (
  <ApolloProvider client={client}>
    <AppNavigator />
  </ApolloProvider>
);

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
  minimumBackgroundDuration: 60 * 3,
};

export const App = codePush(codePushOptions)(AppContainer);
