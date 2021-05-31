import React from 'react';

import { SelectContainer, SegmentedControl, Option } from './segmentedSelect-styles';

const SegmentedSelect = ({ category, inputName, valueList, categoryState, handleChange, forLightBg, margin }) => {
	return (
		<SelectContainer forLightBg={forLightBg} margin={margin}>
			<span>{category}</span>
			<SegmentedControl forLightBg={forLightBg}>
				{valueList.map(value => (
					<Option key={value} forLightBg={forLightBg}>
						<input
							type="radio"
							name={inputName}
							value={value}
							id={value}
							onChange={handleChange}
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
