import axios from 'axios'

// const totalCases = () => {

//     axios.get("https://api.covid19india.org/data.json")
//   .then(response => {
//     console.log(response.data);
//     let data = response.data;
//         return data;
//   });
// }

export default axios.create({
    baseURL: "https://api.thevirustracker.com/free-api?global=stats" 
});

// class TotalCases extends React.Component {

//     state = {
//         total: 0,
//         death: 0,
//         recovered: 0
//     };

//     componentDidMount() {

//         axios.get(`https://jsonplaceholder.typicode.com/users`)
//         .then(res => {
//         const persons = res.data;
//         this.setState({ persons });
//       })
//     }

// }

// export default TotalCases; 
