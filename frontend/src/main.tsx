import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { startReactDsfr } from '@codegouvfr/react-dsfr/spa'
import '@codegouvfr/react-dsfr/main.css'
import App from './App.tsx'

startReactDsfr({ defaultColorScheme: 'light' })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)