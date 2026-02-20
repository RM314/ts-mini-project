// todo
// nach datum sortieren
// buttons im removedings stylen
// aktuell ist das speichern in storage deaktiviert
// idee: nur noch im storage speichern und draussen einfach laden
// was wenn im edit das datum geändert wird ??

import { useEffect, useState } from "react"
import EntryList from "./components/EntryList"
import ConfirmRemoveModal from "./components/ConfirmRemoval"
import ViewEntryModal from "./components/ViewEntryModal"
import Header from "./components/Header"
import Footer from "./components/Footer"
//import { loadDiaryEntries, saveDiaryEntries } from "./util/storage";

import { type Artwork } from "./types";
import { ArtworkContext } from "./context/ArtworkContext";
import { fetchArtworks } from "./api/chicagoAPI"

import SearchBarView from "./components/SearchBar";

function App() {

  // setup context for artwork
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  //const [isAddEntryModalOpen, setAddEntryModalOpen]   = useState<boolean>(false);
  const [isViewEntryModalOpen, setViewEntryModalOpen] = useState<boolean>(false);
  const [isRemoveModalOpen, setRemoveModalOpen] = useState<boolean>(false);
  const [selectedEntry, setSelectedEntry] = useState<Artwork | null>(null);

  //const isEditRef = useRef<boolean>(false);

  // on load
  useEffect(() => {
    fetchArtworks()
      .then((data) => setArtworks(data))
      .catch((error) => {
        console.error("Error fetching artworks:", error);
      });
  }, []);

  const openViewEntryModal = (entry: Artwork) => {
    setSelectedEntry(entry);
    setViewEntryModalOpen(true);
  };

  const closeViewEntryModal = () => {
    setSelectedEntry(null);
    setViewEntryModalOpen(false);
  };


  const openAddEntryModal = () => {
    //isEditRef.current=false;
    setSelectedEntry(null);
    //setAddEntryModalOpen(true);
  };

  const editEntry = (entry: Artwork) => {
    //isEditRef.current=true;
    console.log("BLOED!!")
    console.log(entry)
    // console.log(entries);
    setSelectedEntry(entry);
    //setViewEntryModalOpen(false);
    //setAddEntryModalOpen(true);

    const editEntry = entry;
    setArtworks(prev => {
      const updated = prev.map(e => (e.id === editEntry.id) ? editEntry : e);
      return updated;
    });

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
    // closeAddEntryModal();
  };

  const removeEntryYes = (entry: Artwork) => {
    //entries.splice(entries.indexOf(entry), 1);
    // setEntries(entries.filter(el => el != entry));
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
    setRemoveModalOpen(true);
  };

  return (
    <>
      <ArtworkContext.Provider value={{ artworks, setArtworks }}>
        <Header onAddClick={openAddEntryModal} />
        <SearchBarView />
        <main>
          <EntryList onClick={openViewEntryModal} removeEntry={removeEntry} editEntry={editEntry} entries={artworks} /> {/*This displays the list of EntryCard and opens ViewEntryModal when clicked, which displays EntryDetails*/}
        </main>
        <Footer />
        <ViewEntryModal isOpen={isViewEntryModalOpen} onClose={closeViewEntryModal} removeEntry={removeEntry} editEntry={editEntry} entry={selectedEntry} />
        <ConfirmRemoveModal open={isRemoveModalOpen} selectedEntry={selectedEntry!} onYes={removeEntryYes} onNo={removeEntryNo} />
      </ArtworkContext.Provider>
      
    </>
  );
}

export default App;