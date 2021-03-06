import React from 'react';
import axios from 'axios';
import Flight from './Flight';
import { DateTime } from 'luxon';
import Gif from '../img/spinner.gif';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flights: [],
            isLoading: true,
            isDirect: false,
            destinations: {
                Valencia: 'VLC',
                Barcelona: 'BCN',
                Milano: 'MXP',
                Madrid: 'MAD',
                Athens: 'ATH'
            },
            origins: {
                Prague: 'PRG',
                Berlin: 'SXF',
                Warsaw: 'WMI',
                Pardubice: 'PED'
            },
            flyFrom: '',
            flyTo: ''
        };
    }
    handleInputChange = event => {
        const target = event.target;

        const name = target.name;

        this.setState({
            [name]: target.checked
        });
    };

    fetchFlights = async () => {
        const { flyFrom, flyTo, isDirect } = this.state;
        this.setState({ isLoading: true });
        try {
            let response = await axios.get(
                'https://api.skypicker.com/flights',
                {
                    params: {
                        fly_from: flyFrom,
                        fly_to: flyTo,
                        date_from: '06/07/2019',
                        date_to: '13/07/2019',
                        limit: 20,
                        direct_flights: isDirect
                    }
                }
            );
            console.log(response.data);
            this.setState({ flights: response.data.data, isLoading: false });
        } catch (error) {
            console.error(error);
        }
    };

    componentDidMount() {
        this.fetchFlights();
    }

    handleOriginSelect = e => {
        this.setState({ flyFrom: e.target.value });
    };

    handleDestSelect = e => {
        this.setState({ flyTo: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.fetchFlights();
    };

    render() {
        const flightComponents = this.state.flights.map((flight, index) => {
            const depTime = DateTime.fromMillis(flight.dTime * 1000).toFormat(
                'hh:mm'
            );
            const arrTime = DateTime.fromMillis(flight.aTime * 1000).toFormat(
                'hh:mm'
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
                    transfers={flight.transfers}
                />
            );
        });

        const destinationCityArray = Object.keys(this.state.destinations);
        const originsCityArray = Object.keys(this.state.origins);

        const destArray = destinationCityArray.map((city, index) => (
            <option
                value={this.state.destinations[city]}
                key={`${city}-${index}`}
            >
                {city}
            </option>
        ));

        const originArray = originsCityArray.map((city, index) => (
            <option value={this.state.origins[city]} key={`${city}-${index}`}>
                {city}
            </option>
        ));

        return (
            <div className="App">
                <div className="app-wrapper">
                    <div>
                        <h1>Search for flights</h1>
                        {this.state.isLoading && (
                            <img src={Gif} alt="spinner" />
                        )}
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="origin">From</label>
                        <select id="origin" onChange={this.handleOriginSelect}>
                            {originArray}
                        </select>{' '}
                       
                        <label htmlFor="destination">To</label>
                        <select
                            id="destination"
                            onChange={this.handleDestSelect}
                        >
                            {destArray}
                        </select>{' '}
                        <br />
                        <button onClick={this.fetchFlights}>Search</button>{' '}
                        <br />
                        <label>
                            Direct only
                            <input
                                name="isDirect"
                                type="checkbox"
                                checked={this.state.isDirect}
                                onChange={this.handleInputChange}
                            />
                        </label>
                    </form>
                    <div
                        style={{
                            marginTop: `100px`
                        }}
                    >
                        {flightComponents}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
