/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";

interface FetchOptions {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
}

interface UseFetchReturn {
  jsonFetch: <T = any>(
    endpoint: string,
    method: FetchOptions["method"],
    body?: any,
  ) => Promise<T | null>;
}

export const useFetch = (): UseFetchReturn => {
  const jsonFetch = async <T = any>(
    endpoint: string,
    method: FetchOptions["method"],
    body?: any,
  ): Promise<T | null> => {
    try {
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      };

      if (body && method !== "GET") {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(endpoint, options);

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        toast.error("Respuesta inválida del servidor");
        return null;
      }
      const data: {
        data: any;
        messages:
          | { type: "success" | "error" | "warning"; text: string }[]
          | [];
      } = await response.json();

      if (response.ok) {
        data.messages.map((msg) =>
          toast[msg.type || "success"](msg.text || "Operación exitosa"),
        );
        return { data: data.data } as T;
      } else {
        data.messages.map((msg) =>
          toast[msg.type || "error"](msg.text || "Operación fallida"),
        );
        return null;
      }
    } catch (error) {
      toast.error("Error de conexión. Intenta nuevamente.");
      console.error("Fetch error:", error);
      return null;
    }
  };

  return { jsonFetch };
};
