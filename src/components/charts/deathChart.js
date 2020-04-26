import React from 'react';
import allWorldData from '../../api/allWorldData'
import {Bar} from 'react-chartjs-2';

class DeathChart extends React.Component {

    state = {
        requiredDate: '',
        country: '',
        month: 0,
        year: 0,
        mlist: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
        allRecord: [],
        labels: [],
        datasets: [
          {
            label: '',
            fill: false,
            lineTension: 0.5,
            barThickness: 8,
            backgroundColor: '',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            data: []
          }
        ]
      }

      componentDidMount() {

          let dates = this.requiredDate();  
          this.totalCasesRequest('US', dates);
                
    }

    totalCasesRequest = async (country, dates) => {

        const response = await allWorldData.get(country);
        const result = response.data;
        console.log(dates)
        let cases = dates.map(date => result.timelineitems[0][date].new_daily_deaths);
        this.setState({
            country: result.countrytimelinedata[0].info.title,
            allRecord: result.timelineitems,
            datasets: [
                {
                  label: 'Death',
                  fill: false,
                  lineTension: 0.5,
                  barThickness: 8,
                  backgroundColor: '',
                  borderColor: 'rgba(0,0,0,1)',
                  borderWidth: 1,
                  data: cases
                }
              ]

        })


    }

    requiredDate = () => {
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let x = year % 10;
        let newYear = parseInt(year / 10);
        let y = newYear % 10;
        let shortYear = (y * 10) + x;
        let requireDate = month.toString() + '/' + date.toString() + '/' + shortYear.toString();
        let dates = [];
        for (let i = 1; i < date; i++) {
            if (i < 10) {
                dates.push(month.toString() + '/0' + i.toString() + '/' + shortYear.toString())
            } else {
                dates.push(month.toString() + '/' + i.toString() + '/' + shortYear.toString())
            }
        }

        this.setState({todayDate: requireDate, month: month, year: shortYear, labels: dates});

        return dates;
    }
      
        render() {
            return (
 
                        <div style={{height: '200px', marginTop: '10px'}}>
                        <Bar
                            data={this.state}
                            options={{
                                title:{
                                display:true,
                                text:'Death Graph (Hover over Bar to know Exact Value)',
                                fontSize:15
                                },
                                legend:{
                                display:true,
                                position:'right'
                                }
                            }}
                            />
                        </div>
            )
        
        }
}

export default DeathChart;