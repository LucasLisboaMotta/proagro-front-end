import eventList from './eventList';

export const verifyName = (name) => name.length >= 10;

export const verifyEmail = (email) => /\S+@\S+\.\S+/.test(email);

export const verifyCPF = (CPF) => /(^\d{11}$)/g.test(CPF);

export const verifyDate = (date) => new Date(date) <= Date.now();

export const verifyLatitude = (latitude) => !Number.isNaN(latitude) && latitude !== 0;

export const verifyLongitude = (longitude) => !Number.isNaN(longitude) && longitude !== 0;

export const verifyEvent = (event) => eventList.includes(event);

export const verifyCrop = (crop) => crop.length >= 3;

export const verifyAll = ({
  name, email, cpf, date, latitude_location: latitude, longitude_location: longitude, event, crop,
}) => {
  const boolArrayVerify = [
    verifyName(name),
    verifyEmail(email),
    verifyCPF(cpf),
    verifyDate(date),
    verifyLatitude(latitude),
    verifyLongitude(longitude),
    verifyEvent(event),
    verifyCrop(crop),
  ];

  return boolArrayVerify.every((bool) => bool);
};
