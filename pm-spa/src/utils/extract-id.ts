export function extractId(arr: string[], arr2: string[]): string {
    let test: string = '';

    arr.forEach((id) => {
        if (!arr2.includes(id)) {
            test = id;
        }
    });

    return test;
}
