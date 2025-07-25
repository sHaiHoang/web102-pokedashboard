import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

function PokemonDetail() {
    const { name } = useParams()
    const [pokemon, setPokemon] = useState(null)

    useEffect(() => {
        async function fetchDetail() {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            const data = await res.json()
            setPokemon(data)
        }
        fetchDetail()
    }, [name])

    if (!pokemon) return <div>Loading...</div>

    return (
        <div>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Base XP: {pokemon.base_experience}</p>
            <p>Types: {pokemon.types.map(t => t.type.name).join(', ')}</p>
            <p>Abilities: {pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
            <ul>
                {pokemon.stats.map((s) => (
                    <li key={s.stat.name}>
                        {s.stat.name}: {s.base_stat}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PokemonDetail