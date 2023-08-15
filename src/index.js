import React from 'react'
import ReactDOM from 'react-dom/client'

import { CaloriesTrackerProvider } from './contexts/CaloriesTrackerContext'

import { ChakraProvider } from '@chakra-ui/react'

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <CaloriesTrackerProvider>
        <App />
      </CaloriesTrackerProvider>
    </ChakraProvider>
  </React.StrictMode>
)
