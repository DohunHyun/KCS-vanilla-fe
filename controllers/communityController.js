const path = require('path');

const publicPath = path.join(__dirname, '../public');

module.exports = {
    getLogin(req, res) {
        res.sendFile(path.join(publicPath, 'html/login.html'));
    },
    getSignin(req, res) {
        res.sendFile(path.join(publicPath, 'html/signin.html'));
    },
    getProfileEdit(req, res) {
        res.sendFile(path.join(publicPath, 'html/profileEdit.html'));
    },
    getPasswordEdit(req, res) {
        res.sendFile(path.join(publicPath, 'html/passwordEdit.html'));
    },
    getBoard(req, res) {
        res.sendFile(path.join(publicPath, 'html/board.html'));
    },
    getPostWrite(req, res) {
        res.sendFile(path.join(publicPath, 'html/postWrite.html'));
    },
    getPostDetail(req, res) {
        res.sendFile(path.join(publicPath, 'html/postDetail.html'));
    },
    getPostEdit(req, res) {
        res.sendFile(path.join(publicPath, 'html/postEdit.html'));
    },
};
