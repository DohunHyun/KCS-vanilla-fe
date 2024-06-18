const titleInput = document.getElementById('title-input');
const contentInput = document.getElementById('content-input');
const helper = document.getElementById('helper');
const submitBtn = document.getElementById('submit-btn');

let titleFlag = false;
let contentFlag = false;

titleInput.addEventListener('keyup', () => {
    titleFlag = false;
    if(titleInput.value.length == 0) {

    } else if(titleInput.value.length > 26) {
        helper.innerText = "* 제목은 최대 26자까지 가능합니다.";
    } else {
        titleFlag = true;
    }
    btnActive();
})

contentInput.addEventListener('keyup', () => {
    contentFlag = false;
    if(contentInput.value.length == 0) {

    } else {
        contentFlag = true;
    }
    btnActive();
})

const btnActive = () => {
    if(titleFlag && contentFlag) {
        submitBtn.classList.remove('btn-inactive');
        submitBtn.classList.add('btn-active');
        return true;
    } else {
        submitBtn.classList.add('btn-inactive');
        submitBtn.classList.remove('btn-active');
        return false;
    }
}

submitBtn.addEventListener('click', () => {
    if(btnActive()) {
        
    } else {
        helper.innerText = "* 제목, 내용을 모두 작성해주세요.";
    }
})

const checkForm = () => {
    if(btnActive()) {
        sendFormData();
        // return true;
    } else {
        alert("입력 내용을 확인해주세요.");
        return false;
    }
}

document.getElementById('file').addEventListener('change', () => {
    let fileName = document.getElementById('file').value;

    if(fileName.length > 0) {
        document.getElementById('file-name').innerText = fileName;
    } else {
        document.getElementById('file-name').innerText = "파일을 선택해주세요.";
    }
})

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

const sendFormData = () => {
    const formData = new FormData();
    formData.append('user_email', getCookie('userEmail'));
    formData.append('title', titleInput.value);
    formData.append('content', contentInput.value);
    // 사진이 없을땐 append 하지 않기. 그래야 불러올때 오류 안남
    formData.append('image', "image");
    formData.append('like_cnt', 0);
    formData.append('comment_cnt', 0);
    formData.append('view_cnt', 0);
    formData.append('time', "2024-06-03");

    fetch('http://localhost:3001/post', {
        method: 'POST',
        headers: {},
        body: formData,
    })
    .then((response) => response.json())
    .then((json) => console.log(json));

}