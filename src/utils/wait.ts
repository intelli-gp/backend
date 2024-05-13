export async function nonBlockingWait(ms: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true });
        }, ms);
    });
}
