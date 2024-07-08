const titleInput = document.getElementById('title-input');
const contentInput = document.getElementById('content-input');
const helper = document.getElementById('helper');
const modifyBtn = document.getElementById('modify-btn');

let titleFlag = false;
let contentFlag = false;

titleInput.addEventListener('keyup', () => {
    titleFlag = false;
    if(titleInput.value.length == 0) {

    } else if(titleInput.value.length > 26) {
        helper.innerText = "* 제목은 최대 26자까지 가능합니다.";
    } else {
        titleFlag = true;
        if(contentInput.value.length != 0) {
            contentFlag = true;
        } 
    }
    btnActive();
})

contentInput.addEventListener('keyup', () => {
    contentFlag = false;
    if(contentInput.value.length == 0) {
        
    } else {
        contentFlag = true;
        if(titleInput.value.length != 0) {
            titleFlag = true;
        }
    }
    btnActive();
})

const btnActive = () => {
    if(titleFlag && contentFlag) {
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
    if(btnActive()) {
        checkForm();
    } else {
        helper.innerText = "* 제목, 내용을 모두 작성해주세요.";
    }
})

const checkForm = () => {
    if(btnActive()) {
        sendFormData();
        return false;
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

const postId = new URLSearchParams(window.location.search).get('postId');

// 게시글 불러오기
fetch(`http://localhost:8080/posts/${postId}`, {
    method: "GET",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
    }
})
.then(data => data.json())
.then(item => {
    titleInput.value = item.title;
    contentInput.value = item.content;
    // 파일도 해야함.
    document.getElementById('file-name').innerText = item.image;
});

const sendFormData = () => {
    console.log(postId);
    const formData = new FormData();
    formData.append('id', postId);
    formData.append('title', titleInput.value);
    formData.append('content', contentInput.value);
    var noSpaceName = document.getElementById('file-name').innerText.replaceAll(" ", "");
    var splitFileName = noSpaceName.split("\\");
    var splitFileNameLength = splitFileName.length;
    var fileName = splitFileName[splitFileNameLength-1];
    formData.append('image', fileName);

    // 게시글 수정
    fetch(`http://localhost:8080/posts/${postId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
        },
        body: formData
    })
    .then((response) => {
        if(response.ok) {
            location.href = `/postDetail/${postId}`;
        }
    });
    
}