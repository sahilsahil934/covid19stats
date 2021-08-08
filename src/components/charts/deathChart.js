import React from 'react';
import allWorldData from '../../api/allWorldData'
import {Bar} from 'react-chartjs-2';
import indiaStateData from './../../api/indiaStateData'
import stateCode from './../../data/indiaCodeToStateData.json'

class DeathChart extends React.Component {

    state = {
        requiredDate: '',
        indiaDataRecieved: 0,
        country: '',
        mName: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
        statesData: [],
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
            barThickness: 5,
            backgroundColor: 'red',
            hoverBackgroundColor: 'black',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            data: []
          }
        ]
      }

    componentDidUpdate(prevProps) {
        if (this.props.code[2]) {
            if (JSON.stringify(this.props.code) !== JSON.stringify(prevProps.code)) {
            let dates = this.requiredDate(this.props.code[1]);  
            this.totalCasesRequest(this.props.code[0], dates);
        } 
    }else {
            if (JSON.stringify(this.props.code) !== JSON.stringify(prevProps.code)) {
                let dates = this.requiredDate();  
                this.totalCasesRequest(this.props.code[0], dates);
                
            }
        }
    }

    notRecievedHandler = (country) => {

        let dates = this.requiredDate();  
        this.totalCasesRequest(country, dates);
    }


    totalCasesRequest = async (country, dates) => {

        if (this.props.code[2]) {

            const response = await allWorldData.get(country);
            const result = response.data;
            result.reverse()
            let cases = []


            try {
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                console.log(dd)
                cases = []
                let values;
                for (let i = dd - 2; i >= 0; i--)
                {
                    values = result[i].Deaths - result[i + 1].Deaths
                    cases.push(values)
                }
                this.setState({
                    country: result[0].Country,
                    allRecord: result.timelineitems,
                    datasets: [
                        {
                        label: 'Deaths',
                        fill: false,
                        lineTension: 0.5,
                        barThickness: 10,
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
        } else {


            if (this.state.indiaDataRecieved === 0) {

                const response = await indiaStateData.get();
                let result = response.data.states_daily;
                console.log(result)
                let importantData = []
                let count = 0;
                let x = '';
                let length = result.length;
                for (let i = 0; i < length; i++) {

                    if (count >= dates.length) {
                        break;
                    } else {
                        x = result.pop();
                        if (x.status === "Deceased") {
                            console.log(x)
                            importantData.push(x);
                            count = count + 1;
                        }
                        
                    }
                }
                let importantDataReveresed = importantData.reverse();                
                this.setState({indiaDataRecieved: 1, statesData: importantDataReveresed})
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
                        label: 'Death',
                        fill: false,
                        lineTension: 0.5,
                        barThickness: 10,
                        hoverBackgroundColor: 'black',
                        backgroundColor: 'red',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 1,
                        data: cases
                        }
                    ],
                    code: country
                });
        

        }
    }





    requiredDate = (monthVal=0) => {
        
        if (this.props.code[2]) {
            let newDate = new Date();
            let date = newDate.getDate() - 1;
            let month = newDate.getMonth() + 1;
            let year = newDate.getFullYear();
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
            console.log(date)
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
            console.log(date)
            let month = newDate.getMonth() + 1;
            let monthName = this.state.mName
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
      
        render() {
            return (
 
                        <div style={{height: '200px', marginTop: '0px'}}>
                        <Bar
                            data={this.state}
                            options={{
                                title:{
                                display:true,
                                responsive: true,
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