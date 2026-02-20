import logo from '../assets/logo.png';
import AddEntryButton from './AddEntryButton';

const Header = ({ onAddClick } : { onAddClick: () => void }) => {
  return (
    <div className="header">
        <img className="logo" src={logo} alt="Diary Logo" />
        <h1 style={{ fontFamily: "'Caveat', 'Indie Flower', 'Kalam', cursive", fontSize: "4rem" }}>Artwork Collection</h1>
        <AddEntryButton onClick={onAddClick} /> {/*This button should open the AddEntryModal when clicked, which contains the EntryForm*/}
    </div>
  )
}

export default Header;