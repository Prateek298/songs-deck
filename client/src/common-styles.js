import styled, { css } from 'styled-components';
import ReactLoading from 'react-loading';

export const Loader = styled(ReactLoading)`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const page_styles = css`
	height: calc(100% - 60px - 20px);
	display: flex;
	flex-direction: column;
	align-items: center;
	color: white;
	overflow-y: auto;
`;

export const PageContainer = styled.main`${page_styles};`;

export const user_img_styles = css`
	height: 40px;
	width: 40px;
	border-radius: 50%;
	overflow: hidden;

	& .profile-img {
		object-fit: contain;
		height: 100%;
		width: 100%;
	}
`;
