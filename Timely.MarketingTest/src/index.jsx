import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function PokemonCard({ pokemon }) {
  // Convert height from decimetres to meters and weight from hectograms to kg
  const heightInMeters = (pokemon.height / 10).toFixed(1);
  const weightInKg = (pokemon.weight / 10).toFixed(1);

  return (
    <div className="bg-pokemon-red border border-8 border-pokemon-yellow rounded-lg p-4">
      <h3 className="text-2xl font-bold text-black-900 mb-[5rem]">{pokemon.name}</h3>
      <div className="space-y-[0.3rem] text-sm">
        <p className="text-black-800">
          <span className="font-semibold">Species:</span> {pokemon.species}
        </p>
        <p className="text-black-800">
          <span className="font-semibold">Height:</span> {heightInMeters}m
        </p>
        <p className="text-black-800">
          <span className="font-semibold">Weight:</span> {weightInKg}kg
        </p>
      </div>
    </div>
  );
}

function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        // Umbraco API route convention: /umbraco/api/{controller}/{action}
        const url = '/umbraco/api/pokemonapi/getpokemon?count=20';
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch Pokemon (Status: ${response.status})`);
        }
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        console.error('Error fetching Pokemon:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-pokemon-yellow py-12">
        <p className="text-gray-600">Loading Pokemon...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-pokemon-yellow py-12">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {pokemon.map((poke, index) => (
        <PokemonCard key={index} pokemon={poke} />
      ))}
    </div>
  );
}

function HomePage({ pageTitle, heroUrl, mainParagraph, subParagraph, rightSideParagraph }) {
  return (
    <main className="bg-timely-pink w-full">
      {/* Full-width hero section */}
      <header className="relative w-full h-[450px]">
        <img
          src={heroUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </header>

      {/* column section */}
      {/* Left column */}
      <section className="bg-timely-pink mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-3/5">
            <h2 className="text-4xl font-bold text-black-900 mb-8">{pageTitle}</h2>
            <p className="text-lg text-black-700 leading-relaxed pb-4">
              {mainParagraph || ""}
            </p>
            <p className="text-sm text-black-700 leading-relaxed">
              {subParagraph || ""}
            </p>
          </div>

      {/* Right column */}
          <div className="w-full lg:w-2/5">
            <h3 className="text-xl font-semibold text-black-900 mb-4">Right Column</h3>
            <p className="text-black-700">
              {rightSideParagraph || ""}
            </p>
          </div>
        </div>
      </section>

      {/* Pokemon Block List */}
      <section className="bg-timely-pink mx-auto max-w-7xl px-6 py-12">
        <PokemonList />
      </section>
    </main>
  );
}

const el = document.getElementById("react-root");
if (el) {
  const props = {
    pageTitle: el.dataset.pageTitle,
    heroUrl: el.dataset.heroUrl,
    mainParagraph: el.dataset.mainParagraph,
    subParagraph: el.dataset.subParagraph,
    rightSideParagraph: el.dataset.rightSideParagraph
  };
  createRoot(el).render(<HomePage {...props} />);
}
