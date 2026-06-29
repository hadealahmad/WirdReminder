/**
 * theme.js - Theme Management Module
 * Handles dark/light mode toggling and persistence across all platforms
 * Part of the core module for consistent theming across Extensions, PWA, and Android
 */

import { storage } from './adapter/storage.js';

const THEME_STORAGE_KEY = 'app_theme';
const DARK_CLASS = 'dark';

/**
 * Theme Manager
 * Provides centralized theme control for the application
 */
export const themeManager = {
    /**
     * Initialize theme on page load
     * Reads from storage and applies the saved theme or system preference
     */
    async init() {
        try {
            // Try to get saved theme from storage
            const savedTheme = await storage.get(THEME_STORAGE_KEY);
            
            if (savedTheme) {
                this.applyTheme(savedTheme);
            } else {
                // Check system preference
                const prefersDark = window.matchMedia && 
                                  window.matchMedia('(prefers-color-scheme: dark)').matches;
                const theme = prefersDark ? 'dark' : 'light';
                this.applyTheme(theme);
                await storage.set({ [THEME_STORAGE_KEY]: theme });
            }
        } catch (error) {
            console.error('Failed to initialize theme:', error);
            // Fallback to light theme
            this.applyTheme('light');
        }
    },

    /**
     * Apply theme to the document
     * @param {string} theme - 'light' or 'dark'
     */
    applyTheme(theme) {
        const root = document.documentElement;
        const body = document.body;

        if (theme === 'dark') {
            root.classList.add(DARK_CLASS);
            if (body) body.classList.add(DARK_CLASS);
        } else {
            root.classList.remove(DARK_CLASS);
            if (body) body.classList.remove(DARK_CLASS);
        }

        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
            meta.setAttribute('content', theme === 'dark' ? '#065f46' : '#10b981');
        }

        this._updateSystemBars(theme);
    },

    /**
     * Update native system bars (status bar) style for Capacitor
     * In dark mode: white status bar background (via CSS) with dark icons
     * In light mode: default status bar with light icons
     * @param {string} theme - 'light' or 'dark'
     */
    async _updateSystemBars(theme) {
        if (typeof window !== 'undefined' && window.Capacitor && window.Capacitor.isNativePlatform) {
            try {
                const { SystemBars } = await import('@capacitor/core');
                if (SystemBars && SystemBars.setStyle) {
                    // Dark mode → white status bar bg → need dark icons (Light style)
                    // Light mode → colored/default bg → need light icons (Dark style)
                    const style = theme === 'dark' ? 'LIGHT' : 'DARK';
                    await SystemBars.setStyle({ style });
                    console.log(`[Theme] SystemBars style set to ${style}`);
                }
            } catch (e) {
                console.log('[Theme] SystemBars API not available:', e.message);
            }
        }
    },

    /**
     * Get current theme
     * @returns {string} 'light' or 'dark'
     */
    getCurrentTheme() {
        return document.documentElement.classList.contains(DARK_CLASS) ? 'dark' : 'light';
    },

    /**
     * Toggle between light and dark themes
     * @returns {Promise<string>} The new theme
     */
    async toggle() {
        const currentTheme = this.getCurrentTheme();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        console.log(`Toggling theme from ${currentTheme} to ${newTheme}`);
        this.applyTheme(newTheme);
        
        try {
            await storage.set({ [THEME_STORAGE_KEY]: newTheme });
            console.log(`Theme ${newTheme} saved to storage`);
        } catch (error) {
            console.error('Failed to save theme:', error);
        }
        
        return newTheme;
    },

    /**
     * Set specific theme
     * @param {string} theme - 'light' or 'dark'
     */
    async setTheme(theme) {
        if (theme !== 'light' && theme !== 'dark') {
            console.warn('Invalid theme:', theme);
            return;
        }
        
        this.applyTheme(theme);
        await storage.set({ [THEME_STORAGE_KEY]: theme });
    },

    /**
     * Listen for system theme changes
     */
    watchSystemTheme() {
        if (!window.matchMedia) return;
        
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const handler = async (e) => {
            // Only auto-switch if user hasn't manually set a theme
            const savedTheme = await storage.get(THEME_STORAGE_KEY);
            if (!savedTheme) {
                const theme = e.matches ? 'dark' : 'light';
                this.applyTheme(theme);
            }
        };
        
        // Modern browsers
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handler);
        } else {
            // Fallback for older browsers
            mediaQuery.addListener(handler);
        }
    },

    /**
     * Create and return a theme toggle button element
     * @returns {HTMLElement} Theme toggle button
     */
    createToggleButton() {
        const button = document.createElement('button');
        button.className = 'theme-toggle-btn';
        button.setAttribute('aria-label', 'Toggle theme');
        button.setAttribute('title', 'Toggle dark/light mode');
        
        // SVG icons
        const sunIcon = `
            <svg class="theme-icon theme-icon-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
        `;
        
        const moonIcon = `
            <svg class="theme-icon theme-icon-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        `;
        
        button.innerHTML = sunIcon + moonIcon;
        
        button.addEventListener('click', async () => {
            await this.toggle();
        });
        
        return button;
    }
};

// Auto-initialize when DOM is ready (for browser extension context)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        themeManager.init();
        themeManager.watchSystemTheme();
    });
} else {
    // DOM already loaded
    themeManager.init();
    themeManager.watchSystemTheme();
}
