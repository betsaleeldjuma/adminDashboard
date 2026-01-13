import { useMemo, useEffect } from "react"

export const useImagePreview = (
  file?: File | null,
  initialUrl?: string
) => {
  const preview = useMemo(() => {
    if (!file) return initialUrl ?? null
    return URL.createObjectURL(file)
  }, [file, initialUrl])

  useEffect(() => {
    return () => {
      if (file && preview) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [file, preview])

  return preview
}