export type Dish = {
	image: string;
	_id: number;
	name: string;
	// price: number;
	total: number;
	category: string;
	// comment: string;
	subcategory: string[];
	description: string;
	allergenes: string[] | [];
};

export interface DishInCart extends Dish {
	quantity: number;
}
