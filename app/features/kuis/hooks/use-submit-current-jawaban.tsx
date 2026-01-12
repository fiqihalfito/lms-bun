import { useFetcher } from "react-router";


export function useSubmitCurrentJawaban() {
    const fetcher = useFetcher();

    // const submitCurrentJawaban = React.useCallback(
    //     (payload: {
    //         idKuisQuestion: string;
    //         jawaban: string | null;
    //         jumlahSoal: number;
    //     }) => {
    //         fetcher.submit(payload, {
    //             method: "post",
    //             action: "submit-current-jawaban",
    //         });
    //     },
    //     [fetcher]
    // );
    const submitCurrentJawaban = (payload: {
        idKuisQuestion: string;
        jawaban?: string | null;
        waktuPengerjaanDetik?: number;
        jumlahSoal: number;
    }) => {
        fetcher.submit(payload, {
            method: "post",
            action: "submit-current-jawaban",
            flushSync: true,
        });
    }

    return {
        submitCurrentJawaban,
        fetcher,
    };
}