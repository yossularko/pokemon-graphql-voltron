import { useLocalSearchParams } from "expo-router";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { detailIdAtom } from "../_layout";
import { useQuery } from "@apollo/client";
import {
  GET_POKEMON_DETAIL,
  GET_POKEMON_SPECIES_DETAIL,
} from "@/utils/queries/getPokemon";
import client from "@/lib/apolloClient";
import { PokemonDetail, PokemonSpeciesDetail } from "@/types/indes";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const setId = useSetAtom(detailIdAtom);
  const [speciesId, setSpeciesId] = useState(0);

  const { loading, error, data } = useQuery<{
    pokemon_v2_pokemon: PokemonDetail[];
  }>(GET_POKEMON_DETAIL, {
    variables: { id: Number(id) },
    client: client,
  });

  const {
    loading: loadingSpecies,
    error: errorSpecies,
    data: dataSpecies,
  } = useQuery<{ pokemon_v2_pokemonspecies: PokemonSpeciesDetail[] }>(
    GET_POKEMON_SPECIES_DETAIL,
    {
      variables: { speciesId: speciesId },
      client: client,
      skip: speciesId ? false : true,
    }
  );

  useEffect(() => {
    if (data) {
      if (data.pokemon_v2_pokemon.length !== 0) {
        const newData = data.pokemon_v2_pokemon[0];
        setSpeciesId(newData?.pokemon_v2_pokemonspecy?.id || 0);
        setId(newData?.name || "");
      }

      console.log("data details: ", data);
    }
  }, [data]);

  useEffect(() => {
    if (dataSpecies) {
      console.log("data species: ", dataSpecies);
    }
  }, [dataSpecies]);

  if (loading || loadingSpecies) return <ActivityIndicator />;
  if (error || errorSpecies)
    return <Text>Error! {error?.message || errorSpecies?.message}</Text>;

  return (
    <View style={styles.container}>
      <Text>Details of user {id} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
