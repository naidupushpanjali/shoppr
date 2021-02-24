import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import VideocamIcon from "@material-ui/icons/Videocam";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import Grow from "@material-ui/core/Grow";

const useStyles = makeStyles((theme) => ({
	brand_image: {
		borderRadius: "50%",
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

const ImageComponent = ({ src, onAddDefaultSrc, section, listItem }) => {
	const classes = useStyles();

	return section === "header" ? (
		<a href="!#">
			<img
				src={src}
				alt=""
				onError={onAddDefaultSrc}
				className={classes.brand_image}
			/>
		</a>
	) : listItem.post_meta.has_link === "true" ? (
		<Grow
			in={true}
			style={{ transformOrigin: "0 0 0" }}
			{...(true ? { timeout: 1000 } : {})}
		>
			<a
				href={listItem.post_meta.post_ext_link}
				target="_blank"
				rel="noreferrer"
			>
				<img
					src={src}
					alt="Post"
					style={{ width: "100%" }}
					onError={onAddDefaultSrc}
				/>
			</a>
		</Grow>
	) : (
		<Grow in={true} {...(true ? { timeout: 1000 } : {})}>
			<>
				<img
					src={src}
					alt="Post"
					style={{ width: "100%" }}
					onError={onAddDefaultSrc}
				/>
				{listItem.post_meta.feed_type === "carousel" ? (
					<PhotoLibraryIcon className={classes.position} fontSize="large" />
				) : listItem.post_meta.feed_type === "video" ? (
					<VideocamIcon className={classes.position} fontSize="large" />
				) : (
					""
				)}
			</>
		</Grow>
	);
};

export default ImageComponent;
