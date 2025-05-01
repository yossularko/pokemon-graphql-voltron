import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "@/utils/colors";

type Props = {
  female: number;
  male: number;
};

const GenderRatio = ({ female, male }: Props) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={[styles.female, { width: `${female}%` }]}>
        {female > 20 ? <Text style={styles.label}>{female}%</Text> : null}
      </View>
      <View style={styles.male}>
        {male > 20 ? (
          <Text style={[styles.label, { textAlign: "right" }]}>{male}%</Text>
        ) : null}
      </View>
    </View>
  );
};

export default GenderRatio;

const styles = StyleSheet.create({
  female: {
    height: 15,
    paddingHorizontal: 4,
    justifyContent: "center",
    backgroundColor: colors.female,
    overflow: "hidden",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  male: {
    flex: 1,
    height: 15,
    paddingHorizontal: 4,
    justifyContent: "center",
    backgroundColor: colors.male,
    overflow: "hidden",
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  label: { color: "white", fontSize: 8, textAlign: "left" },
});
