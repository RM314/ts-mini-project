import type { Artwork } from "../types";

import { useState,useEffect } from "react"

type Props = {
  entry: Artwork;
  constrained: boolean;
  disabled: boolean;
  onDetails: () => void;
  removeEntry: () => void;
  editEntry: () => void;
};

const EntryDetails = ({ entry, constrained, onDetails, removeEntry, editEntry } : Props) => {

    let imageUrl : string | null =(entry.image_id) ? `https://www.artic.edu/iiif/2/${entry.image_id}/full/843,/0/default.jpg` : null;

    //console.log(entry);

    const [editingNotes, setEditingNotes] = useState(false);
    const [notesValue, setNotesValue] = useState(entry.notes || "");

    useEffect(() => {
        setNotesValue(entry.notes || "");
    }, [entry.notes]);

    return (
    <div className={constrained ? "max-w-3xl mx-auto flex flex-col" : ""} >
        <div className="p-6 overflow-hidden">
            <h1 style={{fontFamily: "'Caveat', 'Indie Flower', 'Kalam', cursive"}} className="text-3xl font-semibold mb-4"> {entry.title} </h1>
            <h1 style={{fontFamily: "'Caveat', 'Indie Flower', 'Kalam', cursive"}} className="text-3xl font-semibold mb-4"> {entry.artist_title} </h1>

            <div className="text-gray-600 text-sm mb-3"> {entry.id} </div>
            {/* image */}
                <div className="flex flex-col md:flex-row gap-4 items-start">
                {imageUrl && (
                    <div className={`${entry.notes ? "md:w-2/3" : "w-full"}`}>
                         <div className={constrained ? "h-[300px] " : ""}>
                            <img src={imageUrl} alt="image" className={`w-full object-contain ${constrained ? "h-full" : "h-auto"}`} />
                        </div>
                    </div>
                )}
            {/* notes */}
                {entry.notes && constrained && (
                    <div className={`${imageUrl ? "md:w-2/3" : "w-full"}`}>
                        <div className="max-h-[300px]">
                        <div className="leading-relaxed line-clamp-6 overflow-hidden">
                            {entry.notes}
                        </div>
                        </div>
                    </div>
                )}

                {entry.notes && !constrained && !editingNotes && (
                    <div className={`${imageUrl ? "md:w-2/3" : "w-full"}`}>
                        <div className="max-h-[300px] overflow-y-auto">
                        <div className="leading-relaxed">
                            {entry.notes}
                        </div>
                        </div>
                    </div>
                )}

                {!constrained && editingNotes && (
                <div className={`${imageUrl ? "md:w-2/3" : "w-full"}`}>
                        <textarea
                        className="textarea textarea-bordered w-full min-h-[200px]"
                        value={notesValue}
                        onChange={(e) => setNotesValue(e.target.value)}
                        />
                        <div className="mt-2 flex gap-2">
                        <button
                            className="btn btn-success"
                            onClick={() => {
                            //editEntry(notesValue);
                            console.log(notesValue);
                            editEntry({ ...entry, notes: notesValue }); // vollständiges Objekt
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

           <div className="mt-4 flex justify-start gap-3">

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
            </div>
        </div>
    </div>
    );
};

export default EntryDetails;
