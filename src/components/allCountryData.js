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

        const result = response.data.Countries;
        console.log(result[0])
        const indiaApiData = response2.data.statewise;
        let sortedData = []
        for (let i = 0; i <= 189; i++) {
            sortedData.push(result[i])
        }
        sortedData.sort((a, b) => {
        if(a.total_cases < b.total_cases){
            return 1;
        }else if(a.TotalConfirmed > b.TotalConfirmed){
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

        if (column === "Country" || column === "state") {

            data.sort((b, a) => {
                console.log(a[column])
                if(a[column] < b[column]){
                    return 1;
                }else if(a[column] > b[column]){
                        return -1;
                }else{
                        return 0;
                }
            });

        } 
        else if (column === "total_active_cases") {
            data.sort((a, b) => {
                a = parseInt(a.TotalConfirmed) - parseInt(a.TotalDeaths) - parseInt(a.TotalRecovered)
                b = parseInt(b.TotalConfirmed) - parseInt(b.TotalDeaths) - parseInt(b.TotalRecovered)
                if(parseInt(a) < parseInt(b)){
                    return 1;
                }else if(parseInt(a) > parseInt(b)){
                        return -1;
                }else{
                        return 0;
                }
            });
        }
        else {
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
                <tr  className="country-row col-xs-2"  key={data.CountryCode} onClick={() => this.showGraph(data.CountryCode)}>
                    <td className="col-xs-2" style={{textAlign: 'center'}}>{data.Country}</td>
                    <td className="col-xs-2">{data.TotalConfirmed} &nbsp; {(data.NewConfirmed !== 0) ? "(+" + data.NewConfirmed + ")" : " "}</td>
                    <td className="col-xs-2" style={{color: 'darkred'}}>{data.TotalDeaths} &nbsp; {(data.NewDeaths !== 0) ? "(+" + data.NewDeaths + ")": ""}</td>
                    <td className="col-xs-2">{(data.TotalRecovered !== 0) ? data.TotalRecovered : "-" }</td>
                    <td className="col-xs-2">{data.TotalConfirmed - data.TotalDeaths - data.TotalRecovered}</td>
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
                </tr>);
            });
        }
        return dataRows;
    }



    render() {

        return (
    
            <div className="conatiner">
                    <div className="row">

                    <div style={{margin: 'auto', marginTop:'10px', marginBottom: '0px'} } className="col-md-8 col-xs-12">
    
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
                        <th className="col-xs-2" style={{textAlign: 'center', cursor: 'pointer', color: '#450000'}} onClick={() => this.dataSort((this.state.isCountry) ? "Country" : "state")}>{this.state.location}</th>
                        <th className="col-xs-2" style={{cursor: 'pointer', color: '#450000'}} onClick={() => this.dataSort((this.state.isCountry) ? "TotalConfirmed" : "confirmed")}>Total Cases</th>
                        <th className="col-xs-2" style={{cursor: 'pointer', color: '#450000'}} onClick={() => this.dataSort((this.state.isCountry) ? "TotalDeaths" : "deaths")}>Total Deaths</th>
                        <th className="col-xs-2" style={{cursor: 'pointer', color: '#450000'}} onClick={() => this.dataSort((this.state.isCountry) ? "TotalRecovered" : "recovered")}>Total Recovered</th>
                        <th className="col-xs-2" style={{cursor: 'pointer', color: '#450000'}} onClick={() => this.dataSort((this.state.isCountry) ? "total_active_cases" : "active")}>Active Cases</th>
                        </tr>
                    </thead>
                    <tbody >
                        {this.AllRecord()}
                    </tbody>
                </table>
                    </div>
                    <div style={{margin: 'auto', marginTop: '0px'}} className="container-fluid col-md-4 col-xs-12">
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