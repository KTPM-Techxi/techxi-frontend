export function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function getTagColor(tag) {
  const color = {
    driverAssigned: '#ffbe0b',
    driverArrived: '#fb5607',
    driverPickedUp: '#ff006e',
    driverArrivedAtDestination: '#8338ec',
    driverCompleteTheDrive: '#06d6a0',
    driverDeclinedToPick: '#ef233c',
    userCancelBooking: '#d90429',
    defaultColor: 'black',
  };

  switch (tag) {
    case 'driver assigned':
      return color.driverAssigned || color.defaultColor;
    case 'driver arrived':
      return color.driverArrived || color.defaultColor;
    case 'driver picked up':
      return color.driverPickedUp || color.defaultColor;
    case 'arrived at destination':
      return color.driverArrivedAtDestination || color.defaultColor;
    case 'driver completed the drive':
      return color.driverCompleteTheDrive || color.defaultColor;
    case 'driver declined to pick':
      return color.driverDeclinedToPick || color.defaultColor;
    default:
      return color.defaultColor;
  }
}

export function calCulateFees(distance, duration, baseFare, ratePerKm, ratePerMin, isCar = false) {
  let fees = baseFare + distance * ratePerKm + duration * ratePerMin;
  if (isCar) {
    fees *= 1.125 + 100;
  }
  return fees;
}
