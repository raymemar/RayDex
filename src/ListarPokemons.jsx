import React, { useState, useEffect } from 'react';
import { rtdb } from './firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { Link } from 'react-router-dom';
import './ListarPokemons.css';

function ListarPokemons() {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const normalizeType = (type) => {
        if (!type) return '';
        return type.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]/g, '');
    };

    useEffect(() => {
        const pokemonsRef = ref(rtdb, 'pokemons');
        
        const unsubscribe = onValue(pokemonsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const pokemonsArray = Object.values(data).sort((a, b) => a.numero - b.numero);
                setPokemons(pokemonsArray);
            } else {
                setPokemons([]);
            }
            setLoading(false);
        }, (error) => {
            console.error("Erro ao carregar pokémons:", error);
            setError("Não foi possível carregar os pokémons.");
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="container-carregamento">
                <p>Carregando Pokémons...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container-erro">
                <p className="texto-erro">Erro: {error}</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Pokémons Cadastrados</h1>
            
            <div className="grade-pokemons">
                {pokemons.map(pokemon => (
                    <Link
                        to={`/pokemon/${pokemon.numero}`}
                        key={pokemon.numero}
                        className="cartao-pokemon"
                    >
                        <img 
                            src={pokemon.imagem} 
                            alt={pokemon.nome} 
                            className="imagem-pokemon"
                        />
                        <p className="numero-pokemon">
                            #{pokemon.numero.toString().padStart(3, '0')}
                        </p>
                        <h3 className="nome-pokemon">
                            {pokemon.nome}
                        </h3>
                        
                        <div className="tipos-pokemon">
                            {pokemon.tipo1 && (
                                <span className={`etiqueta-tipo tipo-${normalizeType(pokemon.tipo1)}`}>
                                    {pokemon.tipo1}
                                </span>
                            )}
                            {pokemon.tipo2 && (
                                <span className={`etiqueta-tipo tipo-${normalizeType(pokemon.tipo2)}`}>
                                    {pokemon.tipo2}
                                </span>
                            )}
                            {!pokemon.tipo1 && !pokemon.tipo2 && (
                                <span className="etiqueta-tipo tipo-normal">
                                    Normal
                                </span>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
            
            {pokemons.length === 0 && (
                <div className="estado-vazio">
                    <h3 className="titulo-vazio">Nenhum Pokémon cadastrado ainda</h3>
                    <p className="descricao-vazio">Comece adicionando seu primeiro Pokémon!</p>
                    <Link to="/cadastrar" className="botao-vazio">
                        Cadastrar Pokémon
                    </Link>
                </div>
            )}
        </div>
    );
}

export default ListarPokemons;
