import { favoriteState } from "../recoil/favoriteMeal.js";
import { useRecoilState } from "recoil";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useEffect } from "react";
import "../styles/favorites.css";

interface FavoritesProps {
  menuItemId: number; // Byt ut 'string' mot den faktiska typen av 'menuItemId'
}

const Favorites: React.FC<FavoritesProps> = ({ menuItemId }) => {
  const [clickedFav, setClickedFav] = useRecoilState(favoriteState);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
    setClickedFav(storedFavorites);
  }, []);

  const handleFavoriteClick = (menuItemId) => {
    setClickedFav((prevClickedFav) => {
      const isFavorite = prevClickedFav[menuItemId];

      const newFavorites = {
        ...prevClickedFav,
        [menuItemId]: !isFavorite,
      };

      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || {};

      if (!isFavorite) {
        // Om värdet är falskt, lägg till rätten i localStorage
        storedFavorites[menuItemId] = true;
      } else {
        // Om värdet är sant, ta bort rätten från localStorage
        delete storedFavorites[menuItemId];
      }

      localStorage.setItem("favorites", JSON.stringify(storedFavorites));
      return newFavorites;
    });
  };

  return (
    <button className="fav-btn" onClick={() => handleFavoriteClick(menuItemId)}>
      {clickedFav[menuItemId] ? (
        <IoHeartSharp className="fav-icon" />
      ) : (
        <IoHeartOutline className="fav-icon" />
      )}
    </button>
  );
};

export default Favorites;
