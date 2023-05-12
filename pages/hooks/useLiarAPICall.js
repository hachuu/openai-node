export default function useLiarAPICall() {

    const findLiar = async ({messagesHistory}) => {
        let result;
        const response = await fetch("/api/liarQuestions/findLiar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({messagesHistory}),
        }).then(
            (response) => {
                result = response.json();
            }
        );
        return result;
    }

    return {
        findLiar
    }
}