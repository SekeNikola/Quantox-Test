import React, { useState, useEffect } from "react";
import axios from "axios";
const CryptoDetails = props => {
  // STYLES
  const container ={
    height: '100vh',
    width: '70%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: '0 auto'
  }

  const info = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    fontSize: '2em'
  }
  const [data, setData] = useState("");
  const { name } = props.match.params;

  useEffect(() => {
    let url =
      "https://cors-anywhere.herokuapp.com/https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
    axios
      .get(url, {
        headers: {
          "X-CMC_PRO_API_KEY": "c8643baa-31bf-4d31-8868-af73ce84766b"
        }
      })
      .then(result => {
        setData(result.data.data);
        console.log(result);
      });
  }, []);

  return (
    <>
      {Array.isArray(data) &&
        data.map(objects => {
          if (objects.symbol === name) {
            const fixCommas = (info)=>{
              if(info === objects.quote.USD.market_cap || info === objects.quote.USD.volume_24h ){
                const parts = info.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              return parts.join(".");
              }
            }
            return (

              <div style={container} key={objects.id}>
                <div style={info}>
                <h1>{objects.name}</h1>
                <span>({objects.symbol})</span>
                </div>
                <div style={info}>
                  <p>${objects.quote.USD.price.toFixed(2)}</p><span style={{color:objects.quote.USD.percent_change_24h > 0 ? "green" : "red", marginLeft: '10px'}}>({objects.quote.USD.percent_change_24h.toFixed(2)})</span>
                </div>
                  Ranked: {objects.cmc_rank}
                  <table>
                  <thead>
                      <tr>
                        <th>Market Cap</th>
                        <th>Volume 24h</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                      <td>$ {fixCommas(objects.quote.USD.market_cap)}</td>
                      <td>$ {fixCommas(objects.quote.USD.volume_24h)}</td>
                      </tr>
                    </tbody>
                    <thead/>
                  </table>

              </div>

            );
          }
        })}
    </>
  );
};
export default CryptoDetails;
