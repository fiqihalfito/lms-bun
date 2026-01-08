import { useState } from "react";

export function useCurrentJawaban() {
    const [currentJawaban, setCurrentJawaban] = useState<string | null>(null)

    return [currentJawaban, setCurrentJawaban] as const
}