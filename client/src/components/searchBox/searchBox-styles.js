import styled from 'styled-components';

export const SearchInput = styled.input`
	font-size: 1.1em;
	width: clamp(250px, 85%, 650px);
	padding: 10px 5px;
	margin: 0 auto;

	&:focus {
		outline: none;
	}
`;
