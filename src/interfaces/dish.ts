export type Dish = {
	image: string;
	_id: number;
	name: string;
	total: number;
	category: string;
	subcategory: string[];
	description: string;
	allergenes: string[] | [];
};

export interface DishInCart extends Dish {
	quantity: number;
}
