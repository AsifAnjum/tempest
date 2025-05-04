import { useAppDispatch } from "../hooks/useRedux";
import { useToast } from "../hooks/useToast";
import { useLazyFetchWeatherQuery } from "../features/weather/weatherApi";

import { addSearchedCity } from "../features/weather/weatherSlice";
import useTheme from "../hooks/useTheme";
import { cva } from "class-variance-authority";

import { Header } from "../components/Home/Header";
import { Search } from "../components/Home/Search";
import { Weather } from "../components/Home/weather";
import { Toast } from "../components/toast";
import { NotFound } from "../components/ui/NotFound";
import { Error } from "../components/ui/Error";
import { RecentSearched } from "../components/Home/RecentSearched";
import { Skeleton } from "../components/ui/Skeleton";

export const Home = () => {
  const dispatch = useAppDispatch();

  const { toast, showToast, closeToast } = useToast();
  const [trigger, { data, isLoading, isError, isSuccess, error }] =
    useLazyFetchWeatherQuery();

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    trigger(query.trim().toLowerCase(), true)
      .unwrap()
      .then((data) => {
        showToast("Data fetched successfully", "success");
        dispatch(addSearchedCity({ id: data.id, city: data.name }));
      })
      .catch(() => {
        showToast("Something Went Wrong", "error");
      });
  };

  let content;
  if (isLoading || isSuccess) {
    content = (
      <div className="">
        <div className="flex justify-center mb-4">
          <Skeleton className="w-64 h-56" />
        </div>
        <div className="flex w-full flex-col">
          <Skeleton className="h-56 w-full" />
          <Skeleton className="w-full h-44" />
        </div>
      </div>
    );
  }

  if (isError) {
    if (error && "status" in error) {
      if (error.status === 404) {
        content = <NotFound />;
      } else {
        content = <Error />;
      }
    }
  }

  if (!isLoading && isSuccess) {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 5000);
    });
    content = <Weather data={data} />;
  }

  const { theme } = useTheme();

  const mainClass = cva("min-h-screen p-4 md:p-8 bg-gradient-to-t", {
    variants: {
      theme: {
        light: " from-slate-200 via-slate-100 to-blue-100",
        dark: "from-slate-900 to-slate-800",
      },
    },
  });

  return (
    <main className={mainClass({ theme })}>
      <div className={`container mx-auto `}>
        <Header />

        <Search isLoading={isLoading} onSearch={handleSearch} />

        <div className="grid grid-cols-1 2xl:grid-cols-4 gap-12">
          <div className="order-2 2xl:order-1">
            <RecentSearched onSearch={handleSearch} />
          </div>
          <div className="2xl:col-span-3 order-1 2xl:order-2">{content}</div>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message!}
          variant={toast.variant!}
          onClose={closeToast}
        />
      )}
    </main>
  );
};
