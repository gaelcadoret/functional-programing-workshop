import createCacheAdapter, { CacheAdapter } from './cache'; // Remplacez le chemin par le chemin vers votre module

describe('Cache Adapter', () => {
    let cache: CacheAdapter;

    beforeEach(() => {
        cache = createCacheAdapter();
    });

    it('should set and get data in cache', () => {
        const data = { id: 123, name: 'Alice' };
        cache.set('user:123', data, 60);
        const cachedData = cache.get('user:123');
        expect(cachedData).toEqual(data);
    });

    it('should return null for expired data', () => {
        const data = { id: 456, name: 'Bob' };
        cache.set('user:456', data, -1); // Set data with negative expiration to make it expired immediately
        const cachedData = cache.get('user:456');
        expect(cachedData).toBeNull();
    });

    it('should return null for non-existent data', () => {
        const cachedData = cache.get('nonexistent:key');
        expect(cachedData).toBeNull();
    });

    it('should delete data from cache', () => {
        const data = { id: 789, name: 'Charlie' };
        cache.set('user:789', data, 60);
        cache.delete('user:789');
        const cachedData = cache.get('user:789');
        expect(cachedData).toBeNull();
    });
});
