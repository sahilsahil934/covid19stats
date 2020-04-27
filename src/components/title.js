import React from 'react';
import github from './logo/github.png'

class Title extends React.Component {

    render() {

        return (
            <div className="ui one center aligned fixed menu">
                    <a href="/"><h2 className="ui center aligned item">Covid-19 Stats</h2></a>
                    <h3 style={{margin: 'auto'}} className="ui center  ">Stay Home, Stay Safe</h3>
                    
                    <a href="https://github.com/iamsahil1910/covid19stats" rel="noopener noreferrer" target="_blank"><h4 className="ui center aligned item">Fork Me &nbsp;
                    <img src={github} alt="GitHub" />
                    </h4></a>

                
            </div>
        );
    }

}

export default Title;
