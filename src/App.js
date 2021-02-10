import Skeleton from "@material-ui/lab/Skeleton";
import React, { useState, useEffect, Suspense } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const ImageComponent = React.lazy(() => import("./ImageComponent"));

const List = () => {
	const [listItems, setListItems] = useState([]);
	const [isFetching, setIsFetching] = useState(true);
	const [page_no, setPageno] = useState(1);
	const [data, setData] = useState(true);
	let fetching = false;

	useEffect(() => {
		if (data) {
			fetchData();
		}
	}, [listItems]);

	const fetchData = async () => {
		setTimeout(async () => {
			const result = await fetch(
				`https://beingfoxy.publshr.io/wp-json/shoppr/v1/get_instagram_posts?page_no=${page_no}&per_page=10`
			);
			const data = await result.json();
			setPageno(page_no + 1);
			// debugger;
			if (data.instagram_post_details.length > 0) {
				setData(true);
				setListItems(() => {
					return [...listItems, ...data.instagram_post_details];
				});
				setIsFetching(true);
			} else {
				setData(false);
				setIsFetching(false);
			}
		}, 1000);
	};

	useEffect(() => {
		if (!fetching) return;
		fetchMoreListItems();
	}, [isFetching]);

	const fetchMoreListItems = () => {
		fetchData();
		setIsFetching(true);
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-sm-12">
					<ResponsiveMasonry
						columnsCountBreakPoints={{ 350: 3, 750: 3, 900: 3 }}
					>
						<Masonry columnsCount={3} gutter="15px">
							{listItems.map((listItem) => (
								<Suspense
									key={listItem.id}
									fallback={<Skeleton animation="wave" />}
								>
									<ImageComponent src={listItem.post_meta.social_post_image} />
								</Suspense>
							))}
						</Masonry>
					</ResponsiveMasonry>
					{isFetching && <p>Loading...</p>}
				</div>
			</div>
		</div>
	);
};

export default List;
