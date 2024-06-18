document.getElementById('header-img').addEventListener('click', () => {
    let drop = document.getElementById('drop-down');

    if(drop.style.display == 'none') {
        drop.style.display = 'block';
    } else {
        drop.style.display = 'none';
    }
})

document.getElementById('logout').addEventListener('click', () => {
    fetch('http://localhost:3001/logout', {
        method: 'POST',
        credentials: 'include',
    })
    .then(response => {
        location.href = '/login';
    })
})