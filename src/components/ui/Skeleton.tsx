interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={`animate-pulse bg-slate-300 dark:bg-slate-700 rounded-lg ${
        className ? className : ""
      }`}
    ></div>
  );
};
