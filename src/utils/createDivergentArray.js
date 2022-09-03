import distanceCalculation from './distanceCalculation';
import { sortById } from './sort';

const filterCompare = (a, b) => (
  a.date === b.date
  && a.event !== b.event
  && distanceCalculation(a, b) < 10
);

const createDivergentMap = (a, b) => {
  const arrayOrderedById = [a, b].sort(sortById);
  return {
    id: arrayOrderedById[0].id + arrayOrderedById[1].id,
    firstElement: arrayOrderedById[0],
    secondElement: arrayOrderedById[1],
  };
};

export default function createDivergentArray(requestArray) {
  return requestArray.reduce((acc, reduceElement) => {
    const elementFilter = requestArray
      .filter((filterElement) => filterCompare(filterElement, reduceElement));

    const elementMap = elementFilter
      .map((mapElement) => createDivergentMap(mapElement, reduceElement));

    elementMap.forEach((forEachElement) => {
      if (!acc.find((findElement) => forEachElement.id === findElement.id)) {
        acc.push(forEachElement);
      }
    });

    return acc;
  }, []);
}
