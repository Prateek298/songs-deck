import styled from 'styled-components';

export const BrowseListContainer = styled.section`
	display: flex;
	flex-direction: column;
	width: clamp(250px, 90%, 900px);
	margin-bottom: 8px;

	& .head {
		display: flex;
		justify-content: space-between;
		align-items: center;

		& h2 {
			color: #06c77a;
		}

		& p {
			font-size: 0.8rem;
			cursor: pointer;

			&:hover {
				color: blue;
			}
		}
	}
`;

export const ListContainer = styled.div`
	display: flex;
	width: 100%;
	overflow-x: auto;
	margin-top: 10px;
`;
