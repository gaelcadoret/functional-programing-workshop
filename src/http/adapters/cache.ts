export interface CacheEntry<T> {
    value: T;
    expiresAt: number;
}

export interface CacheAdapter {
    set<T>(key: string, value: T, expirationInSeconds: number): void;
    get<T>(key: string): T | null;
    delete(key: string): void;
}

function createCacheAdapter(): CacheAdapter {
    const cache = new Map<string, CacheEntry<any>>();

    function set<T>(key: string, value: T, expirationInSeconds: number): void {
        cache.set(key, { value, expiresAt: Date.now() + expirationInSeconds * 1000 });
    }

    function get<T>(key: string): T | null {
        const cacheEntry = cache.get(key);

        if (cacheEntry && cacheEntry.expiresAt > Date.now()) {
            return cacheEntry.value;
        }

        return null;
    }

    function del(key: string): void {
        cache.delete(key);
    }

    return {
        set,
        get,
        delete: del
    };
}

export default createCacheAdapter;
