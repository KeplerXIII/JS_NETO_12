const form = document.getElementById('signin__form')
const signin = document.getElementById('signin')
const welcome = document.getElementById('welcome')
const user_id = document.getElementById('user_id')

if (localStorage.getItem('auth_user')) {
    user_id.textContent = localStorage.getItem('auth_user')
    signin.classList.remove('signin_active')
    welcome.classList.add('welcome_active')

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
        } else {
            if (request.readyState === XMLHttpRequest.DONE) {
                console.log(`Ответ сервера: ${request.responseText}\nКод ответа - ${request.status}`)
                alert('«Неверный логин/пароль»')
            }
        }}
        request.send(formData)
}