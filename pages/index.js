import { useEffect, useState } from "react";
import Layout from "../layout/layout";
import Link from "next/link";
import Image from "next/image";
import axiosInstance from "../helpers/axios";

export default function App() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}

function Home() {
  return (
    <div className="Home__container">
      <HomeLeft />
      <HomeRight />
    </div>
  );
}

function HomeLeft() {
  return (
    <div className="Home__left">
      <SearchContainer />
    </div>
  );
}

function SearchContainer() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [numbtn, setNumBtn] = useState(1);

  useEffect(() => {
    function generateRandomNumeber(min, max) {
      setRandomNumber(Math.floor(Math.random() * (max - min + 1) + min));
    }
    generateRandomNumeber(1, 800);
  }, [numbtn]);

  return (
    <div className="Home__left_container_search">
      {randomNumber && (
        <CardPokemon
          randomNumber={randomNumber}
          setNumBtn={setNumBtn}
          numbtn={numbtn}
        />
      )}
    </div>
  );
}

function CardPokemon({ randomNumber, setNumBtn, numbtn }) {
  const [pokemon, setPokemon] = useState(null);
  const [loadingPokemon, setLoadingPokemon] = useState(false);
  const [idPokemon, setIdPokemon] = useState(null);
  useEffect(() => {
    async function getPokemon() {
      if (loadingPokemon) {
        return null;
      }
      try {
        setLoadingPokemon(true);
        const { data } = await axiosInstance.get(
          `https://pokeapi.co/api/v2/pokemon/${randomNumber}/`
        );
        setIdPokemon(await ("000" + data.id).slice(-3));
        setPokemon(data);
        setLoadingPokemon(false);
      } catch (error) {
        console.log(error);
        setLoadingPokemon(false);
      }
    }

    getPokemon();
    // eslint-disable-next-line
  }, [randomNumber]);
  return (
    <>
      {pokemon && (
        <div className="Left_container_card">
          <figure className="Left_container_card_figure">
            <Image
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${idPokemon}.png`}
              alt=""
            />
          </figure>
          <h3> {pokemon.name} </h3>
        </div>
      )}
      <div className="Card_footer_btns">
        {loadingPokemon ? (
          <button className="Card_footer_btn_get">Buscando...</button>
        ) : (
          <button
            className="Card_footer_btn_get"
            onClick={() => setNumBtn(numbtn + 1)}
          >
            Obtener otro
          </button>
        )}

        <a href="" className="Card_footer_btn_detail">
          Ver detalle del pokemón
        </a>
      </div>

      <div>
        <input
          type="text"
          className="Card_footer_input_search"
          placeholder="Buscar por nombre o id"
        />
      </div>
      <p style={{ textAlign: "center", margin: "5px 0" }}> - o - </p>
      <Link href="/pokemonwithswr">
        <a className="Card_footer_link_all">Ver todos los Pokemón (CON SWR) </a>
      </Link>
      <br />
      <Link href="/pokemonwithoutswr">
        <a className="Card_footer_link_all">Ver todos los Pokemón (SIN SWR) </a>
      </Link>
    </>
  );
}

function HomeRight() {
  return (
    <div className="Home__Right">
      <h3>SOBRE LA APP</h3>
      <br />
      <h3>INFORMACIÓN GENERAL</h3>

      <span>
        {' "Pokédex app" '} Este proyecto es una aplicación de Frontend de
        ejemplo que muestra cómo utilizar SWR para la obtención de datos. La
        aplicación usa Next.js como marco y css puro para construir los estilos.
        Y está consumiendo datos de PokéAPI
      </span>
      <br />
      <br />
    </div>
  );
}
