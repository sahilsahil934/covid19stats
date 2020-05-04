import React from 'react';
import Title from './title'
import TotalStats from './totalStats'
import AllCountryData from './allCountryData'

class App extends React.Component {


    render() {

        return (
            <div>
                <div className="container-fluid">
                    <Title />  
                    <TotalStats />
                    <AllCountryData /> 
                </div>
                  
            </div>
        );
    }

}

export default App;
