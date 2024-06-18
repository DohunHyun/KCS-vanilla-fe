window.onload = function() {

}

const form = document.getElementById('form');
const emailInput = document.getElementsByTagName('input')[0];
const passwordInput = document.getElementsByTagName('input')[1];
const loginBtn = document.getElementById('login-btn');
const helperText = document.getElementsByClassName('helper')[0];

emailInput.addEventListener('keyup', () => {
    if(form.checkValidity()) {
        loginBtn.classList.remove('btn-inactive');
        loginBtn.classList.add('btn-active');
    } else if(!form.checkValidity()) {
        loginBtn.classList.add('btn-inactive');
        loginBtn.classList.remove('btn-active');
    }
});

passwordInput.addEventListener('keyup', () => {
    if(form.checkValidity()) {
        loginBtn.classList.remove('btn-inactive');
        loginBtn.classList.add('btn-active');
    } else if(!form.checkValidity()) {
        loginBtn.classList.add('btn-inactive');
        loginBtn.classList.remove('btn-active');
    }
});

loginBtn.addEventListener('click', () => {
    if(!form.checkValidity()) {
        helperText.innerText = "* 입력하신 계정 정보가 정확하지 않았습니다.";
    } else {
        helperText.innerText = "";

        // 로그인 로직 추가
        fetch('http://localhost:3001/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:3000',
            },
            body: JSON.stringify({
                email: emailInput.value,
            })
        })
        .then(response => {
            if(response.ok) {
                location.href = '/board';
            } else {
                alert('로그인 실패');
            }
        })
    }
})