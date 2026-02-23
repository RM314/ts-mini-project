import { useState, useEffect } from "react"

import type { Artwork } from "../types";
import { useArtworkContext } from "../context/ArtworkContext";

import { checkIfArtworkIsFavorite, saveFavoriteToLocalStorage } from "../util/storage";


type Props = {
    entry: Artwork;
    constrained: boolean;
    disabled: boolean;
    onDetails: () => void;
    onClose?: () => void;
    removeEntry: (entry: Artwork) => void;
    editEntry: (entry: Artwork) => void;
};

const EntryDetails = ({ entry, constrained, onDetails, editEntry, onClose, removeEntry }: Props) => {

    let imageUrl: string | null = (entry.image_id) ? `https://www.artic.edu/iiif/2/${entry.image_id}/full/843,/0/default.jpg` : null;

    const [editingNotes, setEditingNotes] = useState(false);
    const [notesValue, setNotesValue] = useState(entry.notes || "");

    useEffect(() => {
        setNotesValue(entry.notes || "");
    }, [entry.notes]);

    return (
        <div className={constrained ? "max-w-3xl mx-auto flex flex-col" : ""} >
            <div className="p-6 overflow-hidden">
                <h1 style={{ fontFamily: "'Caveat', 'Indie Flower', 'Kalam', cursive" }} className="text-4xl font-semibold mb-4"> {entry.title} </h1>
                <h1 style={{ fontFamily: "'Caveat', 'Indie Flower', 'Kalam', cursive" }} className="text-2xl mb-4"> {entry.artist_title} </h1>

                <div className="text-gray-600 text-sm mb-3"> {entry.id} </div>
                {/* image */}
                <div className="flex flex-col md:flex-row gap-4 items-start">
                    {imageUrl && (
                        <div onClick={constrained ? onDetails : onClose} className={`${constrained ? "cursor-zoom-in " : "cursor-zoom-out"} ${entry.notes ? "md:w-2/3" : "w-full"}`}>
                            <div className={constrained ? "h-75 " : ""}>
                                <img src={imageUrl} alt="image" className={`w-full object-contain ${constrained ? "h-full" : "h-auto"}`} />
                            </div>
                        </div>
                    )}
                    {/* notes */}
                    {entry.notes && constrained && (
                        <div className={`${imageUrl ? "md:w-2/3" : "w-full"}`}>
                            <div className="max-h-75">
                                <div className="leading-relaxed line-clamp-6 overflow-hidden">
                                    {entry.notes}
                                </div>
                            </div>
                        </div>
                    )}

                    {entry.notes && !constrained && !editingNotes && (
                        <div className={`${imageUrl ? "md:w-2/3" : "w-full"}`}>
                            <div className="max-h-75 overflow-y-auto">
                                <div className="leading-relaxed">
                                    {entry.notes}
                                </div>
                            </div>
                        </div>
                    )}

                    {!constrained && editingNotes && (
                        <div className={`${imageUrl ? "md:w-2/3" : "w-full"}`}>
                            <textarea
                                className="textarea textarea-bordered w-full min-h-50"
                                value={notesValue}
                                onChange={(e) => setNotesValue(e.target.value)}
                            />
                            <div className="mt-2 flex gap-2">
                                <button
                                    className="btn btn-success"
                                    onClick={() => {
                                        const normalizedNotes = notesValue.trim().length > 0 ? notesValue : null;
                                        saveFavoriteToLocalStorage({
                                            artworkId: entry.id,
                                            title: entry.title,
                                            artist: entry.artist_title,
                                            notes: normalizedNotes
                                        });
                                        editEntry({ ...entry, notes: normalizedNotes });
                                        setEditingNotes(false);
                                    }}
                                >
                                    Save
                                </button>
                                <button
                                    className="btn btn-ghost"
                                    onClick={() => {
                                        setNotesValue(entry.notes || "");
                                        setEditingNotes(false);
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* <div className="">

                    {constrained && (
                        <button
                            onClick={onDetails}
                            className="btn btn-warning" >
                            Details
                        </button>
                    )}

                    {!constrained && (
                        <button
                            className="btn btn-info"
                            onClick={() => setEditingNotes(true)}
                        >
                            {entry.notes ? "Edit Notes" : "Add Notes"}
                        </button>
                    )}
                    <button className="btn btn-danger" onClick={removeEntry}>  Delete </button>
                </div> */}

                <ArtworkActionButtons entry={entry} editEntry={onEditPress} removeEntry={() => removeEntry(entry)} />
            </div>
        </div>
    );

    function onEditPress() {
        if (constrained) {
            onDetails();
            return;
        }

        setEditingNotes(true);
    };
};

type ArtworkActionButtonsProps = {
    entry: Artwork;
    editEntry: () => void;
    removeEntry: () => void;
};

const ArtworkActionButtons = ({ entry, editEntry, removeEntry }: ArtworkActionButtonsProps) => {

    const { setArtworks } = useArtworkContext();
    const isInFavorites: boolean = checkIfArtworkIsFavorite(entry.id);

    return (
        <div className="mt-4 flex justify-start gap-3">

            {!isInFavorites &&
                <button
                    className="btn"
                    onClick={onAddToFavoritesPress}
                >
                    🩶 Add to Favorites
                </button>
            }

            {isInFavorites &&
                <span className="flex flex-row p-0 gap-2">
                    <button
                        className="btn btn-success"
                        onClick={onNotesPress}
                    >
                        Notes
                    </button>

                    <button
                        className="btn"
                        onClick={onRemoveFromFavoritesPress}
                    >
                        Remove from 🩶
                    </button>

                </span>
            }

        </div>
    )

    function onAddToFavoritesPress() {
        console.log("On add to favorites press for", entry.title)
        saveFavoriteToLocalStorage({
            artworkId: entry.id,
            title: entry.title,
            artist: entry.artist_title,
            notes: null
        });

        // refreshing ui
        setArtworks((prev: Artwork[]) => {
            const updated = prev.map(e => {
                if (e.id === entry.id) {
                    return { ...e, notes: "" }; // adding empty notes to indicate favorite status
                }
                return e;
            });
            return updated;
        });
    }

    function onNotesPress() {
        console.log("On notes press for", entry.title)
        // open notes editing UI
        editEntry();
    }

    function onRemoveFromFavoritesPress() {
        console.log("On remove from favorites press for", entry.title)
        removeEntry(); // will show dialog to confirm
    }
};

export default EntryDetails;
