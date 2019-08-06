/**
 * @flow
 */

import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
// import { useNavigation } from 'react-navigation-hooks';

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

// const renderItem = ({ item }: { item: Object }): React$Node => {
//   const { navigate } = useNavigation();

//   return (
//     <TouchableOpacity
//       accessibilityLabel="Go to pokemon details"
//       accessibilityComponentType="button"
//       accessibilityTraits="button"
//       onPress={() => navigate('Details')}
//       style={styles.itemRow}
//     >
//       <Text>{item.name}</Text>
//     </TouchableOpacity>
//   );
// };

// $FlowFixMe
const keyExtractor = (item, index): string => item.number;

export function HomeScreen(props: Props): React$Node {
  const renderItem = ({ item }: { item: Object }): React$Node => {
    return (
      <TouchableOpacity
        accessibilityLabel="Go to pokemon details"
        accessibilityComponentType="button"
        accessibilityTraits="button"
        onPress={() => props.navigation.navigate('Details', { item })}
        style={styles.itemRow}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Hello this is the home screen</Text>

      <Query query={PokemonsQuery} style={styles.flex1}>
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

          return (
            <FlatList
              data={data.pokemons}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              style={styles.flex1}
            />
          );
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
  itemRow: {
    flex: 1,
    height: 30,
    marginVertical: 10,
  },
  flex1: {
    flex: 1,
  },
});
