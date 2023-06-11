import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { useParams, Link } from 'react-router-dom'

const CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      data {
        id
        attributes {
          Name
          reviews {
            data {
              id
              attributes {
                title
                rating
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
    }
  }
}
`

export default function Category() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(CATEGORY, {
    variables: { id: id }
  })

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error :(</p>

  console.log(data.category);
  console.log(data.category.data.attributes.Name);
  return (
    <div>
      <h2>{data.category.data.attributes.Name}</h2>
      {data.category.data.attributes.reviews.data.map(review => (
        <div key={review.id} className="review-card">
          <div className='rating'>{review.attributes.rating}</div>
          <h2>{review.attributes.title}</h2>

            {review.attributes.categories.data.map(c => (
                <small key={c.id}>{c.attributes.Name}</small>

            ))}

          <p>{review.attributes.body}</p>
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  )
}
