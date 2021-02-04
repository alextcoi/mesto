export class UserInfo {
    constructor({userName, userTitle}) {
        this._userName = document.querySelector(userName);
        this._userTitle = document.querySelector(userTitle);
    }

    getUserInfo() {
        const name = this._userName.textContent;
        const profession = this._userTitle.textContent;
        const userData = {name, profession};
        return userData;
    }

    setUserInfo(item) {
        this._userName.textContent = item.form_name;
        this._userTitle.textContent = item.form_profession;
    }
}