import * as ReactDOM from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import App from './App'
import './index.css'
import { client } from './graphql/client'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}
const root = ReactDOM.createRoot(rootElement)

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
