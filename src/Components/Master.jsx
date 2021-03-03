import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect, Suspense } from "react";
import config from "../services/config.json";
import Axios from "axios";
import ImagePlaceholder from "../images/image_placeholder.png";
import CircularProgress from "@material-ui/core/CircularProgress";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const ImageComponent = React.lazy(() => import("./ImageComponent"));

const useStyles = makeStyles((theme) => ({
	brand_information: {
		marginLeft: "5%",
		[theme.breakpoints.down("xs")]: {
			marginLeft: 0,
		},
	},
	brand_description: {
		width: 420,
		fontSize: 20,
		fontFamily: "Lato-Regular",
		[theme.breakpoints.down("xs")]: {
			fontSize: 15,
			padding: "0px 15px",
			marginTop: 15,
			width: "100%",
		},
	},
	wrapper: {
		display: "flex",
		margin: "30px 0px",
		[theme.breakpoints.down("xs")]: {
			display: "block",
			margin: "20px auto",
			textAlign: "center",
			marginBottom: 10,
		},
	},
	h1: {
		fontFamily: "Lato-Bold",
		[theme.breakpoints.down("xs")]: {
			fontSize: 30,
		},
	},
	circular: {
		position: "absolute",
		left: "50%",
	},
}));

const Master = (props) => {
	const [listItems, setListItems] = useState([]);
	const [header, setHeader] = useState([]);
	const [isFetching, setIsFetching] = useState(true);
	const [page_no, setPageno] = useState(1);
	const [data, setData] = useState(true);
	let fetching = false;
	const classes = useStyles();

	useEffect(() => {
		if (data) {
			fetchData();
		}
	}, [listItems]);

	const fetchData = async () => {
		setTimeout(async () => {
			const result = await Axios.get(config.images_api, {
				params: {
					page_no: page_no,
					per_page: 10,
				},
			});
			const data = result.data;
			setPageno(page_no + 1);

			if (data.content.instagram_post_details.length > 0) {
				setData(true);
				setListItems(() => {
					return [...listItems, ...data.content.instagram_post_details];
				});
				setHeader(data.header.app_config);
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

	const handleAddDefaultSrc = (e) => {
		e.target.src = ImagePlaceholder;
	};

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-sm-10">
					<div className="row justify-content-center">
						<Suspense
							fallback={<Skeleton animation="wave" width={210} height={210} />}
						>
							<div className={classes.wrapper}>
								<ImageComponent
									src={header.brand_logo}
									section="header"
									onAddDefaultSrc={handleAddDefaultSrc}
								/>

								<div className={classes.brand_information}>
									<h1 className={classes.h1}>{header.brand_name}</h1>
									<p className={classes.brand_description}>
										{header.brand_description}
									</p>
								</div>
							</div>
						</Suspense>
					</div>
				</div>
			</div>
			<div className="row justify-content-center">
				<div className="col-sm-10">
					<ResponsiveMasonry
						columnsCountBreakPoints={{ 350: 3, 750: 3, 900: 3 }}
					>
						<Masonry columnsCount={3} gutter="15px" className="masonary">
							{listItems.map((listItem) => (
								<Suspense
									key={listItem.post_details.ID}
									fallback={
										<Skeleton animation="wave" width={210} height={210} />
									}
								>
									<ImageComponent
										src={
											listItem.post_meta.social_post_image
												? listItem.post_meta.social_post_image
												: ""
										}
										section="body"
										listItem={listItem}
										header={header}
										onAddDefaultSrc={handleAddDefaultSrc}
									/>
								</Suspense>
							))}
						</Masonry>
					</ResponsiveMasonry>
					{isFetching && <CircularProgress className={classes.circular} />}
				</div>
			</div>
		</div>
	);
};

export default Master;
