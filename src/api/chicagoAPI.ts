import { z } from 'zod/v4';
import { ArtworkSchema, type Artwork } from "../types";

// Schema für die gesamte API-Antwort
// const ArtworksResponseSchema = z.object({
//     data: z.array(_ArtworkSchema)
// });


export async function fetchArtworks(): Promise<Artwork[]> {

    const randomPage = Math.floor(Math.random() * 200) + 1;
    const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${randomPage}&limit=7`);

    if (!response.ok) {
        throw new Error(`Failed to fetch artworks: ${response.statusText}`);
    }

    const json = await response.json();
    const { data, error, success } = z.array(ArtworkSchema).safeParse(json.data);

    if (!success) {
        console.error('Validation errors:', error);
        throw new Error('Invalid product data received from API.');
    }

    console.log("Fetched artworks:", data);

    return data;
}


export async function searchArtworks(query: string): Promise<Artwork[]> {

    // defining query parameters for the search API call
    // as search API does not return all fields by default, 
    // like in the fetchArtworks function
    
    const params = new URLSearchParams({
        q: query,
        limit: "15",
        fields: [
            "id",
            "title",
            "image_id",
            "artist_title",
            "date_display",
            "medium_display"
        ].join(","),
    });

    const response = await fetch(`https://api.artic.edu/api/v1/artworks/search?${params.toString()}`);
    if (!response.ok) {
        throw new Error(`Failed to search artworks: ${response.statusText}`);
    }

    const json = await response.json();
    console.log("Raw search response:", json.data);

    const { data, error, success } = z.array(ArtworkSchema).safeParse(json.data);
    if (!success) {
        console.error("Validation errors:", error);
        throw new Error("Invalid product data received from API.");
    }

    // Filter out artworks without images
    return data.filter(artwork => artwork.image_id !== null);
}