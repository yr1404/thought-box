// Example component
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./store/authSlice";

const ExampleComponent = () => {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		console.log("Auth state on load:", auth);
	}, [auth]);

	return (
		<div className="text-white">
			{auth.status ? (
				<p>Logged in as: {auth.userData.name}</p>
			) : (
				<p>Not logged in</p>
			)}
		</div>
	);
};

export default ExampleComponent;
