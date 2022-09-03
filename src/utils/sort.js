export const sortByName = ({ name: nameA }, { name: nameB }) => {
  if (nameA > nameB) return 1;
  if (nameA < nameB) return -1;
  return 0;
};

export const sortByCreate = ({ create_at: createA }, { create_at: createB }) => {
  if (new Date(createA) < new Date(createB)) return 1;
  if (new Date(createA) > new Date(createB)) return -1;
  return 0;
};

export const sortById = ({ id: idA }, { id: idB }) => {
  if (idA > idB) return 1;
  if (idA < idB) return -1;
  return 0;
};
