import type { Artwork } from "../types";
import EntryDetails from "./EntryDetails";

type Props = {
  entry: Artwork;
  onClick: (entry: Artwork) => void;
  removeEntry: (entry: Artwork) => void;
  editEntry: (entry: Artwork) => void;
};

const EntryCard = ({entry, onClick, removeEntry, editEntry} : Props) => {
    return (
    <div className="bg-white rounded-lg shadow-md p-4">
        <EntryDetails entry={entry} constrained={true} disabled={false} onDetails={(event) => onClick(entry)} removeEntry={(event) => removeEntry(entry)} editEntry={(event) => editEntry(entry)}/>
    </div>
)};

export default EntryCard;
