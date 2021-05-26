import React from 'react';

import { SelectContainer, SegmentedControl, Option } from './segmentedSelect-styles';

const SegmentedSelect = ({ category, inputName, valueList, categoryState, setCategoryState }) => {
	return (
		<SelectContainer>
			<span>{category}</span>
			<SegmentedControl>
				{valueList.map(value => (
					<Option key={value}>
						<input
							type="radio"
							name={inputName}
							value={value}
							id={value}
							onChange={e => setCategoryState(e.target.value)}
							checked={categoryState === value}
						/>
						<label htmlFor={value}>{value[0].toUpperCase() + value.slice(1)}</label>
					</Option>
				))}
			</SegmentedControl>
		</SelectContainer>
	);
};

export default SegmentedSelect;
