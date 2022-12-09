import { FaHandshake } from "react-icons/fa";
export default function PricingPage() {
  return (
    <section className="flex flex-col justify-center items-center max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-300 py-16">
        Great Product, Simple Pricing
      </h1>
      <div className="flex justify-around w-full space-x-8">
        <div className="h-96 w-1/2  hover:shadow-lg hover:shadow-purple-200">
          <div className="h-1/2 bg-purple-500 flex flex-col justify-center items-center rounded-t-md">
            <div className="border-2 border-white rounded-full p-4">
              <FaHandshake size={32} />
            </div>

            <p className="text-2xl py-2 font-semibold">Basic</p>
            <p className="text-sm">Free forever</p>
          </div>
          <div className="h-1/2 bg-purple-100 flex flex-col justify-between items-center text-purple-900 rounded-b-md p-6">
            <div className="flex flex-col justify-center items-center space-y-2">
              <p>1 User</p>
              <p>Up to 100 expenses/year</p>
              <p>Basic analytics</p>
            </div>

            <a className="py-1 px-3 bg-purple-500 rounded-md text-purple-100 cursor-pointer hover:bg-purple-900">
              Learn More
            </a>
          </div>
        </div>
        <div className="h-96 w-1/2 hover:shadow-lg hover:shadow-purple-200">
          <div className="h-1/2 bg-purple-900 flex flex-col justify-center items-center rounded-t-md">
            <div className="border-2 border-white rounded-full p-4">
              <FaHandshake size={32} />
            </div>

            <p className="text-2xl py-2 font-semibold">Pro</p>
            <p className="text-sm">9.99&euro; month</p>
          </div>
          <div className="h-1/2 bg-purple-100 flex flex-col justify-between items-center text-purple-900 rounded-b-md p-6">
            <div className="flex flex-col justify-center items-center space-y-2">
              <p>Unlimited Users</p>
              <p>Unlimited expenses/year</p>
              <p>Detailed analytics</p>
            </div>

            <a className="py-1 px-3 bg-purple-500 rounded-md text-purple-100 cursor-pointer hover:bg-purple-900">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function meta() {
  return {
    title: "Pricing",
    description: "See our pricing plans",
  };
}
export function headers({ actionHeaders, loaderHeaders, parentHeaders }) {
  return {
    "Cache-Control": parentHeaders.get("Cache-Control"),
  };
}

export const handle = { disableJS: true };
