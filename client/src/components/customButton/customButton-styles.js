import styled, { css } from 'styled-components';

const BaseButtonStyles = css`
	padding: 20px 25px;
	border-radius: 3px;
	color: ${props => props.color || '#66fcf1'};
`;

export const SolidButton = styled.button`
	${BaseButtonStyles};
	background-color: ${props => props.bg_color || '#1f2833'};

	&:active {
		transform: scale(0.98);
	}
`;
export const OutlineButton = styled.button`
	${BaseButtonStyles};
	background-color: transparent;
	border: 3px solid ${props => props.bg_color || '#66fcf1'};

	&:hover {
		background-color: ${props => props.bg_color || '#66fcf1'};
		color: white;
		border-color: #f5f5f5;
	}
`;