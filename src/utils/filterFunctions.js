import { verifyLatitude, verifyLongitude } from './verifyInputs';
import distanceCalculation from './distanceCalculation';

export const defaultFilter = () => () => true;

export const searchFilter = (column, text) => () => (element) => element[column].toLowerCase()
  .includes(text.toLowerCase());

export const locationFilter = ({ latitude, longitude, radius }) => {
  const verifyLat = !verifyLatitude(Number(latitude));
  const verifyLong = !verifyLongitude(Number(longitude));
  const verifyRad = Number(radius) <= 0;

  if (verifyLat || verifyLong || verifyRad) return defaultFilter;

  return () => (element) => {
    const distance = distanceCalculation(
      element,
      { latitude_location: latitude, longitude_location: longitude },
    );

    return distance <= radius;
  };
};
