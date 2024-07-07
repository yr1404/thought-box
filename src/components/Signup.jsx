import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Logo, Input } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const handleRefresh = () => {
		window.location.reload();
	};

	const create = async (data) => {
		setError("");
		setIsLoading(true);
		try {
			const userData = await authService.createAccount(data);
			console.log("UserData in signUp: " + userData);
			if (userData) {
				const data = await authService.getUserInfo(userData.userId);
				console.log("Data in signUp: " + data);
				if (data) dispatch(login(data));
				navigate("/");
				handleRefresh();
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-sv text-blue-200 w-full mb-3 p-1 sm:p-0 mt-3 sm:mt-0">
			<div
				className={`mx-auto w-full max-w-md place-content-center bg-black/20 rounded-xl p-4 sm:p-10 sm:pb-12 pb-10 shadow-2xl border-2 border-blue-300 `}>
				<div className="mb-2 flex justify-center items-center">
					<span className="inline-block w-full mx-auto max-w-[100px]">
						<Logo width="100%" />
					</span>
				</div>
				<h2 className="text-center text-xl sm:text-2xl font-bold leading-tight">
					Sign up to create account
				</h2>
				<p className="mt-o sm:mt-1 text-center text-sm sm:text-md text-blue-200/60">
					Already have an account?&nbsp;
					<Link
						className="font-medium transition-all duration-200 text-blue-200/80 hover:underline "
						to="/login">
						Sign in
					</Link>
				</p>
				{console.log("Error: " + error)}
				{error && <p className="text-red-600 mt-8 text-center">{error}</p>}
				<form onSubmit={handleSubmit(create)} className="mt-4 sm:mt-6">
					<div className="space-y-5">
						<Input
							label="Full name"
							placeholder="Enter your full name"
							{...register("name", {
								required: true,
							})}
						/>
						<Input
							label="Email "
							placeholder="Enter your email"
							type="email"
							{...register("email", {
								required: true,
								validate: {
									matchPattern: (value) =>
										/^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
										"Email address should be a valid email address",
								},
							})}
						/>
						<Input
							label="Password"
							type="password"
							placeholder="Enter your password"
							{...register("password", {
								required: true,
							})}
						/>
						<Button
							type="submit"
							className={`${isLoading ? "cursor-not-allowed" : "cursor-pointer"
								} w-full`}
							disabled={isLoading}>
							{isLoading ? "Loading..." : "Create Account"}
						</Button>
					</div>
				</form>
				{isLoading && (
					<div className="flex justify-center mt-4">
						<div className="loader"></div>
						<p className="ml-2">Signing up, please wait...</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default Signup;
