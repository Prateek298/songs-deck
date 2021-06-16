import styled from 'styled-components';
import { page_styles } from '../../common-styles';

export const ConversationContainer = styled.main`
	${page_styles};
	height: 100%;
	width: clamp(300px, 100%, 850px);
	margin: 0 auto;

	& > .user-container {
		width: 100%;
	}

	& .msg-editor {
		padding: 5px 8px;
		font-size: 1.2rem;
		border: 1px solid grey;

		&:hover {
			outline: none;
		}
	}
`;

export const MsgContainer = styled.section`
	flex-grow: 1;
	overflow-y: auto;
	padding-bottom: 10px;
	width: 100%;
`;

export const SendMsgContainer = styled.div`
	width: 100%;
	min-height: 40px;
	display: flex;
	margin-top: 10px;
`;

export const MsgInput = styled.span`
	display: inline-block;
	background-color: white;
	color: #000;
	width: calc(100% - 40px);
	min-height: 40px;
	max-height: 100px;
	padding: 7px 15px;
	border-radius: 15px;
	overflow-y: auto;
	resize: both;
	line-height: 20px;
	margin-right: 5px;

	&:focus {
		outline: none;
	}

	@media screen and (min-width: 768px) {
		margin: 0;
		width: 100%;
	}
`;

export const SendBtn = styled.button`
	height: 40px;
	width: 40px;
	align-self: center;
	border: none;
	border-radius: 50%;
	background-color: #c0e8ed;
	display: flex;
	justify-content: center;
	align-items: center;

	@media screen and (min-width: 768px) {
		display: none;
	}
`;
