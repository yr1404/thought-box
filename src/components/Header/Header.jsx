import React, { useEffect, useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button as antButton, Drawer } from "antd";
import Hamburger from "hamburger-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import authService from "@/appwrite/auth";

function Header() {
	const authStatus = useSelector((state) => state.auth.status);
	const user = useSelector((state) => state.auth.userData);
	console
		.log
		// "Auth: " + JSON.stringify(useSelector((state) => state.auth.userData))
		();
	const navigate = useNavigate();

	const [open, setOpen] = useState(false);
	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};

	const navItems = [
		{
			name: "Login",
			slug: "/login",
			active: !authStatus,
		},
		{
			name: "Signup",
			slug: "/signup",
			active: !authStatus,
		},
		{
			name: "All Posts",
			slug: "/all-posts",
			active: authStatus,
		},
		{
			name: "Add Post",
			slug: "/add-post",
			active: authStatus,
		},
	];

	return (
		<header className="navbar w-full flex items-center text-[#6b7280] font-normal border-b-2 border-[#111827]">
			{/* {console.log("User data: " + JSON.stringify(user))} */}
			<div className="w-full md:w-[95vw] sm:mx-auto md:px-4 px-2 text-lg">
				<nav className="flex justify-between items-center px-4 sm:px-0">
					<Link to={`/`}>
						<h1 className="text-2xl text-[#d0d0d0] font-bold flex items-center">
							ThoughtBox
						</h1>
					</Link>
					{authStatus && (
						<h2 className="ml-10 sm:text-3xl text-xl  font-bold capitalize text-[#d0d0d0ba]">
							{" "}
							Welcome, {user.name}
						</h2>
					)}
					<ul className="flex relative items-center justify-evenly">
						{navItems.map((item) =>
							item.active
								? innerWidth > 640 && (
										<li key={item.name} className="flex items-center">
											<NavLink
												to={item.slug}
												className={({ isActive }) =>
													`block  ${
														isActive ? "text-[#e5e7eb] " : "text-[#6b7280]"
													} sm:mx-4 duration-200 border-t-2 border-t-transparent py-6 hover:border-t-blue-300 text-xl `
												}
												// className="px-6 py-2 duration-200 hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-500 rounded-full"
											>
												{item.name}
											</NavLink>
										</li>
								  )
								: null
						)}
						<Drawer width={250} title="" onClose={onClose} open={open}>
							{navItems.map((item) =>
								item.active && innerWidth < 640 ? (
									<li
										border-top-left-radius
										aur
										border-bottom-left-
										key={item.slug}
										className="flex items-start ">
										<NavLink
											to={item.slug}
											onClick={() => {
												onClose();
											}}
											className={({ isActive }) =>
												`block py-2 ${
													isActive
														? "text-gray-100 bg-blue-500 pl-3"
														: "text-gray-200"
												} duration-200 lg:p-0 w-full text-left px-3 py-3 ml-4 rounded-tl-xl rounded-bl-xl`
											}
											// className="px-6 py-2 duration-200 w-full text-left  "
										>
											{item.name}
										</NavLink>
									</li>
								) : null
							)}
							{authStatus && (
								<li className="absolute w-full list-none bottom-0 mb-4">
									{/* <LogoutBtn className="px-9 py-1 text-white font-semibold text-lg bg-red-600 hover:bg-red-700 rounded-xl text-center " /> */}
									<AlertDialog className="">
										<AlertDialogTrigger asChild onClick={() => onClose()}>
											<span className="px-9 py-1 text-white font-semibold text-lg bg-red-600 cursor-pointer hover:bg-red-700 rounded-[5px] text-center ">
												Log out
											</span>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>
													Are you sure to Logout?
												</AlertDialogTitle>
											</AlertDialogHeader>
											<AlertDialogFooter
												className={`w-full flex-row justify-center`}>
												<AlertDialogCancel className="w-[45%] gap-1 ">
													Cancel
												</AlertDialogCancel>
												<AlertDialogAction className="w-1/2 mt-2">
													<LogoutBtn
														className={
															"w-full text-md font-semibold hover:bg-none px-3 py-2 border border-red-500 bg-[#e50914] text-white"
														}
													/>
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								</li>
							)}
						</Drawer>

						{innerWidth <= 640 ? (
							<div className="pt-6">
								<antButton type="primary" onClick={showDrawer}>
									<Hamburger toggle="false" />
								</antButton>
							</div>
						) : (
							authStatus && (
								<div
									onClick={() => onClose()}
									className="sm:pl-0 flex items-center justify-center  border-t-transparent hover:border-t-red-500 text-lg mx-4">
									<AlertDialog className="">
										<AlertDialogTrigger asChild>
											<span className=" text-[#6b7280] py-6 border-t-2 border-t-transparent hover:border-t-red-500 text-xl  cursor-pointer hover:text-red-500 ">
												Log out
											</span>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>
													Are you sure to Logout?
												</AlertDialogTitle>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction>
													<LogoutBtn
														className={
															" text-md font-semibold hover:bg-none px-3 py-2 border-2 border-[#e50914] bg-[#e50914] text-white "
														}
													/>
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
									{/* <LogoutBtn
										className={
											"text-[#e50914] px-2 text-xl hover:bg-none hover:text-[#fa0714]"
										}
									/> */}
								</div>
							)
						)}
						{/* <Link to={`/profile/${user?.$id}`}>
							{console.log("User: " + JSON.stringify(user))}
							<img
								className="w-8 h-8 ml-4 items-center rounded-full"
								src={user?.imageURL || `/public/SVGs/profile-img.svg`}
								alt="avatar"
							/>
						</Link> */}
					</ul>
				</nav>
			</div>
		</header>
	);
}

export default Header;
