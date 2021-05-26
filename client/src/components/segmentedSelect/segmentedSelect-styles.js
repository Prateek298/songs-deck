import styled from 'styled-components';

export const SelectContainer = styled.div`
	width: clamp(240px, 70%, 560px);
	margin: 20px auto 0;
	display: flex;
	flex-direction: column;

	& > span {
		color: white;
		font-weight: 1.2rem;
		padding: 7px 0;
	}
`;

export const SegmentedControl = styled.div`
	display: inline-block;
	width: 100%;
	border: 1px solid #06c77a;
	overflow: hidden;
	display: flex;
`;

export const Option = styled.span`
	flex: 1;
	color: white;
	text-align: center;

	& > input {
		appearance: none;

		&:checked + label {
			background-color: #06c77a;
		}
	}

	& > label {
		display: inline-block;
		width: 100%;
		font-size: 1.3rem;
		padding: 5px 0;
		cursor: pointer;
		transition: ease-in-out 0.2s;
	}
`;
