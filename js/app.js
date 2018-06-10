$('#getWeatherBtn').click(() => {
    $('.button-container').show();
    console.log('Button clicked');
    const cityName = $('#cityInput').val();
    $.ajax({
        type: 'GET',
        url: `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=27d43832d2a4adcb97fcbfa23db130aa`,
        success: (data) => {
            console.log('In success callback');
            console.log(data);
            
            const currentTemp = Math.round(data.main.temp - 270);
            const currentPressure = data.main.pressure;
            const humidity = data.main.humidity;
            const description = data.weather["0"].description;
            const wind = data.wind.speed;
            const day = moment(data.dt*1000).format('dddd');
            //listOfDates = data.list.map((ele) => moment(ele.dt * 1000).format('dddd, h:mm a'));
            //listOfTemp = data.list.map(ele => Math.round(ele.main.temp - 270));
            const icon = data.weather["0"].icon;
            var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
            $('#wicon').attr('src', iconurl);
            $('#getTemperature').html(currentTemp);
            $('#getDescription').html(description);
            $('#getDay').html(day);
            $('#getHumidity').html(humidity);
            $('#getPressure').html(currentPressure);
            $('#getWind').html((wind));

            //$('table').show();
            plotChart(listOfTemp, listOfDates);
        },
        error: (err) => {
            console.log('In error callback');
            console.log(err);
        }
    });
})


$('#temperature').click(() => {
    const cityName = $('#cityInput').val();
    $.ajax({
        type: 'GET',
        url: `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=133b42fff699f45866056ed2e4a093db`,
        success: (data) => {
            console.log('In success callback');
            console.log(data);
            listOfDates = data.list.map((ele) => moment(ele.dt * 1000).format('dddd,h:mm a'));
            console.log(listOfDates);
            listOfTemp = data.list.map(ele => Math.round(ele.main.temp - 270));
            console.log(listOfTemp);
            plotChart(listOfTemp, listOfDates);
            
        },
        error: (err) => {
            console.log('In error callback');
            console.log(err);
        }
    });

    const plotChart = (tempArr, datesArr) => {
        $('#chart-container').show();
        Highcharts.chart('chart-container', {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Temperature'
            },
            xAxis: {
                categories: datesArr
            },
            yAxis: {
                title: {
                    text: 'Temperature'
                },
                labels: {
                    formatter: function () { return this.value + '°'; }
                }
            },
            tooltip: {
                crosshairs: true,
                shared: true
            },
            plotOptions: {
                line: {
                    marker: {
                        radius: 4,
                        lineColor: '#666666',
                        lineWidth: 1
                    }
                }
            },
            series: [{
                name: cityName,
                marker: {
                    symbol: 'square'
                },
                data: tempArr
            }]
        });
    }

})


/*wind map */

  $('#wind').click(() => {
        const cityName1 = $('#cityInput').val();
        $.ajax({
            type: 'GET',
            url: `http://api.openweathermap.org/data/2.5/forecast?q=${cityName1}&appid=133b42fff699f45866056ed2e4a093db`,
            success: (data) => {
                console.log('In success callback');
                console.log(data);
                listOfDates1 = data.list.map((ele) => moment(ele.dt * 1000).format('dddd,h:mm a'));
                console.log(listOfDates1);
                listOfwind1 = data.list.map(ele => Math.round((ele.wind.deg * 5) / 18));
                console.log(listOfwind1);
                plotCharts(listOfwind1, listOfDates1);
                
            },
            error: (err) => {
                console.log('In error callback');
                console.log(err);
            }
        });

        const plotCharts = (windArr1, datesArr1) => {
        Highcharts.chart('chart-container', {
            chart: {
              type: 'spline',
              inverted: true
            },
            title: {
              text: 'wind'
            },
            xAxis: {
                reversed: false,
                title: {
                  enabled: true,
                  text: 'Altitude'
                },
                labels: {
                  format: '{value} km'
                },
                maxPadding: 0.05,
                showLastLabel: true
              },     
                 yAxis: {
                     categories: datesArr1,
                    title: {
                      text: 'width'
                    },
                     lineWidth: 2
                  },
                        
        
            legend: {
              enabled: false
            },
            // tooltip: {
            //   headerFormat: '<b>{series.name}</b><br/>',
            //   pointFormat: '{point.x} km: {point.y}°C'
            // },
            plotOptions: {
              spline: {
                marker: {
                  enable: false
                }
              }
            },
            series: [{
                name: cityName1,
                marker: {
                    symbol: 'square'
                },
                data: windArr1
            }]
          });
        }
    })


 var d = new Date();
       var weekday = new Array(7);
       weekday[0] = "Sunday";
       weekday[1] = "Monday";
       weekday[2] = "Tuesday";
       weekday[3] = "Wednesday";
       weekday[4] = "Thursday";
       weekday[5] = "Friday";
       weekday[6] = "Saturday";
       var dayNumber = d.getDay();
       for(i=dayNumber,j=0;j<7;i++,j++){
           if(i>6)
               i=i%7;
           var res = weekday[i];
           document.getElementById(j).innerHTML=res;
       }

       

















  