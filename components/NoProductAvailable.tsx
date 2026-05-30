"use client";

interface Props {
  selectedTab: string;
}

const NoProductAvailable = ({ selectedTab }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 min-h-100 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
      <h2 className="text-2xl font-bold text-green-800">
        No Product Available
      </h2>

      <p className="text-gray-600">
        We’re sorry, but there are no products matching on{" "}
        <span className="text-base font-semibold text-darkColor">
          {selectedTab}
        </span>{" "}
        criteria at the moment.
      </p>

      <p className="text-sm text-gray-500">
        Please check back later or explore our other product categories.
      </p>
    </div>
  );
};

export default NoProductAvailable;