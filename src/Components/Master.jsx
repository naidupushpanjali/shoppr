import Axios from "axios";
import Reactga from "react-ga";
import Helmet from "react-helmet";
import config from "../services/config.json";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect, Suspense } from "react";
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
			width: "80%",
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
		marginLeft: -20,
		marginBottom: 30,
	},
	skeleton: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "center",
		alignItems: "center",
	},
	skeleton_post: {
		width: 250,
		height: 250,
		margin: "15px",
		[theme.breakpoints.down("xs")]: {
			width: 118,
			height: 118,
			margin: 10,
		},
	},
	skeleton_logo: {
		width: 185,
		height: 161,
		[theme.breakpoints.down("xs")]: {
			width: 100,
			height: 100,
			margin: "auto",
		},
	},
	skeleton_brand_info: {
		width: "94%",
		height: 50,
		[theme.breakpoints.down("xs")]: {
			margin: "auto",
		},
	},
	skeleton_brand_desc: {
		width: 420,
		height: 120,
		marginTop: -10,
		[theme.breakpoints.down("xs")]: {
			width: "94%",
			height: 100,
			margin: "auto",
			marginTop: -20,
		},
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
			const result = await Axios.get(
				process.env.REACT_APP_SHOPPER_API + config.instagram_post_api,
				{
					params: {
						page_no: page_no,
						per_page: 10,
					},
				}
			);
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
				// Meta tags in head
				if (header.length > 0 || header !== undefined) {
					var metaDescriptions = document.createElement("div");
					metaDescriptions.innerHTML = `<link rel="icon" href=${header.brand_logo} />
						<meta name="description" content=${header.brand_description} />
						<link rel="apple-touch-icon" href=${header.brand_logo} />
						<meta property="og:site_name" content=${header.brand_name} />
						<meta property="og:title" content=${header.brand_name} />
						<meta
							property="og:description"
							content=${header.brand_description}
						/>
						<meta property="og:image:type" content="image/jpeg" />
						<meta
							property="og:image"
							itemprop="image"
							content=${header.brand_logo}
						/>`;

					var head = document.head;

					while (metaDescriptions.firstChild) {
						head.appendChild(metaDescriptions.firstChild);
					}
				}
			}
			document.title = data.header.app_config.brand_name;
			Reactga.initialize(data.header.app_config.google_analytics_code);
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

	const handleGoogleAnaytics = (id) => {
		Reactga.event({
			action: "Post with Instagram Id : " + id.post_meta.instagram_id,
			category: "Link Clicked",
		});
	};

	var rows = [];
	for (var i = 0; i < 10; i++) {
		rows.push(
			<Skeleton
				variant="rect"
				key={i}
				className={classes.skeleton_post}
				animation="wave"
			></Skeleton>
		);
	}
	debugger;
	const matomo_id = header.matomo_site_id;
	if (matomo_id) {
		let matomoScript = `
		var _paq = _paq || [];
		/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
		_paq.push(["trackPageView"]);
		_paq.push(["enableLinkTracking"]);
		(function () {
			var u = "//analytics.shoppr.io/";
			_paq.push(["setTrackerUrl", u + "piwik.php"]);
			_paq.push(["setSiteId", ${header.matomo_site_id}]);
			var d = document,
				g = d.createElement("script"),
				s = d.getElementsByTagName("script")[0];
			g.type = "text/javascript";
			g.async = true;
			g.defer = true;
			g.src = u + "piwik.js";
			s.parentNode.insertBefore(g, s);
		})();`;
		document.getElementById("matomo-script").innerHTML = matomoScript;
	}

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-sm-10">
					<div className="row justify-content-center">
						<Suspense fallback="">
							{/* <Helmet>
								<link rel="icon" href={header.brand_logo} />
								<meta name="description" content={header.brand_description} />
								<link rel="apple-touch-icon" href={header.brand_logo} />
								<meta property="og:site_name" content={header.brand_name} />
								<meta property="og:title" content={header.brand_name} />
								<meta
									property="og:description"
									content={header.brand_description}
								/>
								<meta property="og:image:type" content="image/jpeg" />
								<meta
									property="og:image"
									itemprop="image"
									content={header.brand_logo}
								/>
							</Helmet> */}
							<div className={classes.wrapper}>
								{header.length === 0 ? (
									<Skeleton
										style={{ backgroundColor: "#cacaca" }}
										variant="circle"
										className={classes.skeleton_logo}
									></Skeleton>
								) : (
									<ImageComponent
										src={header.brand_logo}
										section="header"
										onAddDefaultSrc={handleAddDefaultSrc}
									/>
								)}
								<div className={classes.brand_information}>
									{header.length === 0 ? (
										<Skeleton
											variant="text"
											className={classes.skeleton_brand_info}
											animation="wave"
										></Skeleton>
									) : (
										<h1 className={classes.h1}>{header.brand_name}</h1>
									)}
									{header.length === 0 ? (
										<Skeleton
											variant="text"
											className={classes.skeleton_brand_desc}
											animation="wave"
										></Skeleton>
									) : (
										<p className={classes.brand_description}>
											{header.brand_description}
										</p>
									)}
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
						{listItems.length !== 0 ? (
							<Masonry columnsCount={3} gutter="15px" className="masonary">
								{listItems.map((listItem) => (
									<Suspense key={listItem.post_details.ID} fallback="">
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
											OnHandleGoogleAnaytics={() =>
												handleGoogleAnaytics(listItem)
											}
										/>
									</Suspense>
								))}
							</Masonry>
						) : (
							<div className={classes.skeleton}>{rows}</div>
						)}
					</ResponsiveMasonry>
					{isFetching && listItems.length !== 0 && (
						<CircularProgress color="secondary" className={classes.circular} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Master;
