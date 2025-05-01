import client from "@/lib/apolloClient";
import { PokemonList, PokemonSprites } from "@/types/indes";
import { GET_POKEMON_LIST } from "@/utils/queries/getPokemon";
import { useQuery } from "@apollo/client";
import { Link } from "expo-router";
import { useEffect, useMemo } from "react";
import { ActivityIndicator, Text, View } from "react-native";

const getImageUrl = (data: { sprites: PokemonSprites }[]): string => {
  if (!data) {
    return "";
  }

  if (data.length === 0) {
    return "";
  }

  return data[0]?.sprites?.front_default || "";
};

export default function Index() {
  const { loading, error, data } = useQuery<{
    pokemon_v2_pokemon: PokemonList[];
  }>(GET_POKEMON_LIST, {
    variables: { limit: 10, offset: 0 },
    client: client,
  });

  const newData = useMemo(() => {
    if (!data) {
      return [];
    }

    const newVal = data.pokemon_v2_pokemon.map((val) => {
      const { id, name, ...rest } = val;
      const img_url = getImageUrl(rest.pokemon_v2_pokemonsprites);
      return { id, name, img_url };
    });

    return newVal;
  }, [data]);

  useEffect(() => {
    if (newData) {
      console.log("data: ", newData);
    }
  }, [newData]);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error! {error.message}</Text>;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello World</Text>
      <Link
        href={{
          pathname: "/details/[id]",
          params: { id: 1 },
        }}
      >
        View detail
      </Link>
      <Link href="/test-data">Test Data</Link>
    </View>
  );
}
