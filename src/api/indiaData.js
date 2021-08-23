import axios from 'axios'

export default axios.create({
    baseURL: "https://data.covid19india.org/v4/min/data.min.json" 
});


