import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';

const API_URL = 'https://nestjs-pokedex-api.vercel.app/pokemons';

function PokemonGrid({ filters }) {
    const [pokemons, setPokemons] = useState([]);
    const [page, setPage] = useState(1);
    const isFetchingRef = useRef(false);

    const loadMore = useCallback(async () => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        const res = await axios.get(API_URL, {
            params: {
                page,
                limit: filters.limit,
                types: filters.types
            }
        });

        setPokemons(prev => [...prev, ...res.data]);
        setPage(prev => prev + 1);
        isFetchingRef.current = false;
    }, [page, filters]);

    useEffect(() => {
        setPokemons([]);
        setPage(1);
    }, [filters]);

    useEffect(() => {
        if (page === 1) {
            loadMore();
        }
    }, [page]);


    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                loadMore();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMore]);

    return (
        <div className="pokemon-grid">
            {pokemons.map(p => (
                <PokemonCard key={p.pokedexId} pokemon={p} />
            ))}
        </div>
    );
}

export default PokemonGrid;
