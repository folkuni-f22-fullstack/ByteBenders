export type CategoryButtonProps = {
	selectedCategory: string;
	handleCategoryClick: (category: string) => void;
	buttonText: string;
	databaseCategoryName: string;
};
