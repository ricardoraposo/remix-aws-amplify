import type { MetaFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { incrementCounter, serverCounter } from "~/actions/count";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  return {
    count: serverCounter,
  };
};

export const action = () => {
  incrementCounter();

  return serverCounter;
};

export default function Index() {
  const { count } = useLoaderData<typeof loader>();
  const fetcher = useFetcher()

  const [clientSideCounter, setClientSideCounter] = useState(0);

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div>Welcome to the raposo website with PNPMMMMM</div>

      <div className="flex p-2 flex-col gap-1 border border-red-600 w-fit items-center">
        <p>Server Side Counter</p>
        <p>{count}</p>
        <fetcher.Form method="post">
          <button type="submit">Increment</button>
        </fetcher.Form>
      </div>

      <div className="flex p-2 flex-col gap-1 border border-red-600 w-fit items-center">
        <p>Client Side Counter</p>
        <p>{clientSideCounter}</p>
        <button
          onClick={() => setClientSideCounter((s) => s + 1)}
          type="button"
        >
          Increment
        </button>
      </div>
    </div>
  );
}
