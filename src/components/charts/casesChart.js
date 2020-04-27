import React from 'react';
import allWorldData from '../../api/allWorldData'
import DeathChart from './deathChart'
import {Bar} from 'react-chartjs-2';

class LineChart extends React.Component {

    state = {
        get: 0,
        recieved: true,
        requiredDate: '',
        country: '',
        code: '',
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

    componentDidUpdate(prevProps) {
        if (this.props.code !== prevProps.code) {
            let dates = this.requiredDate();  
            
            this.totalCasesRequest(this.props.code, dates);
            }
    }


    newGraph = (id) => {
        let dates = this.requiredDate();  
        this.totalCasesRequest('US', dates);
    }

    totalCasesRequest = async (country, dates) => {

        const response = await allWorldData.get(country);
        const result = response.data;

        let cases = []


        try {

            if (Object.keys(result.timelineitems[0]).length === 1)
            {
                this.setState({ get: 1, 
                    recieved: true,
                    country: result.countrytimelinedata[0].info.title
                })
            }
            else {
               
            console.log(Object.keys(result.timelineitems[0]).length)
             cases= dates.map(date => result.timelineitems[0][date].new_daily_cases);
             this.setState({
                 get: 0,
                recieved: true,
                country: result.countrytimelinedata[0].info.title,
                allRecord: result.timelineitems,
                datasets: [
                    {
                      label: 'Cases',
                      fill: false,
                      lineTension: 0.5,
                      barThickness: 8,
                      backgroundColor: '',
                      borderColor: 'rgba(0,0,0,1)',
                      borderWidth: 1,
                      data: cases
                    }
                  ],
                  code: country
            });
        }

        }
        catch(e) {
            this.setState({ recieved: false})
        }

        return;
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

            if (this.state.get === 1) {
            
            return (
            <div>

            <div className="ui message">
                <div className="header">
                Country : {this.state.country} &nbsp; ({this.state.mlist[this.state.month - 1]})
                    </div>
                 <p>Data not available. Try another country</p>
                </div>      
        </div>
            )
        }

            if (this.state.recieved === false) {
                return (<div>
                    <div className="ui message">
                    <div className="header">Sorry! Error</div>
                    <ul>Reasons
                    <li>Country data not available</li>
                    <li>Can't fetch data</li>
                    </ul>
                    <ul>
                        Solution
                        <li>Try again</li>
                        <li>Refresh the page</li>
                    </ul>
                      </div>
                     
                     </div>);
            }
            return (
               
            <div>

                <div className="ui message">
                    <div className="header">
                    Country : {this.state.country} &nbsp; ({this.state.mlist[this.state.month - 1]})
                        </div>
                        <div style={{height: '200px'}}>
                        <Bar
                            data={this.state}
                            options={{
                                title:{
                                display:true,
                                text:'Cases Graph (Hover over Bar to know Exact Value)',
                                fontSize:15,
                                },
                                legend:{
                                display:true,
                                position:'right'
                                }
                            }}
                         />    
                        </div>
                        <br />
                        <DeathChart code={this.state.code} />
                    </div>      
            </div>
            );
        }
        }

export default LineChart;