export const receiveTribe = (tribe) => ({
  type: "RECEIVE_TRIBE",
  tribe,
});

export const requestTribe = () => ({
  type: "REQUEST_TRIBE",
});

export const clearTribe = () => ({
  type: "CLEAR_TRIBE",
});
