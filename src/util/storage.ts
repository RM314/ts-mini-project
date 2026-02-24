import { type FavoriteArtwork } from "../types";

const STORAGE_KEY : string = 'artwork_ts_favorites';

// for local storege management, we only use ArtworkID and notes

export function loadFavoritesFromLocalStorage() : FavoriteArtwork[] {
    // we start with loading IDs of the artwok

    const favoritesJSON = localStorage.getItem(STORAGE_KEY);
    if (!favoritesJSON) {
        return [];
    }

    try {
        const favoritesData = JSON.parse(favoritesJSON) as FavoriteArtwork[];
        return favoritesData;
    } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
        return [];
    }
}

export function checkIfArtworkIsFavorite(artworkId: number): boolean {
    const favorites = loadFavoritesFromLocalStorage();
    return favorites.some(fav => fav.artworkId === artworkId);
}

export function saveFavoriteToLocalStorage({ artworkId, title, artist, notes }: FavoriteArtwork) { 
    try {
        const favorites = loadFavoritesFromLocalStorage();

        // check if the artwork is already in favorites
        const existingIndex = favorites.findIndex(fav => fav.artworkId === artworkId);

        if (existingIndex !== -1) {
            // update notes if it already exists
            favorites[existingIndex].notes = notes;
        } else {
            // add new favorite
            favorites.push({ artworkId, title, artist, notes });
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
        console.error("Can't save favorite to localStorage:", error);
    }
}

export function saveFavoritesToLocalStorage(favorites: FavoriteArtwork[]) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
        console.error("Can't save favorites to localStorage:", error);
    }
}

export function removeFavoriteFromLocalStorage(artworkId: number) {
    try {
        const favorites = loadFavoritesFromLocalStorage();
        const updatedFavorites = favorites.filter(fav => fav.artworkId !== artworkId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
        console.error("Can't remove favorite from localStorage:", error);
    }
}

export function searchByKeywordInFavorites(keyword: string): FavoriteArtwork[] {
    const favorites = loadFavoritesFromLocalStorage();
    const lowerKeyword = keyword.toLowerCase();

    return favorites.filter(fav => 
        (fav.title && fav.title.toLowerCase().includes(lowerKeyword)) ||
        (fav.artist && fav.artist.toLowerCase().includes(lowerKeyword))
    );
}

// export function loadDiaryEntries() : DiaryEntry[]  {
//     try {
//         const raw = localStorage.getItem(STORAGE_KEY);
//         return (raw) ? JSON.parse(raw) as DiaryEntry[] : [];
//     } catch (error) {
//         console.error("Failed to load diary entries:", error);
//         return [];
//     }
// }

// export function saveDiaryEntries(entries: DiaryEntry[]) {
//     try {
//         localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
//     } catch (error) {
//         console.error("Can't save diary entries:", error);
//     }
// }

// export function tryAddToDiary(entry:  DiaryEntry | NewEntryInput, isEdit: boolean) {
//     let entries :  DiaryEntry[] = loadDiaryEntries();

//     // double checking the date, in case UI fails
//     //const dateExsists = entries.some((d) => d.date === entry.date);

//      const withId: DiaryEntry = isEdit ? (entry as DiaryEntry) : { ...(entry as ), id: crypto.randomUUID() };

//      const dateExisting = entries.find(d => d.date === withId.date);

//     if ((!isEdit && dateExisting) || (isEdit && dateExisting && dateExisting.id != withId.id) ) {
//         throw new Error(
//             "Date already exists! \nChoose a new one or come back tomorrow 💤"
//         );
//     }
//     // sort missing (overwritten anyway)
//     try {
//         if (!isEdit) {
//             entries.push(withId);
//         } else {
//             const i = entries.findIndex(e => e.id === withId.id);
//             if (i !== -1) {
//                 entries[i] = withId;
//             }
//         }
//         entries=entries.sort((a, b) => a.date.localeCompare(b.date));
//         saveDiaryEntries(entries);
//     } catch (error) {
//         console.error("Can't add to Diary", error);
//         throw error;
//     }
// }