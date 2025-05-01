import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_POKEMON } from "@/utils/queries/getPokemon";
import client from "@/lib/apolloClient";

type PokemonProps = {
  name: string;
};

const Pokemon: React.FC<PokemonProps> = ({ name }) => {
  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: { name },
    client: client,
  });

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error! {error.message}</Text>;

  const pokemon = data.pokemon_v2_pokemon[0];

  return (
    <View>
      <Text>Name: {pokemon.name}</Text>
      <Text>Height: {pokemon.height}</Text>
      <Text>Weight: {pokemon.weight}</Text>
    </View>
  );
};

export default Pokemon;
