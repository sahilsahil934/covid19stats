import React from 'react'
import allCountryCases from './../api/allCountryCases';
import indiaData from './../api/indiaData'
import LineChart from './charts/casesChart'
import './allCountryData.css'

class AllCountryData extends React.Component {


    state = {
        data: [], 
        location: 'Country Name',
        indiaData: [],
        isCountry: true,
        clickedOnCountry: true
    };

    componentDidMount() {

        this.allCountryCasesData();
    }

    allCountryCasesData = async () => {

        const response = await allCountryCases.get();
        const response2 = await indiaData.get();

        const result = response.data.countryitems[0];
        const indiaApiData = response2.data.statewise;
        let sortedData = []
        let duplicate = ['KP', 'XK', 'CD']
        for (let i = 1; i <= 182; i++) {
            if (!duplicate.includes(result[i].code)) {
            sortedData.push(result[i])
            }
        }
        sortedData.sort((a, b) => {
        if(a.total_cases < b.total_cases){
            return 1;
        }else if(a.total_cases > b.total_cases){
                return -1;
        }else{
                return 0;
        }
        });
        this.setState({data: sortedData, indiaData: indiaApiData})

    }

    dataSort = (column) => {


        let data = [];

        if (this.state.isCountry) {
            data = this.state.data
        } else {
            data = this.state.indiaData
        }

        if (column === "title" || column === "state") {

            data.sort((b, a) => {

                if(a[column] < b[column]){
                    return 1;
                }else if(a[column] > b[column]){
                        return -1;
                }else{
                        return 0;
                }
            });

        } else {
            data.sort((a, b) => {

                if(parseInt(a[column]) < parseInt(b[column])){
                    return 1;
                }else if(parseInt(a[column]) > parseInt(b[column])){
                        return -1;
                }else{
                        return 0;
                }
            });
        }

        
        if (this.state.isCountry) {
            this.setState({data: data})
        } else {
            this.setState({indiaData: data})
        }
        

    }

    indiaDetails = () => {
        this.showGraph("IN")
        this.setState({isCountry: false, location: 'Total / States'})
    }

    worldDetails = () => {
        this.showGraph("US")
        this.setState({isCountry: true, location: 'Country Name'})
    }

    showGraph = (data) =>  {

        this.setState({ code: data, clickedOnCountry: true});
        
    }

    stateGraph = (data) => {
        this.setState({ code: data, clickedOnCountry: false  })
    }

    AllRecord = () => {

        let dataRows = []
        if (this.state.isCountry) {

             dataRows = this.state.data.map((data) => {
                return (
                <tr  className="country-row col-xs-2"  key={data.code} onClick={() => this.showGraph(data.code)}>
                    <td className="col-xs-2" style={{textAlign: 'center'}}>{data.title}</td>
                    <td className="col-xs-2">{data.total_cases} &nbsp; {(data.total_new_cases_today !== 0) ? "(+" + data.total_new_cases_today + ")" : " "}</td>
                    <td className="col-xs-2" style={{color: 'darkred'}}>{data.total_deaths} &nbsp; {(data.total_new_deaths_today !== 0) ? "(+" + data.total_new_deaths_today + ")": ""}</td>
                    <td className="col-xs-2">{(data.total_recovered !== 0) ? data.total_recovered : "-" }</td>
                    <td className="col-xs-2">{data.total_active_cases}</td>
                    <td className="col-xs-2" style={{color: 'darkred'}}>{data.total_serious_cases}</td>
                </tr>);
            });
        } else {
             dataRows = this.state.indiaData.map((data) => {
                return (
                <tr  className="country-row"  key={data.statecode} onClick={() => this.stateGraph(data.statecode)}>
                    <td style={{textAlign: 'center'}}>{data.state}</td>
                    <td>{data.confirmed} &nbsp; {(data.deltaconfirmed !== "0") ? "(+" + data.deltaconfirmed + ")" : " "} </td>
                    <td style={{background: '#F1F1F1'}}>{data.deaths} &nbsp; {(data.deltadeaths !== "0") ? "(+" + data.deltadeaths + ")" : " "}</td>
                    <td>{data.recovered} &nbsp; {(data.deltarecovered !== "0") ? "(+" + data.deltarecovered + ")" : " "}</td>
                    <td>{data.active}</td>
                    <td style={{background: '#E1E1E1'}}>Not available</td>
                </tr>);
            });
        }
        return dataRows;
    }



    render() {

        return (
    
            <div className="conatiner">
                    <div className="row">

                    <div style={{margin: 'auto', marginTop:'10px', marginBottom: '0px'} } className="col-md-8 col-xs-10">
    
                    <div className="alert alert-success" style={{border: '1px solid', padding: '8px', width: 'auto'}} role="alert">
                        Click on any country row to view the detailed graph. (Updation and Loading of graphs takes time according to your Internet speed.)
                    </div>
                    <div className="alert alert-primary" style={{border: '1px solid', padding: '8px'}} role="alert">
                            * Click on any column title to sort it according to that (Descending except {this.state.location} (Ascending)).
                    </div>                   
                    <button id="march" className={(this.state.isCountry) ? "btn btn-success" : "btn btn-light" }  onClick={this.worldDetails} >World</button> &nbsp;
                    <button id="march" className={(this.state.isCountry) ? "btn btn-light" : "btn btn-success"}  onClick={this.indiaDetails}>India</button>
                    &nbsp; [* Detailed graph for each state of India is available now.]
                    <table style={{borderCollapse: 'separate', borderSpacing: '5px 5px', borderRadius: '20px', background:'transparent', marginTop: '10px'}} className="table table-striped">
                    <thead>   
                        <tr >
                        <th className="col-xs-2" style={{textAlign: 'center', cursor: 'pointer', color: '#450000'}} onClick={() => this.dataSort((this.state.isCountry) ? "title" : "state")}>{this.state.location}</th>
                        <th className="col-xs-2" style={{cursor: 'pointer', color: '#450000'}} onClick={() => this.dataSort((this.state.isCountry) ? "total_cases" : "confirmed")}>Total Cases</th>
                        <th className="col-xs-2" style={{cursor: 'pointer', color: '#450000'}} onClick={() => this.dataSort((this.state.isCountry) ? "total_deaths" : "deaths")}>Total Deaths</th>
                        <th className="col-xs-2" style={{cursor: 'pointer', color: '#450000'}} onClick={() => this.dataSort((this.state.isCountry) ? "total_recovered" : "recovered")}>Total Recovered</th>
                        <th className="col-xs-2" style={{cursor: 'pointer', color: '#450000'}} onClick={() => this.dataSort((this.state.isCountry) ? "total_active_cases" : "active")}>Active Cases</th>
                        <th className="col-xs-2" style={{cursor: 'pointer', color: '#450000'}} onClick={() => this.dataSort((this.state.isCountry) ? "total_serious_cases" : "confirmed")}>Serious Cases</th>
                        </tr>
                    </thead>
                    <tbody >
                        {this.AllRecord()}
                    </tbody>
                </table>
                    </div>
                    <div style={{margin: 'auto', marginTop: '0px'}} className="container-fluid col-md-4 col-xs-10">
                            <div  style={{marginTop: '0px', paddingTop: '60px'}} className="position-sticky">
                            <LineChart code={[this.state.clickedOnCountry, this.state.code]} />
                            </div>  
                    
                    </div>
                    </div>
            </div>
        );
    }

}

export default AllCountryData;