import React from 'react';
import totalCases from './../api/totalCases'


class TotalStats extends React.Component {

    state = {
                total: 0,
                death: 0,
                recovered: 0,
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
            newCases: result.total_new_cases_today,
            newDeath: result.total_new_deaths_today,
            newRecoverd: result.total_new_recovered_today
        });
    }

    render() {

        return (
            <div style={{ marginTop: '60px', align: 'center' }} className="ui container column center page grid">  
                <div style={{ marginBottom: '0'}}class="ui three item menu">
                    <div class="item">Total Cases</div>
                    <div class="item active">Total Deaths</div>
                    <div class="item">Total Recovered</div>
                </div>  
                <div style={{marginTop: '0'}} class="ui three item menu">
                    <div class="item">
                            <div style={{color: 'gray'}} class="value">
                                <h3>{this.state.total} &nbsp; (+{this.state.newCases})</h3>
                            </div>
                
                    </div>
                    <div class="item">
                            <div style={{color: 'red'}} class="value">
                                <h3>{this.state.death} &nbsp; (+{this.state.newDeath})</h3>
                            </div>
                            
                        
                    </div>
                    <div style={{color: 'lightgreen'}} class="item">
                            <div class="value">
                                <h3>{this.state.recovered}</h3>
                            </div>
                           
                        
                    </div>
                </div>
            </div>
        );
    }

}

export default TotalStats;
