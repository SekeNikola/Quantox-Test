import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [data, setData] = useState("");
  const [coinValue, setCoinValue] = useState("")
  let [value, setValue] = useState("")

  useEffect(() => {
  let url = "https://cors-anywhere.herokuapp.com/https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"

    axios
      .get(url,{
        headers: {
          'X-CMC_PRO_API_KEY': 'c8643baa-31bf-4d31-8868-af73ce84766b'
        },
      })
      .then(result => setData(result.data.data));
  }, []);




  return (
    <div id="potd" className="container text-center mb-5 mt-5">
      <table className="table ">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Short Name</th>
            <th scope="col">$ Value</th>
            <th scope="col">Last 24h</th>
            <th scope="col">Amount you own</th>
            <th scope="col">$ value of your coins</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) &&
            data.map(objects => {
              let test = objects.quote.USD.price.toFixed(2)
              let Foo = (function() {
                return test * coinValue
            });
              return (
                <tr key={objects.name}>
                  <td>{objects.name}</td>
                  <td>
                    {objects.symbol}
                  </td>
                  <td onLoad={()=>setValue(this.test)}>
                    {test}
                  </td>
                  <td style={{color: objects.quote.USD.percent_change_24h > 0 ? "green" : "red"}}>{objects.quote.USD.percent_change_24h.toFixed(2)}</td>
                  <td>
                    <input id="input" required type="number" onChange={e => setCoinValue(e.target.value)} /> <br/>
                    <button className="btn" disabled={!coinValue} type="submit" onClick={Foo}>Submit</button>
                  </td>
                  <td>
                    <Foo></Foo>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      </div>
  );
}

export default App;
