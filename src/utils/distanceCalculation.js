export default function distanceCalculation(
  { latitude_location: latitudeA, longitude_location: longitudeA },
  { latitude_location: latitudeB, longitude_location: longitudeB },
) {
  const p1 = Math.cos((90 - latitudeA) * (Math.PI / 180));
  const p2 = Math.cos((90 - latitudeB) * (Math.PI / 180));
  const p3 = Math.sin((90 - latitudeA) * (Math.PI / 180));
  const p4 = Math.sin((90 - latitudeB) * (Math.PI / 180));
  const p5 = Math.cos((longitudeA - longitudeB) * (Math.PI / 180));

  const KM = ((Math.acos((p1 * p2) + (p3 * p4 * p5)) * 6371) * 1.15);
  return KM;
}
