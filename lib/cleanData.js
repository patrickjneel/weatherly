function cleanData(data) {
 
 	////////////  CURRENT WEATHER  /////////////
	let timeDay = data.current_observation.observation_time.split('');
  timeDay = timeDay.slice(16, timeDay.length).join('');

	let weatherSummary = data.forecast.txt_forecast.forecastday['0'].fcttext;
    weatherSummary = weatherSummary.split('')
    for (let i = 0; i < weatherSummary.length; i++) {
      if (weatherSummary[i] === 'H') {
        weatherSummary.splice(i, 10);
        break;
      }
    }
    weatherSummary = weatherSummary.join('')

  let todayHigh = data.forecast.simpleforecast.forecastday[0].high.fahrenheit;
  let todayLow = data.forecast.simpleforecast.forecastday[0].low.fahrenheit;
  let todayHighLow = ('High ' + todayHigh + 'F. Low ' + todayLow + 'F');

	const currentWeather = {
		cityState: data.current_observation.display_location.full,
		timeDay: timeDay,
		weatherSummary: weatherSummary,
		todayHighLow: todayHighLow
	}

 	////////////  7 HOUR  /////////////
	const sevenHour = data.hourly_forecast.slice(0, 7).reduce((sevenHourArray, hour) => {
		sevenHourArray.push({time: hour.FCTTIME.civil, temp: hour.temp.english, cond: hour.condition})
		return sevenHourArray
	}, [])

 	////////////  10 DAY  /////////////
	const tenDay = data.forecast.simpleforecast.forecastday.reduce((tenDayArray, day) => {
		tenDayArray.push({highLow: 'High ' + day.high.fahrenheit + 'F.  Low ' + day.low.fahrenheit, day: day.date.weekday, dayCond: day.conditions})
		return tenDayArray
	}, [])

	return {currentWeather, sevenHour, tenDay}  //obj, arr of hours, arr of days
}

export default cleanData;