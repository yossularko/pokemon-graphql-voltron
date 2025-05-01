import { HeaderDetail, HeaderMain } from "@/components";
import { colors } from "@/utils/colors";
import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        statusBarBackgroundColor: colors.primary,
        statusBarStyle: "light",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "",
          headerBackground: () => <HeaderMain />,
        }}
      />
      <Stack.Screen
        name="details/[id]"
        options={{
          headerTitle: "",
          headerBackground: () => <HeaderDetail />,
        }}
      />
      <Stack.Screen name="test-data" />
    </Stack>
  );
}
