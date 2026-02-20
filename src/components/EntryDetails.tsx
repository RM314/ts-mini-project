import type { Artwork } from "../types";

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

    console.log(entry);

    return (
    <div className={constrained ? "max-w-3xl mx-auto flex flex-col" : ""} >
        <div className="p-6 overflow-hidden">
            <h1 style={{fontFamily: "'Caveat', 'Indie Flower', 'Kalam', cursive"}} className="text-3xl font-semibold mb-4"> {entry.title} </h1>
            <h1 style={{fontFamily: "'Caveat', 'Indie Flower', 'Kalam', cursive"}} className="text-3xl font-semibold mb-4"> {entry.artist_title} </h1>

            <div className="text-gray-600 text-sm mb-3"> {entry.id} </div>
                <div className="flex flex-col md:flex-row gap-4 md:items-start">
                {imageUrl && (
                    <div className={`${entry.notes ? "md:w-2/3" : "w-full"}`}>
                        <div className={`${constrained ? "max-h-[300px]" : "max-h-[300px]"} overflow-hidden`}>
                            <img src={imageUrl} alt="image" className="w-full h-auto object-contain rounded-lg shadow-md" />
                        </div>
                    </div>
                )}

                {entry.notes && (
                    <div className={`${imageUrl ? "md:w-2/3" : "w-full"}`}>
                        <div className="max-h-[300px]">
                            <div className={`leading-relaxed md:px-0 ${constrained ? "line-clamp-6 overflow-hidden" : "overflow-y-auto"}`}>
                                {entry.notes}
                            </div>
                        </div>
                    </div>
                )}
            </div>

           <div className="mt-4 flex justify-start gap-3">

           <button
                 onClick={onDetails}
                className="btn btn-warning" >
                Details
            </button>

            <button className="btn btn-danger" onClick={removeEntry}>  Delete </button>

            </div>
        </div>
    </div>
    );
};

export default EntryDetails;
