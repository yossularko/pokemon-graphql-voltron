import { PokemonDetailView } from "@/types";
import { atom } from "jotai";

export const loadingDetailAtom = atom(false);
export const pokemonDetailAtom = atom<PokemonDetailView | null>(null);
