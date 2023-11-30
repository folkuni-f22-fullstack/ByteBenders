export type Dish = {
	image: string;
	_id: number;
	name: string;
	// total: number;
	category: string;
	subcategory: string[];
	description: string;
	allergenes: string[] | [];
	price: number;
};

// export interface DishInCart extends Dish {
// 	quantity: number;
// }

export interface DishInCart extends Omit<Dish, 'price'> {
	quantity: number;
	total: number;
}
