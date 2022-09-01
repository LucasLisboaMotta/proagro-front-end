import eventList from './eventList';

export const verifyName = (name) => name.length >= 10;

export const verifyEmail = (email) => /\S+@\S+\.\S+/.test(email);

export const verifyCPF = (CPF) => /(^\d{11}$)/g.test(CPF);

export const verifyDate = (date) => new Date(date) <= Date.now;

export const verifyLatitude = (latitude) => typeof latitude === 'number';

export const verifyLongitude = (longitude) => typeof longitude === 'number';

export const verifyEvent = (event) => eventList.includes(event);

export const verifyAll = ({
  name, email, CPF, date, latitude, longitude, event,
}) => {
  const boolArrayVerify = [
    verifyName(name),
    verifyEmail(email),
    verifyCPF(CPF),
    verifyDate(date),
    verifyLatitude(latitude),
    verifyLongitude(longitude),
    verifyEvent(event),
  ];

  return boolArrayVerify.every((bool) => bool);
};
