import { HeaderMain } from "@/components";
import { Stack } from "expo-router";
import { atom, useAtomValue } from "jotai";

export const detailIdAtom = atom("");

export default function AppLayout() {
  const detailId = useAtomValue(detailIdAtom);
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
        options={{ headerTitle: `Detail ${detailId}` }}
      />
      <Stack.Screen name="test-data" />
    </Stack>
  );
}
