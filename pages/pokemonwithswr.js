import { useEffect, useState } from "react";
import useSWR from "swr";
import Layout from "../layout/layout";

import Link from "next/link";

export default function Pokemon() {
  const { data } = useSWR(
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=30"
  );

  //const [pokemons, setPokemons] = useState(null);

  return (
    <Layout>
      <div className="Pokemon__container">
        <Link href="/pokemonwithoutswr">
          <a className="Card_footer_link_all" style={{ background: "#f8d38d" }}>
            Ver todos los Pokemón (SIN SWR){" "}
          </a>
        </Link>
        <br />
        <p>Los datos traidos con SWR , se mantienen en la aplicacion </p>
        <br />
        <div className="Pokemon__container_cards">
          <>
            {data?.results.map((pokemon) => (
              <CardPokemon key={pokemon.name} pokemon={pokemon} />
            ))}
          </>
          <br />
        </div>
      </div>
    </Layout>
  );
}

function CardPokemon({ pokemon }) {
  const { data } = useSWR(`${pokemon.url}`);

  return (
    <>
      {data && (
        <div className="Pokemon__card_list">
          <div>
            <p className="Pokemon__card_list_name">{data.name}</p>
            {data.types.map((type) => (
              <>
                {typesall.map((typecolor) => (
                  <>
                    {typecolor.name === type.type.name && (
                      <span
                        className="Pokemon__card_list_type"
                        style={{
                          background: `${typecolor.estilos.background}99`,
                          border: `1px solid ${typecolor.estilos.background}`,
                          color: `rgba(0,0,0,0.7)`,
                        }}
                      >
                        {type.type.name}
                      </span>
                    )}
                  </>
                ))}
              </>
            ))}
          </div>
          <figure>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`}
              alt=""
            />
          </figure>
        </div>
      )}
    </>
  );
}

var typesall = [
  {
    name: "fire",
    estilos: {
      background: "#f08030",
    },
  },
  {
    name: "water",
    estilos: {
      background: "#82c7e8",
    },
  },
  {
    name: "bug",
    estilos: {
      background: "#afd9a4",
    },
  },
  {
    name: "normal",
    estilos: {
      background: "#c7b49f",
    },
  },
  {
    name: "fighting",
    estilos: {
      background: "#D56723",
    },
  },
  {
    name: "flying",
    estilos: {
      background: "#d3e0ff",
    },
  },
  {
    name: "poison",
    estilos: {
      background: "#B97FC9",
      color: "#5d3069",
    },
  },
  {
    name: "ground",
    estilos: {
      background: "#d5be7a",
    },
  },
  {
    name: "rock",
    estilos: {
      background: "#b9b189",
    },
  },
  {
    name: "ghost",
    estilos: {
      background: "#6f70a7",
    },
  },
  {
    name: "steel",
    estilos: {
      background: "#b3b2b4",
    },
  },
  {
    name: "grass",
    estilos: {
      background: "#9BCC50",
      color: "#3f6108",
    },
  },
  {
    name: "electric",
    estilos: {
      background: "#EED535",
    },
  },
  {
    name: "psychic",
    estilos: {
      background: "#f785c8",
    },
  },
  {
    name: "ice",
    estilos: {
      background: "#bce1f3",
    },
  },
  {
    name: "dragon",
    estilos: {
      background: "#3c9fbb",
    },
  },
  {
    name: "dark",
    estilos: {
      background: "#767083",
    },
  },
  {
    name: "fairy",
    estilos: {
      background: "#f6bfc4",
    },
  },
];
