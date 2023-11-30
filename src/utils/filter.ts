import { Dish } from "../interfaces/dish";

// Filtrerar listan efter vilken kategori som är vald
export const filterByCategory = (
  selectedCategory: string,
  fullMenu: Dish[]
) => {
  return fullMenu.filter((item) =>
    selectedCategory ? item.category === selectedCategory : true
  ) as Dish[];
};

// Lägger till filtret i selectedFilters om det inte redan finns med. Finns det redan med tas det istället bort.
export const updateSelectedFilters = (
  selectedFilters: string[],
  subcategory: string
) => {
  if (selectedFilters?.includes(subcategory)) {
    return selectedFilters.filter((filter: string) => filter !== subcategory);
  } else {
    return [...selectedFilters, subcategory];
  }
};

export const filterBySubcategory = (
  selectedFilters: string[],
  list: Dish[],
  setListToShow: (list: Dish[] | null) => void,
  allButDrinks: Dish[]
) => {
  // OM några filter är iklickade -> mappa genom filtren och stoppa in de matchande rätterna i filteredList
  if (selectedFilters?.length > 0) {
    const filteredList = [] as Dish[];
    selectedFilters?.map((filter) => {
      const filteredItems: Dish[] = allButDrinks.filter((item) => {
        return item.subcategory.includes(filter);
      });

      filteredList.push(...filteredItems);
    });

    // Uppdatera listToShow till den filtrerade listan
    setListToShow(filteredList);
  } else {
    // ANNARS ->
    // Uppdatera listToShow till ursprungslistan
    setListToShow(list);
  }
};
