import { SadIcon } from "../icons/sadIcon";

interface NotFoundProps {
  message?: string;
}

export const NotFound = ({ message }: NotFoundProps) => {
  return (
    <div className="container flex flex-col justify-between min-h-screen mx-auto">
      <div className="flex-grow my-20">
        <div className="flex flex-col items-center justify-center mt-20 space-y-16">
          <SadIcon className="size-72 text-red-500 dark:text-red-400" />
          <p className="mt-4 text-xl font-semibold text-red-500 dark:text-red-400">
            {message ? message : "City Not Found!!"}
          </p>
        </div>
      </div>
    </div>
  );
};
