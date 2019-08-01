/**
 * @flow
 */

import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import type { NavigationScreenProp } from 'react-navigation';

type Props = {
  navigation: NavigationScreenProp<any>,
};

type Pokemon = {
  number: number,
  name: String,
  classification: string,
  image: string,
  types: [string],
};

const PokemonsQuery = gql`
  query pokemons {
    pokemons(first: 40) {
      number
      name
      classification
      image
      types
    }
  }
`;

const renderItem = (pokemon: { number: number, name: string }) => (
  <View key={pokemon.number} style={{ backgroundColor: 'coral', margin: 30 }}>
    <Text>{pokemon.name}</Text>
  </View>
);

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

      <Query query={PokemonsQuery} style={{ flex: 1 }}>
        {({
          loading,
          error,
          data,
        }: {
          loading: boolean,
          error: Object,
          data: { pokemons: [Pokemon] },
        }): React$Node => {
          if (loading) return <Text>Loading...</Text>;
          if (error) return <Text>Error :(</Text>;

          console.log('hey here are my data', data.pokemons);
          // $FlowFixMe
          return <FlatList data={data.pokemons} renderItem={renderItem} />;
        }}
      </Query>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
