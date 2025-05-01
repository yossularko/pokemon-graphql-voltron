import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo } from "react";
import { colors } from "@/utils/colors";

type Props = {
  limit: number;
  offset: number;
  dataLength: number;
  loading?: boolean;
  onPrev: () => void;
  onNext: () => void;
};

const NavPokemonItem = ({
  limit,
  offset,
  dataLength,
  loading,
  onPrev,
  onNext,
}: Props) => {
  const disablePrev = useMemo(() => {
    if (offset === 0) {
      return true;
    }

    return false;
  }, [offset]);

  const disableNext = useMemo(() => {
    if (dataLength >= limit) {
      return false;
    }

    return true;
  }, [dataLength, limit]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={[
            styles.button,
            { opacity: 0.5, minWidth: 0, flexDirection: "row", gap: 4 },
          ]}
        >
          <Text style={styles.buttonText}>Loading</Text>
          <ActivityIndicator size="small" color="white" />
        </View>
      ) : (
        <>
          <TouchableOpacity
            style={[styles.button, { opacity: disablePrev ? 0.5 : 1 }]}
            onPress={onPrev}
            disabled={disablePrev}
          >
            <Text style={styles.buttonText}>Prev</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { opacity: disableNext ? 0.5 : 1 }]}
            onPress={onNext}
            disabled={disableNext}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default NavPokemonItem;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: colors.primary,
    minWidth: 60,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "white", textAlign: "center" },
});
