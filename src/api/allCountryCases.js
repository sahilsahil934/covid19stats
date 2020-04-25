import axios from 'axios'

export default axios.create({
    baseURL: "https://api.thevirustracker.com/free-api?countryTotals=ALL" 
});

