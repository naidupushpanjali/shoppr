import React from "react";
import imageFile from "./img_avatar.png";

const ImageComponent = ({ src }) => {
	return <img src={src} alt="No Post" style={{ width: "100%" }} />;
};

export default ImageComponent;
