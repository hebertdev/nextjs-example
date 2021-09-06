import Head from 'next/head'

import { useRouter } from 'next/router'

export default function Profile({data}) {

    
    const ruta = useRouter()

    const  {id} =  ruta.query

    console.log(id)


    return (
        <>
        <Head>

        <title> {data.name} </title>

        <meta
        property="og:title"
        content={data.name}
        />
        <meta
        name="description"
        content="Red social para apostadores - genera dinero ofreciendo pronósticos."
        />
        <meta property="og:url" content="https://www.betsocial.club" />
       
        </Head>
        <div>
           <h1> {data.name} </h1>
        </div>
        </>
    )
  }




  export async function getServerSideProps(context) {

    

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${context.query.id}/`)
    const data = await res.json()
  
    if (!data) {
      return {
        notFound: true,
      }
    }
  
    return {
      props: { data }, // will be passed to the page component as props
    }
  }