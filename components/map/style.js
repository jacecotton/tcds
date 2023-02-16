const pin = "data:image/png;base64,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";

const pinSelected = "data:image/png;base64,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";

const mapStyles = [
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      { visibility: "off" },
    ],
  },
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [
      { color: "#555555" },
    ],
  },
  {
    featureType: "administrative",
    elementType: "labels.text.stroke",
    stylers: [
      { visibility: "off" },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      { visibility: "off" },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "geometry.fill",
    stylers: [
      { visibility: "simplified" },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [
      { visibility: "off" },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    elementType: "geometry.fill",
    stylers: [
      { visibility: "simplified" },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    elementType: "labels.text",
    stylers: [
      { visibility: "on" },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [
      { color: "#f8f3f3" },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.fill",
    stylers: [
      { visibility: "simplified" },
    ],
  },
  {
    featureType: "landscape.natural.landcover",
    elementType: "geometry.fill",
    stylers: [
      { color: "#f8f3f3" },
    ],
  },
  {
    featureType: "poi",
    stylers: [
      { visibility: "off" },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry.fill",
    stylers: [
      { color: "#f2e6e6" },
      { visibility: "on" },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      { color: "#555555" },
      { visibility: "on" },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.stroke",
    stylers: [
      { color: "#ffffff" },
      { weight: 3.5 },
    ],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      { visibility: "off" },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      { visibility: "off" },
    ],
  },
  {
    featureType: "road.arterial",
    stylers: [
      { visibility: "off" },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [
      { color: "#ffffff" },
      { visibility: "on" },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      { color: "#f2e6e6" },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      { visibility: "off" },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels",
    stylers: [
      { visibility: "off" },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      { color: "#555555" },
      { visibility: "on" },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.stroke",
    stylers: [
      { color: "#ffffff" },
      { visibility: "on" },
    ],
  },
  {
    featureType: "road.local",
    stylers: [
      { visibility: "off" },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      { visibility: "off" },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      { color: "#dde7ef" },
      { lightness: -15 },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text",
    stylers: [
      { visibility: "off" },
    ],
  },
];

export { pin, pinSelected, mapStyles };
