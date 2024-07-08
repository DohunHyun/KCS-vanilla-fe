document.addEventListener("DOMContentLoaded", () => {
    const postId = window.location.pathname.split('/')[2];

    // 게시글 내용 불러오기
    fetch(`http://localhost:8080/posts/${postId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
        }
    })
    .then( res => res.json() )
    .then( items => {
        const container = document.getElementById('post');
        container.innerHTML = createPostDetail(items);
        loadComment();
    });

    const createPostDetail = item => {
        return `
            <div class="title">
                <p><b>${item.title}</b></p>
            </div>
            <div class="post-header">
                <div class="writer-info">
                    <div class="writer-img">
                        <img class="writer-img" src="../sources/${item.userImage}">
                    </div>
                    <div class="writer-name">
                        <p id='writer-name'><b>${item.userNickname}</b></p>
                    </div>
                    <div class="write-time">
                        <p>2${item.time}</p>
                    </div>
                </div>
                <div>
                    <button id="post-modify-btn" class="btn">수정</button>
                    <button id="post-delete-btn" class="btn">삭제</button>
                </div>
            </div>
            <hr class="inbody-hr">
            <div class="post-body">
                <img class="post-img" src="../sources/${item.image}">
                <div class="post-content">
                    <p>
                        ${item.content}
                    </p>
                </div>
                <div class="post-info">
                    <div class="info">
                        <p><b>${item.viewCnt}<br>조회수</b></p>
                    </div>
                    <div class="info">
                        <p><b>${item.commentCnt}<br>댓글</b></p>
                    </div>
                </div>
            </div>
        `;
    }

    // 댓글 정보 불러오기
    function loadComment() {
        fetch( `http://localhost:8080/posts/comments/${postId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
        .then( res => res.json() )
        .then( items => {
            createComment(items.filter(item => item.postId == postId));
        }).then(()=>init());

        const createComment = (comments) => {
            comments.forEach(element => {
                const container = document.getElementById('comment-list');
                container.innerHTML += makeCommentTag(element);
            });
        };
    }

    const makeCommentTag = (item) => {
        return `
            <div id="comment-${item.id}" class="comment">
                <div style="display:none">${item.id}</div>
                <div class="comment-info">
                    <img class="writer-img" src="${item.userImage}">
                    <div class="comment-text">
                        <div class="cmt-writer-info">
                            <div>
                                <p><b>${item.userNickname}</b></p>
                            </div>
                            <div>
                                <p>${item.time}</p>
                            </div>
                        </div>
                        <div class="cmt-detail">
                            <p>${item.content}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <button id="comment-modify-btn" class="btn comment-modify-btn">수정</button>
                        <button id="comment-delete-btn" class="btn comment-delete-btn">삭제</button>
                    </div>
                </div>
            </div>
        `;
    }
    
})

window.onload = function() {

}

