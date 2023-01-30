let session = new Session()
session = session.getSession()
// console.log(document.cookie)
if(session !==''){
    window.location.href = 'hexa.html'
}
document.querySelector('.btn-registration').addEventListener('click',(e)=>{
    e.preventDefault()
    let modal = document.querySelector('.custom-modal')
    modal.style.display = 'block'
    document.querySelector('#closeModal').addEventListener('click',(e) =>{
        e.preventDefault()
        modal.style.display = 'none'
    })
})
document.querySelector('#registration-form').addEventListener('submit', e => {
    e.preventDefault()
    let user = new User();
    user.username = document.querySelector('#username').value
    user.email = document.querySelector('#email').value
    user.password = document.querySelector('#password').value
    user.create()
})
document.querySelector('#loginForm').addEventListener('submit', e =>{
    e.preventDefault()
    let email = document.querySelector('#login_email').value
    let password = document.querySelector('#login_password').value
    let user = new User();
    user.email = email
    user.password = password
    user.login()
})