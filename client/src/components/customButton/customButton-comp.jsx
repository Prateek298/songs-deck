import React from 'react';

import { SolidButton, OutlineButton } from './customButton-styles';

const CustomButton = ({ children, isSolid, ...otherProps }) => {
	return isSolid ? (
		<SolidButton {...otherProps}>{children}</SolidButton>
	) : (
		<OutlineButton {...otherProps}>{children}</OutlineButton>
	);
};

export default CustomButton;
