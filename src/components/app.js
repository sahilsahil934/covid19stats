import React from 'react';
import Title from './title'
import TotalStats from './totalStats'
import AllCountryData from './allCountryData'

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
