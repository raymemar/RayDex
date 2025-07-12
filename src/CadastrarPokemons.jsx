import React, { useState } from 'react';
import { rtdb } from './firebaseConfig';
import { ref, set } from 'firebase/database'; 
import { useNavigate } from 'react-router-dom';
import './CadastrarPokemons.css';

function CadastrarPokemons() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        numero: '',
        nome: '',
        imagem: '',
        tipo1: '',
        tipo2: '',
        habilidades: '',
        altura: '',
        peso: '',
        descricao: '',
        categoria: '',
        fraquezas: '',
        evolucaoProxima: '',
        habitat: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setIsLoading(true);

        console.log('Formulário enviado:', formData);

        if (!formData.numero || !formData.nome || !formData.imagem || !formData.tipo1) {
            setError('Número, Nome, Imagem e Tipo 1 são campos obrigatórios.');
            setIsLoading(false);
            return;
        }

        const numeroInt = parseInt(formData.numero);
        if (isNaN(numeroInt) || numeroInt <= 0) {
            setError('Por favor, insira um número de Pokémon válido.');
            setIsLoading(false);
            return;
        }

        try {
            const pokemonData = {
                numero: numeroInt,
                nome: formData.nome,
                imagem: formData.imagem,
                tipo1: formData.tipo1,
                tipo2: formData.tipo2 || null,
                habilidades: formData.habilidades.split(',').map(s => s.trim()).filter(s => s),
                altura: parseFloat(formData.altura) || 0,
                peso: parseFloat(formData.peso) || 0,
                descricao: formData.descricao,
                categoria: formData.categoria,
                fraquezas: formData.fraquezas.split(',').map(s => s.trim()).filter(s => s),
                evolucaoProxima: formData.evolucaoProxima ? formData.evolucaoProxima.split(';').map(evo => {
                    const [id, nome] = evo.split(',');
                    return { numero: parseInt(id), nome: nome?.trim() };
                }).filter(evo => evo.numero && evo.nome) : [],
                habitat: formData.habitat
            };

            console.log('Dados do Pokémon:', pokemonData);

            await set(ref(rtdb, 'pokemons/' + formData.numero), pokemonData);
            
            console.log('Pokémon cadastrado com sucesso!');
            setMessage('Pokémon cadastrado com sucesso!');
            
            setFormData({
                numero: '',
                nome: '',
                imagem: '',
                tipo1: '',
                tipo2: '',
                habilidades: '',
                altura: '',
                peso: '',
                descricao: '',
                categoria: '',
                fraquezas: '',
                evolucaoProxima: '',
                habitat: ''
            });
            
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            setError('Erro ao cadastrar pokémon: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container-cadastrar">
            <h1>Cadastrar Pokémon</h1>
            
            {message && (
                <div className="mensagem-sucesso">
                    {message}
                </div>
            )}
            
            {error && (
                <div className="mensagem-erro">
                    {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit}>
                <div className="grupo-formulario">
                    <label className="rotulo-formulario">
                        Número: *
                    </label>
                    <input
                        type="number"
                        name="numero"
                        value={formData.numero}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        className="entrada-formulario"
                    />
                </div>
                
                <div className="grupo-formulario">
                    <label className="rotulo-formulario">
                        Nome: *
                    </label>
                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        className="entrada-formulario"
                    />
                </div>
                
                <div className="grupo-formulario">
                    <label className="rotulo-formulario">
                        URL da Imagem: *
                    </label>
                    <input
                        type="url"
                        name="imagem"
                        value={formData.imagem}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        placeholder="https://exemplo.com/imagem.png"
                        className="entrada-formulario"
                    />
                </div>
                
                <div className="grupo-formulario">
                    <label className="rotulo-formulario">
                        Tipo 1: *
                    </label>
                    <input
                        type="text"
                        name="tipo1"
                        value={formData.tipo1}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        placeholder="Ex: Grama, Fogo, Água"
                        className="entrada-formulario"
                    />
                </div>
                
                <div className="grupo-formulario">
                    <label className="rotulo-formulario">
                        Tipo 2:
                    </label>
                    <input
                        type="text"
                        name="tipo2"
                        value={formData.tipo2}
                        onChange={handleChange}
                        disabled={isLoading}
                        placeholder="Ex: Veneno (opcional)"
                        className="entrada-formulario"
                    />
                </div>
                
                <div className="grupo-formulario">
                    <label className="rotulo-formulario">
                        Habilidades (separe por vírgula):
                    </label>
                    <input
                        type="text"
                        name="habilidades"
                        value={formData.habilidades}
                        onChange={handleChange}
                        disabled={isLoading}
                        placeholder="Ex: Overgrow, Chlorophyll"
                        className="entrada-formulario"
                    />
                </div>
                
                <div className="form-row">
                    <div className="form-group-half">
                        <label className="rotulo-formulario">
                            Altura (m):
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            name="altura"
                            value={formData.altura}
                            onChange={handleChange}
                            disabled={isLoading}
                            placeholder="Ex: 0.7"
                            className="entrada-formulario"
                        />
                    </div>
                    
                    <div className="form-group-half">
                        <label className="rotulo-formulario">
                            Peso (kg):
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            name="peso"
                            value={formData.peso}
                            onChange={handleChange}
                            disabled={isLoading}
                            placeholder="Ex: 6.9"
                            className="entrada-formulario"
                        />
                    </div>
                </div>
                
                <div className="grupo-formulario">
                    <label className="rotulo-formulario">
                        Descrição:
                    </label>
                    <textarea
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        disabled={isLoading}
                        rows="3"
                        placeholder="Digite uma descrição do Pokémon..."
                        className="area-texto-formulario"
                    />
                </div>
                
                <div className="grupo-formulario">
                    <label className="rotulo-formulario">
                        Categoria:
                    </label>
                    <input
                        type="text"
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleChange}
                        disabled={isLoading}
                        placeholder="Ex: Pokémon Semente"
                        className="entrada-formulario"
                    />
                </div>
                
                <div className="grupo-formulario">
                    <label className="rotulo-formulario">
                        Fraquezas (separe por vírgula):
                    </label>
                    <input
                        type="text"
                        name="fraquezas"
                        value={formData.fraquezas}
                        onChange={handleChange}
                        disabled={isLoading}
                        placeholder="Ex: Fogo, Voador, Psíquico"
                        className="entrada-formulario"
                    />
                </div>
                
                <div className="grupo-formulario">
                    <label className="rotulo-formulario">
                        Evolução Próxima (formato: id,nome;id,nome):
                    </label>
                    <input
                        type="text"
                        name="evolucaoProxima"
                        value={formData.evolucaoProxima}
                        onChange={handleChange}
                        disabled={isLoading}
                        placeholder="Ex: 2,Ivysaur;3,Venusaur"
                        className="entrada-formulario"
                    />
                </div>
                
                <div className="grupo-formulario">
                    <label className="rotulo-formulario">
                        Habitat:
                    </label>
                    <input
                        type="text"
                        name="habitat"
                        value={formData.habitat}
                        onChange={handleChange}
                        disabled={isLoading}
                        placeholder="Ex: Floresta"
                        className="entrada-formulario"
                    />
                </div>
                
                <button 
                    type="submit"
                    disabled={isLoading}
                    className={`botao-enviar ${isLoading ? "botao-enviar-carregando" : "botao-enviar-normal"}`}
                >
                    {isLoading ? 'Cadastrando...' : 'Cadastrar Pokémon'}
                </button>
            </form>
        </div>
    );
}

export default CadastrarPokemons;
