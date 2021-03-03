import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles((theme) => ({
	brand_image: {
		borderRadius: "50%",
		[theme.breakpoints.down("xs")]: {
			width: "23%",
		},
	},
	h1: {
		fontFamily: "Lato-Bold",
		[theme.breakpoints.down("xs")]: {
			fontSize: 30,
		},
	},
}));

function Post(props) {
	const classes = useStyles();
	if (props.location.postDetails) {
		localStorage.setItem(
			"header",
			JSON.stringify(props.location.postDetails.header)
		);
		localStorage.setItem(
			"postData",
			JSON.stringify(props.location.postDetails.listItem)
		);
	}

	const header = JSON.parse(localStorage.getItem("header"));
	const posts = JSON.parse(localStorage.getItem("postData"));
	const product_detail = posts.product_details;
	console.log(header, posts);

	return (
		<section id="posts">
			<div className="container">
				<div className="row">
					<div className="col-sm-10 m-auto">
						<div className="header">
							<Link to="/">
								<img
									src={header.brand_logo}
									alt="Logo"
									className={classes.brand_image}
								/>
							</Link>
							<h1 className={classes.h1}>{header.brand_name}</h1>
						</div>
						<div className="post-content">
							<img src={posts.post_meta.social_post_image} alt="Products" />
							<div>
								<FavoriteIcon />
								<span>
									{posts.post_meta.social_post_likes}
									{posts.post_meta.social_post_likes === "1"
										? " Like"
										: " Likes"}
								</span>
							</div>
							<h4>{posts.post_details.post_title}</h4>
							<p>{posts.post_meta.social_post_created}</p>
							<div className="products">
								{Object.keys(product_detail).length > 0 ? (
									<div>
										<h6>Products In this post</h6>
										<div className="row">
											<div className="col-sm-4">
												{/* {product_detail.map((elem) => (
													<div>
														<a
															href={elem.product_link}
															target="_blank"
															rel="noreferrer"
														>
															<img
																src={elem.product_thumbnail}
																alt="Product Thumbnail"
															/>
														</a>
														<div>
															<h6>{elem.product_name}</h6>
															<p>{elem.product_sale_price}</p>
															<s>{elem.product_regular_price}</s>
															<button type="button">{elem.product_link}</button>
														</div>
													</div>
												))} */}
											</div>
										</div>
									</div>
								) : (
									""
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Post;
