import type { DiaryEntry } from "../types";
import EntryForm from "./EntryForm.jsx";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAddEntry: (entry: Omit<DiaryEntry, "id"> | DiaryEntry) => void;
  entry: DiaryEntry | null;
};

const AddEntryModal = ({ onAddEntry,  isOpen, onClose, entry} : Props) => {

    if (!isOpen) return null;

    return (
    <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={onClose}
        >
        <div
            className="bg-base-200 rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
        >
            <button
            onClick={onClose}
            className="absolute top-3 right-3 px-3 py-1.5 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
            >
                Close
            </button>

        <div>
          <EntryForm onSubmit={onAddEntry} onClose={onClose} entry={entry} />
        </div>
        </div>
    </div>
    );
};


export default AddEntryModal;