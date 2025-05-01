import client from "@/lib/apolloClient";
import { PokemonList, PokemonSprites } from "@/types";
import { GET_POKEMON_LIST } from "@/utils/queries/getPokemon";
import { useQuery } from "@apollo/client";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo } from "react";
import {
  FlatList,
  Image,
  ListRenderItem,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ListData = {
  id: number;
  name: string;
  img_url: string;
};

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
  const router = useRouter();

  const { loading, error, data, refetch } = useQuery<{
    pokemon_v2_pokemon: PokemonList[];
  }>(GET_POKEMON_LIST, {
    variables: { limit: 10, offset: 0 },
    client: client,
  });

  const newData = useMemo<ListData[]>(() => {
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

  const renderItem = useCallback<ListRenderItem<ListData>>(
    ({ item }) => (
      <TouchableOpacity
        onPress={() =>
          router.push({ pathname: "/details/[id]", params: { id: item.id } })
        }
        style={{
          flexDirection: "row",
          padding: 10,
          alignItems: "center",
          borderBottomWidth: 1,
        }}
      >
        <Image
          source={{ uri: item.img_url }}
          style={{ width: 50, height: 50, marginRight: 10 }}
        />
        <Text>{item.name}</Text>
      </TouchableOpacity>
    ),
    []
  );

  useEffect(() => {
    if (newData) {
      console.log("data: ", newData);
    }
  }, [newData]);

  // if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error! {error.message}</Text>;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={newData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
      />
    </View>
  );
}
