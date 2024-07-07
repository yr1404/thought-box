import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import { PostForm, Container } from "../components/index.js";

function EditPost() {
	const [post, setPost] = useState(null); // Initialize as null to differentiate between loading state and empty array
	const { slug } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (slug) {
			appwriteService.getPost(slug).then((post) => {
				if (post) {
					setPost(post);
				} else {
					navigate("/");
				}
			});
		} else {
			navigate("/");
		}
	}, [slug, navigate]);

	return post ? (
		<div className="py-8">
			<Container>
				<PostForm post={post} />
			</Container>
		</div>
	) : (
		<p className="text-white w-full">Loading...</p>
	);
}

export default EditPost;
