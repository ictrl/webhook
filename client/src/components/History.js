import React, { useEffect, useState } from "react";
import { DescriptionList, Layout, Card, Button } from "@shopify/polaris";
import axios from "axios";

export default function History() {
  const [history, setHistory] = useState([]);

  const smsHistory = () => {
    axios.get("/api/history").then(res => {
      setHistory(res.data);
    });
  };

  useEffect(() => {
    smsHistory();
    smsCount();
  }, []);
  const [smsLeft, setSmsLeft] = useState(0);
  const smsCount = () => {
    axios.get("/api/smsCount/").then(res => {
      setSmsLeft(res.data);
    });
  };

  const buySms = () => {
    alert("Please contact Us: +917827537259");
  };

  return (
    <Layout>
      <Layout.AnnotatedSection
        title="Total SMS Left"
        description="Admin will be notify on this no. by selecting Notify Admin."
      >
        <Card sectioned>
          <div className="row" style={{ padding: "2rem 3rem" }}>
            <div className="col-md-4 col-sm-4 center">
              <h4 style={{ marginTop: "7px" }}>Total SMS Left</h4>
            </div>
            <div
              className="col-md-4 col-sm-4 center"
              style={{ marginTop: "7px" }}
            >
              {smsLeft}
            </div>
            <div className="col-md-4 col-sm-4 center">
              <Button onClick={buySms} primary>
                Buy SMS
              </Button>
            </div>
          </div>
        </Card>
      </Layout.AnnotatedSection>
      <div className="mt-5" style={{ fontWeight: "600", fontSize: "18px" }}>
        SMS HISTORY
      </div>
      <DescriptionList items={history} />
    </Layout>
  );
}
