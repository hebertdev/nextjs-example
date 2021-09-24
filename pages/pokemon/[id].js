import Layout from "../../layout/layout";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PokemonDetail({ data, imgPoke, description }) {
  //const ruta = useRouter();
  //const { id } = ruta.query;

  return (
    <>
      <Head>
        <title> {data.name} </title>
        <meta property="og:title" content={data.name} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imgPoke} />
        <meta name="description" content={description} />
      </Head>
      <Layout>
        {data ? (
          <PokemonCard
            imgPoke={imgPoke}
            data={data}
            description={description}
          />
        ) : (
          "Loading"
        )}
      </Layout>
    </>
  );
}

function PokemonCard({ imgPoke, data, description }) {
  return (
    <>
      <div className="Pokemon__detail-container">
        <figure className="Pokemon__detail-figure">
          <Image src={imgPoke} alt={data.name} width="100%" height="100%" />
        </figure>
        <div className="Pokemon__detail-body">
          <div className="Pokemon__detail-body-max">
            <div>
              <p className="Pokemon__detail-body-title">
                <b>
                  {data.name} #{data.id}
                </b>
              </p>
              <div className="Pokemon__detail_stats">
                <span>
                  <small>Peso: {(data.weight / 10).toFixed(2)} kg</small>
                </span>
                <span>
                  <small>Altura: {(data.height / 10).toFixed(2)} m</small>
                </span>
                <span>
                  <small>
                    Tipo:{" "}
                    {data.types.map((type, index) => (
                      <span key={index}>{type.type.name}</span>
                    ))}
                  </small>
                </span>
              </div>
              <p className="Pokemon__info_txt">{description}</p>
            </div>
          </div>
        </div>
        <div className="Pokemon__detail-footer">
          <Link href={`/pokemon/${data.id - 1}`}>
            <a>{"<"}</a>
          </Link>
          <p className="">
            <b>
              {data.name} #{data.id}
            </b>
          </p>
          <Link href={`/pokemon/${data.id + 1}`}>
            <a href="">{">"}</a>
          </Link>
        </div>
      </div>
      <style jsx global>
        {``}
      </style>
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${context.query.id}/`
  );
  const data = await res.json();

  const res2 = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${context.query.id}/`
  );
  const species = await res2.json();

  //img poke
  var idPoke = await ("000" + context.query.id).slice(-3);
  var imgPoke = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${idPoke}.png`;

  if (!data && !species) {
    return {
      notFound: true,
    };
  }

  var description = "";

  if (species) {
    var descriptionPokemon = species.flavor_text_entries;
    var txtdescription = [];
    for (const prop in descriptionPokemon) {
      var espanishText = descriptionPokemon[prop].language.name;
      if (espanishText == "es") {
        txtdescription.push(descriptionPokemon[prop].flavor_text);
        description = txtdescription[1];
      }
    }
  }

  return {
    props: { data, description, imgPoke }, // will be passed to the page component as props
  };
}
