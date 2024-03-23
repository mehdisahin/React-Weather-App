import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchEngine from "./SearchEngine";

import "../styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import styled from "styled-components";
import { redirect } from "react-router-dom";

function HomePage() {
	const [query, setQuery] = useState();

	const search = async (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			setQuery("");
			const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
			const url = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}`;

			await axios
				.get(url)
				.then((res) => {
					if (res.data) {
						redirect("/weather-details/:");
					}
				})
				.catch((error) => {
					setQuery("");
					console.log("error", error);
				});
		}
	};

	return (
		<div className="App">
			{/* SearchEngine component */}
			<SearchEngine query={query} setQuery={setQuery} search={search} />
		</div>
	);
}

export default HomePage;
