import React from 'react'
//import useFetch from '../hooks/useFetch'
import {Link} from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import ReactMarkdown from 'react-markdown'

const REVIEWS = gql`
query GetReviews {
    reviews {
    data {
      id
      attributes {
        title,
        rating,
        body
        categories {
          data {
            attributes {
              Name
          }
        }
      }
      }
    }
  }
}
`

export default function Homepage() {

  //const { loading, error, data } = useFetch('http://localhost:1337/api/reviews');
  const { loading, error, data } = useQuery(REVIEWS)

  if(loading) return <p>Loading...</p>
  //if(error.length > 0) return <p>Error:</p>
  if(error) return <p>Error :(</p>

  console.log(data);
  
  return (
    <div>
      {data.reviews.data.map(review => (
        <div key={review.id} className="review-card">
          <div className='rating'>{review.attributes.rating}</div>
          <h2>{review.attributes.title}</h2>

          {review.attributes.categories.data.map(c => (
                <small key={c.id}>{c.attributes.Name}</small>

            ))}

          <ReactMarkdown>{review.attributes.body}</ReactMarkdown>
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  )
}
