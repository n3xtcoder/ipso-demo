import React, { Component } from 'react';
import { Chart } from "react-google-charts";
import logo from './logo.svg';
import './App.css';

const data = require ("./JsonDump.json")

const clientdata = require ("./anotherDump.json")
const returnUsers = (data = {}) => {
  // console.log(data["user"]);
  const ret = {
    males: 0,
    females: 0,
    others: 0
  }
  for (const user of data["user"]) {
    if (user.gender === 'm') 
      ret.males += 1
    else if (user.gender === 'f') 
      ret.females += 1
    else {
      ret.others += 1
    }
  }
  return ret
}

const geodata = [
  ["Country", "Clients"],
  ["Germany", 200],
  ["United States", 300],
  ["Brazil", 400],
  ["Canada", 500],
  ["France", 600],
  ["RU", 700]
];

const pieOptions = {
  title: "",
  pieHole: 0.6,
  slices: [
    {
      color: "blue"
    },
    {
      color: "red"
    },
    {
      color: "green"
    }
  ],
  legend: {
    position: "bottom",
    alignment: "center",
    textStyle: {
      color: "233238",
      fontSize: 14
    }
  },
  tooltip: {
    showColorCode: true
  },
  chartArea: {
    left: 0,
    top: 0,
    width: "100%",
    height: "80%"
  },
  fontName: "Roboto"
};

class App extends Component {
    render() {
    return (
      <div className="App">
        <header className="App-header">
          <main className="mdl-layout__content">
            <div className="page-content">
              <div className="mdl-grid">

                <div className="mdl-cell mdl-cell--5-col mdl-cell--1-offset">
                  <div className="demo-card-wide mdl-shadow--2dp">
                    <div className="mdl-card__title">
                      <h2 className="mdl-card__title-text">Home Countries</h2>
                    </div>
                    <div className="mdl-card__media">
                      <Chart
                        chartEvents={[
                          {
                            eventName: "select",
                            callback: ({ chartWrapper }) => {
                              const chart = chartWrapper.getChart();
                              const selection = chart.getSelection();
                              if (selection.length === 0) return;
                              const region = data[selection[0].row + 1];
                              console.log("Selected : " + region)
                            }
                          }
                        ]}
                        chartType="GeoChart"
                        width="100%"
                        height="400px"
                        data={geodata}
                      />
                    </div>
                    <div className="mdl-card__supporting-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Mauris sagittis pellentesque lacus eleifend lacinia...
                    </div>
                  </div>
                </div>
                <div className="mdl-cell mdl-cell--5-col">
                  <div className="demo-card-wide mdl-shadow--2dp">
                    <div className="mdl-card__title">
                      <h2 className="mdl-card__title-text">Resident Countries</h2>
                    </div>
                    <div className="mdl-card__media">
                      <Chart
                        chartEvents={[
                          {
                            eventName: "select",
                            callback: ({ chartWrapper }) => {
                              const chart = chartWrapper.getChart();
                              const selection = chart.getSelection();
                              if (selection.length === 0) return;
                              const region = data[selection[0].row + 1];
                              console.log("Selected : " + region);
                            }
                          }
                        ]}
                        chartType="GeoChart"
                        width="100%"
                        height="400px"
                        data={geodata}
                      />
                    </div>
                    <div className="mdl-card__supporting-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Mauris sagittis pellentesque lacus eleifend lacinia...
                    </div>
                  </div>
                </div>
                <div className="mdl-cell mdl-cell--5-col mdl-cell--1-offset">
                  <div className="demo-card-wide mdl-shadow--2dp">
                    <div className="mdl-card__title">
                      <h2 className="mdl-card__title-text">Counsellor Gender</h2>
                    </div>
                    <div className="mdl-card__media">
                      <Chart
                        chartType="PieChart"
                        data={[["Age", "Weight"], ["Male", 12], ["Female", 5.5], ["Undisclosed/other", 2.8]]}
                        options={pieOptions}
                        graph_id="PieChart"
                        width={"100%"}
                        height={"400px"}
                        legend_toggle
                      />
                    </div>
                    <div className="mdl-card__supporting-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Mauris sagittis pellentesque lacus eleifend lacinia...
                    </div>
                  </div>
                </div>
                <div className="mdl-cell mdl-cell--5-col">
                  <div className="demo-card-wide mdl-shadow--2dp">
                    <div className="mdl-card__title">
                      <h2 className="mdl-card__title-text">Clients Gender</h2>
                    </div>
                    <div className="mdl-card__media">
                      Soon to follow
                    </div>
                    <div className="mdl-card__supporting-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Mauris sagittis pellentesque lacus eleifend lacinia...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </header>
      </div>
    );
  }
}

export default App;
