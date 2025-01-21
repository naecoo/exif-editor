// @ts-ignore
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

export function MapView() {
  const defaultProps = {
    center: {
      lat: 39.916668,
      lng: 116.383331,
    },
    zoom: 11,
  };

  const onChildClick = (e: any) => {
    console.log(e);
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "50vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onChildClick={onChildClick}
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}
