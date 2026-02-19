
// todo
// nach datum sortieren
// buttons im removedings stylen
// aktuell ist das speichern in storage deaktiviert
// idee: nur noch im storage speichern und draussen einfach laden
// was wenn im edit das datum geändert wird ??

import { useState } from "react"
import AddEntryModal from "./components/AddEntryModal"
import EntryList from "./components/EntryList"
import ConfirmRemoveModal from "./components/ConfirmRemoval"
import ViewEntryModal from "./components/ViewEntryModal"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { loadDiaryEntries, saveDiaryEntries } from "./util/storage";
import { useEffect, useRef } from "react";


import type {DiaryEntry,NewEntryInput } from "./types.ts";


function App() {
  const [isAddEntryModalOpen, setAddEntryModalOpen]   = useState<boolean>(false);
  const [isViewEntryModalOpen, setViewEntryModalOpen] = useState<boolean>(false);
  const [isRemoveModalOpen, setRemoveModalOpen]       = useState<boolean>(false);
  const [selectedEntry, setSelectedEntry]             = useState<DiaryEntry | null>(null);
  const [entries, setEntries]                         = useState<DiaryEntry[]>(loadDiaryEntries());

  const isEditRef = useRef<boolean>(false);

  useEffect(() => {
   saveDiaryEntries(entries);
  }, [entries]);

  const openViewEntryModal = (entry: DiaryEntry) => {
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

  const editEntry = (entry: DiaryEntry) => {
    isEditRef.current=true;
    setSelectedEntry(entry);
    setViewEntryModalOpen(false);
    setAddEntryModalOpen(true);
  };

  const handleNewEntry = (newEntry: NewEntryInput | DiaryEntry) => {

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
      const editEntry = newEntry as DiaryEntry;
      setEntries(prev => {
        const updated = prev.map(e => (e.id === editEntry.id) ? editEntry : e);
        const sorted=updated.toSorted((a, b) => b.date.localeCompare(a.date))
        return sorted;
      });
    }
    closeAddEntryModal();
};

const removeEntryYes = (entry: DiaryEntry) => {
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

const removeEntry = (entry: DiaryEntry) => {
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
        <AddEntryModal isOpen={isAddEntryModalOpen} onClose={closeAddEntryModal} onAddEntry={handleNewEntry} entry={selectedEntry}/>
        <ViewEntryModal isOpen={isViewEntryModalOpen} onClose={closeViewEntryModal} removeEntry={removeEntry} editEntry={editEntry}  entry={selectedEntry} />
        <ConfirmRemoveModal open={isRemoveModalOpen} selectedEntry={selectedEntry!}  onYes={removeEntryYes}  onNo={removeEntryNo}  />
    </>

  );
}


export default App;