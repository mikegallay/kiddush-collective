// utils/cookies.ts
export function setCookie(name: string, value: string, options: any) {
    const expires = options.maxAge ? `; max-age=${options.maxAge}` : '';
    const path = options.path ? `; path=${options.path}` : '';
    document.cookie = `${name}=${value}${expires}${path}`;
  }
  
  export function getCookie(name: string) {
    const cookieArr = document.cookie.split(';');
    for (let i = 0; i < cookieArr.length; i++) {
      const cookie = cookieArr[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return '';
  }
  