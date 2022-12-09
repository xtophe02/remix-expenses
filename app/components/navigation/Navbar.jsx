import { Form, Link, NavLink, useLoaderData } from "@remix-run/react";

export default function NavBar() {
  const userId = useLoaderData();

  return (
    <nav className="flex justify-between pt-4">
      <Link to="/" className="text-lg font-bold">
        RemixExpenses
      </Link>
      <div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `mx-2 text-sm ${
              isActive ? "text-purple-100" : "text-purple-300"
            } hover:text-purple-900`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="pricing"
          className={({ isActive }) =>
            `mx-2 text-sm ${
              isActive ? "text-purple-100" : "text-purple-300"
            } hover:text-purple-900`
          }
        >
          Pricing
        </NavLink>
        {/* <NavLink
          to="/expenses/"
          className={({ isActive }) =>
            `mx-2 text-sm ${
              isActive ? "text-purple-100" : "text-purple-300"
            } hover:text-purple-900`
          }
        >
          Expenses
        </NavLink> */}
      </div>
      {/* <Link
        to="auth"
        className="bg-purple-800 py-1 px-6 rounded-full font-bold hover:bg-purple-300 hover:text-purple-800"
      >
        Login
      </Link> */}
      {!userId ? (
        <Link
          to="auth"
          className="bg-purple-800 py-1 px-6 rounded-full font-bold hover:bg-purple-300 hover:text-purple-800"
        >
          Login
        </Link>
      ) : (
        <Form method="post" action="/logout">
          <button>Logout</button>
        </Form>
      )}
    </nav>
  );
}
