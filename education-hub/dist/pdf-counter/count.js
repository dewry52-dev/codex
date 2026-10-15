export function countText(text) {
  const normalized = text.normalize('NFC');
  return {withSpaces: Array.from(normalized.replace(/[\r\n]/gu, '')).length,
    withoutSpaces: Array.from(normalized.replace(/\s/gu, '')).length};
}
export function pageText(items) {
  return items.filter(item => typeof item.str === 'string').map(item => item.str + (item.hasEOL ? '\n' : '')).join('');
}
