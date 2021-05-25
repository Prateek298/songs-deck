import styled from 'styled-components';

export const FormGroup = styled.div`
	padding: 7px 5px;
	margin-bottom: 5px;
	height: ${props => (props.height ? props.height : '25px')};
`;

export const FormControl = styled.input`
	width: ${props => (props.type === 'radio' ? 'unset' : '100%')};
	height: 100%;
	padding: 3px;
	letter-spacing: 1px;
`;
