import { useLocalSearchParams } from "expo-router";
import { useSetAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useQuery } from "@apollo/client";
import {
  GET_POKEMON_DETAIL,
  GET_POKEMON_SPECIES_DETAIL,
} from "@/utils/queries/getPokemon";
import client from "@/lib/apolloClient";
import {
  PokemonDetail,
  PokemonDetailView,
  PokemonSpeciesDetail,
} from "@/types";
import {
  convertHeight,
  convertWeight,
  getEffortValues,
  getFlavorText,
  getGenderRatio,
  getImageCoverUrl,
  getImageUrl,
} from "@/utils/myFunc";
import { loadingDetailAtom, pokemonDetailAtom } from "@/store/mainStore";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const setLoadingDetail = useSetAtom(loadingDetailAtom);
  const setPokemonDetail = useSetAtom(pokemonDetailAtom);

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

  const detail = useMemo<PokemonDetailView | null>(() => {
    if (!data) {
      return null;
    }

    if (data.pokemon_v2_pokemon.length === 0) {
      return null;
    }

    if (!dataSpecies) {
      return null;
    }

    if (dataSpecies.pokemon_v2_pokemonspecies.length === 0) {
      return null;
    }

    const newData = data.pokemon_v2_pokemon[0];
    const newSpecies = dataSpecies.pokemon_v2_pokemonspecies[0];

    const img_url = getImageUrl(newData.pokemon_v2_pokemonsprites);
    const img_cover_url = getImageCoverUrl(newData.pokemon_v2_pokemonsprites);
    const flavor_text = getFlavorText(
      newSpecies.pokemon_v2_pokemonspeciesflavortexts
    );

    const stats = newData.pokemon_v2_pokemonstats.map((v) => {
      const base_name = v.pokemon_v2_stat.name;
      const name = base_name.replaceAll("special-", "sp. ");
      return { name, base_stat: v.base_stat };
    });

    const effort_values = getEffortValues(newData.pokemon_v2_pokemonstats);

    const newVal: PokemonDetailView = {
      id: newData.id,
      name: newData.name,
      types: newData.pokemon_v2_pokemontypes.map((v) => v.pokemon_v2_type.name),
      img_url,
      img_cover_url,
      stats,
      flavor_text,
      approx_height: convertHeight(newData.height),
      approx_weight: convertWeight(newData.weight),
      catch_rate: `${newSpecies.capture_rate}%`,
      gender_ratio: getGenderRatio(newSpecies.gender_rate),
      growth_rate: newData.pokemon_v2_pokemonspecy.pokemon_v2_growthrate.name,
      hatch_steps: newSpecies.hatch_counter * 255,
      effort_values: effort_values.join(", "),
      abilities: newData.pokemon_v2_pokemonabilities.map(
        (v) => v.pokemon_v2_ability.name
      ),
    };

    return newVal;
  }, [data, dataSpecies]);

  useEffect(() => {
    if (data) {
      if (data.pokemon_v2_pokemon.length !== 0) {
        const newData = data.pokemon_v2_pokemon[0];
        setSpeciesId(newData?.pokemon_v2_pokemonspecy?.id || 0);
      }

      console.log("data details: ", data);
    }
  }, [data]);

  useEffect(() => {
    if (loading) {
      setPokemonDetail(null);
    } else {
      setPokemonDetail(detail);
    }

    setLoadingDetail(loading);
  }, [loading, detail]);

  if (loading || loadingSpecies) return <ActivityIndicator />;
  if (error || errorSpecies)
    return <Text>Error! {error?.message || errorSpecies?.message}</Text>;

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={{ maxWidth: 300 }}>{JSON.stringify(detail, null, 2)}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
  },
});
