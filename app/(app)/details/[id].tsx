import { useLocalSearchParams } from "expo-router";
import { useSetAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
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
import {
  GenderRatio,
  ListProfile,
  ListStat,
  LoadingDetail,
} from "@/components";
import { colors } from "@/utils/colors";

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

  if (loading || loadingSpecies) return <LoadingDetail />;
  if (error || errorSpecies)
    return <Text>Error! {error?.message || errorSpecies?.message}</Text>;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {!detail ? null : (
          <View style={{ gap: 16 }}>
            <View style={[styles.card, { flexDirection: "row", gap: 20 }]}>
              <Image
                source={{ uri: detail.img_cover_url }}
                resizeMode="contain"
                style={{ width: 120, height: 120 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.title} numberOfLines={1}>
                  {detail.name}
                </Text>
                <View style={{ marginTop: 8 }}>
                  <Text style={{ fontSize: 12, color: colors.label }}>
                    {detail.flavor_text}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.card}>
              <Text style={[styles.title, { fontSize: 16 }]} numberOfLines={1}>
                Stats
              </Text>
              <View style={{ gap: 6, marginTop: 16 }}>
                {detail.stats.map((v) => (
                  <ListStat
                    key={v.name}
                    name={v.name}
                    base_stat={v.base_stat}
                  />
                ))}
              </View>
            </View>
            <View style={styles.card}>
              <Text style={[styles.title, { fontSize: 16 }]} numberOfLines={1}>
                Profile
              </Text>
              <View style={{ gap: 6, marginTop: 16 }}>
                <ListProfile label="Approx. Height">
                  <Text style={styles.textProfile}>{detail.approx_height}</Text>
                </ListProfile>
                <ListProfile label="Approx. Weight">
                  <Text style={styles.textProfile}>{detail.approx_weight}</Text>
                </ListProfile>
                <ListProfile label="Catch Rate">
                  <Text style={styles.textProfile}>{detail.catch_rate}</Text>
                </ListProfile>
                <ListProfile label="Gender Ratio">
                  <GenderRatio
                    female={detail.gender_ratio.female}
                    male={detail.gender_ratio.male}
                  />
                </ListProfile>
                <ListProfile label="Growth Rate">
                  <Text
                    style={[
                      styles.textProfile,
                      { textTransform: "capitalize" },
                    ]}
                  >
                    {detail.growth_rate}
                  </Text>
                </ListProfile>
                <ListProfile label="Hatch Steps">
                  <Text style={styles.textProfile}>{detail.hatch_steps}</Text>
                </ListProfile>
                <ListProfile label="Effor Values">
                  <Text
                    style={[
                      styles.textProfile,
                      { textTransform: "capitalize" },
                    ]}
                  >
                    {detail.effort_values}
                  </Text>
                </ListProfile>
                <ListProfile label="Abilities">
                  <Text
                    style={[
                      styles.textProfile,
                      { textTransform: "capitalize" },
                    ]}
                  >
                    {detail.abilities.join(", ")}
                  </Text>
                </ListProfile>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 14, paddingVertical: 20 },
  card: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 20,
    backgroundColor: "white",
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  textProfile: { textAlign: "right", color: colors.text, fontWeight: "500" },
});
