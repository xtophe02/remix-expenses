import { Link } from "@remix-run/react";
import { FaEuroSign, FaArrowRight, FaChartBar } from "react-icons/fa";
export default function Index() {
  return (
    <section className=" max-w-4xl mx-auto flex flex-col max-h-screen space-y-10 mt-20">
      <div>
        <h1 className="text-4xl font-semibold text-purple-400 flex">
          <FaEuroSign />
          &emsp; Home
        </h1>
        <div className="flex justify-between py-8 ">
          <div className="h-96 w-96 rounded border-8 border-purple-400 origin-top-right -rotate-12 hover:rotate-0 transition-all duration-300">
            <img
              src="/images/books.jpg"
              alt="books"
              className="h-full w-full transition-opacity"
            />
          </div>

          <div className="flex flex-col items-start space-y-3">
            <h3 className="text-lg text-purple-200">
              Manage your expenses in one central place.
            </h3>
            <Link
              to="/expenses/"
              className="flex bg-purple-500 hover:bg-purple-700 rounded-full py-2 px-6 items-center"
            >
              Get Started <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-semibold text-purple-400 flex justify-end">
          <FaChartBar />
          &emsp; Detailed Analytics
        </h1>
        <div className="flex justify-between py-8">
          <h3 className="text-lg text-purple-200 w-80 ">
            Benefit from best-in-class analytics to understand your spending
            patterns.
          </h3>

          <div className="h-96 w-96 rounded border-8 border-purple-400 origin-top-left rotate-12 hover:rotate-0 transition-all duration-300">
            <img
              src="/images/statistics.jpg"
              alt="statistics"
              className="h-full w-full "
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function headers({ actionHeaders, loaderHeaders, parentHeaders }) {
  return {
    "Cache-Control": parentHeaders.get("Cache-Control"),
  };
}

export const handle = { disableJS: true };
