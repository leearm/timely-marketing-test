namespace Timely.MarketingTest.Models;

// Data Transfer Object for Pokemon data retrieved from PokeAPI.
public class PokemonDto
{
    // Capitalized for display purposes.
    public string Name { get; set; } = string.Empty;
    
    // The height of the Pokemon in decimetres.
    public int Height { get; set; }
    
    // The weight of the Pokemon in hectograms.
    public int Weight { get; set; }
    .
    // Retrieved from the Pokemon species endpoint.
    public string Species { get; set; } = string.Empty;
}

