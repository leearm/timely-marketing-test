using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Timely.MarketingTest.Models;

namespace Timely.MarketingTest.Controllers;

// API Controller for fetching Pokemon data from the PokeAPI.
// 
// This controller provides a server-side endpoint that:
// 1. Receives requests from the frontend
// 2. Calls the external PokeAPI (https://pokeapi.co/api/v2/)
// 3. pulls data from multiple API endpoints
// 4. Returns transformed Pokemon data
// Documentation: https://pokeapi.co/docs/v2

[ApiController]
[Route("umbraco/api/[controller]/[action]")]
public class PokemonApiController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger<PokemonApiController> _logger;

    private const string PokeApiBaseUrl = "https://pokeapi.co/api/v2/";

    public PokemonApiController(IHttpClientFactory httpClientFactory, ILogger<PokemonApiController> logger)
    {
        _httpClientFactory = httpClientFactory;
        _logger = logger;
    }

    // Fetches a list of Pokemon from the PokeAPI and returns transformed data.
    // 
    // API Call Flow:
    // 1. GET https://pokeapi.co/api/v2/pokemon?limit={count}
    //    - Returns a list of Pokemon with basic info and detail URLs
    // 
    // 2. For each Pokemon in the list:
    //    a) GET {pokemon.url} (e.g., https://pokeapi.co/api/v2/pokemon/1/)
    //    b) GET {species.url} (e.g., https://pokeapi.co/api/v2/pokemon-species/1/)
    // 
    // 3. Transform and aggregate data into PokemonDto objects

    [HttpGet]
    public async Task<ActionResult<List<PokemonDto>>> GetPokemon([FromQuery] int count = 20)
    {
        try
        {
            // Validate input parameter
            if (count <= 0 || count > 100)
            {
                return BadRequest("Count must be between 1 and 100");
            }

            var httpClient = _httpClientFactory.CreateClient();
            var pokemonList = new List<PokemonDto>();

            // Step 1: Fetch the initial list of Pokemon
            // API returns: { "results": [{ "name": "bulbasaur", "url": "..." }, ...] }
            var listResponse = await httpClient.GetStringAsync($"{PokeApiBaseUrl}pokemon?limit={count}");
            var listData = JsonDocument.Parse(listResponse);
            var results = listData.RootElement.GetProperty("results");

            // Step 2: Fetch detailed data for each Pokemon
            foreach (var pokemon in results.EnumerateArray())
            {
                var pokemonUrl = pokemon.GetProperty("url").GetString();
                if (string.IsNullOrEmpty(pokemonUrl)) continue;

                try
                {
                    // Step 2a: Get detailed Pokemon data (height, weight, species URL)
                    var detailResponse = await httpClient.GetStringAsync(pokemonUrl);
                    var detailData = JsonDocument.Parse(detailResponse);

                    // Step 2b: Get species data for the species name
                    var speciesUrl = detailData.RootElement.GetProperty("species").GetProperty("url").GetString();
                    var speciesResponse = await httpClient.GetStringAsync(speciesUrl);
                    var speciesData = JsonDocument.Parse(speciesResponse);

                    // Step 3: Create DTO with transformed data
                    var pokemonDto = new PokemonDto
                    {
                        // PokeAPI returns names in lowercase with hyphens (e.g., "bulbasaur", "mr-mime")
                        Name = CapitalizeName(detailData.RootElement.GetProperty("name").GetString() ?? "Unknown"),
                        
                        // Height is in decimetres (1 decimetre = 0.1 meters)
                        Height = detailData.RootElement.GetProperty("height").GetInt32(),
                        
                        // Weight is in hectograms (1 hectogram = 0.1 kg)
                        Weight = detailData.RootElement.GetProperty("weight").GetInt32(),
                        
                        // Species name from the species endpoint
                        Species = CapitalizeName(speciesData.RootElement.GetProperty("name").GetString() ?? "Unknown")
                    };

                    pokemonList.Add(pokemonDto);
                }
                catch (Exception ex)
                {
                    // Log and skip individual Pokemon that fail to load
                    // This ensures partial data is still returned if some Pokemon fail
                    _logger.LogWarning(ex, "Failed to fetch details for Pokemon");
                    continue;
                }
            }

            return Ok(pokemonList);
        }
        catch (Exception ex)
        {
            // Log the error and return a 500 status code
            _logger.LogError(ex, "Error fetching Pokemon data");
            return StatusCode(500, "Error fetching Pokemon data");
        }
    }

    // Capitalizes Pokemon names for better display.
    // Splits on hyphens and capitalizes each word.
    private string CapitalizeName(string name)
    {
        if (string.IsNullOrEmpty(name)) return name;
        
        // Split on hyphens
        var words = name.Split('-');
        
        // Capitalize first letter of each word
        var capitalizedWords = words.Select(word => 
            char.ToUpper(word[0]) + word.Substring(1).ToLower()
        );
        
        // Join with spaces 
        return string.Join(" ", capitalizedWords);
    }
}

