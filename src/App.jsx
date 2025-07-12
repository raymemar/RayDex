import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ListarPokemons from './ListarPokemons';
import CadastrarPokemons from './CadastrarPokemons';
import DetalhesPokemon from './DetalhesPokemon';
import './App.css';

function App() {
  return (
    <Router>
      <nav className="navegacao">
        <div className="container-navegacao">
          <h1 className="titulo-principal">
            Pokédex
          </h1>
          
          <div className="grupo-botoes">
            <Link to="/" className="botao-navegacao">
              Listar Pokémons
            </Link>
            <Link to="/cadastrar" className="botao-navegacao">
              Cadastrar Pokémon
            </Link>
          </div>
        </div>
      </nav>

      <div className="container-principal">
        <Routes>
          <Route path="/" element={<ListarPokemons />} />
          <Route path="/cadastrar" element={<CadastrarPokemons />} />
          <Route path="/pokemon/:id" element={<DetalhesPokemon />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;