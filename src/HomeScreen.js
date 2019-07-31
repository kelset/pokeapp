/**
 * @flow
 */

import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useQuery } from 'urql';
import gql from 'graphql-tag';

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
  const [result] = useQuery({ query: PokemonsQuery });

  const { fetching, data, error } = result;

  if (error) {
    return <Text>{result.error.message}</Text>;
  }

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
      {fetching ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text
          style={styles.welcome}
        >{`I have a list of ${data.length} Pokemons`}</Text>
      )}
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
