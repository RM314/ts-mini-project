import type { Artwork } from "../types";

type Props = {
  open: boolean;
  selectedEntry: Artwork;
  onYes: (entry: Artwork) => void;
  onNo: () => void;
};


const ConfirmRemoveModal = ({ open, selectedEntry, onYes, onNo } : Props) =>   {
  if (!open) return null;
  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <p>Really remove day {selectedEntry.date} ?</p>

        <div className="modal-action">
          <button className="btn btn-warning" onClick={(event) => onYes(selectedEntry)} >Yes</button>
          <button className="btn btn-primary" onClick={onNo}>No</button>
        </div>
      </div>

      <div className="modal-backdrop" onClick={onNo} />
    </dialog>
  );
}

export default ConfirmRemoveModal;

