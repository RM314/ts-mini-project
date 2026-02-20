
// todo
// nach datum sortieren
// buttons im removedings stylen
// aktuell ist das speichern in storage deaktiviert
// idee: nur noch im storage speichern und draussen einfach laden
// was wenn im edit das datum geändert wird ??

import { useState } from "react"
import EntryList from "./components/EntryList"
import ConfirmRemoveModal from "./components/ConfirmRemoval"
import ViewEntryModal from "./components/ViewEntryModal"
import Header from "./components/Header"
import Footer from "./components/Footer"
//import { loadDiaryEntries, saveDiaryEntries } from "./util/storage";
import { useEffect, useRef } from "react";

import type { Artwork } from "../types";

const art1 = {
    id: 16568,
    title: "Water Lilies",
    artist_title: "Claude Monet",
    image_id: "3c27b499-af56-f0d5-93b5-a7f2f1ad5813",
    notes: "lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore " +
            "lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore " +
            "lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore " +
            "lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore " +
            "lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore "
  };

  const art2: Artwork = {
  id: 27992,
  title: "A Sunday on La Grande Jatte — 1884",
  artist_title: "Georges Seurat",
  image_id: "2d484387-2509-5e8e-2c43-22f9981972eb"
  };



  const loadArtEntries = () : Artwork[]  => {
    return ([art1,art2]);
  }


function App() {





  const [isAddEntryModalOpen, setAddEntryModalOpen]   = useState<boolean>(false);
  const [isViewEntryModalOpen, setViewEntryModalOpen] = useState<boolean>(false);
  const [isRemoveModalOpen, setRemoveModalOpen]       = useState<boolean>(false);
  const [selectedEntry, setSelectedEntry]             = useState<Artwork | null>(null);
  const [entries, setEntries]                         = useState<Artwork[]>(loadArtEntries());




  const isEditRef = useRef<boolean>(false);

  useEffect(() => {
   //saveArtEntries(entries);
  }, [entries]);

  const openViewEntryModal = (entry: Artwork) => {
    setSelectedEntry(entry);
    setViewEntryModalOpen(true);
  };

  const closeViewEntryModal = () => {
    setSelectedEntry(null);
    setViewEntryModalOpen(false);
  };

  const closeAddEntryModal = () => {
    setAddEntryModalOpen(false);
  };

  const openAddEntryModal = () => {
    isEditRef.current=false;
    setSelectedEntry(null);
    setAddEntryModalOpen(true);
  };

  const editEntry = (entry: Artwork) => {
    isEditRef.current=true;
    setSelectedEntry(entry);
    setViewEntryModalOpen(false);
    setAddEntryModalOpen(true);
  };

  const handleNewEntry = (newEntry: Artwork) => {

    /*
    if (!isEditRef.current) {
      const entry= {
        ...newEntry,
        id: crypto.randomUUID()
      };
      setEntries(prev => {
        const updated = [...prev, entry];
        const sorted=updated.toSorted((a, b) => b.date.localeCompare(a.date))
        console.log(sorted.map(e => e.id));
        return sorted;
      });
    } else {
      const editEntry = newEntry as Artwork;
      setEntries(prev => {
        const updated = prev.map(e => (e.id === editEntry.id) ? editEntry : e);
        const sorted=updated.toSorted((a, b) => b.date.localeCompare(a.date))
        return sorted;
      });
    }
    */
    closeAddEntryModal();
};

const removeEntryYes = (entry: Artwork) => {
 entries.splice(entries.indexOf(entry), 1);
 setEntries(entries.filter(el => el != entry));
 setSelectedEntry(null);
 // save done by effect
 setRemoveModalOpen(false);
 setViewEntryModalOpen(false);
}

const removeEntryNo = () => {
 setRemoveModalOpen(false);
 setViewEntryModalOpen(false);
}

const removeEntry = (entry: Artwork) => {
 setSelectedEntry(entry);
 console.log(entry);
 setRemoveModalOpen(true);
};

  return (
    <>
      <Header onAddClick={openAddEntryModal} />
      <main>
        <EntryList onClick={openViewEntryModal} removeEntry={removeEntry} editEntry={editEntry} entries={entries} /> {/*This displays the list of EntryCard and opens ViewEntryModal when clicked, which displays EntryDetails*/}
      </main>
      <Footer />
        <ViewEntryModal isOpen={isViewEntryModalOpen} onClose={closeViewEntryModal} removeEntry={removeEntry} editEntry={editEntry}  entry={selectedEntry} />
        <ConfirmRemoveModal open={isRemoveModalOpen} selectedEntry={selectedEntry!}  onYes={removeEntryYes}  onNo={removeEntryNo}  />
    </>

  );
}


export default App;