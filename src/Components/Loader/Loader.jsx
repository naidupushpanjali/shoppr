import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	logo_width: {
		width: 161,
	},
	logo_height: {
		height: 161,
	},
}));

function Loader(props) {
	const classes = useStyles();
	return (
		<div>
			<div style={{ padding: 10 }}>
				<Skeleton
					style={{ backgroundColor: "#cacaca" }}
					variant="circle"
					width={161}
					height={161}
				></Skeleton>
				{/* <Skeleton
					variant="text"
					width={classes.logo_width}
					height={classes.logo_width}
				></Skeleton>
				<Skeleton
					variant="text"
					width={classes.logo_width}
					height={classes.logo_width}
				></Skeleton> */}
			</div>
		</div>
	);
}

export default Loader;
