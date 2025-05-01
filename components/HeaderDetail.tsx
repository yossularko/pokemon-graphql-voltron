import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "@/utils/colors";
import { useAtomValue } from "jotai";
import { loadingDetailAtom, pokemonDetailAtom } from "@/store/mainStore";

const HeaderDetail = () => {
  const loading = useAtomValue(loadingDetailAtom);
  const detail = useAtomValue(pokemonDetailAtom);
  return (
    <View style={styles.container}>
      {loading || !detail ? null : (
        <View style={styles.content}>
          <View style={styles.leftContent}>
            <Image
              source={{ uri: detail.img_url }}
              resizeMode="contain"
              style={{ width: 60, height: 60 }}
            />
            <Text style={{ marginLeft: -6, color: "white", opacity: 0.6 }}>
              |
            </Text>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.badge}>
                <Image
                  source={require("@/assets/images/small-pokeball-icon-4-square.png")}
                  resizeMode="contain"
                  style={{ width: 16, height: 16 }}
                />
                <Text style={{ color: "white" }}>{detail.id}</Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
            {detail.types.map((item) => {
              return (
                <View key={item} style={styles.tag}>
                  <Text style={styles.tagText}>{item}</Text>
                </View>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
};

export default HeaderDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 42,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  leftContent: {
    flex: 1,
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  badge: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: colors.primary_bright,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: colors.primary_dark,
  },
  tagText: {
    color: colors.disable,
    fontWeight: "500",
    fontSize: 12,
    textTransform: "capitalize",
  },
});
