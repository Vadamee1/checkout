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
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Operación exitosa");
        return { data: data.data } as T;
      } else {
        toast.error(data.message || data.error || "Ocurrió un error");
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
