import { useState, useEffect, useRef } from "react";
import { FilterMealsProps } from "../interfaces/search-and-filter-props";
import { updateSelectedFilters, filterBySubcategory } from "../utils/filter";
import { useRecoilState } from "recoil";
import { subState } from "../../src/recoil/subCategoryState.js";
import { Dish } from "../interfaces/dish.js";

const FilterMeals: React.FC<FilterMealsProps> = ({
  list,
  setListToShow,
  // showFilters,
  searchMode,
  setSearchMode,
  subMenuRef,
  fullMenu,
}) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useRecoilState(subState);
  const subCategoryRef = useRef(null);

  useEffect(() => {
    // för varje item i selectedFilters, lägg till de rätterna som matchar subcategory
    filterBySubcategory(selectedFilters, list, setListToShow, allButDrinks);
  }, [selectedFilters]);

  useEffect(() => {
    if (searchMode) {
      setSelectedFilters([]);
      //tömmer filter när man skriver i sökfältet
    }
  }, [searchMode]);

  // if (fullMenu.length > 0) {
  const allButDrinks = fullMenu.filter(
    (item) => item.category !== "drinks"
  ) as Dish[];
  // }
  // console.log("fullMenu är: ", fullMenu);

  console.log("allButDrinks är: ", allButDrinks);

  // Skapa en lista med alla subkategorier, bara en av varje
  const subcategories: string[] = [
    ...new Set(allButDrinks.flatMap((dish) => dish.subcategory)),
  ];

  // Lägger till subkategorin i selectedFilters-arrayen om den klickas på, klickar man igen tas den bort
  const handleCategoryClick = (category: string) => {
    setSearchMode(false); // <- tömmer sökfältet
    const filteredList = updateSelectedFilters(selectedFilters, category);
    setSelectedFilters(filteredList);
  };

  // Close the submenu if a click occurs outside the element or on the submenu button
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        subCategoryRef.current &&
        !subCategoryRef.current.contains(event.target) &&
        event.target !== subMenuRef.current
      ) {
        setTimeout(() => {
          setShowFilters(false);
        }, 0);
      }
    }
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [subCategoryRef]);

  return (
    <>
      {showFilters && (
        <div ref={subCategoryRef} className="filter-select">
          {subcategories.map((subcategory: string) => (
            <button
              key={subcategory}
              onClick={() => handleCategoryClick(subcategory)}
              className={
                selectedFilters?.includes(subcategory) ? "selected-filter" : ""
              }
            >
              {!selectedFilters?.includes(subcategory)
                ? subcategory
                : subcategory + " X"}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default FilterMeals;
