import CONFIG from '../Config';

class AuthService {
    async login (email, password) {
        this.result = false;
        await fetch(CONFIG.API_URL + 'api/v1/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(res => res.json())
            .then((data) => {
                if (data) {
                    if (data.data.token) {
                        localStorage.setItem('user', JSON.stringify(data.data));
                    }
                    this.result = data.data;
                } else {
                    this.result = false;
                }
            })
            .catch(console.log);
        return this.result;
    }

    async logout () {
        this.result = false;
        const userJson = localStorage.getItem('user');
        if (userJson && userJson.length > 0) {
            const user = JSON.parse(userJson);
            await fetch(CONFIG.API_URL + 'api/v1/users/logout', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + user.token
                }
            })
                .then(res => res.json())
                .then((data) => {
                    if (data.status === 'success') {
                        localStorage.removeItem('user');
                        this.result = true;
                    } else {
                        this.result = false;
                    }
                })
                .catch(console.log);
        }
        return this.result;
    }

    async register (name, email, password) {
        this.result = false;
        await fetch(CONFIG.API_URL + 'api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
            .then(res => res.json())
            .then((data) => {
                if (data) {
                    if (data.data.token) {
                        localStorage.setItem('user', JSON.stringify(data.data));
                    }
                    this.result = data.data;
                } else {
                    this.result = false;
                }
            })
            .catch(console.log);
        return this.result;
    }

    getCurrentUser () {
        const user = JSON.parse(localStorage.getItem('user'));
        return user;
    }

    getAuthHeader () {
        const user = this.getCurrentUser();
        if (user) {
            return {
                'Authorization': 'Bearer ' + user.token
            }
        } else {
            return {}
        }
    }
}

export default new AuthService();
