import { useState } from 'react';

export function SelectLanguage() {
    const currentLanguage = localStorage.getItem('menu-Language');
    const [showSelector, setShowSelector] = useState(false);

    const onChangeSelect = (e) => {
        const selectedLanguage = e.target.innerText.toLowerCase();
        localStorage.setItem('menu-Language', selectedLanguage);
        sessionStorage.clear();
        window.location.reload();
    };

    

    return (
        <div
            className="SelectLanguage"
            onMouseMove={() => setShowSelector(true)}
            onMouseLeave={() => setShowSelector(false)}
        >
            <div className="selectedLanguage">{currentLanguage}</div>
            <i className="fas fa-caret-down"></i>
            <div className={showSelector ? "dropdown activeSelectLang" : "dropdown"} onClick={onChangeSelect}>
                <div className="selectedLanguage">en</div>
                <div className="selectedLanguage">am</div>
            </div>
        </div>
    )
}
