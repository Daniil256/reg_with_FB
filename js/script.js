let SessionData = {};
let userData = {};
const form = document.querySelector('.contacts')
const msg = form.querySelector('.msg')
const reg = form.querySelector('.reg')
const log = form.querySelector('.log')
const logout = form.querySelector('.logout')
const text = form.querySelector('.text')
const email = form.querySelector('.email')
const pass = form.querySelector('.pass')
const confirm_pass = form.querySelector('.confirm_pass')
const LocalData = JSON.parse(localStorage.getItem('storage'));
const elements = form.querySelectorAll('input');

// Вывод сообщения
msg.innerHTML = localStorage.getItem('msg');

// Кнопка регистрации
reg.onclick = function () {
    if (localStorage.getItem('fblst_1032700894249608')) {
        return msg.innerHTML = 'Вы уже вошли в аккаунт';
    };

    if (text.value == '') {
        return msg.innerHTML = 'Введите логин';
    };

    if (email.value == '') {
        return msg.innerHTML = 'Введите email';
    };

    if (pass.value == '') {
        return msg.innerHTML = 'Введите пароль';
    };

    if (pass.value != confirm_pass.value) {
        return msg.innerHTML = 'Пароли не совпадают';
    };

    if (elements.value != '') {
        for (let i = 0; i < elements.length; i++) {
            userData = Object.assign({ [elements[i].name]: elements[i].value, ...userData });
        };

        localStorage.setItem('storage', JSON.stringify(userData));
        console.log('localStorage:', userData);
        msg.innerHTML = ''
        return false;
    };
};
// Кнопка входа
log.onclick = function () {
    if (localStorage.getItem('fblst_1032700894249608')) {
        return msg.innerHTML = 'Вы уже вошли в аккаунт';
    };

    if (text.value == '') {
        return msg.innerHTML = 'Введите логин';
    };

    if (pass.value == '') {
        return msg.innerHTML = 'Введите пароль';
    };

    if (elements[0].value != '' && elements[2].value != '') {
        for (let i = 0; i < elements.length; i++) {
            userData = Object.assign({
                [elements[i].name]: elements[i].value, ...userData
            });
        }

        localStorage.setItem('storage', JSON.stringify(userData));
        console.log('localStorage:', userData);
        msg.innerHTML = ''
        return false;
    };
};
// кнопка выхода из акккаунта
logout.onclick = function () {
    if (localStorage.getItem('fblst_1032700894249608')) {
        FB.logout();
    };

    localStorage.clear();
    sessionStorage.clear();
    userData = null;
    SessionData = null;
    msg.innerHTML = '';

    for (let i = 0; i < elements.length; i++) {
        elements[i].value = '';
    };
};


// Facebook
function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    console.log(response);                   // The current login status of the person.
    if (response.status === 'connected') {   // Logged into your webpage and Facebook.
        testAPI();
        localStorage.removeItem("storage");
        msg.innerHTML = '';
        sessionStorage.setItem('token', response.authResponse.accessToken);
    }

    return response;
}

function checkLoginState() {               // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function (response) {   // See the onlogin handler
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function () {
    FB.init({
        appId: '1032700894249608',
        cookie: true,                     // Enable cookies to allow the server to access the session.
        xfbml: true,                      // Parse social plugins on this webpage.
        version: 'v12.0'                  // Use this Graph API version for this call.
    });
    FB.AppEvents.logPageView();
    FB.getLoginStatus(function (response) {   // Called after the JS SDK has been initialized.
        statusChangeCallback(response);        // Returns the login status.
    });
};

function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    FB.api('/me', function (response) {
        console.log('Successful login for: ' + response.name);
        msg.innerHTML =
            'Вы вошли как  ' + response.name;
    });
}

; (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));