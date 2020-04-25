import React from 'react';

class TotalStats extends React.Component {

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
                        
                        <div class="ui statistic">
                            <div class="value">
                                5,550
                            </div>
                
                        </div>
                    </div>
                    <div class="item">
                        <div class="ui statistic">
                            <div class="value">
                                5,550
                            </div>
                            
                        </div>
                    </div>
                    <div class="item">
                        <div class="ui statistic">
                            <div class="value">
                                5,550
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default TotalStats;
