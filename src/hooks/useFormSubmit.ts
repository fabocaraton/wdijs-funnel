import { useState } from "react";
import { insertRow } from "@/lib/supabase";

export function useFormSubmit(tableName: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  async function submit(data: Record<string, unknown>) {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    const err = await insertRow(tableName, data);
    setIsLoading(false);

    if (err) {
      setError(err.message);
    } else {
      setIsSuccess(true);
    }
  }

  function reset() {
    setError(null);
    setIsSuccess(false);
    setIsLoading(false);
  }

  return { submit, isLoading, error, isSuccess, reset };
}
