// src/pages/user/components/Map.jsx
//import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
AnyReactComponent.propTypes = {
    text: PropTypes.string.isRequired, // text must be a required string
  };
const Map = () => {
  const defaultProps = {
    center:  { lat: 10.99835602, lng: 77.01502627 },
    zoom:  11
  };

  return (
    <div style={{ height: '60vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao" }} // Replace with your actual API key
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
};

// PropTypes validation

export default Map;
