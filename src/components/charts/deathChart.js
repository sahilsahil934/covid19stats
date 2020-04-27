import React from 'react';
import allWorldData from '../../api/allWorldData'
import {Bar} from 'react-chartjs-2';

class DeathChart extends React.Component {

    state = {
        requiredDate: '',
        country: '',
        month: 0,
        code: '',
        year: 0,
        mlist: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
        allRecord: [],
        labels: [],
        datasets: [
          {
            label: 'Deaths',
            fill: false,
            lineTension: 0.5,
            barThickness: 8,
            backgroundColor: 'red',
            hoverBackgroundColor: 'black',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            data: []
          }
        ]
      }

    componentDidUpdate(prevProps) {
        console.log(this.props.code)
        if (JSON.stringify(this.props.code) !== JSON.stringify(prevProps.code)) {
        let dates = this.requiredDate(this.props.code[1]);  
        this.totalCasesRequest(this.props.code[0], dates);
        
        }
    }

    notRecievedHandler = (country) => {

        let dates = this.requiredDate();  
        this.totalCasesRequest(country, dates);
    }


    totalCasesRequest = async (country, dates) => {

        const response = await allWorldData.get(country);
        const result = response.data;
        let cases = []


        try {
             cases= dates.map(date => result.timelineitems[0][date].new_daily_deaths);
             this.setState({
                country: result.countrytimelinedata[0].info.title,
                allRecord: result.timelineitems,
                datasets: [
                    {
                      label: 'Deaths',
                      fill: false,
                      lineTension: 0.5,
                      barThickness: 8,
                      hoverBackgroundColor: 'black',
                      backgroundColor: 'red',
                      borderColor: 'rgba(0, 0, 0, 1)',
                      borderWidth: 1,
                      data: cases
                    }
                  ],
                  code: country
            });
        }
        catch(e) {
            this.notRecievedHandler(country)
        
        }


    }



    requiredDate = (monthVal=0) => {
        let newDate = new Date();
        let date = newDate.getDate() - 1;
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        if (monthVal !== 0) {
            month = monthVal;
            date = new Date(year, monthVal, 0).getDate()
        } 
        let x = year % 10;
        let newYear = parseInt(year / 10);
        let y = newYear % 10;
        let shortYear = (y * 10) + x;
        let requireDate = month.toString() + '/' + date.toString() + '/' + shortYear.toString();
        let dates = [];
        for (let i = 1; i <= date; i++) {
            if (i < 10) {
                dates.push(month.toString() + '/0' + i.toString() + '/' + shortYear.toString())
            } else {
                dates.push(month.toString() + '/' + i.toString() + '/' + shortYear.toString())
            }
        }

        let xdates = [];
        for (let i = 1; i <= date; i++) {
            if (i < 10) {
                xdates.push(month.toString() + '/0' + i.toString())
            } else {
                xdates.push(month.toString() + '/' + i.toString())
            }
        }

        this.setState({todayDate: requireDate, month: month, year: shortYear, labels: xdates});

        return dates;
    }
      
        render() {
            return (
 
                        <div style={{height: '200px', marginTop: '0px'}}>
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