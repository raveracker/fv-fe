import { Skeleton } from "~components/ui/skeleton";

export function Loading() {
  return (
    <div className="flex flex-col space-y-3 items-center justify-center">
      <h1 className="font-sans text-xl font-semibold text-center">
        Loading website details...
      </h1>
      <Skeleton className="h-[125px] w-[350px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[350px]" />
        <Skeleton className="h-4 w-[350px]" />
        <Skeleton className="h-4 w-[350px]" />
        <Skeleton className="h-4 w-[350px]" />
        <Skeleton className="h-4 w-[350px]" />
      </div>
      <div className="space-y-10 flex items-start justify-start">
        <Skeleton className="h-8 w-[350px]" />
      </div>
    </div>
  );
}
