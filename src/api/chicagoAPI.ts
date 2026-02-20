import { z } from 'zod/v4';
import { ArtworkSchema, type Artwork } from "../types";

// Schema für die gesamte API-Antwort
// const ArtworksResponseSchema = z.object({
//     data: z.array(_ArtworkSchema)
// });


export async function fetchArtworks(): Promise<Artwork[]> {

    const response = await fetch('https://api.artic.edu/api/v1/artworks?page=1&limit=10');
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