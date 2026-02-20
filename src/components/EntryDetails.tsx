import type { Artwork } from "../types";

type Props = {
  entry: Artwork;
  constrained: boolean;
  disabled: boolean;
  onDetails: () => void;
  removeEntry: () => void;
  editEntry: () => void;
};

const EntryDetails = ({ entry, constrained, disabled, onDetails, removeEntry, editEntry } : Props) => {

    let imageUrl : string | null =(entry.image_id) ? `https://www.artic.edu/iiif/2/${entry.image_id}/full/843,/0/default.jpg` : null;

    return (
    <div className={constrained ? "max-w-3xl mx-auto flex flex-col" : ""} >
        <div className="p-6 overflow-hidden">
            <h1 style={{fontFamily: "'Caveat', 'Indie Flower', 'Kalam', cursive"}} className="text-3xl font-semibold mb-4"> {entry.title} </h1>
            <h1 style={{fontFamily: "'Caveat', 'Indie Flower', 'Kalam', cursive"}} className="text-3xl font-semibold mb-4"> {entry.artist_title} </h1>

            <div className="text-gray-600 text-sm mb-3"> {entry.id} </div>

            <div className="flex flex-col md:flex-row md:gap-3 md:items-start overflow-hidden h-[300px]">
                {(imageUrl) &&
                (<div className="md:w-1/3 pt-2 shrink-0 ">
                    <img src={imageUrl} alt="image" className="w-full h-auto rounded-lg shadow-md "/>
                </div>)}
                {(entry.notes) &&
                (<div className={`${imageUrl ? "md:w-2/3" : ""} flex flex-col`}>
                    <div className={constrained ? "leading-relaxed overflow-hidden line-clamp-6 " :"leading-relaxed overflow-hidden"} >
                        {entry.notes}
                    </div>
                </div>)}

            </div>
           <div className="mt-4 flex justify-start gap-3">

           {(!disabled) &&
            (<button
                 onClick={onDetails}
                className="btn btn-warning" >
                Details
            </button>)
           }

            <button className="btn btn-primary" onClick={editEntry}> Edit   </button>
            <button className="btn btn-danger" onClick={removeEntry}>  Delete </button>

            </div>
        </div>
    </div>
    );
};

export default EntryDetails;
