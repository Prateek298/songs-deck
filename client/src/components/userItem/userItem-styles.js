import styled from 'styled-components';

export const UserItemContainer = styled.div`
	display: flex;
	width: fit-content;
	padding: 10px 5px;
	margin-bottom: 5px;
	cursor: pointer;

	& > img {
		width: ${props => (props.smallImg ? '50px' : '70px')};
		height: ${props => (props.smallImg ? '50px' : '70px')};
		border-radius: 50%;
	}
`;

export const UserInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 3px 7px;

	& .name {
		color: #db1634;
		margin-bottom: 3px;
	}
`;
