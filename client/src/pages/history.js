import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

export default function History(props) {
  const [history, setHistory] = useState([]);

  const smsHistory = () => {
    axios.get("/api/history/").then(res => {
      console.log("history", res.data);
      setHistory(res.data);
    });
    // var myarr = [
    //   {
    //     message: "Hi%20Samrat,%20Thanks%20order%20ID:%201104",
    //     store: "Liam Fashions",
    //     number: "1234567900"
    //   },
    //   {
    //     message: "Customer%20name:%20Sa%20order%20ID:%201104",
    //     store: "Liam Fashions",
    //     number: "9898989898"
    //   }
    // ];
    // setHistory(myarr); 
  };

  useEffect(() => {
    smsHistory();
  }, []);

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <p>Number</p>
            <ul class="list-group">
              {history.map(function(element, index) {
                return (
                  <li class="list-group-item" key={index}>
                    {element.number}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col-md-10">
            <p>Message</p>

            <ul class="list-group">
              {history.map(function(element, index) {
                return (
                  <li class="list-group-item" key={index}>
                    {element.message.replace(/%20/g, " ")}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
