import { useState, useEffect } from "react";
import { fetchArtworks, searchArtworks } from "../api/chicagoAPI";
import { useArtworkContext } from "../context/ArtworkContext";

const SearchBarView = () => {
    const [query, setQuery] = useState<string>("");
    const { artworks, setArtworks } = useArtworkContext();
  
    useEffect(() => {
      const timer = setTimeout(() => {
        if (query.length > 2) {
          searchArtworks(query)
            .then((results) => setArtworks(results))
            .catch((error) => {
              console.error("Error searching artworks:", error);
            });
        } else if (query.length === 0) {
            fetchArtworks()
            .then((data) => setArtworks(data))
            .catch((error) => {
              console.error("Error fetching artworks:", error);
            });
        } else {
            // indicate that typing is needed.. maybe
            setArtworks([]);
        }

      }, 300);
  
      return () => clearTimeout(timer);
    }, [query, setArtworks]);
  
    return (
      <div className="flex justify-center items-center py-6">
        <span className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="🔍  Search artworks..."
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 pl-4 pr-12 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
          {query.length > 2 && ("Searching for: " + query + " (" + artworks?.length + " results)")}
        </span>
      </div>
    );
  };
  
  export default SearchBarView;