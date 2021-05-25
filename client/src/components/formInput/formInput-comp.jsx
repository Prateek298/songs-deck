import React from 'react';

import { FormGroup, FormControl } from './formInput-styles';

const FormInput = ({ label, handleChange, height, ...otherProps }) => (
	<FormGroup height={height}>
		<FormControl onChange={handleChange} {...otherProps} />
		{label ? <label>{label}</label> : null}
	</FormGroup>
);

export default FormInput;
