import React from 'react';
import Title from './title'
import TotalStats from './totalStats'
import AllCountryData from './allCountryData'
import LineChart from './charts/casesChart'

class App extends React.Component {


    render() {

        return (
            <div>
                <Title />  
                <TotalStats />
                <div className="ui conatiner">
                <div className="ui grid">
                    <div className="ui row">
                        <div style={{margin: 'auto'}}className="nine wide column">
                                <AllCountryData />
                        </div>

                            <div style={{marginTop: '20px'}} className="ui sticky fixed six wide column center page grid">
                            <div className="ui fixed sticky">
                            <LineChart />
                            <div className="ui message">
                                <div className="header">
                                    Support
                                </div>
                                <ul className="list">
                                    <li>To Contribute : <a href="https://github.com/iamsahil1910/covid19stats">Click Here</a></li>
                                    <li>To provide detailed data country API: Email: <a href="mailto:iamsahil1910@gmail.com">iamsaihl1910@gmail.com</a></li>
                                </ul>
                            </div>
                            <div className="ui message">
                                <div className="header">
                                    New Site Features
                                </div>
                                <ul className="list">
                                    <li>World Data: <a href="https://thevirustracker.com/">The Virus Tracker</a></li>
                                    <li>India data (coming soon): <a href="https://www.covid19india.org">Covid19India</a></li>
                                </ul>
                            </div>
                            </div>
                            </div>
                        
                    </div>
                </div>
                </div>
            </div>
        );
    }

}

export default App;
