import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';

const MapWithRoute = () => {
  useEffect(() => {
    const map = L.map('map');

    // Set the map center to Singapore
    map.setView([1.3521, 103.8198], 10);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Define points
    const points = [
      { name: "Singapore", coordinates: [1.3521, 103.8198], label: "Start" },
      { name: "Example", coordinates: [1.2806, 103.8501], label: "End" }
    ];

    // Add markers for points
    points.forEach(point => {
      const marker = L.marker(point.coordinates).addTo(map); // Add marker to the map
      marker.bindPopup("<b>" + point.name + "</b> - " + point.label).openPopup(); // Add popup with name and label
    });

    // Add map click event to log coordinates
    map.on('click', function(e) {
      console.log('Clicked coordinates: ' + e.latlng.lat + ', ' + e.latlng.lng);
    });

    // Add route between points
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(points[0].coordinates),  // Start coordinates
        L.latLng(points[1].coordinates)   // End coordinates
      ],
      routeWhileDragging: true
    }).addTo(map);

    return () => {
      // Clean up
      if (map !== null) {
        map.remove();
      }
      if (routingControl !== null) {
        routingControl.remove();
      }
    };
  }, []);

  return <div id="map" style={{ height: '600px', width: '100%' }} />;
};

export default MapWithRoute;
