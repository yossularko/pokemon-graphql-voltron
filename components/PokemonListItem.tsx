import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { PokemonListView } from "@/types";
import { colors } from "@/utils/colors";

type Props = {
  item: PokemonListView;
  onNavigate: () => void;
};

const PokemonListItem = ({ item, onNavigate }: Props) => {
  return (
    <TouchableOpacity onPress={onNavigate} style={styles.container}>
      <Image source={{ uri: item.img_url }} style={{ width: 80, height: 80 }} />
      <View style={styles.spearator} />
      <View style={{ flex: 1, gap: 6 }}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.badge}>
            <Image
              source={require("@/assets/images/small-pokeball-icon-4-square.png")}
              resizeMode="contain"
              style={{ width: 18, height: 18 }}
            />
            <Text>{item.id}</Text>
          </View>
        </View>
        <Text style={styles.title}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PokemonListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    gap: 14,
    backgroundColor: "white",
    borderRadius: 20,
  },
  spearator: {
    width: 1,
    height: "50%",
    backgroundColor: "#ccc",
    marginLeft: -10,
  },
  badge: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 16,
    backgroundColor: colors.disable,
  },
  title: {
    color: colors.text,
    fontWeight: "500",
    fontSize: 20,
    textTransform: "capitalize",
  },
});
