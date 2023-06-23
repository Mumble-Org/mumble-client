import axios from 'axios';

export const backend = axios.create({
	baseURL: 'https://api.mumble.com.ng',
	headers: {
		"Content-Type": "application/json"
	}
});
