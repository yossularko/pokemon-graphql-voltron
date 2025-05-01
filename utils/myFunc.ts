import { PokemonSprites, PokemonV2Pokemonspeciesflavortexts } from "@/types";

export const getImageUrl = (data: { sprites: PokemonSprites }[]): string => {
  if (!data) {
    return "";
  }

  if (data.length === 0) {
    return "";
  }

  return data[0]?.sprites?.front_default || "";
};

export const getImageCoverUrl = (
  data: { sprites: PokemonSprites }[]
): string => {
  if (!data) {
    return "";
  }

  if (data.length === 0) {
    return "";
  }

  return data[0]?.sprites?.other["official-artwork"].front_default || "";
};

export const getFlavorText = (
  data: PokemonV2Pokemonspeciesflavortexts[]
): string => {
  if (data?.length === 0) {
    return "";
  }

  return data[0].flavor_text;
};
