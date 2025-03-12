import { useRef } from 'react';
import _ from 'lodash';

export const useDebounce = <T extends (...args: any[]) => void>(
    callback: T,
    delay: number
): T => {
    const debouncedCallback = useRef(_.debounce(callback, delay) as unknown as T).current;

    return debouncedCallback;
};
