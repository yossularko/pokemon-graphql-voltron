import { HeaderDetail, HeaderMain } from "@/components";
import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack>
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
