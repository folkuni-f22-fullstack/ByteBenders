import Meals from "../components/Meals.jsx";
import SearchBar from "../components/SearchBar.tsx";
import PopularThisWeek from "../components/PopularThisWeek.tsx";

export default function MenuRoute() {
  return (
    <div className="MenuRoute">
      <SearchBar />
      <PopularThisWeek />
      <Meals />
    </div>
  );
}
