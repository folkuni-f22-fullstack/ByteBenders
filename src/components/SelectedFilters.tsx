import React from 'react';
import { TiDelete } from 'react-icons/ti';
import { SelectedFiltersProps } from '../interfaces/search-and-filter-props';

const SelectedFilters: React.FC<SelectedFiltersProps> = ({
	selectedFilters,
	handleRemoveFilter,
}) => {
	return (
		<div className='selected-filters-div'>
			<span className='filter-span'>Filters: </span>{' '}
			{selectedFilters.map((filter) => (
				<span key={filter} className='filter-item'>
					{filter}
					<TiDelete
						onClick={() => handleRemoveFilter(filter)}
						className='remove-filter-icon'
					/>
				</span>
			))}
		</div>
	);
};

export default SelectedFilters;
