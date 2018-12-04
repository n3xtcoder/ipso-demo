import React, { Component } from 'react';
import { Chart } from "react-google-charts";
import logo from './logo.svg';
import './App.css';
import fetch from "unfetch";

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
const returnTeams = (data = {}) => {
  return data["team"]
}

const genders = returnUsers(clientdata)

class App extends Component {
  constructor() {
    super();
    this.state = {
      teams: returnTeams(clientdata),
      genders: returnUsers(clientdata),
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
        ["Week 1", 10, 5, 5],
        ["Week 2", 15, 5, 10],
        ["Week 3", 20, 15, 5],
        ["Week 4", 10, 2, 8]
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
            color: "#DAF48A"
          },
          {
            color: "#946DB7"
          },
          {
            color: "#d9dee3"
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
      },
      piechartdata:  [
        ["Age", "Weight"],
        ["Male", genders.males],
        ["Female", genders.females],
        ["Undisclosed/other", genders.others]
      ]
    }
  }

  componentDidMount() {
    // const endpoint =
    // "./anotherDump.json";
    // fetch(endpoint)
    // .then(response => response.json())
    // .then(data => {
    //   console.log(data);
      this.setState({
        genders: returnUsers(clientdata),
      })
    // })
    // .then(data => {
      this.setState({
        piechartdata:  [
          ["Age", "Weight"],
          ["Male", this.state.genders.males],
          ["Female", this.state.genders.females],
          ["Undisclosed/other", this.state.genders.others]
        ]
      })
    // })
    // .catch(console.error);
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
                          width="100.1%"
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
                          data={this.state.piechartdata}
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
                        <h2 className="mdl-card__title-text">Teams List</h2>
                      </div>
                      <table className="mdl-data-table mdl-js-data-table fullwidth">
                        <thead>
                          <tr>
                            <th className="mdl-data-table__cell--non-numeric">Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="mdl-data-table__cell--non-numeric">{this.state.teams[0].name}</td>
                          </tr>
                          <tr>
                            <td className="mdl-data-table__cell--non-numeric">{this.state.teams[1].name}</td>
                          </tr>
                          <tr>
                            <td className="mdl-data-table__cell--non-numeric">{this.state.teams[2].name}</td>
                          </tr>
                          <tr>
                            <td className="mdl-data-table__cell--non-numeric">{this.state.teams[3].name}</td>
                          </tr>
                          <tr>
                            <td className="mdl-data-table__cell--non-numeric">{this.state.teams[4].name}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
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
                                console.log("Selected : " + region);
                              }
                            }
                          ]}
                          chartType="GeoChart"
                          width="100.1%"
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
                          width="100.1%"
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
                </div>
              </div>
            </main>
          </header>
        </div>
      );
    }
  }

  export default App;
