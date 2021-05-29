import styled from 'styled-components';

import CustomButton from '../customButton/customButton-comp';

export const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: ${props => (props.open ? 'block' : 'none')};
	background-color: ${props => (props.open ? 'rgba(0, 0, 0, 0.5)' : 'transparent')};
	cursor: default;
	z-index: 110;
`;

export const ModalContainer = styled.div`
	background-color: #f5f5f5;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: clamp(280px, 30%, 550px);
	max-height: 400px;
	display: ${props => (props.open ? 'block' : 'none')};
	z-index: 1000;
`;

export const ModalContent = styled.div`
	padding: 10px;
	font-size: 1.1rem;
	color: rgba(0, 0, 0, 0.8);
	text-align: center;
`;

export const ModalCloseButton = styled(CustomButton)`
	margin-top: 8px;
	padding: 10px;
	font-weight: bold;
`;
