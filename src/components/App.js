import React from "react";
import axios from "axios";
import Flight from "./Flight";
import { DateTime } from "luxon";
import Gif from "../img/spinner.gif";

import { Menu, Dropdown, Icon } from "antd";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: [],
      isLoading: true,
      destinations: {
        Valencia: "VLC",
        Barcelona: "BCN",
        Milano: "MXP",
        Madrid: "MAD",
        Athens: "ATH"
      },
      origins: {
        Prague: "PRG",
        Berlin: "SXF",
        Warsaw: "WMI",
        Pardubice: "PED"
      }
    };
  }

  fetchFlights = async () => {
    try {
      let response = await axios.get("https://api.skypicker.com/flights", {
        params: {
          fly_from: "PRG",
          fly_to: "VLC",
          date_from: "06/07/2019",
          date_to: "13/07/2019",
          limit: 15
        }
      });
      let { data } = response.data;
      await this.setState({ flights: data });
      this.setState({ isLoading: false });
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    this.fetchFlights();
  }

  render() {
    const flightComponents = this.state.flights.map((flight, index) => {
      const depTime = DateTime.fromMillis(flight.dTime * 1000).toFormat(
        "hh:mm"
      );
      const arrTime = DateTime.fromMillis(flight.aTime * 1000).toFormat(
        "hh:mm"
      );
      return (
        <Flight
          key={`flight-${index}`}
          cityFrom={flight.cityFrom}
          cityTo={flight.cityTo}
          flyFrom={flight.flyFrom}
          flyTo={flight.flyTo}
          price={flight.price}
          dTime={depTime}
          aTime={arrTime}
        />
      );
    });

    const destinationCityArray = Object.keys(this.state.destinations);
    const destinationCodeArray = Object.values(this.state.destinations);

    const originsCityArray = Object.keys(this.state.origins);
    console.log(originsCityArray);
    const originsCodeArray = Object.values(this.state.origins);


      const menu1 = (
        <Menu>
        {destinationCityArray.map((city, index) => 
          <Menu.Item key={`${city}-${index}`}>
            <a target="_blank" rel="noopener noreferrer" href="#">
              {city}
            </a>
          </Menu.Item>
        )
        }</Menu>
      );

      const menu2 = (
        <Menu>
        {originsCityArray.map((city, index) => 
          <Menu.Item key={`${city}-${index}`}>
            <a target="_blank" rel="noopener noreferrer" href="#">
              {city}
            </a>
          </Menu.Item>
        )
        }</Menu>
      );

    return (
      <div className="App">
        <div className="app-wrapper">
          <div>
            <h1>Kiwi Flights</h1>
            {this.state.isLoading && <img src={Gif} alt="spinner" />}
          </div>
        <div className="dropdown-wrapper">
          <Dropdown overlay={menu1} trigger={['click']}>
            <a className="ant-dropdown-link" href="#">
              Destinations <Icon type="down" />
            </a>
          </Dropdown>
          <Dropdown overlay={menu2} trigger={['click']}>
            <a className="ant-dropdown-link" href="#">
              Origin <Icon type="down" />
            </a>
          </Dropdown>
          </div>
          <div style={{
              marginTop: `200px`
          }}>{flightComponents}</div>
        </div>
      </div>
    );
  }
}

export default App;
