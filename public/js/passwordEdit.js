const passwordInput = document.getElementById('password-input');
const passwordCheckInput = document.getElementById('passwordCheck-input');
const passwordHelper = document.getElementById('password-helper');
const passwordCheckHelper = document.getElementById('passwordCheck-helper');
const modifyBtn = document.getElementById('modify-btn');

// 패스워드 유효성 검사
passwordInput.addEventListener('keyup', () => {
    passwordFlag = false;
    if(passwordInput.value.length == 0) {
        passwordHelper.innerText = "* 비밀번호를 입력해주세요."
    } else if(!passwordValidator(passwordInput.value)) {
        passwordHelper.innerText = "* 비밀번호는 8자 이상, 20자 이하이며, 영어, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다."
    } else {
        passwordHelper.innerText = ""
        passwordFlag = true;
    }
    btnActive();
});

function passwordValidator(value) {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value);
}

// 비밀번호 확인 유효성 검사
passwordCheckInput.addEventListener('keyup', () => {
    passwordCheckFlag = false;
    if(passwordCheckInput.value.length == 0) {
        passwordCheckHelper.innerText = "* 비밀번호를 한번 더 입력해주세요."
    } else if(passwordInput.value != passwordCheckInput.value) {
        passwordCheckHelper.innerText = "* 비밀번호가 다릅니다.";
    } else if(!passwordValidator(passwordCheckInput.value)) {
        passwordCheckHelper.innerText = "* 비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.";
    } else {
        passwordCheckHelper.innerText = "";
        passwordCheckFlag = true;
    }
    btnActive();
})

const btnActive = () => {
    if(passwordFlag && passwordCheckFlag) {
        modifyBtn.classList.remove('btn-inactive');
        modifyBtn.classList.add('btn-active');
        return true;
    } else {
        modifyBtn.classList.add('btn-inactive');
        modifyBtn.classList.remove('btn-active');
        return false;
    }
}

const checkForm = () => {
    if(btnActive()) {
        return true;
    } else {
        alert("입력 내용을 확인해주세요.");
        return false;
    }
}