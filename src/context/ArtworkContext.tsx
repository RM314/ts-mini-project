import { createContext, useContext, type Dispatch, type SetStateAction } from "react";
import type { Artwork } from "../types";

interface IArtworkContextType {
    artworks?: Artwork[];
    setArtworks: Dispatch<SetStateAction<Artwork[]>>;
}

export const ArtworkContext = createContext<IArtworkContextType | undefined>(undefined);

export function useArtworkContext() {
    const context = useContext(ArtworkContext);

    if (!context) {
        throw new Error("useArtworkContext must be used inside ArtworkContext.Provider");
    }

    return context;
}