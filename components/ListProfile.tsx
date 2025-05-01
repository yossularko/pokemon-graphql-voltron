import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "@/utils/colors";

type Prop = {
  label: string;
  children: React.ReactNode;
};

const ListProfile = ({ label, children }: Prop) => {
  return (
    <View style={styles.container}>
      <View style={{ width: 100 }}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={{ color: colors.text, fontSize: 12 }}>:</Text>
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
};

export default ListProfile;

const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: 10, alignItems: "flex-end" },
  label: {
    color: colors.text,
    fontSize: 12,
    textTransform: "capitalize",
  },
});
