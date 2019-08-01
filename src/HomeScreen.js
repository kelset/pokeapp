/**
 * @flow
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import type { NavigationScreenProp } from 'react-navigation';

type Props = {
  navigation: NavigationScreenProp<any>,
};

const PokemonsQuery = gql`
  query pokemons {
    pokemons(first: 10) {
      number
      name
      classification
      image
      types
    }
  }
`;

export function HomeScreen(props: Props): React$Node {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        accessibilityLabel="Go to details"
        accessibilityComponentType="button"
        accessibilityTraits="button"
        onPress={() => props.navigation.navigate('Details')}
      >
        <Text style={styles.welcome}>Hello this is the home screen</Text>
      </TouchableOpacity>
      <Query query={PokemonsQuery}>
        {({ loading, error, data }): React$Node => {
          if (loading) return <Text>Loading...</Text>;
          if (error) return <Text>Error</Text>;

          console.log('yo', data);

          return <Text>{`I got ${data.pokemons.length} pokemons`}</Text>;
        }}
      </Query>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
