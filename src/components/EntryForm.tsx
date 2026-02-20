import { useEffect, useState } from "react";
//import { tryAddToDiary } from "../util/storage.js";
import ErrorMessage from "./ErrorMessage"

import type { Artwork} from "../types";

type Props = {
  onSubmit: (entry: Artwork ) => void;
  onClose: () => void;
  entry: Artwork | null;
};

const EntryForm = ({ onSubmit, onClose, entry} : Props) => {

  return ;

};

export default EntryForm;