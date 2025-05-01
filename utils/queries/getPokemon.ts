import { gql } from "@apollo/client";

export const GET_POKEMON = gql`
  query GetPokemon($name: String!) {
    pokemon_v2_pokemon(where: { name: { _eq: $name } }) {
      id
      name
      height
      weight
    }
  }
`;

export const GET_POKEMON_LIST = gql`
  query GetPokemon($limit: Int!, $offset: Int!) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset) {
      id
      name
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

export const GET_POKEMON_DETAIL = gql`
  query GetPokemonDetail($id: Int!) {
    pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
      id
      name
      height
      weight
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
        effort
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemonspecy {
        id
        pokemon_v2_growthrate {
          name
        }
      }
    }
  }
`;

export const GET_POKEMON_SPECIES_DETAIL = gql`
  query GetPokemonSpeciesDetail($speciesId: Int!) {
    pokemon_v2_pokemonspecies(where: { id: { _eq: $speciesId } }) {
      id
      capture_rate
      gender_rate
      growth_rate_id
      hatch_counter
      pokemon_v2_pokemonspeciesflavortexts(
        where: { language_id: { _eq: 9 } }
        limit: 1
      ) {
        flavor_text
      }
    }
  }
`;
