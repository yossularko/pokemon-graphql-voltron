import { NavPokemonItem, PokemonListItem } from "@/components";
import client from "@/lib/apolloClient";
import { PokemonList, PokemonListView } from "@/types";
import { getImageUrl } from "@/utils/myFunc";
import { GET_POKEMON_LIST } from "@/utils/queries/getPokemon";
import { useQuery } from "@apollo/client";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  ImageBackground,
  ListRenderItem,
  RefreshControl,
  Text,
  View,
} from "react-native";

const limit = 10;

export default function Index() {
  const router = useRouter();
  const [offset, setOffset] = useState(0);

  const { loading, error, data, refetch } = useQuery<{
    pokemon_v2_pokemon: PokemonList[];
  }>(GET_POKEMON_LIST, {
    variables: { limit: limit, offset: offset },
    client: client,
  });

  const newData = useMemo<PokemonListView[]>(() => {
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

  const renderItem = useCallback<ListRenderItem<PokemonListView>>(
    ({ item }) => (
      <PokemonListItem
        item={item}
        onNavigate={() =>
          router.push({ pathname: "/details/[id]", params: { id: item.id } })
        }
      />
    ),
    []
  );

  const listFooterComponent = useCallback(() => {
    return (
      <NavPokemonItem
        limit={limit}
        offset={offset}
        dataLength={data?.pokemon_v2_pokemon?.length || 0}
        onPrev={() => setOffset((prev) => prev - limit)}
        onNext={() => setOffset((prev) => prev + limit)}
      />
    );
  }, [offset, data?.pokemon_v2_pokemon]);

  // if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error! {error.message}</Text>;

  return (
    <ImageBackground
      source={require("@/assets/images/bg2.png")}
      resizeMode="cover"
      style={{ flex: 1, overflow: "hidden" }}
    >
      <FlatList
        data={newData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        ListFooterComponent={listFooterComponent}
        style={{ paddingTop: 14, paddingHorizontal: 14, paddingBottom: 14 }}
      />
    </ImageBackground>
  );
}
