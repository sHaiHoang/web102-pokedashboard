import { useState, useEffect } from 'react'
import './App.css'

function App() {

    const [pokemonList, setPokemonList] = useState([]);
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');

    useEffect(() => {
        async function fetchPokemon() {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
            const data = await response.json();
            const details = await Promise.all(
                data.results.map(async (pokemon) => {
                    const res = await fetch(pokemon.url);
                    return res.json();
                })
            );
            setPokemonList(details);
        }
        fetchPokemon();
    }, []);

    const filteredPokemon = pokemonList.filter((pokemon) => {
        const matchesSearch = pokemon.name.toLowerCase().includes(search.toLowerCase());
        const matchesType = typeFilter === 'all' || pokemon.types.some((type) => type.type.name === typeFilter);
        return matchesSearch && matchesType;
    });

    const allTypes = [
        ...new Set(
            pokemonList.flatMap((pokemon) => pokemon.types.map((type) => type.type.name))
        ),
    ];

    const averageHP = Math.round(
        pokemonList.reduce((sum, pokemon) => sum + pokemon.stats[0].base_stat, 0) /
            (pokemonList.length || 1)
    );

    const averageAttack = Math.round(
        pokemonList.reduce((sum, pokemon) => sum + pokemon.stats[1].base_stat, 0) /
            (pokemonList.length || 1)
    ); 

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
                <div className="cards">
                    <div className="card">Total Pokemon: {pokemonList.length}</div>
                    <div className="card">Avg HP: {averageHP}</div>
                    <div className="card">Avg Attack: {averageAttack}</div>
                </div>
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
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="list">
                    {filteredPokemon.map((pokemon) => (
                        <div key={pokemon.id} className="pokemon-card">
                            <h3>{pokemon.name}</h3>
                            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                            <p>Type: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default App
