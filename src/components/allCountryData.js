import React from 'react'
import allCountryCases from './../api/allCountryCases';

class AllCountryData extends React.Component {

    state = {
        data: []
    };

    componentDidMount() {

        this.allCountryCasesData();
    }

    allCountryCasesData = async () => {

        const response = await allCountryCases.get();

        const result = response.data.countryitems[0];
        let sortedData = []
        for (let i = 1; i <= 182; i++) {

            sortedData.push(result[i])
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
        this.setState({data: sortedData})
    }

    AllRecord = () => {

        let dataRows = this.state.data.map((data) => {
            return (
            <tr>
                <td>{data.title}</td>
                <td>{data.total_cases}</td>
                <td className="negative">{data.total_deaths}</td>
                <td>{(data.total_recovered !== 0) ? data.total_recovered : "Not Available or 0" }</td>
                <td>{data.total_active_cases}</td>
                <td className="negative">{data.total_serious_cases}</td>
            </tr>);
        });
        console.log(this.state.data)
        return dataRows;
    }



    render() {

        return (
            <div style={{marginTop: '30px'}} className="ui sticky left align container">
                <table className="ui celled table">
                    <thead>
                        <tr>
                        <th>Country Name</th>
                        <th>Total Cases</th>
                        <th>Total Deaths</th>
                        <th>Total Recovered</th>
                        <th>Active Cases</th>
                        <th>Serious Cases</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.AllRecord()}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default AllCountryData;