import axios from "axios";
import React, { useState } from "react";
import { Link, Router } from "react-router-dom";
import styled from "styled-components";

const StyledSearchEngine = styled.div`
	width: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	margin-bottom: 30px;
	margin-top: 10px;
`;

const SearchInputWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
`;

const SearchEngineInput = styled.input`
	width: 70%;
	height: 40px;
	border: none;
	border-radius: 5px;
	padding: 2px 15px;
	font-size: 16px;
	outline: none;
	background-color: #fff;
	color: #555;
	&::placeholder {
		color: #555;
		font-weight: 500;
		font-style: italic;
	}

	@media screen and (max-width: 767px) {
		width: 60%;
	}

	@media screen and (max-width: 480px) {
		width: 60%;
	}
`;

const SearchEngineButton = styled.button`
	width: 78px;
	height: 44px;
	border: none;
	border-radius: 9%;
	background-color: #84cef5;
	color: #fff;
	font-size: 20px;
	outline: none;
	cursor: pointer;
	&:hover {
		background-color: #fff;
	}
	&:hover i {
		color: #f06789;
	}

	@media screen and (max-width: 767px) {
		width: 40px;
		height: 40px;
		font-size: 20px;
	}

	@media screen and (max-width: 480px) {
		width: 40px;
		height: 40px;
		font-size: 20px;
	}
`;

const AutoCompleteList = styled.div`
	width: 74%;
	max-height: 350px;
	top: 50px;
	left: 4%;
	border-radius: 5px;
	overflow-y: auto;
	position: absolute;
	background-color: white;
`;

const AutoCompleteListItem = styled.div`
	padding: 10px 0 10px 20px;
	text-align: left;
	text-decoration: none;
	&:hover {
		cursor: pointer;
		background-color: antiquewhite;
	}
`;

function SearchEngine({ query, setQuery, search }) {
	const [autoCompleteList, setAutoCompleteList] = useState([]);

	async function autoComplete(searchParam) {
		const key = "00437410f68c4baf977144204242203";
		const url = `http://api.weatherapi.com/v1/search.json?key=${key}&q=${searchParam}`;

		const keyTimeOut = setTimeout(() => {
			axios
				.get(url)
				.then((res) => {
					console.log("res", res);
					setAutoCompleteList(res.data);
				})
				.catch((error) => {
					console.log("error", error);
				});
		}, 300);
	}

	function redirectToDetailsPage(city) {
		console.log(city);
	}

	return (
		<StyledSearchEngine>
			<SearchInputWrapper>
				<SearchEngineInput
					type="text"
					className="city-search"
					placeholder="enter city name"
					name="query"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyUp={search}
					onInput={(e) => autoComplete(e.target.value)}
				/>
				<SearchEngineButton aria-label="search-button">
					<i className="fas fa-search" style={{ fontSize: "18px" }}></i>
				</SearchEngineButton>
			</SearchInputWrapper>
			<AutoCompleteList>
				{autoCompleteList.map((item, index) => (
					<Link className="link" to={`/weather-details/${item.name}`}>
						<AutoCompleteListItem key={index}>
							{item.name}, {item.region}
						</AutoCompleteListItem>
					</Link>
				))}
			</AutoCompleteList>
		</StyledSearchEngine>
	);
}

export default SearchEngine;
