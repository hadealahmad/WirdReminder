// renderer.js - Rendering Layer (adapted from extension)
// Pure DOM manipulation for Mushaf-style display

import { shouldCenterLine, findSurahGap } from './parser.js';
import { ReflectionStorage } from './adapter/storage.js';

/**
 * Creates a word element (span) with appropriate styling
 * @param {Object} word - Word object from parser
 * @returns {HTMLSpanElement} Styled word element
 */
export function createWordElement(word) {
    const span = document.createElement('span');
    const text = word.text_qpc_hafs || word.text_uthmani;
    span.textContent = text;

    span.dataset.verseKey = word.verse_key;

    if (word.char_type_name === 'end') {
        span.className = 'ayah-symbol';
    } else {
        span.className = 'mushaf-word';
        // Add data attributes for bookmark identification
        span.dataset.wordPosition = word.position;
    }

    return span;
}

/**
 * Creates a surah header element using SurahNames font
 * @param {string|number} surahId - The surah number
 * @returns {HTMLDivElement} Surah header element
 */
export function createSurahHeader(surahId) {
    const div = document.createElement('div');
    div.className = 'surah-header';

    const numSpan = document.createElement('span');
    numSpan.textContent = String(surahId).padStart(3, '0');

    const labelSpan = document.createElement('span');
    labelSpan.textContent = 'surah';

    div.appendChild(labelSpan);
    div.appendChild(numSpan);
    return div;
}

/**
 * Creates a basmala element
 * @returns {HTMLDivElement} Basmala element
 */
export function createBasmala() {
    const div = document.createElement('div');
    div.className = 'basmala';
    div.textContent = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ';
    return div;
}

/**
 * Creates an empty line element (placeholder)
 * @returns {HTMLDivElement} Empty line element
 */
export function createEmptyLine() {
    const div = document.createElement('div');
    div.className = 'mushaf-line';
    return div;
}

/**
 * Creates a line element with words
 * @param {Array} words - Words in this line
 * @param {boolean} isCentered - Whether to center the line
 * @returns {HTMLDivElement} Line element with word spans
 */
export function createLineElement(words, isCentered = false) {
    const div = document.createElement('div');
    div.className = isCentered ? 'mushaf-line centered' : 'mushaf-line';

    words.forEach(word => {
        div.appendChild(createWordElement(word));
    });

    return div;
}

/**
 * Creates a page footer element
 * @param {number} pageNumber - The page number
 * @returns {HTMLDivElement} Page footer element
 */
export function createPageFooter(pageNumber) {
    const div = document.createElement('div');
    div.className = 'page-footer';

    const span = document.createElement('span');
    span.textContent = `صفحة ${pageNumber}`;
    div.appendChild(span);

    return div;
}

/**
 * Creates a complete mushaf page element
 * @param {Object} pageData - Parsed page data with lines and surahStarts
 * @returns {HTMLDivElement} Complete page element
 */
export function createPageElement(pageData) {
    const { pageNumber, lines, surahStarts } = pageData;

    const pageDiv = document.createElement('div');
    pageDiv.className = 'mushaf-page';
    pageDiv.dataset.page = pageNumber;

    // Render 15 lines per page
    for (let i = 1; i <= 15; i++) {
        const lineWords = lines.get(i);

        if (lineWords) {
            const isCentered = shouldCenterLine(i, lineWords, lines);
            pageDiv.appendChild(createLineElement(lineWords, isCentered));
        } else {
            // Empty line - check for surah header or basmala
            const { gap, surahId } = findSurahGap(i, lines, surahStarts);

            if (surahId) {
                if (gap === 2) {
                    // Start collecting surah intro (header line)
                    const introDiv = document.createElement('div');
                    introDiv.className = 'surah-intro';
                    introDiv.appendChild(createSurahHeader(surahId));
                    // Check if next empty line is basmala
                    const nextGap = findSurahGap(i + 1, lines, surahStarts);
                    if (nextGap.surahId && nextGap.gap === 1 && nextGap.surahId !== '9') {
                        introDiv.appendChild(createBasmala());
                    }
                    pageDiv.appendChild(introDiv);
                } else if (gap === 1) {
                    // Only add basmala if not already added by previous gap===2
                    const prevGap = findSurahGap(i - 1, lines, surahStarts);
                    if (!(prevGap.surahId && prevGap.gap === 2)) {
                        if (surahId !== '9') {
                            const introDiv = document.createElement('div');
                            introDiv.className = 'surah-intro';
                            introDiv.appendChild(createBasmala());
                            pageDiv.appendChild(introDiv);
                        } else {
                            pageDiv.appendChild(createEmptyLine());
                        }
                    }
                }
            }
        }
    }

    pageDiv.appendChild(createPageFooter(pageNumber));

    return pageDiv;
}

/**
 * Renders all pages into the container
 * @param {Array} pagesData - Array of parsed page data
 * @param {string} title - Title to display
 * @param {HTMLElement} container - Container element
 */
export function renderPages(pagesData, title, container) {
    // Clear container
    container.innerHTML = '';

    // Add title
    const h1 = document.createElement('h1');
    h1.className = 'reader-title';
    h1.textContent = title;
    container.appendChild(h1);

    // Render each page
    pagesData.forEach(pageData => {
        container.appendChild(createPageElement(pageData));
    });
}

/**
 * Shows a loading state
 * @param {HTMLElement} container - Container element
 */
export function showLoading(container) {
    container.innerHTML = `
        <div class="reader-loading">
            <div class="spinner"></div>
        </div>
    `;
}

/**
 * Shows placeholder content
 * @param {HTMLElement} container - Container element
 */
export function showPlaceholder(container) {
    container.innerHTML = `
        <div class="reader-placeholder">
            <div class="reader-placeholder-icon">📖</div>
            <p>اختر سورة أو جزءاً للقراءة</p>
            <p style="font-size: 0.85rem;">أو جرّب أحد التذكيرات المُوصى بها</p>
        </div>
    `;
}

/**
 * Displays an error message
 * @param {string} msg - Error message to display
 * @param {HTMLElement} container - Container element
 */
export function showError(msg, container) {
    container.innerHTML = `
        <div class="reader-placeholder" style="color: hsl(0 62.8% 30.6%);">
            <div class="reader-placeholder-icon">⚠️</div>
            <p>${msg}</p>
        </div>
    `;
}

/**
 * Decorates ayah elements inside a container with a visual indicator
 * if a reflection exists for that specific verse.
 *
 * Expected format of `data-verse-key`:
 *   "surah:ayah"  (e.g., "2:155")
 *
 * @param {HTMLElement} container - Root DOM element containing ayah elements
 * @returns {Promise<void>} Resolves when decoration process is complete
 */
export async function decorateReflections(container) {
    const reflections = await ReflectionStorage.getAll();

    container.querySelectorAll('.reflection-indicator').forEach(el => el.remove());

    if (!reflections || reflections.length === 0) return;

    const reflectedKeys = new Set(reflections.map(r => `${r.surah}:${r.ayah}`));

    container.querySelectorAll('.ayah-symbol').forEach(symbol => {
        const verseKey = symbol.dataset.verseKey;
        if (reflectedKeys.has(verseKey)) {
            const indicator = document.createElement('span');
            indicator.className = 'reflection-indicator';
            indicator.innerHTML = '📝';
            symbol.appendChild(indicator);
        }
    });
}
