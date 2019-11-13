import React, { Fragment, useContext } from "react";

import { TemplateContext } from "../App";
import axios from "axios";

export default function Templete(props) {
  const { temp, setTemp } = useContext(TemplateContext);

  const sendTemplate = tempObj => {
    if (tempObj.customer && tempObj.admin && tempObj.topic) {
      console.log(tempObj);
      axios
        .post("/api/template", tempObj)
        .then(res => console.log(res))
        .catch(err => console.error(err));
    } else {
      console.log(" couldn't know what happened");
    }
  };

  const variables = params => {
    switch (temp.topic) {
      case "default/topic":
        return (
          <Fragment>
            You
            <br />
            break
            <br />
            the
            <br />
            rules
            <br />
          </Fragment>
        );
      case "orders/create":
        return (
          <Fragment>
            name
            <br />
            vendor
            <br />
            price
            <br />
            order_id
            <br />
            title
          </Fragment>
        );
      case "orders/cancelled":
        return (
          <Fragment>
            name
            <br />
            vendor
            <br />
            price
            <br />
            order_id
            <br />
            title
            <br />
            cancel_reason
          </Fragment>
        );
      case "orders/fulfilled":
        return (
          <Fragment>
            name
            <br />
            vendor
            <br />
            price
            <br />
            order_id
            <br />
            title
            <br />
            fulfillment_status
            <br />
            order_status_url
          </Fragment>
        );
      case "orders/partially_fulfilled":
        return (
          <Fragment>
            name
            <br />
            vendor
            <br />
            price
            <br />
            order_id
            <br />
            title
            <br />
            fulfillment_status
            <br />
            order_status_url
          </Fragment>
        );
      case "customers/create":
        return (
          <Fragment>
            name
            <br />
            phone
            <br />
            email
          </Fragment>
        );
      case "refunds/create":
        return (
          <Fragment>
            price
            <br />
            order_id
            <br />
            title
          </Fragment>
        );
    }
  };

  let tempObj = {
    topic: temp.topic,
    customer: "",
    admin: ""
  };
  let finObj = {};
  // console.log('temp obj', tempObj);

  //make templete from input

  const saveTemplete = () => {
    convertData({
      textareaId: "inputTextArea-customer",
      audience: "customer"
    });
    convertData({
      textareaId: "inputTextArea-admin",
      audience: "admin"
    });
  };

  const convertData = param => {
    // console.log(param);
    // console.log(param.textareaId);
    let first = param.textareaId;
    // let second = document.getElementById('first');
    // console.log('first', first);
    // console.log('second', second);
    let inputTextArea = document.getElementById(first);
    // let btn = document.getElementById(param.btnId);
    let strLength = 0;
    let luna = document.getElementById(first).className;
    var inputData = document.getElementById(first).value;
    if (inputData != "" && inputData != null) {
      inputData = inputData.replace(/(^\s*)|(\s*$)/gi, "");
      inputData = inputData.replace(/[ ]{2,}/gi, " ");
      inputData = inputData.replace(/\n /, "\n");

      for (let i = 0; i < inputData.length; i++) {
        inputData = inputData.replace(" ", "%20");
        inputData = inputData.replace("(", "${");
        inputData = inputData.replace(")", "}");
        inputData = inputData.replace("\n", "%0A");
      }

      if (luna.indexOf("is-invalid") > -1) {
        strLength = luna.split(" ").length;
        for (let i = 0; i < strLength; i++) {
          luna = luna.replace("is-invalid", "");
        }

        inputTextArea.className = luna;
      }
    } else {
      luna = document.getElementById(first).className;
      luna = luna.concat(" ");
      luna = luna.concat("is-invalid");
      document.getElementById(first).className = luna;
    }
    showOutput(inputData, param.audience);
  };

  const showOutput = (parameter, audience) => {
    parameter = `\`${parameter}\``;
    // parameter = parameter;
    // console.log(audience, parameter);

    if (audience == "customer") {
      tempObj.customer = parameter;
    } else if (audience == "admin") {
      tempObj.admin = parameter;
    } else {
      console.log("something went wrong ");
    }
    // console.log(tempObj);
    sendTemplate(tempObj);
  };

  //show rule list

  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-6">
            <div className="card text-center mt-5 shadow">
              <div className="card-body">
                <h5>SMS Template Rules</h5>

                <div style={{ textAlign: "left", fontSize: "15px" }}>
                  All the variables enclosed in "( )" will be replaced by actual
                  values.
                  <br />
                  SMS length linit is 70 characters.
                  <br />
                  Enclose every variables with "( )"
                  <br />
                  <br />
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#444444"
                    }}
                  >
                    Available Variables for {temp.topic}
                  </p>
                  {variables()}
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6">
            <div className="card text-center mt-5 shadow">
              <div className="card-body">
                <h5 className="card-title">for customer</h5>

                <textarea
                  className="form-control"
                  id="inputTextArea-customer"
                  placeholder="Enter customer message here"
                  rows={5}
                  required
                  autoFocus
                  defaultValue={""}
                />
                {/* <div className="invalid-feedback">Please enter Data in the textarea.</div> */}
                {/* <button
									id="customer-btn"
									className="btn btn-primary my-3"
									onClick={convertData.bind(this, {
										audience: 'customer',
										textareaId: 'inputTextArea-customer',
										btnId: 'customer-btn'
									})}
								>
									done for customer
								</button> */}
                {/* <textarea className="form-control" id="outputTextArea" rows={5} defaultValue={''} /> */}
                <hr />
                <h5 className="card-title">for client</h5>

                <textarea
                  className="form-control"
                  id="inputTextArea-admin"
                  placeholder="Enter admin message here"
                  rows={5}
                  required
                  autoFocus
                  defaultValue={""}
                />
                <div className="invalid-feedback">
                  Please enter Data in the textarea.
                </div>

                <div style={{ textAlign: "center" }}>
                  <button
                    id="admin-btn"
                    className="btn btn-primary my-3"
                    onClick={saveTemplete}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </Fragment>
  );
}
