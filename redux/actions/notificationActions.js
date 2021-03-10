import { NOTIFICATION } from "../types";

// NOT CURRENTLY IN APP BUT MAYBE A FUTURE RELEASE

export const pushNotification = (notification) => {
  let body = "",
    title = "";
  if (notification.request) {
    body = notification.request.content.body;
    title = notification.request.content.title;
  }
  return { type: NOTIFICATION, payload: { body, title } };
};
