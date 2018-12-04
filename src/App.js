import React, { Component } from 'react';
import { Chart } from "react-google-charts";
import logo from './logo.svg';
import './App.css';

const data = require ("./JsonDump.json")

const clientdata = require ("./anotherDump.json")

function returnUsers() {
  //  console.log(clientdata["user"]);
  //   var males = 0;
  //   var females = 0;
  //   var others = 0;
  //   for (var i = 1, l = clientdata["user"].length; i <= l; i++) {
  //     if (clientdata["user"][i].gender === "m") {
  //       males++;
  //     } else if (clientdata["user"][i].gender === "f") {
  //       females++;
  //     } else {
  //       others++;
  //     }
  //   }
  //   console.log(males);
  //   console.log(females);
  //   console.log(others);
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

const linechartdata = [
  ["Sessions", "All", "New", "Follow Up"],
  ["Week 1", 1000, 200, 800],
  ["Week 2", 1200, 400, 800],
  ["Week 3", 1400, 200, 1200],
  ["Week 4", 1600, 300, 1300]
];
const linechartoptions = {
  curveType: "function",
  legend: { position: "bottom" }
};

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
    console.log(returnUsers());

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
                        chartType="LineChart"
                        width="100%"
                        height="400px"
                        data={linechartdata}
                        options={linechartoptions}
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
                      <i class="material-icons">chat_bubble_outline</i><span>&nbsp;45</span>
                      <h4>All sessions</h4>
                      <i class="material-icons">autorenew</i>
                      <h4>New sessions</h4>
                      <i class="material-icons">
                      autorenew
                      </i>
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
                        data={geodata}
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
