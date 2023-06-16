const form = document.getElementById('signin__form')
const signin = document.getElementById('signin')
const welcome = document.getElementById('welcome')
const user_id = document.getElementById('user_id')
const card = document.querySelector('.card')

function addBtn() {
    const deAuth = document.createElement('button')
    deAuth.textContent = 'Выйти'
    card.appendChild(deAuth)
    deAuth.onclick = () => {
        welcome.classList.remove('welcome_active')
        signin.classList.add('signin_active')
        deAuth.remove()
        localStorage.removeItem('auth_user')
        form.reset()
    }
}

if (localStorage.getItem('auth_user')) {
    user_id.textContent = localStorage.getItem('auth_user')
    signin.classList.remove('signin_active')
    welcome.classList.add('welcome_active')
    addBtn()
}

form.onsubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const request = new XMLHttpRequest()
    request.open('POST', 'https://students.netoservices.ru/nestjs-backend/auth')

    request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE && JSON.parse(request.responseText)['success']) {
            localStorage.setItem('auth_user', JSON.parse(request.responseText)['user_id'])
            signin.classList.remove('signin_active')
            user_id.textContent = JSON.parse(request.responseText)['user_id']
            welcome.classList.add('welcome_active')
            console.log(`Ответ сервера: ${request.responseText}\nКод ответа - ${request.status}`)
            addBtn()
        } else {
            if (request.readyState === XMLHttpRequest.DONE) {
                form.reset()
                console.log(`Ответ сервера: ${request.responseText}\nКод ответа - ${request.status}`)
                alert('«Неверный логин/пароль»')
            }}}
        request.send(formData)
}