import React from 'react';
import Title from './title'
import TotalStats from './totalStats'

class App extends React.Component {

    componentDidMount() {
        
    }

    render() {

        return (
            <div>
                <Title />
                <TotalStats />
            </div>
        );
    }

}

export default App;
