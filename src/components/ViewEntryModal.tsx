import EntryDetails from "./EntryDetails";
import type { Artwork } from "../types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  removeEntry: (entry: Artwork) => void;
  editEntry: (entry: Artwork) => void;
  entry: Artwork;
};

const ViewEntryModal = ({ isOpen, onClose, removeEntry, editEntry, entry } : Props) => {

    if (!isOpen) return null;

    return (
    <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={onClose}
        >
        <div
            className="bg-base-200 rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-auto relative"
            onClick={(e) => e.stopPropagation()}
        >
            <button
            onClick={onClose}
            className="absolute top-3 right-3 px-3 py-1.5 btn text-sm rounded-md border border-gray-300 hover:bg-gray-100 "
            >
                Close
            </button>
           <EntryDetails entry={entry} constrained={false} disabled={true}  onDetails={() => {}} onClose={onClose}  removeEntry={(event) => removeEntry(entry)} editEntry={editEntry}/>
        </div>
    </div>
    );
};

export default ViewEntryModal;

