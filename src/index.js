import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay'
import Spinner from './Spinner';

class App extends React.Component {

    state = {
        lat: null,
        errorMessage: ''
    }

    componentDidMount() {

        window.navigator.geolocation.getCurrentPosition(
            (GeolocationPosition) => this.setState({ lat: GeolocationPosition.coords.latitude }),
            (GeoloactionPositionError) => this.setState({ errorMessage: GeoloactionPositionError.message})
        );
    }

    renderContent() {
        if(this.state.errorMessage && !this.state.lat){
            return <div>Error: {this.state.errorMessage}</div>
        } 

        if(!this.state.errorMessage && this.state.lat){
            return <SeasonDisplay lat={this.state.lat} />
        }

        return <Spinner message='Please accept the location request'/>
    }

    render(){
        return <div className="border red">
            {this.renderContent()}
        </div>
    }
}

ReactDOM.render( <App />, document.querySelector('#root'))