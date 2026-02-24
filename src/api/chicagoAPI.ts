import { z } from 'zod/v4';
import { ArtworkSchema, type Artwork } from "../types";
import { loadFavoritesFromLocalStorage as loadFavoriteEntriesFromLocalStorage } from "../util/storage";
import { searchByKeywordInFavorites } from "../util/storage";

export async function fetchArtworks(loadFavorites: boolean = false): Promise<Artwork[]> {

    // :et's use the same function for fetching db and localStorage favorites

    if (loadFavorites) {
        return loadFavoriteArtworksById();

    } else {

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
}

async function loadFavoriteArtworksById(): Promise<Artwork[]> {
    const favorites = loadFavoriteEntriesFromLocalStorage();

    if (favorites.length === 0) {
        return [];
    }

    const artworks = await Promise.all(
        favorites.map(async ({ artworkId, notes }) => {
            try {
                const response = await fetch(
                    `https://api.artic.edu/api/v1/artworks/${artworkId}?fields=id,title,image_id,artist_title`,
                );

                if (!response.ok) {
                    console.error(`Failed to fetch favorite artwork ${artworkId}: ${response.statusText}`);
                    return null;
                }

                const json = await response.json();
                const { data, error, success } = ArtworkSchema.safeParse(json.data);

                if (!success) {
                    console.error(`Validation error for favorite artwork ${artworkId}:`, error);
                    return null;
                }

                return { ...data, notes };
            } catch (error) {
                console.error(`Error fetching favorite artwork ${artworkId}:`, error);
                return null;
            }
        }),
    );

    return artworks.filter((artwork): artwork is Artwork => artwork !== null);
}

export async function searchArtworks(query: string, inFavorites: boolean = false): Promise<Artwork[]> {

    if (inFavorites) {
        const allFavorites = searchByKeywordInFavorites(query);

        if (allFavorites.length === 0) {
            return [];
        }

        // Fetch full artwork data for matching favorites
        const artworks = await Promise.all(
            allFavorites.map(async ({ artworkId, notes }) => {
                try {
                    const response = await fetch(
                        `https://api.artic.edu/api/v1/artworks/${artworkId}?fields=id,title,image_id,artist_title`,
                    );

                    if (!response.ok) {
                        console.error(`Failed to fetch favorite artwork ${artworkId}: ${response.statusText}`);
                        return null;
                    }

                    const json = await response.json();
                    const { data, error, success } = ArtworkSchema.safeParse(json.data);

                    if (!success) {
                        console.error(`Validation error for favorite artwork ${artworkId}:`, error);
                        return null;
                    }

                    return { ...data, notes };
                } catch (error) {
                    console.error(`Error fetching favorite artwork ${artworkId}:`, error);
                    return null;
                }
            }),
        );

        return artworks.filter((artwork): artwork is Artwork => artwork !== null);
    } else {

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
}