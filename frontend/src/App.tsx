import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Departement from './pages/Departement'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="fr-container fr-my-4w">
        <Routes>
           <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/departements" element={<Departement />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App