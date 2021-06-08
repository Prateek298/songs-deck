import styled from 'styled-components';
import { page_styles } from '../../common-styles';

export const ArtistPageContainer = styled.main`
	${page_styles};

	& .top-tracks {
		height: auto;
		align-self: flex-start;
		padding-left: 20px;
		margin-bottom: 15px;

		& .ranked-track {
			display: flex;
			align-items: center;
		}
	}
`;
