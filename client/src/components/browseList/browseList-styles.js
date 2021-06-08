import styled from 'styled-components';

export const BrowseListContainer = styled.section`
	display: flex;
	flex-direction: column;
	width: clamp(250px, 90%, 900px);
	height: 100%;
	margin: ${props => (props.by === 'usrp' || props.by === 'pt' ? '0' : '0 auto')};
	overflow-y: ${props => (props.lateral ? 'unset' : 'auto')};

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
	flex-direction: ${props => (props.lateral ? 'row' : 'column')};
	flex-grow: 1;
	width: 100%;
	height: 100%;
	overflow-y: ${props => (props.lateral ? 'unset' : 'auto')};
	overflow-x: ${props => (props.lateral ? 'auto' : 'unset')};
	margin: ${props => (props.lateral ? '10px 0 0' : props.by === 'usrp' || props.by === 'pt' ? '0' : '10px auto 0')};
`;
