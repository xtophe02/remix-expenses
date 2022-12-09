//splat route = $
import { redirect } from "@remix-run/node";

export function loader(data) {
  if (data.params["*"] === "exp") {
    return redirect("expenses");
  }
  throw new Response("Not found", { status: 404 });
}
