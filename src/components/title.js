import React from 'react';

class Title extends React.Component {

    render() {

        return (
            <div className="ui one center aligned fixed menu">
                    <a href="/"><h2 className="ui center aligned item">Covid-19 Stats</h2></a>
                    <h3 style={{margin: 'auto'}} className="ui center  ">Stay Home, Stay Safe</h3>
                
            </div>
        );
    }

}

export default Title;
