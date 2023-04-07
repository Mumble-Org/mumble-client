import axios from 'axios';


export const backend = axios.create({
	baseURL: 'https://mumble-core.vercel.app',
	headers: {
		"Content-Type": "application/json"
	}
});
