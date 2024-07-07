import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		authService
			.getCurrentUser()
			.then((userData) => {
				if (userData) {
					dispatch(login({ userData }));
				} else {
					dispatch(logout());
				}
			})
			.finally(() => setLoading(false));
	}, []);

	//Conditional rendering
	return !loading ? (
		<div className="relative min-h-screen w-full flex flex-wrap bg-gradient-to-t from-[#111] via-[#030712] to-[#02071cf9]">
			<div className="w-full block ">
				<div className="top-0">
					<Header />
				</div>
				<div className="">
					<main>
						<Outlet />
					</main>
				</div>
				<div className="bottom-0">
					<Footer />
				</div>
			</div>
		</div>
	) : null;
}

export default App;
