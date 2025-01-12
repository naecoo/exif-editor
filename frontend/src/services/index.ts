import { useState } from "react";
import { Greet } from "../../wailsjs/go/main/App";

const useRequest = <P = unknown, R = unknown>(
  service: (params: P) => Promise<R>
) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<R | null>(null);

  const run = async (params: P) => {
    setLoading(true);
    setData(null);
    try {
      const data = await service(params);
      setData(data);
    } finally {
      setLoading(false);
    }
  };

  return {
    run,
    data,
    loading,
  };
};

export const useGreet = () => {
  return useRequest(Greet);
};
