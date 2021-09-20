import { useEffect, useState } from "react";

import axiosInstance from "../helpers/axios";
import Layout from "../layout/layout";
import Link from "next/link";
import Image from "next/image";

export default function Pokemon() {
  const [pokemons, setPokemons] = useState(null);
  useEffect(() => {
    async function getPokemon() {
      try {
        const { data } = await axiosInstance.get(
          `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=30`
        );

        setPokemons(data.results);
      } catch (error) {
        console.log(error);
      }
    }

    getPokemon();
  }, []);

  return (
    <Layout>
      <div className="Pokemon__container">
        <Link href="/pokemonwithswr">
          <a className="Card_footer_link_all">
            Ver todos los Pokemón (CON SWR){" "}
          </a>
        </Link>
        <br />

        <p>
          Los datos traidos sin SWR , se vuelven a pedir al servidor , haciendo
          que se gaste más recursos.{" "}
        </p>
        <br />

        <div className="Pokemon__container_cards">
          {pokemons && (
            <>
              {pokemons.map((pokemon) => (
                <CardPokemon key={pokemon.name} pokemon={pokemon} />
              ))}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

function CardPokemon({ pokemon }) {
  //state for pokemon detail
  const [poke, setPoke] = useState(null);
  //const [idPoke, setIdPoke] = useState(null);
  useEffect(() => {
    async function getPokemonDetail() {
      try {
        const { data } = await axiosInstance.get(`${pokemon.url}`);
        setPoke(data);
        console.log(data);
        //setIdPoke(await ("000" + data.id).slice(-3));
        //console.log(await ("000" + data.id).slice(-3));
      } catch (error) {
        console.log(error);
      }
    }

    getPokemonDetail();
  }, [pokemon.url]);
  return (
    <>
      {poke && (
        <div className="Pokemon__card_list">
          <div>
            <p className="Pokemon__card_list_name">{poke.name}</p>
            <div>
              {poke.types.map((type) => (
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
          </div>
          <figure>
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`}
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
