import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "@/utils/colors";

const HeaderMain = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/pokedex.png")}
        resizeMode="contain"
        style={styles.logo}
      />
    </View>
  );
};

export default HeaderMain;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  logo: { width: 80, height: 50 },
});
