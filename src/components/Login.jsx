import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const login = async (data) => {
		setError("");
		// console.log("Data: "+JSON.stringify(data))
		setIsLoading(true);
		try {
			const session = await authService.login(data);
			// console.log("Session: " + JSON.stringify(session));
			if (session) {
				const userData = await authService.getUserInfo(session.userId);
				console.log("UserData in Login: " + JSON.stringify(userData));
				if (userData) {
					dispatch(authLogin({ userData }));
				}
				navigate("/");
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};
	// const login = async (data) => {
	// 	setError("");
	// 	try {
	// 		const actionResult = dispatch(authLogin(data));
	// 		const userData = unwrapResult(actionResult);
	// 		if (userData) {
	// 			navigate("/");
	// 		}
	// 	} catch (error) {
	// 		setError("root", {
	// 			message: "Login failed. Please check your email and password.",
	// 		});
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
	// };

	return (
		<div className="flex items-center justify-center min-h-[calc(100vh-200px)] text-blue-200 w-full p-3 sm:p-0 mt-3 sm:mt-0 mb-10">
			<div
				className={`mx-auto w-full max-w-sm place-content-center bg-black/20 rounded-xl p-4 sm:p-9 sm:pb-12 pb-11 shadow-2xl border-2 border-blue-300`}>
				<div className="mb-2 flex justify-center items-center ">
					<span className="inline-block w-full max-w-[100px]">
						<Logo width="100%" />
					</span>
				</div>
				<h2 className="text-center text-xl sm:text-2xl font-bold leading-tight">
					Sign in to your account
				</h2>
				<p className="mt-0 sm:mt-1 text-center text-sm sm:text-md text-blue-200/60">
					Don&apos;t have any account?&nbsp;
					<Link
						to="/signup"
						className="font-medium text-blue-200/80 transition-all duration-200 hover:underline">
						Sign Up
					</Link>
				</p>
				{error && <p className="text-red-600 mt-8 text-center">{error}</p>}
				<form onSubmit={handleSubmit(login)} className="mt-4 sm:mt-6">
					<div className="sm:space-y-4 space-y-3">
						<Input
							label="Email "
							placeholder="Enter your email"
							type="email"
							{...register("email", {
								required: true,
								validate: {
									matchPatern: (value) =>
										/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
											value
										) || "Email address must be a valid address",
								},
							})}
						/>
						<Input
							className="mb-3"
							label="Password "
							type="password"
							placeholder="Enter your password"
							{...register("password", {
								required: true,
							})}
						/>
						<Button
							type="submit"
							className={`${
								isLoading ? "cursor-not-allowed" : "cursor-pointer"
							} w-full`}
							disabled={isLoading}>
							{isLoading ? "Logging in..." : "Sign in"}
						</Button>
					</div>
				</form>
				{isLoading && (
					<div className="flex justify-center mt-4">
						<div className="loader"></div>
						<p className="ml-2">Logging in, please wait...</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default Login;

// User: {"name":"Random King","username":null,"accountId":"6673e567001856bd564c","email":"random1@gmail.com","bio":null,"imageId":null,"imageURL":"https://cloud.appwrite.io/v1/avatars/initials?name=Random+King&project=65ef36f438849ac9ca81","$id":"6673e569003a257a067b","$createdAt":"2024-06-20T08:16:45.293+00:00","$updatedAt":"2024-06-20T08:16:45.293+00:00","$permissions":[],"articles":[],"liked":[],"save":[],"$databaseId":"65ef38393b4296e54704","$collectionId":"66687c97001a80b783d3"}
// Header.jsx:23 Auth: {"name":"Random King","username":null,"accountId":"6673e567001856bd564c","email":"random1@gmail.com","bio":null,"imageId":null,"imageURL":"https://cloud.appwrite.io/v1/avatars/initials?name=Random+King&project=65ef36f438849ac9ca81","$id":"6673e569003a257a067b","$createdAt":"2024-06-20T08:16:45.293+00:00","$updatedAt":"2024-06-20T08:16:45.293+00:00","$permissions":[],"articles":[],"liked":[],"save":[],"$databaseId":"65ef38393b4296e54704","$collectionId":"66687c97001a80b783d3"}
