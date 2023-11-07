import menuData from '../data/menu.json';
import randomizer from '../utils/general.ts';

// Hämtar och returnerar veckonummer för nuvarande datum
function getWeek() {
    let currentDate = new Date();
    let startDate = new Date(currentDate.getFullYear(), 0, 1);
    let days = Math.floor(
        (currentDate - startDate) / (24 * 60 * 60 * 1000)
    );
    return Math.ceil(days / 7);
}

// Hämtar veckonumret som finns sparat i LS 
function weekFromLocalStorage() {
    const currentDate = new Date();
    const currentWeekNumber = getWeek(currentDate);
    const storedWeekNumber = localStorage.getItem("weeknumber");

    if (!storedWeekNumber) {
        localStorage.setItem("weeknumber", currentWeekNumber);
        return currentWeekNumber;
    }
    return parseInt(storedWeekNumber, 10);
}

// Skapa en array med slumpmässiga rätter
function generateMeals() {
    let weeklyDishes = [];
    for (let i = 0; i < 5; i++) {
        let dish = menuData[randomizer(0, menuData.length - 1)];
        !weeklyDishes.includes(dish) && weeklyDishes.push(dish);
    }
    return weeklyDishes;
}

// Hämta rätter från LS (alt. skapa nya) och deklarera veckans rätter
function displayMeals(randomMeals, setRandomMeals) {
    const oldWeek = weekFromLocalStorage();
    const thisWeek = getWeek();
    const deals = localStorage.getItem("deals");

    if (deals === null || oldWeek !== thisWeek) {
        const toLocalStorage = JSON.stringify(generateMeals());
        localStorage.setItem("deals", toLocalStorage);
        localStorage.setItem("weeknumber", thisWeek);
        setRandomMeals(generateMeals());
    } else {
        setRandomMeals(JSON.parse(deals));
    }
}

export default displayMeals