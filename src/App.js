import React, { useState, useEffect, Suspense } from "react";
import imageFile from "./img_avatar.png";
const ImageComponent = React.lazy(() => import("./ImageComponent"));

const List = () => {
	const [listItems, setListItems] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [page_no, setPageno] = useState(1);

	useEffect(() => {
		fetchData();
		window.addEventListener("scroll", handleScroll);
	}, []);

	const handleScroll = () => {
		if (
			Math.ceil(window.innerHeight + document.documentElement.scrollTop) !==
				document.documentElement.offsetHeight ||
			isFetching
		)
			return;
		setIsFetching(true);
		console.log(isFetching);
	};

	const fetchData = async () => {
		setTimeout(async () => {
			const result = await fetch(
				`https://beingfoxy.publshr.io/wp-json/shoppr/v1/get_instagram_posts?page_no=${page_no}&per_page=10`
			);
			const data = await result.json();
			setPageno(page_no + 1);
			setListItems(() => {
				return [...listItems, ...data.instagram_post_details];
			});
			setIsFetching(false);
		}, 1000);
	};

	useEffect(() => {
		if (!isFetching) return;
		fetchMoreListItems();
	}, [isFetching]);

	const fetchMoreListItems = () => {
		fetchData();
		setIsFetching(true);
	};

	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col-sm-12">
						<div className="row">
							{listItems.map((listItem) => (
								<div className="col-sm-4" key={listItem.id}>
									<Suspense
										fallback={
											<img
												src={imageFile}
												alt="Avatar"
												style={{ width: "50%" }}
											/>
										}
									>
										<ImageComponent
											src={listItem.post_meta.social_post_image}
										/>
									</Suspense>
								</div>
							))}
							{isFetching && <h1>Loading...</h1>}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default List;
