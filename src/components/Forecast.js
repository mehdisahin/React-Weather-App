import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";
import styled from "styled-components";

const StyledCityName = styled.div`
	font-size: 20px;
	margin-bottom: 10px;
`;

const StyledDate = styled.div`
	font-size: 18px;
	font-weight: 500;
	font-style: oblique;
`;

const StyledTemp = styled.div`
	font-size: 64px;
	font-weight: 700;
	color: #1e2432;
	text-align: center;
	.temp-deg {
		font-size: 32px;
		cursor: pointer;
	}
	.temp-icon {
		width: 20%;
	}

	@media screen and (max-width: 767px) {
		font-size: 48px;

		.temp-deg {
			font-size: 24px;
		}

		.temp-icon {
			width: 20%;
		}
	}

	@media screen and (max-width: 480px) {
		font-size: 36px;

		.temp-deg {
			font-size: 18px;
		}

		.temp-icon {
			width: 10%;
		}
	}
`;

const StyledWeatherDes = styled.p`
	color: #333;
	font-size: 20px;
	font-weight: 500;
	margin-top: 0;
	margin-bottom: 20px;

	@media screen and (max-width: 767px) {
		font-size: 18px;
	}

	@media screen and (max-width: 480px) {
		font-size: 16px;
	}
`;

const StyledWeatherInfo = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	margin-top: 20px;
	padding: 0 20px;
	color: #1e2432;
	font-size: 20px;
	font-weight: 500;
	text-align: center;

	@media screen and (max-width: 767px) {
		font-size: 18px;
	}

	@media screen and (max-width: 480px) {
		font-size: 16px;
	}
`;

const StyledForecastContainer = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	margin-top: 20px;
	color: #1e2432;

	@media screen and (max-width: 767px) {
		margin-top: 20px;
	}

	@media screen and (max-width: 480px) {
		margin-top: 5px;
	}
`;

const StyledDay = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	padding: 10px;
	margin: 10px;
	border-radius: 10px;
	background-color: #fff;
	box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
	&:hover {
		background-color: aliceblue;
	}

	.day-name {
		font-size: 18px;
		font-weight: 500;
		margin-bottom: 5px;
	}

	.day-icon {
		width: 50px;
		height: 50px;
		margin-bottom: 5px;
	}

	.day-temperature {
		margin-top: 5px;
		font-weight: 400;
	}

	.day-temperature span {
		font-size: 16px;
		font-weight: 500;
	}

	@media screen and (max-width: 767px) {
		flex: 2 2 calc(50% - 6px);
		padding: 3px;
		margin: 3px;

		.day-name {
			font-size: 16px;
			padding: 0;
			margin: 0;
		}

		.day-icon {
			width: 50px;
			height: 50px;
		}

		.day-temperature {
			font-size: 16px;
		}
	}

	@media screen and (max-width: 480px) {
		flex: 2 2 calc(50% - 6px);
		padding: 3px;
		margin: 3px;

		.day-name {
			font-size: 16px;
			padding: 0;
			margin: 0;
		}

		.day-icon {
			width: 30px;
			height: 30px;
		}

		.day-temperature {
			font-size: 16px;
		}
	}
`;

function Forecast({ weather }) {
	const { data } = weather;
	const [forecastData, setForecastData] = useState([]);
	const [isCelsius, setIsCelsius] = useState(true);

	useEffect(() => {
		const fetchForecastData = async () => {
			const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
			const url = `https://api.shecodes.io/weather/v1/forecast?query=${data.city}&key=${apiKey}&units=metric`;

			try {
				const response = await axios.get(url);
				setForecastData(response.data.daily);
			} catch (error) {
				console.log("Error fetching forecast data:", error);
			}
		};

		fetchForecastData();
	}, [data.city]);

	const formatDay = (dateString) => {
		const options = { weekday: "short" };
		const date = new Date(dateString * 1000);
		return date.toLocaleDateString("en-US", options);
	};

	const getCurrentDate = () => {
		const options = {
			weekday: "long",
			day: "numeric",
			month: "long",
			year: "numeric",
		};
		const currentDate = new Date().toLocaleDateString("en-US", options);
		return currentDate;
	};

	const toggleTemperatureUnit = () => {
		setIsCelsius((prevState) => !prevState);
	};

	const convertToCelsius = (temperature) => {
		return Math.round((temperature - 32) * (5 / 9));
	};

	const convertToFahrenheit = (temperature) => {
		return Math.round((temperature * 9) / 5 + 32);
	};

	const renderTemperature = (temperature) => {
		if (isCelsius) {
			return Math.round(temperature);
		} else {
			return convertToFahrenheit(temperature);
		}
	};

	return (
		<div>
			<StyledCityName>
				<h2>
					{data.city}, <span>{data.country}</span>
				</h2>
			</StyledCityName>
			<StyledDate>
				<span>{getCurrentDate()}</span>
			</StyledDate>
			<StyledTemp>
				{data.condition.icon_url && (
					<img
						src={data.condition.icon_url}
						alt={data.condition.description}
						className="temp-icon"
					/>
				)}
				{renderTemperature(data.temperature.current)}
				<sup className="temp-deg" onClick={toggleTemperatureUnit}>
					{isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
				</sup>
			</StyledTemp>
			<StyledWeatherDes>{data.condition.description}</StyledWeatherDes>
			<StyledWeatherInfo>
				<div className="col">
					<ReactAnimatedWeather icon="WIND" size="40" />
					<div>
						<p className="wind">{data.wind.speed}m/s</p>
						<p>Wind speed</p>
					</div>
				</div>
				<div className="col">
					<ReactAnimatedWeather icon="RAIN" size="40" />
					<div>
						<p className="humidity">{data.temperature.humidity}%</p>
						<p>Humidity</p>
					</div>
				</div>
			</StyledWeatherInfo>
			<div className="forecast">
				<h3>5-Day Forecast:</h3>
				<StyledForecastContainer>
					{forecastData &&
						forecastData.slice(0, 5).map((day) => (
							<StyledDay key={day.time}>
								<p className="day-name">{formatDay(day.time)}</p>
								{day.condition.icon_url && (
									<img
										className="day-icon"
										src={day.condition.icon_url}
										alt={day.condition.description}
									/>
								)}
								<p className="day-temperature">
									{Math.round(day.temperature.minimum)}°/{" "}
									<span>{Math.round(day.temperature.maximum)}°</span>
								</p>
							</StyledDay>
						))}
				</StyledForecastContainer>
			</div>
		</div>
	);
}

export default Forecast;
