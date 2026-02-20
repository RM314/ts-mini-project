import { createContext, useContext } from "react";
import type { Artwork } from "../types";

interface IArtworkContextType {
    artworks?: Artwork[];
    setArtworks: (artworks: Artwork[]) => void;
}

export const ArtworkContext = createContext<IArtworkContextType | undefined>(undefined);

export function useArtworkContext() {
    return useContext(ArtworkContext);
}