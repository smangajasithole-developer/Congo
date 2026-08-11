// =========================================
// INVALID REVIEW LINK
// =========================================


// =========================================
// SYNCHRONIZE WITH HOME PAGE THEME
// =========================================

function syncTheme() {

    const savedTheme =
        localStorage.getItem('theme');


    if (savedTheme === 'light') {

        document.documentElement.classList.add(
            'light-mode'
        );

    } else {

        document.documentElement.classList.remove(
            'light-mode'
        );

    }

}


// =========================================
// INITIALIZE
// =========================================

document.addEventListener(
    'DOMContentLoaded',
    () => {

        syncTheme();

    }
);