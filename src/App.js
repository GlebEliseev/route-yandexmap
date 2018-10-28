import React, { Component } from 'react';
import './App.css';
import { YMaps, Map, Placemark, Polyline} from 'react-yandex-maps';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placemarks: [[55.75, 37.57], [55.74, 37.57], [55.75, 37.56]]
    };
  }

  handleClick(index) {
    this.setState(prevState => ({ placemarks: prevState.placemarks.filter((_, i) => i !== index)}));
  }

  render() {
    return (
      <div className="container">
        <YMaps>
         <div className="App">
           <Map defaultState={{ center: [55.75, 37.57], zoom: 12 }} height={'100vh'} width={'50vw'} >
             {this.state.placemarks.map((mark, i, arr) =>
               <Placemark
                 modules={['geoObject.addon.balloon']}
                 geometry={mark}
               />
             )}
             <Polyline
               geometry={this.state.placemarks}
               options={{
                 balloonCloseButton: false,
                 strokeColor: '#000',
                 strokeWidth: 4,
                 strokeOpacity: 0.5,
               }}
                />
           </Map>
         </div>
       </YMaps>
       <div className="controls">
         <button
           onClick={() =>
             this.setState(prevState => ({
                placemarks: [...prevState.placemarks, [(Math.random() * (55.78 - 55.73) + 55.73).toFixed(2), (Math.random() * (37.59 - 37.55) + 37.55).toFixed(2)]]
              }))
            }
         >
           Create random point on map
         </button>
         <span>Current points: </span>
         <ul>
           {this.state.placemarks.map((mark, i, arr) =>
             <li onClick={this.handleClick.bind(this, i)}>{mark[0]}, {mark[1]}</li>
           )}
         </ul>
       </div>
      </div>
    );
  }
}

export default App;
