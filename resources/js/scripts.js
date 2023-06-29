(function () {
    const getStoredTheme = () => localStorage.getItem('theme')
    const setStoredTheme = theme => localStorage.setItem('theme', theme)
    const getPreferredTheme = () => {
        const storedTheme = getStoredTheme()
        if (storedTheme) {
            return storedTheme
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    const setTheme = theme => {
        if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-bs-theme', 'dark')
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme)
        }
    }

    setTheme(getPreferredTheme())

    document.querySelectorAll('[data-bs-theme-value]').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const theme = toggle.getAttribute('data-bs-theme-value')
            setStoredTheme(theme)
            setTheme(theme)
        })
    })

    const increaseFontSize = () => {
        const currentFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
        document.documentElement.style.fontSize = `${currentFontSize + 1}px`
    }

    const decreaseFontSize = () => {
        const currentFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
        document.documentElement.style.fontSize = `${currentFontSize - 1}px`
    }

    document.querySelector('.float-element.tooltip-left').addEventListener('click', increaseFontSize)
    document.querySelector('.float-element:not(.tooltip-left)').addEventListener('click', decreaseFontSize)
})();

