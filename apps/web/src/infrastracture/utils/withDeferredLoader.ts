interface Props<T> {
    action: () => Promise<T>;
    onShowLoader: () => void;
    delay: number;
}

export async function withDefferedLoader<T>({
    action,
    onShowLoader,
    delay = 100, //ms до показа лоадера
}: Props<T>) {
    let timer: ReturnType<typeof setTimeout> | null = null;

    timer = setTimeout(() => {
        onShowLoader();
    }, delay);

    const result = await action();

    if (timer) clearTimeout(timer);
    return result;
}
