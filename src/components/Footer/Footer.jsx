import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";

function Footer() {
	return (
		<section className="relative overflow-hidden  py-10 text-gray-400 bg-[#00000042] border-t-slate-800 ">
			<div className="w-[90vw] mx-auto z-10">
				<div className="sm:flex text-left justify-between">
					<div className="w-ful text-left p-2">
						<p className="text-md text-center sm:text-left text-gray-400 font-medium font-sans">
							&copy; Developed by QuadSqad.
						</p>
					</div>
					<div className="flex items-center justify-center mt-4 sm:mt-0 p-2 text-center ">
						<p className="text-md text-gray-400 font-medium font-sans">
							Follow us on
						</p>
						<div className="flex gap-2 md:gap-5 text-xl cursor-pointer ml-3">
							<a href="#">
								<FaGithubSquare className="hover:text-gray-200 duration-200" />
							</a>
							<a href="#">
								<FaLinkedin className="hover:text-gray-200 duration-200" />
							</a>
							<a href="#">
								<FaSquareXTwitter className="hover:text-gray-200 duration-200" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Footer;
