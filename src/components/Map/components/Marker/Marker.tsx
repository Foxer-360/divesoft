import * as React from 'react';

interface MarkerProps {
  lat: number;
  lng: number;
  onClick: any;
}

export default function Marker(props: MarkerProps) {
  console.log(props)
  return (
    <>
      <div 
        className={`marker`}
        onClick={() => props.onClick()}
      />
    </>
  );
}