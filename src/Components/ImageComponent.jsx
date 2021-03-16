import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import VideocamIcon from "@material-ui/icons/Videocam";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	brand_image: {
		borderRadius: "50%",
		transition: " all .4s ease-out",
		[theme.breakpoints.down("xs")]: {
			width: "23%",
		},
	},
	position: {
		position: "absolute",
		right: 20,
		top: 20,
		color: "#fff",
	},
}));

const ImageComponent = ({
	src,
	onAddDefaultSrc,
	section,
	listItem,
	header,
}) => {
	const classes = useStyles();

	return section === "header" ? (
		<a href="!#">
			<LazyLoadImage
				src={src}
				alt=""
				onError={onAddDefaultSrc}
				className={classes.brand_image + " fadein"}
			/>
		</a>
	) : listItem.post_meta.has_link === "true" ? (
		<a href={listItem.post_meta.post_ext_link} target="_blank" rel="noreferrer">
			<LazyLoadImage
				src={src}
				alt="Post"
				style={{ width: "100%", transition: "all .4s ease-out" }}
				onError={onAddDefaultSrc}
				className="fadein"
			/>
		</a>
	) : (
		<>
			{/* <Link
				to={{
					pathname: "/post/" + listItem.post_meta.instagram_id,
					postDetails: { listItem, header },
				}}
			> */}
			<img
				src={src}
				alt="Post"
				style={{ width: "100%" }}
				onError={onAddDefaultSrc}
				className="fadein"
			/>
			{listItem.post_meta.feed_type === "carousel" ? (
				<PhotoLibraryIcon className={classes.position} fontSize="large" />
			) : listItem.post_meta.feed_type === "video" ? (
				<VideocamIcon className={classes.position} fontSize="large" />
			) : (
				""
			)}
			{/* </Link> */}
		</>
	);
};

export default ImageComponent;
