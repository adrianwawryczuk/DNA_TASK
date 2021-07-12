export const fetcher = async <T>(input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init);
  const data = await response.json();
  return {
    data: data as T,
    headers: response.headers,
  };
};
