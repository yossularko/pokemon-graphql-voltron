import { Slot } from "expo-router";
import { Provider } from "jotai";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apolloClient";

export default function AppLayout() {
  return (
    <Provider>
      <ApolloProvider client={client}>
        <Slot />
      </ApolloProvider>
    </Provider>
  );
}
