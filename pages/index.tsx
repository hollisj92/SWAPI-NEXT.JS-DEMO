import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import styles from '../styles/Home.module.css'

export default function Home({films}) {
  console.log( films);
  return (
   <>
   <div className={styles.titlecard}>
      <h1>Learning  @#$%&! Quick! - with SWAPI</h1>
      {films.map(film => {
        return (
          <div key={films.allFilms} className={styles.subcard}>
            <h1>{film.title}</h1>
            <hr />
            <h2>{film.director}</h2>
            <br />
            
          </div>
          
        )
      })}
    <p>This is a simple demonstration of an API call using SWAPI GraphQL - a free GraphQL Database.</p>
   </div>
   </>
      
  )
}

export async function getStaticProps() {
  const client = new ApolloClient(
    {
      uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
      cache: new InMemoryCache()
    })

  const { data } = await client.query({
    query: gql` {
      allFilms {
        films {
          title
          director
        }
      }
    }
    
    `
  })


  return {props: {
    films: data.allFilms.films,
  },
  revalidate: 10,
}
}

