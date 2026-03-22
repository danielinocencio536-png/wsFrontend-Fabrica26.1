'use client';
import { useEffect, useState } from 'react';
import api from "./services/api";
import CharacterCard from './components/CharacterCard';
import Header from './components/Header';
import Footer from './components/Footer';
import { TextField, Container } from '@mui/material';


interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/character')
      .then((response) => setCharacters(response.data.results))
      .catch((err) => console.error("Erro na API", err));
  }, []);

  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen p-8">
      <Header />
      
      <Container maxWidth="lg">
        <div className="my-10 flex justify-center">
          <TextField
            label="Buscar Personagem"
            variant="filled"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ backgroundColor: '#fff', borderRadius: '80px', maxWidth: '500px' }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:grid-cols-4 gap-10 p-4">
        {filteredCharacters.slice(0, 20).map((char) => (
          <CharacterCard key={char.id} personagem={char} />
        ))}
      </div>
      </Container>
      <footer className="w-full py-6 mt-10 border-t border-gray-800 bg-[#0a0a0a] text-center">
      <p className="text-gray-400 text-sm">

      </p>
      <p className="text-gray-600 text-xs mt-1 italic">
        Fábrica de Software - Projeto Rick and Morty
      </p>
    </footer>
    </main>
  );
}
