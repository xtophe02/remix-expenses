import { json } from "@remix-run/node";
import { destroyUserFromSession } from "../data/auth.server";

export function action({ request }) {
  if (request.method !== "POST") {
    throw json({ message: "Invalid request method" }, { status: 400 });
  }
  return destroyUserFromSession(request);
}
