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
               <AllCountryData />   
            </div>
        );
    }

}

export default App;
