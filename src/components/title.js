import React from 'react';
import github from './logo/github.png'

class Title extends React.Component {

    render() {

        return (
            <div>
                <nav className="navbar fixed-top navbar-light bg-light">
                    <a href="/"><h2 className="navbar-brand">Covid-19 Stats</h2></a>
                    <h3 style={{margin: 'auto'}} className=" center  ">Stay Home, Stay Safe</h3>
                    
                    <a href="https://github.com/iamsahil1910/covid19stats" rel="noopener noreferrer"  target="_blank"><h4 className="mr-sm-2"> &nbsp;
                    <img src={github} height="40px" alt="GitHub" />
                    </h4></a>
                </nav>
                
            </div>
        );
    }

}

export default Title;
