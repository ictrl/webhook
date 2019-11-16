import React, { Fragment, useEffect, useState } from "react";
import { Card, Layout, Heading, Button } from "@shopify/polaris";
import axios from "axios";

import Checkbox from "./Checkbox";

import DefaultTextField from "./DefaultTextField";
function myFunction() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 2000);
}

export default function Settings() {
  const [admin, setAdmin] = useState("");
  const [sender, setSender] = useState("");
  const [orderCreateCustomer, setOrderCreateCustomer] = useState("");
  const [orderCreateAdmin, setOrderCreateAdmin] = useState("");
  const [orderCancelledAdmin, setOrderCancelledAdmin] = useState("");
  const [orderCancelledCustomer, setOrderCancelledCustomer] = useState("");
  const [orderFulfilledledAdmin, setOrderFulfilledAdmin] = useState("");
  const [orderFulfilledCustomer, setorderFulfilledCustomer] = useState("");

  const getOption = () => {
    axios.get("/api/option/").then(res => {
      console.log("optn", res);
      setAdmin(res.data["admin no"]);
      setSender(res.data["sender id"]);
      setOrderCreateCustomer(res.data["orders/create customer"]);
      setOrderCreateAdmin(res.data["sender id"]);
      setOrderCancelledCustomer(res.data["sender id"]);
      setOrderCancelledAdmin(res.data["sender id"]);
      setOrderFulfilledAdmin(res.data["sender id"]);
      setorderFulfilledCustomer(res.data["sender id"]);
    });
  };

  useEffect(() => {
    getOption();
  }, []);
  return (
    <Fragment>
      <form
        action="https://immense-bastion-25565.herokuapp.com/myaction"
        // action="http://localhost:4000/myaction"
        method="post"
      >
        <div>
          <Layout>
            <Layout.AnnotatedSection
              title="Admin Phone No."
              description="Admin will be notify on this no. by selecting Notify Admin."
            >
              <Card sectioned>
                <div style={{ padding: "3rem" }}>
                  <DefaultTextField
                    name="admin no"
                    label="Admin Phone No."
                    type="text"
                    maxLength="10"
                    value={admin}
                  />
                </div>
              </Card>
            </Layout.AnnotatedSection>
            <Layout.AnnotatedSection
              title="Sender ID"
              description="Sender ID is the name or number which appears on the mobile phone as the sender of a SMS. Sender ID will be maximum of 6 Characters."
            >
              <Card sectioned>
                <div style={{ padding: "3rem" }}>
                  <DefaultTextField
                    name="sender id"
                    label="Sender ID"
                    type="text"
                    maxLength="6"
                    value={sender}
                  />
                </div>
              </Card>
            </Layout.AnnotatedSection>
            <Layout.AnnotatedSection
              title="Notification Prefrence"
              description="Admin and Customer will be notified according to by selecting Notify Admin."
            >
              <Card sectioned>
                <div style={{ padding: "2rem" }}>
                  <p style={{ fontSize: "17px" }}>Orders</p>
                  <hr />

                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: "1rem", width: "15rem" }}>
                      <Heading>Create </Heading>
                    </div>

                    <div style={{ width: "15rem" }}>
                      <Checkbox
                        name="orders/create customer"
                        label="Notify Customer"
                        hell="orders/create"
                        value={orderCreateCustomer}
                      />
                    </div>
                    <Checkbox
                      label="Notify Admin"
                      name="orders/create admin"
                      value={orderCreateAdmin}
                    />
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: "1rem", width: "15rem" }}>
                      <Heading>Cancelled </Heading>
                    </div>

                    <div style={{ width: "15rem" }}>
                      <Checkbox
                        label="Notify Customer"
                        name="orders/cancelled customer"
                        value={orderCancelledCustomer}
                      />
                    </div>
                    <Checkbox
                      label="Notify Admin"
                      name="orders/cancelled admin"
                      value={orderCancelledAdmin}
                    />
                  </div>
                  {/* <div style={{ display: 'flex' }}>
									<div style={{ marginRight: '1rem', width: '15rem' }}>
										<Heading>Fulfilled </Heading>
									</div>

									<div style={{ width: '15rem' }}>
										<Checkbox label="Notify Customer" />
									</div>
									<Checkbox label="Notify Admin" />
								</div> */}
                  {/* <div style={{ display: 'flex' }}>
									<div style={{ marginRight: '1rem', width: '15rem' }}>
										<Heading>Partially Fulfilled </Heading>
									</div>

									<div style={{ width: '15rem' }}>
										<Checkbox label="Notify Customer" />
									</div>
									<Checkbox label="Notify Admin" />
								</div> */}
                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: "1rem", width: "15rem" }}>
                      <Heading>Fullfilled </Heading>
                    </div>

                    <div style={{ width: "15rem" }}>
                      <Checkbox
                        label="Notify Customer"
                        name="orders/fulfilled customer"
                        value={orderFulfilledCustomer}
                      />
                    </div>
                    <Checkbox
                      label="Notify Admin"
                      name="orders/fulfilled admin"
                      value={orderFulfilledledAdmin}
                    />
                  </div>

                  {/* <br />
								<p style={{ fontSize: '17px' }}>Customers Account</p>
								<hr />

								<div style={{ display: 'flex' }}>
									<div style={{ marginRight: '1rem', width: '15rem' }}>
										<Heading>Create </Heading>
									</div>

									<div style={{ width: '15rem' }}>
										<Checkbox label="Notify Customer" />
									</div>
									<Checkbox label="Notify Admin" />
								</div>
								<br />
								<p style={{ fontSize: '17px' }}>Refund</p>
								<hr /> */}
                  {/* 
								<div style={{ display: 'flex' }}>
									<div style={{ marginRight: '1rem', width: '15rem' }}>
										<Heading>Create </Heading>
									</div>

									<div style={{ width: '15rem' }}>
										<Checkbox label="Notify Customer" />
									</div>
									<Checkbox label="Notify Admin" />
								</div> */}
                </div>
              </Card>
            </Layout.AnnotatedSection>
          </Layout>
        </div>
        <br />
        <div
          style={{ textAlign: "right" }}
          onClick={() => {
            myFunction();
          }}
        >
          <button className="button-shopify" type="submit">
            save
          </button>
        </div>
        <div id="snackbar">Settings Updated {} </div>;
      </form>
    </Fragment>
  );
}
