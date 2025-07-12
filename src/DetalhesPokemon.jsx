import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { rtdb } from './firebaseConfig';
import { ref, get } from 'firebase/database';
import './DetalhesPokemon.css';

function DetalhesPokemon() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
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
        const fetchPokemon = async () => {
            try {
                const pokemonRef = ref(rtdb, `pokemons/${id}`);
                const snapshot = await get(pokemonRef);
                
                if (snapshot.exists()) {
                    setPokemon({ numero: id, ...snapshot.val() });
                } else {
                    setError('Pokémon não encontrado.');
                }
            } catch (err) {
                console.error('Erro ao buscar pokémon:', err);
                setError('Erro ao carregar dados do pokémon.');
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [id]);

    if (loading) {
        return <div className="mensagem-carregamento">Carregando...</div>;
    }

    if (error) {
        return (
            <div className="container-erro">
                <p className="mensagem-erro">{error}</p>
                <button onClick={() => navigate('/')}>Voltar para a lista</button>
            </div>
        );
    }

    if (!pokemon) {
        return <div>Pokémon não encontrado.</div>;
    }

    return (
        <div className="detalhes-container">
            <div className="cabecalho-detalhes">
                <button 
                    onClick={() => navigate('/')}
                    className="botao-voltar"
                >
                    ← Voltar
                </button>
                <h1 className="titulo-pokemon">#{pokemon.numero.toString().padStart(3, '0')} - {pokemon.nome}</h1>
            </div>

            <div className="container-conteudo">
                <div className="coluna-imagem">
                    <img 
                        src={pokemon.imagem} 
                        alt={pokemon.nome}
                        className="imagem-pokemon-detalhes"
                    />
                </div>

                <div className="coluna-informacoes">
                    <div className="informacoes-basicas">
                        <h3 className="titulo-informacoes">Informações Básicas</h3>
                        
                        <div className="item-informacao">
                            <strong>Categoria:</strong> {pokemon.categoria || 'Não informado'}
                        </div>
                        
                        <div className="item-informacao">
                            <strong>Altura:</strong> {pokemon.altura ? `${pokemon.altura} m` : 'Não informado'}
                        </div>
                        
                        <div className="item-informacao">
                            <strong>Peso:</strong> {pokemon.peso ? `${pokemon.peso} kg` : 'Não informado'}
                        </div>
                        
                        <div className="item-informacao">
                            <strong>Habitat:</strong> {pokemon.habitat || 'Não informado'}
                        </div>
                    </div>

                    <div className="secao-tipos">
                        <h3 className="titulo-tipos">Tipos</h3>
                        <div className="lista-tipos">
                            {pokemon.tipo1 && (
                                <span className={`etiqueta-tipo-detalhes tipo-${(pokemon.tipo1)}`}>
                                    {pokemon.tipo1}
                                </span>
                            )}
                            {pokemon.tipo2 && (
                                <span className={`etiqueta-tipo-detalhes tipo-${(pokemon.tipo2)}`}>
                                    {pokemon.tipo2}
                                </span>
                            )}
                        </div>
                    </div>

                    {pokemon.habilidades && pokemon.habilidades.length > 0 && (
                        <div className="secao-habilidades">
                            <h3 className="titulo-habilidades">Habilidades</h3>
                            <div className="lista-habilidades">
                                {pokemon.habilidades.map((habilidade, index) => (
                                    <span key={index} className="etiqueta-habilidade">
                                        {habilidade}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {pokemon.fraquezas && pokemon.fraquezas.length > 0 && (
                        <div className="secao-fraquezas">
                            <h3 className="titulo-fraquezas">Fraquezas</h3>
                            <div className="lista-fraquezas">
                                {pokemon.fraquezas.map((fraqueza, index) => (
                                    <span key={index} className="etiqueta-fraqueza">
                                        {fraqueza}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {pokemon.descricao && (
                <div className="secao-descricao">
                    <h3 className="titulo-descricao">Descrição</h3>
                    <p className="texto-descricao">{pokemon.descricao}</p>
                </div>
            )}

            {pokemon.evolucaoProxima && pokemon.evolucaoProxima.length > 0 && (
                <div className="secao-evolucao">
                    <h3 className="titulo-evolucao">Próximas Evoluções</h3>
                    <div className="lista-evolucao">
                        {pokemon.evolucaoProxima.map((evolucao, index) => (
                            <div key={index} className="item-evolucao">
                                <div className="numero-evolucao">#{evolucao.numero}</div>
                                <div>{evolucao.nome}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default DetalhesPokemon;