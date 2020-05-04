import React from 'react';
import totalCases from './../api/totalCases'


class TotalStats extends React.Component {

    state = {
                total: 0,
                death: 0,
                recovered: 0,
                activeCases: 0,
                seriousCases: 0,
                newCases: 0,
                newDeath: 0,
                newRecoverd: 0
                
            };

    componentDidMount() {

        this.totalCasesRequest();
        
    }

    totalCasesRequest = async () => {

        const response = await totalCases.get();

        const result = response.data.results[0];
        this.setState({
            total: result.total_cases,
            death: result.total_deaths,
            recovered: result.total_recovered,
            activeCases: result.total_active_cases,
            seriousCases: result.total_serious_cases,
            newCases: result.total_new_cases_today,
            newDeath: result.total_new_deaths_today,
            newRecoverd: result.total_new_recovered_today
        });
    }

    render() {

        return (
            <div style={{ margin:'auto', marginTop: '70px', align: 'center' }} className="container">  
                <div style={{ marginBottom: '0'}} className="row">
                <div class="card bg-light mb-3 mr-2 col-sm-3" style={{maxWidth: '15rem', border: '1px solid black'}}>
                <div class="card-header" style={{color: 'darkbrown'}}>Total Cases</div>
                <div class="card-body">
                    <h5 class="card-title" style={{color: 'green'}}>{this.state.total} &nbsp; (+{this.state.newCases})</h5>
                </div>
                </div>
                <div class="card bg-light mb-3 mr-2 col-sm-3" style={{maxWidth: '15rem', border: '1px solid black'}}>
                <div class="card-header" style={{color: 'darkbrown'}}>Total Deaths</div>
                <div class="card-body">
                    <h5 class="card-title" style={{color: 'red'}}>{this.state.death} &nbsp; (+{this.state.newDeath})</h5>
                </div>
                </div>
                <div class="card bg-light mb-3 mr-2 col-sm-2" style={{maxWidth: '15rem', border: '1px solid black'}}>
                <div class="card-header" style={{color: 'darkbrown'}}>Total Recovered</div>
                <div class="card-body">
                    <h5 class="card-title" style={{color: 'orange'}}>{this.state.recovered}</h5>
                </div>
                </div>
                <div class="card bg-light mb-3 mr-2 col-sm-2" style={{maxWidth: '15rem', border: '1px solid black'}}>
                <div class="card-header" style={{color: 'darkbrown'}}>Active Cases</div>
                <div class="card-body">
                    <h5 class="card-title" style={{color: 'green'}}>{this.state.activeCases}</h5>
                </div>
                </div>
                <div class="card bg-light mb-3 mr-2 col-sm-2" style={{maxWidth: '15rem', border: '1px solid black'}}>
                <div class="card-header" style={{color: 'darkbrown'}}>Serious Cases</div>
                <div class="card-body">
                    <h5 class="card-title" style={{color: 'red'}}>{this.state.seriousCases}</h5>
                </div>
                </div>
                    
                </div>
            </div>
        );
    }

}

export default TotalStats;
