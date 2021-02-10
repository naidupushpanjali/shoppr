import React from "react";

const ImageComponent = ({ src }) => {
	return (
		<img src={src} alt="Avatar" style={{ width: "100%", marginBottom: 30 }} />
	);
};

export default ImageComponent;
