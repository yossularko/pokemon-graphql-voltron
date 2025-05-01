import {
  PokemonSprites,
  PokemonV2Pokemonspeciesflavortexts,
  PokemonV2Pokemonstats,
} from "@/types";

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

export const convertHeight = (heightDm: number) => {
  const heightCm = heightDm * 10;
  const heightFt = (heightCm / 30.48).toFixed(2); // Konversi ke feet
  return `${heightFt} ft / ${heightCm} cm`;
};

export const convertWeight = (weightHg: number) => {
  const weightKg = weightHg / 10;
  const weightLbs = (weightKg * 2.20462).toFixed(2); // Konversi ke lbs
  return `${weightLbs} lbs / ${weightKg} kg`;
};

export const getGenderRatio = (rate: number) => {
  const femalePercentage = (rate / 8) * 100;
  const malePercentage = 100 - femalePercentage;

  return { male: malePercentage, female: femalePercentage };
};

export const getEffortValues = (data: PokemonV2Pokemonstats[]): string[] => {
  const filtered = data
    .filter((v) => v.effort > 0)
    .map((i) => {
      const name = i.pokemon_v2_stat.name.replaceAll("-", " ");
      return `${i.effort} ${name}`;
    });
  return filtered;
};
