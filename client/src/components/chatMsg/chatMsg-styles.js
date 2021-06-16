import styled, { css } from 'styled-components';

const sender = css`
	margin-left: auto;
	background-color: #e7d0f5;
	color: #d95a0b;
`;

const receiver = css`
	background-color: #e7d0f5;
	color: #d95a0b;
`;

export const Message = styled.div`
	min-width: 60px;
	width: fit-content;
	max-width: 300px;
	word-wrap: break-word;
	padding: 5px 10px;
	border-radius: 15px;
	margin-bottom: 15px;
	${props => (props.fromSender ? `${sender}` : `${receiver}`)};

	& > .msg-text {
		pointer-events: none;
	}

	& > .time {
		pointer-events: none;
		color: grey;
		font-size: 0.6rem;
	}
`;
