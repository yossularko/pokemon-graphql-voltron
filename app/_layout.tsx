import { Slot } from "expo-router";
import { Provider } from "jotai";

export default function AppLayout() {
  return (
    <Provider>
      <Slot />
    </Provider>
  );
}
