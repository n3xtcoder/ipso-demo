import React, { Component } from 'react';
import { Chart } from "react-google-charts";
import logo from './logo.svg';
import './App.css';

const data = require ("./JsonDump.json")

const clientdata = require ("./anotherDump.json")

const returnUsers = (data = {}) => {
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

class App extends Component {
  constructor() {
    super();
    this.state = {
      geodata: [
        ["Country", "Clients"],
        ["Germany", 200],
        ["United States", 300],
        ["Brazil", 400],
        ["Canada", 500],
        ["France", 600],
        ["RU", 700]
      ],
      linechartdata: [
        ["Sessions", "All", "New", "Follow Up"],
        ["Week 1", 1000, 200, 800],
        ["Week 2", 1200, 400, 800],
        ["Week 3", 1400, 200, 1200],
        ["Week 4", 1600, 300, 1300]
      ],
        linechartoptions: {
        curveType: "function",
        legend: { position: "bottom" }
      },
      pieOptions: {
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
      }
    }
  }
    render() {
    return (
      <div className="App">
        <header className="App-header">
          <main className="mdl-layout__content">
            <div className="page-content">
              <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--10-col mdl-cell--1-offset">
                  <div className="demo-card-wide mdl-shadow--2dp">
                    <div className="mdl-card__title">
                      <h2 className="mdl-card__title-text">Sessions</h2>
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
                        chartType="LineChart"
                        width="100%"
                        height="400px"
                        data={this.state.linechartdata}
                        options={this.state.linechartoptions}
                      />
                    </div>
                    <div className="mdl-card__supporting-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Mauris sagittis pellentesque lacus eleifend lacinia...
                    </div>
                  </div>
                </div>
                <div className="mdl-cell mdl-cell--2-col mdl-cell--1-offset">
                  <div className="demo-card-wide mdl-shadow--2dp">
                    <div className="mdl-card__title">
                      <h2 className="mdl-card__title-text">Sessions per Month</h2>
                    </div>
                    <div className="mdl-card__supporting-text session-cell">
                      <i className="material-icons">chat_bubble_outline</i><span>&nbsp;45</span>
                      <h4>All sessions</h4>
                      <i className="material-icons">add_box</i><span>&nbsp;15</span>
                      <h4>New sessions</h4>
                      <i className="material-icons">autorenew</i><span>&nbsp;30</span>
                      <h4>Follow-Up</h4>
                    </div>
                  </div>
                </div>
                <div className="mdl-cell mdl-cell--4-col">
                  <div className="demo-card-wide mdl-shadow--2dp">
                    <div className="mdl-card__title">
                      <h2 className="mdl-card__title-text">Gender</h2>
                    </div>
                    <div className="mdl-card__media">
                      <Chart
                        chartType="PieChart"
                        data={[["Age", "Weight"], ["Male", {this.state.ret.males}], ["Female", {this.state.ret.females}], ["Undisclosed/other", {this.state.ret.others}]]}
                        options={this.state.pieOptions}
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
                <div className="mdl-cell mdl-cell--4-col">
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
                              console.log("Selected : " + region);
                            }
                          }
                        ]}
                        chartType="GeoChart"
                        width="100%"
                        height="400px"
                        data={this.state.geodata}
                      />
                    </div>
                    <div className="mdl-card__supporting-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Mauris sagittis pellentesque lacus eleifend lacinia...
                    </div>
                  </div>
                </div>
                <div className="mdl-cell mdl-cell--10-col mdl-cell--1-offset">
                  <div className="demo-card-wide mdl-shadow--2dp">
                    <div className="mdl-card__title">
                      <h2 className="mdl-card__title-text">Counsellors List</h2>
                    </div>
                    <table className="mdl-data-table mdl-js-data-table fullwidth">
                      <thead>
                        <tr>
                          <th className="mdl-data-table__cell--non-numeric">Name</th>
                          <th>Age</th>
                          <th>ID Number</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="mdl-data-table__cell--non-numeric">Don Aubrey</td>
                          <td>25</td>
                          <td>49021</td>
                        </tr>
                      </tbody>
                    </table>
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
