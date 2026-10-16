import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './style.css'
import { Provider } from 'react-redux'
import { store, persistor } from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import CheckSession from './auth/CheckSession.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CheckSession>
          <App />
        </CheckSession>
      </PersistGate>
    </Provider>

  </StrictMode>,
)
