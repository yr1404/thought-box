import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import appwriteAuth from "../appwrite/auth";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GiSpeaker } from "react-icons/gi";
import { FaRegCircleStop } from "react-icons/fa6";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// import userService  from "../appwrite/user.js";

export default function Post() {
	const [post, setPost] = useState(null);
	const [user, setUser] = useState(null); // Changed to null initially
	const [Loading, setLoading] = useState(false);
	const [isSpeaking, setIsSpeaking] = useState(true);
	const { slug } = useParams();
	const navigate = useNavigate();
	const userData = useSelector((state) => state.auth.userData);

	const isAuthor = post && userData ? post.userID === userData.$id : false;
	// const userD=
	// useEffect(() => {
	// 	const fetchPostAndUser = async () => {
	// 		if (slug) {
	// 			const fetchedPost = await appwriteService.getPost(slug);
	// 			if (fetchedPost) {
	// 				setPost(fetchedPost);
	// 				console.log("Fetched post: " + JSON.stringify(fetchedPost));
	// 				const postUser = await userService.getUser(fetchedPost?.userID);
	// 				console.log("post user: " + postUser);
	// 				setUser(postUser);
	// 			} else {
	// 				navigate("/");
	// 			}
	// 		} else {
	// 			navigate("/");
	// 		}
	// 	};

	// 	fetchPostAndUser();
	// }, [slug, navigate]);
	const admin = async () => {
		try {
			await authService
				.getCurrentUser("662d297fdbf8e9c78932")
				.then((user) => setUser(user));
		} catch (error) {
			console.log("Failed to fetch user details");
		} finally {
			setLoading(false);
		}
	};
	console.log("Admin: " + admin);

	useEffect(() => {
		if (slug) {
			appwriteService.getPost(slug).then((post) => {
				if (post) setPost(post);
				else navigate("/");
			});
		} else navigate("/");
	}, [slug, navigate]);

	const deletePost = () => {
		appwriteService.deletePost(post.$id).then((status) => {
			if (status) {
				appwriteService.deleteFile(post.featuredImage);
				navigate("/");
			}
		});
	};

	if (!post) {
		return (
			<div className="bg-black/10 w-full h-screen text-6xl text-gray-200">
				Loading...
			</div>
		);
	}

	const createdAt = new Date(post.$createdAt);
	const updatedAt = new Date(post.$updatedAt);

	if (isNaN(updatedAt)) {
		return <div>Invalid date</div>;
	}

	// Extract date and time
	const dateOptions = { year: "numeric", month: "long", day: "numeric" };
	const formattedDate = updatedAt.toLocaleDateString(undefined, dateOptions);

	const timeOptions = {
		hour: "2-digit",
		minute: "2-digit",
	};
	const formattedTime = updatedAt.toLocaleTimeString(undefined, timeOptions);

	const toggleSpeak = ({ content }) => {
		if (isSpeaking) {
			setIsSpeaking(false);
			const utterance = new SpeechSynthesisUtterance(
				content || "Empty Text area."
			);
			console.log("Clicked " + content);

			utterance.onend = () => {
				setIsSpeaking(true);
			};

			speechSynthesis.speak(utterance);
		} else {
			speechSynthesis.cancel();
			setIsSpeaking(true);
		}
	};
	async function findUser(userId) {
		try {
			const user = await userService.getUser({ userId });
			console.log("User found:", user);
		} catch (error) {
			console.error("Error finding user:", error);
		}
	}

	// findUser("662d297fdbf8e9c78932");

	return post ? (
		<Container>
			{/* {console.log("Post: " + " " +userService.getUser("662d297fdbf8e9c78932"))} */}
			<div className="relative py-16 sm:py-8 text-gray-50 min-h-[calc(100vh-80px)]">
				<div className="sm:mt-8 mt-4">
					<div className="sm:w-full lg:w-2/3 xl:w-1/2 mb-4 rounded-xl">
						<img
							src={appwriteService.getFilePreview(post.featuredImage)}
							alt={post.title}
							className="rounded-xl border shadow-md shadow-gray-800"
						/>

						{(admin || isAuthor) && (
							<div className="absolute right-1 sm:top-4 top-5">
								<Link to={`/edit-post/${post.$id}`}>
									<Button bgColor="bg-green-500" className="mr-3 group">
										<div className="absolute bottom-10 left-1/4 text-xs font-light transform -translate-x-1/2 bg-green-300/70 text-gray-200 px-2 py-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-t-green-300/70">
											Edit
										</div>
										<FaEdit className="text-black" />
									</Button>
								</Link>
								<AlertDialog className="">
									<AlertDialogTrigger asChild>
										<Button bgColor="bg-red-500  " className="group">
											<div className="absolute bottom-10 -right-1/3 text-xs font-light transform -translate-x-1/2 bg-red-300/70 text-gray-200 px-2 py-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-t-red-300/70">
												Delete
											</div>
											<MdDelete />
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>
												Are you sure to Delete?
											</AlertDialogTitle>
										</AlertDialogHeader>
										<AlertDialogFooter className="flex justify-evenly gap-2 w-full flex-row">
											<AlertDialogCancel className="w-[45%] sm:w-full">
												Cancel
											</AlertDialogCancel>
											<AlertDialogAction
												onClick={deletePost}
												className="bg-red-600 w-[45%] sm:w-full mt-2 sm:mt-0 text-white hover:bg-red-500">
												Delete
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</div>
						)}
					</div>
				</div>
				<div className="w-full mb-6 flex items-center">
					<h1 className="text-3xl text-left font-bold" id="textArea">
						{post.titles}
						<button
							className="text-white text-xl px-2 ml-3 pt-1"
							onClick={() => toggleSpeak(post)}>
							{isSpeaking ? (
								<GiSpeaker className="border -1" />
							) : (
								<FaRegCircleStop />
							)}
						</button>
					</h1>
				</div>
				<div className="browser-css text-left">{parse(post.content)}</div>

				<div className="w-full text-right text-xs text-gray-400 mt-6">
					{/* <span className="block">
						{"Created by: " + (user ? user.name : "Loading...")}
					</span> */}
					<span
						className={`${
							post.$createdAt === post.$updatedAt ? "hidden" : "inline-block"
						}`}>
						{"Edited: "}
					</span>
					{" " + formattedDate + "  " + formattedTime}
				</div>
			</div>
		</Container>
	) : null;
}
