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
    PENDING: 'gray',
    RECEIVED: '#fb5607',
    driverArrived: '#fb5607',
    driverPickedUp: '#ff006e',
    GOING: '#8338ec',
    DONE: '#06d6a0',
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
    case 'GOING':
      return color.GOING || color.defaultColor;
    case 'DONE':
      return color.DONE || color.defaultColor;
    case 'driver declined to pick':
      return color.driverDeclinedToPick || color.defaultColor;
    case 'PENDING':
      return color.PENDING || color.defaultColor;
    case 'RECEIVED':
      return color.RECEIVED || color.defaultColor;
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

export function generateMongoDBId(byteArray) {
  // Create a Uint8Array from the provided byteArray
  const binaryData = Uint8Array.from(byteArray);

  // Convert the binary data into a hexadecimal string
  const objectId = binaryData.reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '');

  return objectId;
}