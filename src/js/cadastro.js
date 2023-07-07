import { db } from "./firebase.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

const auth = getAuth();

const signupForm = document.querySelector('#cadastroForm');

loginRedirect.addEventListener('click', function RedirectLogin() {
    window.location.href = "login.html"
})

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    let data = {
        usuario: signupForm['usuario'].value,
        email: signupForm['email'].value,
        senha: signupForm['senha'].value
    };

    createUserWithEmailAndPassword(auth, data.email, data.senha).then(async cred => {
        try {
            await setDoc(doc(db, "Users", cred.user.uid), data);
            alert("Usuário logado")
        } catch (e) { alert("Não foi possível criar a conta") }
    }).then((rs) => {
        localStorage.setItem('token', 7)
        window.location.href = "../index.html";
    })
});

function _encrypt(key, value) {
    var result = "";
    for (let i = 0; i < value.length; ++i) {
        result += String.fromCharCode(key[i % key.length] ^ value.charCodeAt(i));
    }
    return result;
}