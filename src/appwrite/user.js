// // import { Client, Users } from "node-appwrite";
// // const sdk = require("node-appwrite");
import * as sdk from "node-appwrite";
// import conf from "../conf/conf.js";
export class UserService {
	client = new sdk.Client();
	users;

	constructor() {
		this.client
			.setEndpoint("https://cloud.appwrite.io/v1")
			.setProject("65ef36f438849ac9ca81")
			.setKey(
				"275931718bdb9af0c0eed656c5029cb2685d95188c7339ec65906983f55041be0d9b69773361422201dd0d7731d351183003a4400644aadfff83bde1e20d1aafc2ac019168b5454f0104d91eda188b09ee0bfb0f16cc0847a309eba0d9cb0782d9c5492530dcf0163f91bc336c3ada85a7542a9b09e8a67b46d0cb26d38f70ae"
			); // Set your Appwrite API key here
		this.users = new sdk.Users(this.client);
	}
	async getUser({ userId }) {
		try {
			const result = await users.get(userId);
			console.log(result);
		} catch (error) {
			console.error(error);
		}
	}
}
const userService = new UserService();
export default userService;

// import { Client, Users } from "node-appwrite";

// exports.getUser = async (req, res, next) => {
// 	const client = new Client()
// 		.setEndpoint("https://cloud.appwrite.io/v1")
// 		.setProject("65ef36f438849ac9ca81")
// 		.setKey(
// 			"275931718bdb9af0c0eed656c5029cb2685d95188c7339ec65906983f55041be0d9b69773361422201dd0d7731d351183003a4400644aadfff83bde1e20d1aafc2ac019168b5454f0104d91eda188b09ee0bfb0f16cc0847a309eba0d9cb0782d9c5492530dcf0163f91bc336c3ada85a7542a9b09e8a67b46d0cb26d38f70ae"
// 		); // Your secret API key

// 	const users = new Users(client);

// 	return result = await users.get(
// 		userId
// 	);
// };
