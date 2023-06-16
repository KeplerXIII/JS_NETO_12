const modal = document.getElementById('subscribe-modal')
const clsBtn = document.querySelector('.modal__close')


function setCookie(key, value) {
    document.cookie = `${key}=${encodeURIComponent(value)}; SameSite=strict`
}

function getCookie(name) {
    try {
        const pairs = document.cookie.split('; ')
        const cookie = pairs.find(p => p.startsWith(name + '='))
        return cookie.substring(name.length + 1)
    } catch (e) {
        return false
    }
}

window.onload = () => {
    if (!getCookie('watched')) {
        modal.classList.add('modal_active')
    }
}

clsBtn.onclick = () => {
    modal.classList.remove('modal_active')
    setCookie('watched', 'true')
}

