const nicknameInput = document.getElementById('nickname-input');
const nicknameHelper = document.getElementById('nickname-helper');
const modifyBtn = document.getElementById('modify-btn');
const toastMsg = document.getElementById('toast-msg');
const withdrawalBtn = document.getElementById('withdrawal-btn');
const modal = document.getElementById('modal');
const modalCancelBtn = document.getElementById('modal-cancel-btn');
const modalConfirmBtn = document.getElementById('modal-confirm-btn');
let nicknameFlag = false;

// 닉네임 유효성 검사
nicknameInput.addEventListener('keyup', () => {
    nicknameFlag = false;
    if(nicknameInput.value.length == 0) {
        nicknameHelper.innerText = "* 닉네임을 입력해주세요.";
    } else if(nicknameInput.value.length > 10) {
        nicknameHelper.innerText = "* 닉네임은 최대 10자 까지 작성 가능합니다.";
    } else if(nicknameInput.value.match(/\s/g)) {
        nicknameHelper.innerText = "* 띄어쓰기를 없애주세요.";
    } else {
        nicknameHelper.innerText = "";
        nicknameFlag = true;
    }
    btnActive();
})

const btnActive = () => {
    if(nicknameFlag) {
        modifyBtn.classList.remove('btn-inactive');
        modifyBtn.classList.add('btn-active');
        return true;
    } else {
        modifyBtn.classList.add('btn-inactive');
        modifyBtn.classList.remove('btn-active');
        return false;
    }
}

modifyBtn.addEventListener('click', () => {
    if(nicknameFlag) {
        toastOn();
    } else {
        modifyBtn.classList.add('btn-inactive');
        modifyBtn.classList.remove('btn-active');
        return false;
    }
})

const toastOn = () => {
    toastMsg.classList.add('active');
    setTimeout(function() {
        toastMsg.classList.remove('active');
    }, 1000);
}

withdrawalBtn.addEventListener('click', () => {
    modal.classList.add('on');
})

modalCancelBtn.addEventListener('click', () => {
    modal.classList.remove('on');
})

modalConfirmBtn.addEventListener('click', () => {
    modal.classList.remove('on');
    // 회원 탈퇴 로직 진행
})

// 닉네임 중복 체크
let userList = "";
fetch("http://localhost:8080/users")
                .then( (res) => res.json() )
                .then( (json) => json.items )
                .then( items => userList = items );

const checkNickname = (input) => {
    return userList.map((item) => item.nickName)
        .find(nickname => nickname === input);
}

nicknameInput.addEventListener('change', () => {
    if(checkNickname(nicknameInput.value)) {
        nicknameHelper.innerText = "* 중복된 닉네임 입니다.";
        nicknameFlag = false;
    } else {

    }
})
