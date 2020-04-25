import React from 'react';
import Title from './title'
import TotalStats from './totalStats'
import AllCountryData from './allCountryData'

class App extends React.Component {

    componentDidMount() {
        
    }

    render() {

        return (
            <div>
                <Title />
                <TotalStats />
                <div className="ui grid">
                    <div className="ui row">
                        <div style={{margin: 'auto'}}className="ten wide column">
                                <AllCountryData />
                        </div>

                            <div style={{marginTop: '30px'}} className="ui sticky fixed five wide column center page grid">
                            <div className="ui fixed sticky">
                            <div class="ui message">
                                <div class="header">
                                    New Site Features
                                </div>
                                <ul class="list">
                                    <li>Graphs will be added soon...</li>
                                    <li>India's detailed report with states and district coming soon...</li>
                                </ul>
                            </div>
                            <div class="ui message">
                                <div class="header">
                                    Support
                                </div>
                                <ul class="list">
                                    <li>To Contribute : <a href="https://github.com/iamsahil1910/covid19stats">Click Here</a></li>
                                    <li>To provide detailed data country API: Email: <a href="mailto:iamsahil1910@gmail.com">iamsaihl1910@gmail.com</a></li>
                                </ul>
                            </div>
                            <div class="ui message">
                                <div class="header">
                                    New Site Features
                                </div>
                                <ul class="list">
                                    <li>World Data: <a href="https://thevirustracker.com/">The Virus Tracker</a></li>
                                    <li>India data (coming soon): <a href="https://www.covid19india.org">Covid19India</a></li>
                                </ul>
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
