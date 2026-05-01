/**
 * `getThemeInitScript()` 는 SSR 에서 호출되어 head 에 inline 으로 삽입된다.
 * 따라서 React 코드를 포함하는 `theme.tsx` ('use client') 와 분리되어야 한다.
 */
const DEFAULT_STORAGE_KEY = 'wireweave-theme';

export function getThemeInitScript(storageKey: string = DEFAULT_STORAGE_KEY): string {
  return `(function(){try{var k=${JSON.stringify(storageKey)};var s=localStorage.getItem(k);var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var r=document.documentElement;r.classList.remove('light','dark');if(s==='dark'){r.classList.add('dark')}else if(s==='light'){r.classList.add('light')}else if(m){r.classList.add('dark')}}catch(e){}})();`;
}
