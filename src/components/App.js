import React from 'react';
import axios from 'axios';
import Flight from './Flight';
import { DateTime } from 'luxon';
import Gif from '../img/spinner.gif';
import Dropmenu from './Dropdown';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flights: [],
            isLoading: true,
            destinations: [
                'Valencia',
                'Barcelona',
                'Milano',
                'Madrid',
                'Athens'
            ],
            origins: ['Prague', 'Berlin', 'Warsaw', 'Pardubice']
        };
    }

    fetchFlights = async () => {
        try {
            let response = await axios.get(
                'https://api.skypicker.com/flights',
                {
                    params: {
                        fly_from: 'PRG',
                        fly_to: 'VLC',
                        date_from: '06/07/2019',
                        date_to: '13/07/2019',
                        limit: 15
                    }
                }
            );
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
                />
            );
        });

        return (
            <div className="App">
                <div className="app-wrapper">
                    <div>
                        <h1>Kiwi Flights</h1>
                        <Dropmenu destination="Valencia" />
                        {this.state.isLoading && (
                            <img src={Gif} alt="spinner" />
                        )}
                    </div>
                    <div>{flightComponents}</div>
                </div>
            </div>
        );
    }
}

export default App;
