export interface Dish {
	image: string;
	id: number;
	name: string;
	price: number;
	category: string;
	comment: string;
	subcategory: string[];
	description: string;
	allergenes: string[] | [];
}
