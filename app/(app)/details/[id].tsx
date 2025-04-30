import { useLocalSearchParams } from "expo-router";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { detailIdAtom } from "../_layout";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const setId = useSetAtom(detailIdAtom);

  useEffect(() => {
    setId(id as string);
  }, [id]);

  return (
    <View style={styles.container}>
      <Text>Details of user {id} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
