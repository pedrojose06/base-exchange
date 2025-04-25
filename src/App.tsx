// Import everything needed to use the `useQuery` hook
import { useQuery, gql } from '@apollo/client'
import LoadingPage from './components/Loading/Loading'

interface ILocation {
  id: string
  name: string
  description: string
  photo: string
}

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`

function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_LOCATIONS)

  if (loading) return <LoadingPage />
  if (error) return <p>Error : {error.message}</p>

  return data.locations.map(({ id, name, description, photo }: ILocation) => (
    <div key={id}>
      <h3>{name}</h3>
      <img width="400" height="250" alt="location-reference" src={`${photo}`} />
      <br />
      <b>About this location:</b>
      <p>{description}</p>
      <br />
    </div>
  ))
}

export default function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <br />
      <DisplayLocations />
    </div>
  )
}
