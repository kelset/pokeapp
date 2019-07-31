/**
 * @flow
 */

import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import codePush from 'react-native-code-push';
// $FlowFixMe - flow is drunk again
import { useScreens } from 'react-native-screens';
import { Provider, createClient, defaultExchanges, debugExchange } from 'urql';

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

const client = createClient({
  url: 'https://graphql-pokemon.now.sh', // Your GraphQL endpoint here
  exchanges: [debugExchange, ...defaultExchanges],
});

const AppContainer = (): React$Node => {
  return (
    <Provider value={client}>
      <AppNavigator />
    </Provider>
  );
};

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
  minimumBackgroundDuration: 60 * 3,
};

export const App = codePush(codePushOptions)(AppContainer);
