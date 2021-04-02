import "./App.css";
import React from "react";
import Master from "./Components/Master";
import Post from "./Components/Posts/Post";
import { Route, BrowserRouter, Switch } from "react-router-dom";

function App(props) {
	return (
		<div className="main-component">
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<Switch>
					{/* <Redirect to="/" from="/quiz" /> */}
					{/* <Route exact path="/register" component={ImageComponent} /> */}
					<Route
						exact
						path="/post/:id"
						render={(props) => <Post {...props} />}
					/>
					<Route exact path="/" component={Master} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
