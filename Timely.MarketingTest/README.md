# Timely.MarketingTest

This project is a technical software engineering test for the Marketing team's main brand website. Written against the [Umbraco CMS](https://docs.umbraco.com/umbraco-cms), this test examines how well a candidate knows the Umbraco API, what their coding standards and biases are, and how they approach basic problem solving.

## Installation

Download the repo and run `dotnet run` from the Visual Studio Code command line. This will install all necessary packages and run the empty application.

```bash
dotnet run
```

## Activities

1. Create a base document type and inherit a homepage type from that. The homepage type should have a "tags" property.
1. Create a homepage template and content page that applies it.
1. Create a way to retrieve all content tags for a page.
1. Create an element type of Pokemon with the following properties
    - Name
    - Height
    - Weight
    - Species
1. Implement a way to call the [Pokemon API](https://pokeapi.co/api/v2/) and retrieve a list of _n_ results
    1. Iterate over the collection to retrieve properties matching the above element type fields and create a Pokemon content element for each
    1. Render those content elements on the page using a Block List
1. Create a form on the homepage that, when submitted, returns a count of all published content items on the site.

### Architecture and Delivery
1. Part of the requirements for this site are that we are able to gather usage and marketing campaign metrics from visitors to the site. Describe how you would ensure our SEO and front-end performance could be optimised so as to not impact customers' experience of navigating the site while still allowing us to implement various front-end metrics. 
1. The Timely product is served to customers all over the world. Describe some of the tools and mechanisms you'd use to deliver content reliably across multiple geographic regions.
1. Previously the team has relied on manually copying the compiled site across from a development environment to a staging or production environment. Discuss in detail how you'd ensure the deployment process was reliable and efficient.
1. The company wants to run a campaign offering an extremely generous pricing offer for new and existing customers. How would you prepare for a large increase in customer traffic both before and during that campaign?