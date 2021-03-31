export function setDefaultLang(lang){
    const langType = window.localStorage.getItem('lang');
    if(langType === null){
        if(lang === 'ko') window.localStorage.setItem('lang', 0);
        else if(lang === 'vi') window.localStorage.setItem('lang', 2);
        else window.localStorage.setItem('lang', 1);
    }

}