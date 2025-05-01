import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "@/utils/colors";

type Prop = {
  name: string;
  base_stat: number;
};

const ListStat = ({ name, base_stat }: Prop) => {
  return (
    <View style={styles.container}>
      <View style={{ width: 80 }}>
        <Text style={styles.label}>{name}</Text>
      </View>
      <Text style={{ color: colors.text, fontSize: 12 }}>:</Text>
      <View style={styles.indicatorContainer}>
        <View style={[styles.indicator, { width: `${base_stat}%` }]}>
          {base_stat >= 20 ? (
            <Text style={styles.indicatorLabel}>{base_stat}%</Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default ListStat;

const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: 10, alignItems: "flex-end" },
  label: {
    color: colors.text,
    fontSize: 12,
    textTransform: "capitalize",
  },
  indicatorContainer: {
    flex: 1,
    backgroundColor: colors.disable,
    borderRadius: 20,
    overflow: "hidden",
  },
  indicator: {
    height: 15,
    backgroundColor: colors.primary_bright,
    borderRadius: 20,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  indicatorLabel: { color: "white", fontSize: 8 },
});