const init = () => {
    const postModifyBtn = document.getElementById('post-modify-btn');
    const postDeleteBtn = document.getElementById('post-delete-btn');
    const commentModifyBtn = document.getElementsByClassName('comment-modify-btn');
    const commentDeleteBtn = document.getElementsByClassName('comment-delete-btn');
    const postDeleteModal = document.getElementById('post-modal');
    const commentDeleteModal = document.getElementById('comment-modal');
    const postModalCancelBtn = document.getElementById('post-modal-cancel-btn');
    const postModalConfirmBtn = document.getElementById('post-modal-confirm-btn');
    const commentModalCancelBtn = document.getElementById('comment-modal-cancel-btn');
    const commentModalConfirmBtn = document.getElementById('comment-modal-confirm-btn');

    const commentInput = document.getElementById('comment-input');
    const commentBtn = document.getElementById('comment-btn');
    const commentModifyFetchBtn = document.getElementById('comment-modify-btn');
    let commentFlag = false;

    const writerName = document.getElementById('writer-name');

    document.getElementById('prev-btn').addEventListener('click', function() {
        location.href='/board';
    })

    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    // 게시글 수정 버튼
    postModifyBtn.addEventListener('click', () => {
        fetch(`http://localhost:8080/posts/check-writer/post/${postId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            }
        }).then(res => {
            if(!res.ok) {
                alert('게시글 작성자가 아닙니다.');
            } else {
                location.href = `/postEdit?postId=${postId}`;
            }
        });
    })

    // 게시글 삭제 버튼
    postDeleteBtn.addEventListener('click', () => {
        fetch(`http://localhost:8080/posts/check-writer/post/${postId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            }
        }).then(res => {
            if(!res.ok) {
                alert('게시글 작성자가 아닙니다.');
            } else {
                postDeleteModal.classList.add('on');
            }
        });
    })

    postModalCancelBtn.addEventListener('click', () => {
        postDeleteModal.classList.remove('on');
    })

    // 게시물 삭제 모달 > 확인 버튼
    postModalConfirmBtn.addEventListener('click', () => {
        deletePost();
    })

    // 댓글 등록 버튼
    commentBtn.addEventListener('click', () => {
        postComment();
    });

    // 댓글 수정 버튼
    Array.from(commentModifyBtn).forEach( item => {
        item.addEventListener('click', () => {
            let commentId = item.parentNode.parentNode.parentNode.firstElementChild.innerText;
            fetch(`http://localhost:8080/posts/check-writer/comment/${commentId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            }).then(res => {
                if(!res.ok) {
                    alert('댓글 작성자가 아닙니다.');
                } else {
                    let commentText = item.parentNode.parentNode.previousElementSibling.lastElementChild;
                    var prevText = commentText.lastElementChild.firstElementChild.innerText;
                    document.getElementById('comment-input').value = prevText;
                    document.getElementById('comment-input').focus();

                    commentBtn.style.display = 'none';
                    commentModifyFetchBtn.style.display = 'block';

                    // selectedCommentId = item.parentNode.parentNode.parentNode.id.split("-")[1];
                    selectedCommentId = commentId;
                }
            });
        })
    })

    // 댓글 수정 등록 버튼
    commentModifyFetchBtn.addEventListener('click', () => {
        putComment();
    })

    let selectedCommentId = 0;

    // 댓글 삭제 버튼
    Array.from(commentDeleteBtn).forEach( item => {
        item.addEventListener('click', () => {
            let commentId = item.parentNode.parentNode.parentNode.firstElementChild.innerText;
            fetch(`http://localhost:8080/posts/check-writer/comment/${commentId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            }).then(res => {
                if(!res.ok) {
                    alert('댓글 작성자가 아닙니다.');
                } else {
                    selectedCommentId = commentId;
                    commentDeleteModal.classList.add('on');
                }
            });
        })
    })

    commentModalCancelBtn.addEventListener('click', () => {
        commentDeleteModal.classList.remove('on');
    })

    // 댓글 삭제 모달 > 확인 버튼
    commentModalConfirmBtn.addEventListener('click', () => {
        deleteComment();
    })

    // 댓글 유효성 검사
    commentInput.addEventListener('keyup', () => {
        commentFlag = false;
        if(commentInput.value.length == 0) {

        } else {
            commentFlag = true;
        }
        btnActive();
    })

    const btnActive = () => {
        if(commentFlag) {
            commentBtn.classList.remove('btn-inactive');
            commentBtn.classList.add('btn-active');
            commentModalConfirmBtn.classList.remove('btn-inactive');
            commentModalConfirmBtn.classList.add('btn-active');
            return true;
        } else {
            commentBtn.classList.add('btn-inactive');
            commentBtn.classList.remove('btn-active');
            commentModalConfirmBtn.classList.add('btn-inactive');
            commentModalConfirmBtn.classList.remove('btn-active');
            return false;
        }
    }

    const postId = window.location.pathname.split('/')[2];

    const deletePost = () => {
        fetch(`http://localhost:8080/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            },
        })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .then(window.location.href = `/postDetail/${postId}`);
    }

    const postComment = () => {
        fetch(`http://localhost:8080/posts/comments/${postId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            },
            body: JSON.stringify({
                'postId': postId,
                'content': commentInput.value,
                'time': "2024-04-20T00:00:00"
            })
        })
        .then((response) => {
            if(response.ok) {
                alert("댓글이 등록되었습니다.");
                location.href = `/postDetail/${postId}`;
            }
        })
    }

    const deleteComment = () => {
        fetch(`http://localhost:8080/posts/comments/${selectedCommentId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .then(window.location.href = `/postDetail/${postId}`);
    }

    const putComment = () => {
        fetch(`http://localhost:8080/posts/comments/${selectedCommentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`

            },
            body: JSON.stringify({
                'content': commentInput.value,
                'time': "2024-07-08T00:00:00",
            })
        })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .then(window.location.href = `/postDetail/${postId}`);
    }
}

