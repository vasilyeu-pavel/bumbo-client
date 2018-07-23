export function getVisibleMarkers(markers, bounds) {
  const sw = bounds.get('sw');
  const ne = bounds.get('ne');
  const newBounds = {};

  if (!sw && !ne) {
    newBounds.sw = { lat: bounds.get('se').lat, lng: bounds.get('nw').lng };
    newBounds.ne = { lat: bounds.get('nw').lat, lng: bounds.get('se').lng };
  }

  const googleBounds = new google.maps.LatLngBounds(newBounds.sw, newBounds.ne);

  return markers.filter(marker =>
    googleBounds.contains(new google.maps.LatLng(marker.position)));
}
