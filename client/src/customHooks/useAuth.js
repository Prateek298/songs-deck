import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = code => {
	const [ accessToken, setAccessToken ] = useState();
	const [ refreshToken, setRefreshToken ] = useState();
	const [ expiresIn, setExpiresIn ] = useState();

	const BASE_URL = 'http://localhost:5000';

	useEffect(
		() => {
			const postCode = async () => {
				try {
					if (code) {
						const res = await axios.post(`${BASE_URL}/login`, { code });
						const { accessToken: AT, refreshToken: RT, expiresIn: EI } = res.data;
						setAccessToken(AT);
						setRefreshToken(RT);
						setExpiresIn(EI);
						window.history.pushState({}, null, '/');
					}
				} catch (err) {
					console.error('While posting code to /login \n', err);
					window.location = '/';
				}
			};
			postCode();
		},
		[ code ]
	);

	useEffect(
		() => {
			if (!refreshToken || !expiresIn) return;

			const interval = setInterval(() => {
				const refreshCode = async () => {
					try {
						const res = await axios.post(`${BASE_URL}/refresh`, { refreshToken });
						const { accessToken: AT, expiresIn: EI } = res.data;
						setAccessToken(AT);
						setExpiresIn(EI);
					} catch (err) {
						console.error('While refreshing token \n', err);
						window.location = '/';
					}
				};
				refreshCode();
			}, (expiresIn - 60) * 1000);
			return () => clearInterval(interval);
		},
		[ refreshToken, expiresIn ]
	);

	return accessToken;
};

export default useAuth;
