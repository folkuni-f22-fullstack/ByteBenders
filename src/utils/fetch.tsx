import { useParams } from "react-router-dom";
import { Dish } from "../interfaces/dish";

export function getMealsID() {
	const { id } = useParams();
	const getMealsUrl = `/api/meals/${id}`

	async function getMeals(): Promise<Dish[]>  {
		try {
			const response = await fetch(getMealsUrl);
			const detailsData = await response.json();
			
			// Log the response here
			console.log('Meal API Response:', detailsData);
			return detailsData;
		} catch (error) {
			console.log(error);
			throw new Error("Something is Wrong!")
		}
	}

	return getMeals()
}