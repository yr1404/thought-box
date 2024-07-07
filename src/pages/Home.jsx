import React, { useEffect, useState } from "react";
import authService from "../appwrite/config";
import { Container } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HomeSideBox from "@/components/HomeSideBox";

function Home() {
	const [posts, setPosts] = useState([]);
	const [toView, setToView] = useState(false);
	const Login = useSelector((state) => state.auth.status);
	// const userdata = useSelector((state) => state.auth);

	useEffect(() => {
		authService.getPosts().then((post) => {
			if (post) {
				setPosts(post.documents);
			}
		});
	}, []);
	// const getUser = async () => {
	// 	await auth.getUserInfo(userdata.userData.$id);
	// };

	const toogleDisplay = () => {
		setToView((prev) => !prev);
		setTimeout(() => {
			setToView(false);
		}, 2000);
	};
	const stripHtmlTags = (str) => {
		if (!str) return "";
		return str.replace(/<\/?[^>]+(>|$)/g, "");
	};
	const sanitizedContent = stripHtmlTags(posts[0]?.content);

	return (
		<>
			{/* <Example />{" "} */}
			{/* <div className="text-black w-full bg-blue-100">
				{JSON.stringify(userdata.userData)}
			</div>
			{console.log(
				"getUserInfo: " +
					JSON.stringify(getUser())
			)} */}
			{Login ? (
				<div className="w-full">
					<div className="capitalize mt-10">
						<p className="text-xs text-gray-300">Our blogs</p>
						<h1 className="text-4xl font-extrabold text-[#d9e3f3]">
							stories and ideas
						</h1>
						<p className="text-sm text-gray-500">
							Stay Updated with the Hottest Trends and Insights
						</p>
					</div>
					<div class="relative sm:w-[80vw] w-[90vw] xl:flex mx-auto my-14 p-2 bg-gree-300 xl:h-[580px]"><div class="xl:w-[45%] w-full h-fit  border-current rounded border-2 border-white p-2"><a href="/post/first-post" previewlistener="true"><img class="rounded-t-[12px] rounded-b-lg h-[60%] duration-300 rounded-sm w-full object-cover hover:brightness-110" src="https://cloud.appwrite.io/v1/storage/buckets/65ef3b0441ac9f19fbda/files/66474abda8af872f5c14/preview?project=65ef36f438849ac9ca81" alt="First post  DONE" /><div class="text-left px-4 pt-6"><button class="flex items-center
					bg-red-50
					mb-2 px-3 py-[2px] rounded-full font- text-black text-left cursor-default"><div class="bg-red-400 mr-2  rounded-full h-3 w-3 "></div>inactive</button><h2 class="lg:text-3xl text-xl tracking-wider font-semibold text-gray-100 -4 truncate">First post  DONE</h2><h4 class="lg:text-sm text-md text-[#909090] tracking-tight pb-4 truncate">This is my first post. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio cumque, nisi quas odit est nobis corporis maxime dolorum recusandae quisquam reprehenderit, quae eius, adipisci in tempore velit harum! Ullam, doloribus.HLO 12
							&amp;nbsp;</h4><div class="flex items-center text-gray-300 mt-1.5 pb-4 sm:pb-0"><div class="s:w-[55px] s:h-[55px] w-[48px] h-[48px] rounded-full border-2 border-white bg-gray-400"></div><div class="block pl-4 leading-4"><span class="text-md">Rishu Kumar</span><br /><span class="text-xs">29 may 2024</span></div></div></div></a></div><div class="xl:w-[60%] w-[102%] sm:w-[100%] s:p-2 p-1 mt-8 xl:mt-0 shadow shadow-[#171717]"><a href="/post/${posts[0]?.$id}" previewlistener="true"><div class="flex h-1/3 w-full bg-red-00 p-3"><img class="rounded-tl-[8px] rounded-bl-[8px] rounded-b-lg h-[110%] s:h-full w-[45%] rounded-sm object-cover hover:brightness-110" src="https://cloud.appwrite.io/v1/storage/buckets/65ef3b0441ac9f19fbda/files/66477b696ecb26a15341/preview?project=65ef36f438849ac9ca81" alt="Capturing Moments" /><div class="text-left w-[55%] ml-4"><button class="flex items-center
                                 bg-[#f0fdf4] 
                                mb-2 px-1 py-[1px] rounded-full text-xs text-black text-left cursor-default"><div class="bg-green-400 mr-1  rounded-full h-2 w-2 "></div>active</button><h2 class="lg:text-xl text-md tracking-wider font-semibold text-gray-100 s:mb-2 mb-1 truncate">Capturing Moments</h2><h4 class="lg:text-xs text-xs text-[#909090] tracking-tight s:pb-4 pb-1 truncate">Delve into the world of cameras and photography, exploring the best devices for capturing life&amp;rsquo;s precious moments. Learn about different types of cameras, their features, and how to choose the right one for your needs. Get tips on photography techniques to enhance your skills and creativity.</h4><div class="flex items-center text-gray-400/80 mt"><div class="s:w-[40px] s:h-[40px] w-[27px] h-[27px] rounded-full border-2 border-white bg-gray-400"></div><div class="block pl-2 leading-3"><span class="text-xs">Baljeet Kumar</span><br /><span class="text-[0.5rem]">29 may 2024</span></div></div></div></div></a><a href="/post/${posts[0]?.$id}" previewlistener="true"><div class="flex h-1/3 w-full bg-red-00 p-3"><img class="rounded-tl-[8px] rounded-bl-[8px] rounded-b-lg h-[110%] s:h-full w-[45%] rounded-sm object-cover hover:brightness-110" src="https://cloud.appwrite.io/v1/storage/buckets/65ef3b0441ac9f19fbda/files/66477e937285dc43a638/preview?project=65ef36f438849ac9ca81" alt="Snowy Peaks" /><div class="text-left w-[55%] ml-4"><button class="flex items-center
                                 bg-[#f0fdf4] 
                                mb-2 px-1 py-[1px] rounded-full text-xs text-black text-left cursor-default"><div class="bg-green-400 mr-1  rounded-full h-2 w-2 "></div>active</button><h2 class="lg:text-xl text-md tracking-wider font-semibold text-gray-100 s:mb-2 mb-1 truncate">Snowy Peaks</h2><h4 class="lg:text-xs text-xs text-[#909090] tracking-tight s:pb-4 pb-1 truncate">Journey to the serene and majestic snow-covered mountains. Discover the allure of these natural wonders, the best destinations for winter sports, and the breathtaking landscapes that offer a perfect escape into nature. Learn about the flora and fauna that thrive in these chilly climates.</h4><div class="flex items-center text-gray-400/80 mt"><div class="s:w-[40px] s:h-[40px] w-[27px] h-[27px] rounded-full border-2 border-white bg-gray-400"></div><div class="block pl-2 leading-3"><span class="text-xs">Harsh Raj</span><br /><span class="text-[0.5rem]">29 may 2024</span></div></div></div></div></a><a href="/post/${posts[0]?.$id}" previewlistener="true"><div class="flex h-1/3 w-full bg-red-00 p-3"><img class="rounded-tl-[8px] rounded-bl-[8px] rounded-b-lg h-[110%] s:h-full w-[45%] rounded-sm object-cover hover:brightness-110" src="https://cloud.appwrite.io/v1/storage/buckets/65ef3b0441ac9f19fbda/files/66477eb405a117f9c78a/preview?project=65ef36f438849ac9ca81" alt="City Lights" /><div class="text-left w-[55%] ml-4"><button class="flex items-center
                                 bg-[#f0fdf4] 
                                mb-2 px-1 py-[1px] rounded-full text-xs text-black text-left cursor-default"><div class="bg-green-400 mr-1  rounded-full h-2 w-2 "></div>active</button><h2 class="lg:text-xl text-md tracking-wider font-semibold text-gray-100 s:mb-2 mb-1 truncate">City Lights</h2><h4 class="lg:text-xs text-xs text-[#909090] tracking-tight s:pb-4 pb-1 truncate">Explore the vibrant and dynamic world of city lights at night. From neon signs to illuminated skylines, discover how cities come alive after dark, offering a unique blend of beauty and energy. Learn about the best spots to experience nightlife and capture stunning nighttime photography.</h4><div class="flex items-center text-gray-400/80 mt"><div class="s:w-[40px] s:h-[40px] w-[27px] h-[27px] rounded-full border-2 border-white bg-gray-400"></div><div class="block pl-2 leading-3"><span class="text-xs">Yash Raj</span><br /><span class="text-[0.5rem]">29 may 2024</span></div></div></div></div></a></div><a href="/all-posts" previewlistener="true"><div class="absolute text-right -bottom-6 sm:-right-20 right-0 mx-auto"><span class="text-gray-400 ">more...</span></div></a></div>
				</div>
			) : (
				<Container>
					<div className="w-full flex justify-center items-center py-8 mt-4 text-center min-h-[calc(100vh-200px)]">
						<div className="p-2">
							{Login ? null : (
								<>
									<h1 className="text-3xl text-gray-200 font-bold">
										<Link
											to="/login"
											className=" underline underline-offset-2 text-gray-300">
											Login
										</Link>{" "}
										to see posts.
									</h1>
									<p
										onClick={toogleDisplay}
										className="text-gray-500 text-xs cursor-pointer">
										Skip signup ?<br />
										<span className={`${toView ? "block" : "hidden"}`}>
											email:{" "}
											<strong className="text-gray-200">
												test@gmail.com
											</strong>{" "}
											|| password:{" "}
											<strong className="text-gray-200"> test1234</strong>
										</span>
										<br />
									</p>
								</>
							)}
						</div>
					</div>
				</Container>
			)}
		</>
	);
}
export default Home;
