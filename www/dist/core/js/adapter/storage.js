/**
 * storage.js - Unified Storage Adapter
 * Abstracts differences between chrome.storage.local and localStorage.
 * Always return Promises for consistency.
 */

export const storage = {
    /**
     * Retrieves data from storage.
     * @param {string|string[]|null} keys - Key or keys to retrieve. If null, retrieves all.
     * @returns {Promise<any>}
     */
    async get(keys) {
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
            return new Promise((resolve) => {
                chrome.storage.local.get(keys, (result) => {
                    // chrome.storage logic returns an object. If a single key was requested,
                    // we might want to return just that value, but for consistency with
                    // chrome.storage API, we return the whole object if multiple keys or null.
                    if (typeof keys === 'string') {
                        resolve(result[keys]);
                    } else {
                        resolve(result);
                    }
                });
            });
        } else {
            // Web / LocalStorage fallback
            if (keys === null) {
                const all = {};
                for (let i = 0; i < localStorage.length; i++) {
                    const k = localStorage.key(i);
                    all[k] = JSON.parse(localStorage.getItem(k));
                }
                return all;
            } else if (Array.isArray(keys)) {
                const result = {};
                keys.forEach(k => {
                    const val = localStorage.getItem(k);
                    result[k] = val ? JSON.parse(val) : undefined;
                });
                return result;
            } else {
                const val = localStorage.getItem(keys);
                return val ? JSON.parse(val) : undefined;
            }
        }
    },

    /**
     * Saves data to storage.
     * @param {Object} items - Object containing key-value pairs to save.
     * @returns {Promise<void>}
     */
    async set(items) {
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
            return new Promise((resolve) => {
                chrome.storage.local.set(items, () => {
                    resolve();
                });
            });
        } else {
            // Web / LocalStorage fallback
            Object.keys(items).forEach(key => {
                localStorage.setItem(key, JSON.stringify(items[key]));
            });
        }
    },

    /**
     * Removes items from storage.
     * @param {string|string[]} keys - Key or keys to remove.
     * @returns {Promise<void>}
     */
    async remove(keys) {
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
            return new Promise((resolve) => {
                chrome.storage.local.remove(keys, () => {
                    resolve();
                });
            });
        } else {
            if (Array.isArray(keys)) {
                keys.forEach(k => localStorage.removeItem(k));
            } else {
                localStorage.removeItem(keys);
            }
        }
    },

    /**
     * Clears all data.
     * @returns {Promise<void>}
     */
    async clear() {
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
            return new Promise((resolve) => {
                chrome.storage.local.clear(() => {
                    resolve();
                });
            });
        } else {
            localStorage.clear();
        }
    }
};


/**
 * Handles persistence of reflections in storage.
 * Provides CRUD operations for managing reflection data.
 */
const REFLECTIONS_KEY = 'quran_reflections';

export const ReflectionStorage = {

    /**
     * Retrieves all stored reflections.
     *
     * @returns {Promise<Reflection[]>} Array of reflections (empty if none exist)
     */
    async getAll() {
        const data = await storage.get(REFLECTIONS_KEY);
        return data || [];
    },

    /**
     * Retrieves a reflection by specific surah and ayah.
     *
     * @param {string|number} surah - Surah number
     * @param {string|number} ayah - Ayah number
     * @returns {Promise<Reflection|undefined>} Matching reflection or undefined
     */
    async getByAyah(surah, ayah) {
        const all = await this.getAll();
        return all.find(r => r.surah === parseInt(surah) && r.ayah === parseInt(ayah));
    },

    /**
     * Saves a reflection.
     * 
     * If a reflection for the same surah and ayah exists,
     * it will be updated. Otherwise, a new reflection will be created.
     *
     * @param {Partial<Reflection>} reflection - Reflection data to save
     * @returns {Promise<Reflection[]>} Updated reflections array
     */
    async save(reflection) {
        const all = await this.getAll();
        const s = parseInt(reflection.surah);
        const a = parseInt(reflection.ayah);
        const index = all.findIndex(r => r.surah === s && r.ayah === a);

        if (index > -1) {
            all[index] = {
                ...all[index],
                text: reflection.text,
                updatedAt: new Date().toISOString()
            };
        } else {
            all.push({
                id: `ref_${Date.now()}_${s}_${a}`,
                surah: s,
                ayah: a,
                text: reflection.text,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
        }

        await storage.set({ [REFLECTIONS_KEY]: all });
        return all;
    },

    /**
     * Deletes a reflection by surah and ayah.
     *
     * @param {string|number} surah - Surah number
     * @param {string|number} ayah - Ayah number
     * @returns {Promise<Reflection[]>} Updated reflections array after deletion
     */
    async delete(surah, ayah) {
        const all = await this.getAll();
        const filtered = all.filter(r => !(r.surah === parseInt(surah) && r.ayah === parseInt(ayah)));
        await storage.set({ [REFLECTIONS_KEY]: filtered });
        return filtered;
    }
};
