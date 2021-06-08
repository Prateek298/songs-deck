import styled from 'styled-components';
import { page_styles } from '../../common-styles';

export const SearchPageContainer = styled.div`
	${page_styles};
	align-items: unset;

	& .search-container {
		flex-grow: 1;
		margin-top: 10px;
		height: 90%;
	}
`;
