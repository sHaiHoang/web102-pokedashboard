import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

function Dashboard() {
    const [pokemonList, setPokemonList] = useState([])
    const [search, setSearch] = useState('')
    const [typeFilter, setTypeFilter] = useState('all')

    useEffect(() => {
        async function fetchPokemon() {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
        const data = await response.json()
        const details = await Promise.all(
            data.results.map(async (pokemon) => {
                const res = await fetch(pokemon.url)
                return res.json()
            }))
        setPokemonList(details)
        }
        fetchPokemon()
    }, [])

    const filteredPokemon = pokemonList.filter((pokemon) => {
        const matchesSearch = pokemon.name.toLowerCase().includes(search.toLowerCase())
        const matchesType = typeFilter === 'all' || pokemon.types.some((type) => type.type.name === typeFilter)
        return matchesSearch && matchesType
    })

    const allTypes = [...new Set(pokemonList.flatMap(p => p.types.map(t => t.type.name)))]

    const averageHP = Math.round(pokemonList.reduce((sum, p) => sum + p.stats[0].base_stat, 0) / (pokemonList.length || 1))
    const averageAttack = Math.round(pokemonList.reduce((sum, p) => sum + p.stats[1].base_stat, 0) / (pokemonList.length || 1))

    return (
        <>
            {/* Summary Stats */}
            <div className="cards">
                <div className="card">Total Pokemon: {pokemonList.length}</div>
                <div className="card">Avg HP: {averageHP}</div>
                <div className="card">Avg Attack: {averageAttack}</div>
            </div>

            {/* Add Recharts Here */}
            <div style={{ marginBottom: '2rem' }}>
                <h3>HP Stats by Pokémon</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={pokemonList.map((p) => ({
                        name: p.name,
                        hp: p.stats[0].base_stat,
                    }))}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="hp" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Controls */}
            <div className="controls">
                <input
                    type="text"
                    placeholder="Search Pokemon"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                >
                    <option value="all">All Types</option>
                    {allTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>

            {/* Pokémon List */}
            <div className="list">
                {filteredPokemon.map((pokemon) => (
                    <Link key={pokemon.id} to={`/pokemon/${pokemon.name}`} className="pokemon-card">
                        <h3>{pokemon.name}</h3>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                        <p>Type: {pokemon.types.map(t => t.type.name).join(', ')}</p>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default Dashboard