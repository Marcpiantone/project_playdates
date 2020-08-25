export const receiveTribes = (tribes) => ({
  type: "RECEIVE_TRIBES",
  tribes,
});

export const requestTribes = () => ({
  type: "REQUEST_TRIBES",
});

export const clearTribes = () => ({
  type: "CLEAR_TRIBES",
});
