export type PokemonSprites = {
  other: {
    home: {
      front_shiny: string;
      front_female: string | null;
      front_default: string;
      front_shiny_female: string | null;
    };
    showdown: {
      back_shiny: string;
      back_female: string | null;
      front_shiny: string;
      back_default: string;
      front_female: string | null;
      front_default: string;
      back_shiny_female: string | null;
      front_shiny_female: string | null;
    };
    dream_world: {
      front_female: string | null;
      front_default: string;
    };
    "official-artwork": {
      front_shiny: string;
      front_default: string;
    };
  };
  back_shiny: string;
  back_female: string | null;
  front_shiny: string;
  back_default: string;
  front_female: string | null;
  front_default: string;
  back_shiny_female: string | null;
  front_shiny_female: string | null;
};

export type PokemonList = {
  id: number;
  name: string;
  pokemon_v2_pokemonsprites: [
    {
      sprites: PokemonSprites;
      __typename: string;
    }
  ];
  __typename: string;
};

export type PokemonV2Pokemontypes = {
  pokemon_v2_type: {
    name: string;
    __typename: string;
  };
  __typename: string;
};

export type PokemonV2Pokemonstats = {
  base_stat: number;
  pokemon_v2_stat: {
    name: string;
    __typename: string;
  };
  __typename: string;
};

export type PokemonV2Pokemonabilities = {
  pokemon_v2_ability: {
    name: string;
    __typename: string;
  };
  __typename: string;
};

export type PokemonV2Pokemonspecy = {
  id: number;
  __typename: string;
};

export type PokemonDetail = {
  id: number;
  name: string;
  height: number;
  weight: number;
  pokemon_v2_pokemonsprites: [
    {
      sprites: PokemonSprites;
      __typename: string;
    }
  ];
  pokemon_v2_pokemontypes: PokemonV2Pokemontypes[];
  pokemon_v2_pokemonstats: PokemonV2Pokemonstats[];
  pokemon_v2_pokemonabilities: PokemonV2Pokemonabilities[];
  pokemon_v2_pokemonspecy: PokemonV2Pokemonspecy;
  __typename: string;
};

export type PokemonV2Pokemonspeciesflavortexts = {
  flavor_text: string;
  __typename: string;
};

export type PokemonSpeciesDetail = {
  id: number;
  capture_rate: number;
  gender_rate: number;
  growth_rate_id: number;
  hatch_counter: number;
  pokemon_v2_pokemonspeciesflavortexts: PokemonV2Pokemonspeciesflavortexts[];
  __typename: string;
};
