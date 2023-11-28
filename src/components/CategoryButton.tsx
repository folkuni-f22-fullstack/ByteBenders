import React from 'react';
import { CategoryButtonProps } from '../interfaces/categoryButtonProps';

const CategoryButton: React.FC<CategoryButtonProps> = ({
	selectedCategory,
	handleCategoryClick,
	buttonText,
	databaseCategoryName,
}) => {
	return (
		<button
			onClick={() => handleCategoryClick(databaseCategoryName)}
			className={
				selectedCategory === databaseCategoryName
					? 'category-button selected'
					: 'category-button'
			}
		>
			{buttonText}
		</button>
	);
};

export default CategoryButton;
