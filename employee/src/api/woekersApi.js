import axios from "axios";

const workersApi = {
	getWorkers: async (parameters) => {
		const results = parameters.result ? parameters.result : 10;
		const seed = parameters.seed ? parameters.seed : "google";
		try {
			const response = await axios.get(
				`https://randomuser.me/api/?results=${results}&seed=${seed}`
			);

			return response;
		} catch (error) {
			console.log(error);
		}
	},
};

export default workersApi;
