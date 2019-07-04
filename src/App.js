import React, { useState, useEffect } from "react";
import axios from "axios";
import { Preloader, Placeholder } from "react-preloading-screen";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import CryptoDetails from "./CryptoDetails";
import "./App.css";

const App = () => {
  const [data, setData] = useState("");
  const [coinValue, setCoinValue] = useState("");
  useEffect(() => {
    let url =
      "https://cors-anywhere.herokuapp.com/https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
    axios
      .get(url, {
        headers: {
          "X-CMC_PRO_API_KEY": "c8643baa-31bf-4d31-8868-af73ce84766b"
        }
      })
      .then(result => setData(result.data.data));
  }, []);

  return (
    <>
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={() => {
              return (
                <Preloader>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Short Name</th>
                        <th>$ Value</th>
                        <th>Last 24h</th>
                        <th>Amount you own</th>
                        <th>$ value of your coins</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(data) &&
                        data.map(objects => {
                          const price = objects.quote.USD.price.toFixed(2);
                          const result = () => {
                            console.log(price * coinValue);
                            return (<p>{(price * coinValue).toFixed(2)}</p>);
                          };

                          return (
                            <tr key={objects.id}>
                              <td>
                                <Link
                                  target="_blank"
                                  to={`/details/${objects.symbol}`}
                                >
                                  {objects.name}
                                </Link>
                              </td>

                              <td>{objects.symbol}</td>
                              <td>{price}</td>
                              <td
                                style={{
                                  color:objects.quote.USD.percent_change_24h > 0? "green": "red"}}>
                                {objects.quote.USD.percent_change_24h.toFixed(2)}
                              </td>
                              <td>
                                <input
                                  required
                                  type="number"
                                  pattern="^-?[0-9]\d*\.?\d*$"
                                  onChange={e => {
                                    setCoinValue(e.target.value);
                                  }}
                                />
                                <br />
                                <button
                                  className="btn"
                                  disabled={!coinValue}
                                  type="submit"
                                  onClick={result}
                                >
                                  Submit
                                </button>
                              </td>
                              <td>{result()}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  <Placeholder>
                    <span>Loading...</span>
                  </Placeholder>
                </Preloader>
              );
            }}
          />

          <Route exact={true} path="/details/:name" component={CryptoDetails} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
