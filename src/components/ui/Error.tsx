import { SadIcon } from "../icons/sadIcon";

export const Error = () => {
  return (
    <div className="container flex flex-col justify-between min-h-screen mx-auto">
      <div className="flex-grow my-20">
        <div className="flex flex-col items-center justify-center mt-20 space-y-16">
          <SadIcon className="size-72" />
          <p className="mt-4 text-xl font-semibold text-gray-600">
            City Not Found!!
          </p>
        </div>
      </div>
    </div>
  );
};
