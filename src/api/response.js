export const toResult = async (response) => {
    const text = await response.text();

    let body = text;
    if (text) {
        try {
            body = JSON.parse(text);
        } catch {
            body = text;
        }
    } else {
        body = undefined;
    }

    return { status: response.status(), headers: response.headers(), body };
};