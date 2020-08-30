export const receiveEvents = (events) => ({
  type: "RECEIVE_EVENTS",
  events,
});

export const requestEvents = () => ({
  type: "REQUEST_EVENTS",
});

export const clearEvents = () => ({
  type: "CLEAR_EVENTS",
});
