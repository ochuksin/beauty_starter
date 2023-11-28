import { useState, useCallback } from "react";

type HTTPRequestMethods = "GET" | "POST" | "PATCH" | "DELETE"; //типы данных, которые могут использоваться в http запросе
export type loadingStatusOptions = "idle" | "loading" | "error"; //типы данных, которые могут использоваться в loadingStatus
//idle - праздный, бездействие
interface HTTPHeaders {
  [key: string]: string;
}
// возможен еще такой вариант записи:
// type HTTPHeaders = Record<string, string>;

interface RequestConfig {
  url: string;
  method?: HTTPRequestMethods;
  body?: string | null;
  headers?: HTTPHeaders;
}

export const useHttp = () => {
  const [loadingStatus, setLoadingStatus] =
    useState<loadingStatusOptions>("idle");
  // const [error, setError] = useState<string | null>(null);

  //   вариант
  //   const [error, setError] = useState<MyError>({} as MyError);

  const request = useCallback(
    async ({
      url,
      method = "GET",
      body = null,
      headers = { "Content-Type": "application/json" },
    }: RequestConfig) => {
      setLoadingStatus("loading");

      try {
        const response = await fetch(url, { method, body, headers });
        if (!response.ok) {
          throw new Error(`Could't fetch ${url}, status: ${response.status}`);
        }
        const data = await response.json();
        setLoadingStatus("idle");
        return data;
      } catch (e) {
        // if (e instanceof Error) {
        //   e.message;
        // } else if (typeof e === "string") {
        //   e;
        // }
        setLoadingStatus("error");
        throw e;
      }
    },
    []
  );

  return { loadingStatus, request };
  // сокращенная запись:
  // return { loadingStatus:loadingStatus, request:request };
  // return [loadingStatus, request] as const;
};
