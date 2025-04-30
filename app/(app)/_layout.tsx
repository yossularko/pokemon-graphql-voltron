import { Stack } from "expo-router";
import { atom, useAtomValue } from "jotai";

export const detailIdAtom = atom("")

export default function AppLayout() {
  const detailId = useAtomValue(detailIdAtom)
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="details/[id]" options={{ headerTitle: `Detail ${detailId}` }} />
    </Stack>
  );
}
