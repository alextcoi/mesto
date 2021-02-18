export class UserInfo {
    constructor({userName, userTitle, userAvatar}) {
        this._userName = document.querySelector(userName);
        this._userTitle = document.querySelector(userTitle);
        this._userAvatar = document.querySelector(userAvatar);
    }

    getUserInfo() {
        const name = this._userName.textContent;
        const profession = this._userTitle.textContent;
        const userData = {name, profession};
        return userData;
    }

    setUserInfo(item) {
        this._userName.textContent = item.name;
        this._userTitle.textContent = item.about;
        this._userAvatar.src = item.avatar;
        this._userAvatar.alt = item.name;
    }
}