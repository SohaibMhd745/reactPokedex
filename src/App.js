import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonGrid from './components/PokemonGrid';
import PokemonDetail from './components/PokemonDetail';
import FilterBar from './components/FilterBar';
import { useState } from 'react';
import './App.css';

function App() {
  const [filters, setFilters] = useState({ limit: 50, types: [] });

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              <FilterBar onFilterChange={setFilters} />
              <PokemonGrid filters={filters} />
            </div>
          }
        />
        <Route path="/pokemon/:pokedexId" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
