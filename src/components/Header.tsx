import logo from '../assets/logo.png';
import { useViewModeContext, ViewMode } from '../context/ViewModeContext';

const Header = () => {

  const { viewMode, toggleViewMode } = useViewModeContext();

  const primaryButtonClass = viewMode === ViewMode.All ? '' : 'btn-primary';
  const secondaryButtonClass = viewMode === ViewMode.All ? 'btn-primary' : '';

  return (
    <div className="header">
      <img className="logo" src={logo} alt="Diary Logo" />
      <h1 style={{ fontFamily: "'Caveat', 'Indie Flower', 'Kalam', cursive", fontSize: "4rem" }}>Artwork Collection</h1>
      <nav className='flex flex-row p-5 gap-4'>
        <button onClick={onToggleFavorites} className={`btn ${secondaryButtonClass}`}>
          All Artworks
        </button>

        <button onClick={onToggleFavorites} className={`btn ${primaryButtonClass}`}>
          Show Favorites Only
        </button>
      </nav>
    </div>
  )

  function onToggleFavorites() {
    toggleViewMode();
  }
}

export default Header;