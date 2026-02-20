const AddEntryButton = ({onClick} : { onClick: () => void }) => {
  // "/opens the Add Entry Modal using useState()/"
  return (
    <button onClick={onClick}
      className="btn btn-primary m-10"
    >
    + Add Entry
    </button>
  );
}

export default AddEntryButton;
