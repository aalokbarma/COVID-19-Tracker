import React from "react";
import "./Table.css";
import numeral from "numeral";

function Table({ countries }) {
  return (
    <div className="table">

      <tr>
        <th>Country</th>
        <th>Cases</th>
        <th>Recovered</th>
        <th>Deaths</th>
      </tr>
      {countries.map((country) => (
        
        <tr>
          <td>{country.country}</td>
          <td>
            <strong className= "cases">{numeral(country.cases).format("0,0")}</strong>
          </td>
          <td>
            <strong className= "recovered">{numeral(country.recovered).format("0,0")}</strong>
          </td>
          <td>
            <strong className= "deaths">{numeral(country.deaths).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;