const writeBtn = document.getElementById('write-btn');
const post1 = document.getElementById('post1');

document.getElementById('prev-btn').addEventListener('click', () => {
    location.href='/login';
})

writeBtn.addEventListener('mouseover', () => {
    writeBtn.classList.add('btn-active');
    writeBtn.classList.remove('btn-inactive');
})
writeBtn.addEventListener('mouseout', () => {
    writeBtn.classList.add('btn-inactive');
    writeBtn.classList.remove('btn-active');
})
writeBtn.addEventListener('click', () => {
    location.href='/postWrite';
})

// Post 리스트 가져오기
fetch("http://localhost:8080/posts")
    .then( res => res.json() )
    .then( item => {
        console.log(item);
        const container = document.getElementById('post-list');
        container.innerHTML = item.map((i) => createPostListHTML(i)).join("");
    });

const createPostListHTML = (item) => {
    return `
        <article class="post-box" onclick="window.location.href='/postDetail/${item.id}'">
            <div class="post-detail">
                <div class="post-title">${item.title}</div>
                <div class="post-info">
                    <p class="post-reaction">좋아요 ${numFormat(item.likeCnt)} 댓글 ${numFormat(item.commentCnt)} 조회수 ${numFormat(item.viewCnt)}</p>
                    <p class="post-time">${item.time}</p>
                </div>
            </div>
            <hr class="post-hr">
            <div class="post-writer">
                <img src="./sources/${item.userImage}">
                <p class="writer-name">${item.userNickname}</p>
            </div>
        </article>
    `;
}

const numFormat = (num) => {
    if(num >= 1000) {
        return num/1000 + "K";
    }
    return num;
}

document.getElementById('test').addEventListener('click', () => {
    fetch('http://localhost:3001/test', {
        method: 'GET',
        credentials: 'include',
    })
    .then(response => {
        console.log(response);
    })
})