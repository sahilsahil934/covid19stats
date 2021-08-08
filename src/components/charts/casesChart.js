import React from 'react';
import allWorldData from '../../api/allWorldData'
import DeathChart from './deathChart'
import {Bar} from 'react-chartjs-2';
import indiaStateData from '../../api/indiaStateData';
import stateCode from './../../data/indiaCodeToStateData.json'

class LineChart extends React.Component {

    state = {
        get: 0,
        currentMonth: true,
        monthValue:3,
        mName: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
        recieved: true,
        requiredDate: '',
        indiaDataRecieved: 0,
        statesData: '',
        country: '',
        originalMonth: 0,
        code: '',
        month: 0,
        year: 0,
        xdates: [],
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
            hoverBackgroundColor: 'black',
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

        if (this.props.code[0]) {
            if (JSON.stringify(this.props.code) !== JSON.stringify(prevProps.code)) {
                let dates = this.requiredDate();  
                
                this.totalCasesRequest(this.props.code[1], dates);
                this.setState({monthValue: 3 })
            }
        } else {
            if (JSON.stringify(this.props.code) !== JSON.stringify(prevProps.code)) {
                let dates = this.requiredDate();  
                
                this.totalCasesRequest(this.props.code[1], dates);
                this.setState({monthValue: 3})
            }

        }
        
    }

    notRecievedHandler = (country=this.state.code, month=0) => {

        let dates;
        if (month === 0)  {
            dates = this.requiredDate(); 
        } else {
            dates = this.requiredDate(month);
        }
        this.totalCasesRequest(country, dates);
    }


    newGraph = (id) => {
        let dates = this.requiredDate();  
        this.totalCasesRequest('US', dates);
    }

    totalCasesRequest = async (country, dates) => {

        if (this.props.code[0]) {
            const response = await allWorldData.get(country);
            
            const result = response.data;
            console.log(result)
            result.reverse()

            let cases = []


            try {

                if (Object.keys(result).length === 1)
                {
                    this.setState({ get: 1, 
                        recieved: true,
                        country: result[0].Country
                       
                    })
                }
                else {
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                cases = []
                let values;
                for (let i = dd - 2; i >= 0; i--)
                {
                    values = result[i].Confirmed - result[i + 1].Confirmed
                    cases.push(values)
                }
                // console.log(date)
                this.setState({
                    get: 0,
                    recieved: true,
                    country: result[0].Country,
                    allRecord: result.timelineitems,
                    datasets: [
                        {
                        label: 'Cases',
                        fill: false,
                        lineTension: 0.5,
                        barThickness: 10,
                        hoverBackgroundColor: 'black',
                        backgroundColor: 'darkgray',
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
                this.notRecievedHandler();
            }
        } else {
            
            console.log("hello");
            if (this.state.indiaDataRecieved === 0) {

                const response = await indiaStateData.get();
                let result = response.data.states_daily;
                let importantData = []
                let count = 0;
                let x = '';
                let length = result.length;
                for (let i = 0; i < length; i++) {

                    if (count >= dates.length) {
                        break;
                    } else {
                        x = result.pop();
                        if (x.status === "Confirmed") {
                            importantData.push(x);
                            count = count + 1;
                        }
                        
                    }
                }
                let importantDataReversed = importantData.reverse();
                console.log(importantData);
                this.setState({indiaDataRecieved: 1, statesData: importantDataReversed})
            }
            
            let cases = []
            let data = this.state.statesData;
            let requiredCode = country.toLowerCase()
            cases = data.map((data) => parseInt(data[requiredCode]))
            console.log(cases)  
                

                this.setState({
                    get: 0,
                    recieved: true,
                    country: stateCode[country],
                    datasets: [
                        {
                        label: 'Cases',
                        fill: false,
                        lineTension: 0.5,
                        barThickness: 10,
                        hoverBackgroundColor: 'black',
                        backgroundColor: 'darkgray',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 1,
                        data: cases
                        }
                    ],
                    code: country
                });
        

        }

        return;
    }

    requiredDate = (monthVal=0) => {

        if (this.props.code[0]) {

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
        } else {

            let newDate = new Date();
            let date = newDate.getDate() - 1;
            let month = newDate.getMonth() + 1;
            let monthName = this.state.mName[month - 1]
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
                    dates.push('0' + i.toString() + '/' + monthName[month - 1] + '/' + shortYear.toString())
                } else {
                    dates.push(i.toString() + '/' + monthName[month - 1] + '/' + shortYear.toString())
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
    }

    marchData = () => {
        if (this.state.monthValue === 3) {
            let month = this.state.month
            this.setState({monthValue: month - 1, originalMonth: month})
            this.notRecievedHandler(this.state.code, 4)
        } else {
            this.setState({monthValue: 3})
            this.notRecievedHandler(this.state.code, this.state.originalMonth)

        }

    }
      
        render() {

            let button = "";
            if (this.props.code[0]) {
                button = <button id='march' className='btn btn-light' style={{color: '#3e9b39'}} onClick={this.marchData}>{this.state.mlist[this.state.monthValue]}</button>;
           } else {
               button = "";
           }
            if (this.state.get === 1) {
            
            return (
            <div>

            <div className="alert">
                <div className="">
                {(this.props.code[0]) ? "Country" : "State"} : {this.state.country} &nbsp; ({this.state.mlist[this.state.month - 1]})
                    </div>
                 <p>Data not available. Try another country</p>
                </div>      
        </div>
            )
        }

            if (this.state.recieved === false) {
                return (<div>
                    <div className="alert">
                    <div className="">Sorry! Error</div>
                    <ul>Reasons
                    <li>Country data not available</li>
                    <li>Can't fetch data</li>
                    </ul>
                    <ul>
                        Solution
                        <li>Refresh the page</li>
                    </ul>
                      </div>
                     
                     </div>);
            }
            return (
            <div className="container-fluid">
            <div style={{background: '#FDEDEC', padding: '40px', paddingTop: '5px', width: '100%'}}>
                    <div className="mt-5">
                    {(this.props.code[0]) ? "Country" : (this.props.code[1] === "TT") ? "Country" : "State"} : {this.state.country} &nbsp; 
                    <button id="current" className="btn btn-success">{this.state.mlist[this.state.month - 1]}</button> &nbsp; &nbsp;
                {/* {button}  */}
                    </div>
                        <article style={{height: '100%', width: '100%'}}>
                        <Bar
                            data={this.state}
                            options={{
                                title:{
                                display:true,
                                responsive: true,
                                text:'Cases Graph (Hover over Bar to know Exact Value)',
                                fontSize:15,
                                },
                                legend:{
                                display:true,
                                position:'right'
                                }
                            }}
                         />    
                        </article>
                        <br />
                        <DeathChart code={[this.state.code, this.state.month, this.props.code[0]]} />
            </div>
            </div>
            );
        }   
        }

export default LineChart;