import { Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import PokemonDetail from './PokemonDetail'
import './App.css'

function App() {
    return (
        <div className="app">
            <aside className="sidebar">
                <h1>PokeDash</h1>
                <nav>
                    <ul>
                        <li>Dashboard</li>
                        <li>Pokemon</li>
                        <li>About</li>
                    </ul>
                </nav>
            </aside>
            <main className="main">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/pokemon/:name" element={<PokemonDetail />} />
                </Routes>
            </main>
        </div>
    )
}

export default App