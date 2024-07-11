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

form.addEventListener('submit', async function(event) {
    event.preventDefault();
})

loginBtn.addEventListener('click', async () => {
    if(!form.checkValidity()) {
        helperText.innerText = "* 입력하신 계정 정보가 정확하지 않았습니다.";
    } else {
        helperText.innerText = "";
        
        // 로그인
        const response = await fetch('http://ec2-54-180-235-103.ap-northeast-2.compute.amazonaws.com:8080/api/auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'test'
            },
            body: JSON.stringify({
                email: emailInput.value,
                password: passwordInput.value
            })
        })
        .then(async response => {
            if (!response.ok) {
                return response.text().then(errorMessage => { throw new Error(errorMessage); });
            }
            const data = await response.json();
            localStorage.setItem('jwtToken', data.jwt);
            alert("로그인 성공!");
            location.href = '/board';
        })
        .catch(error => {
            alert(error.message);
        });
    }
})