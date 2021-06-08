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
