import styled from 'styled-components';

const forDarkBg = {
	textColor: 'white',
	highlightColor: '#06c77a'
};

const forLightBg = {
	textColor: '#000',
	highlightColor: '#021bbd'
};

export const SelectContainer = styled.div`
	width: clamp(240px, 70%, 560px);
	margin: ${props => props.margin};
	display: flex;
	flex-direction: column;

	& > span {
		color: ${props => (props.forLightBg ? forLightBg.textColor : forDarkBg.textColor)};
		font-weight: 1.2rem;
		padding: 7px 0;
	}
`;

export const SegmentedControl = styled.div`
	display: inline-block;
	width: 100%;
	border: 1px solid ${props => (props.forLightBg ? forLightBg.highlightColor : forDarkBg.highlightColor)};
	overflow: hidden;
	display: flex;
`;

export const Option = styled.span`
	flex: 1;
	color: ${props => (props.forLightBg ? forLightBg.textColor : forDarkBg.textColor)};
	text-align: center;

	& > input {
		appearance: none;

		&:checked + label {
			background-color: ${props => (props.forLightBg ? forLightBg.highlightColor : forDarkBg.highlightColor)};
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
