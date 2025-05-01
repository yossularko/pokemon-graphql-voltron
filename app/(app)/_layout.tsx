import { HeaderMain } from "@/components";
import { loadingDetailAtom, pokemonDetailAtom } from "@/store/mainStore";
import { Stack } from "expo-router";
import { useAtomValue } from "jotai";

export default function AppLayout() {
  const loading = useAtomValue(loadingDetailAtom);
  const detail = useAtomValue(pokemonDetailAtom);
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
        options={{ headerTitle: `Detail ${loading ? "" : detail?.name || ""}` }}
      />
      <Stack.Screen name="test-data" />
    </Stack>
  );
}
