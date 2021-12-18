//const bcrypt = require('bcrypt');
const generatePassword = document.getElementById("generatePassword");
const storePassword = document.getElementById("storePassword");
const encryptPassword = document.getElementById("encryptPassword");
const passwordKeyword = document.getElementById("passwordKeyword");
const keyword = document.getElementById("keyword");
const search = document.getElementById("search");
const passwordLength = document.getElementById('passwordLength');
const alerts = document.getElementById('alerts');

var temp;

generatePassword.addEventListener('click', ()=>{
    let generatedPassword = GeneratePassword(passwordLength.value);
     navigator.clipboard.writeText(generatedPassword).then(
        cliptext => alerts.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">Password generated successfully. Password copied in clipboard. <strong><a href="#" class="alert-link"data-toggle="tooltip" data-placement="top" title=${generatedPassword}>Show</a></strong> <i class=" fa-check"></i>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`)
    temp = generatedPassword;
});

storePassword.addEventListener('click', ()=>{
    StorePassword(temp, passwordKeyword.value, "non-encrypted");  
});
search.addEventListener('click', ()=>{
    GetPassword(keyword.value);
});

const GeneratePassword=(passwordLength)=>{
    const numbersAndLetters = ['a', 'b', 'c', 'd', 'f', 'g', 'h', 'i', 'j', "k", 'l', 'm', 'n', 'ñ',
     'o', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '@', '#', '$', 
     '%', '&', '*', '!', '~', '+', '?', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']
    return numbersAndLetters.sort(()=>{return 0.5 - Math.random()}).slice(0, passwordLength).join("");
}
const EncryptPassword=(password)=>{
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            return hash
        });
    });
}
const StorePassword=(password, secretWord, type)=>{
    let data = [password, secretWord, type];
    if (secretWord == "") {
        alerts.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">Keyword is empty!
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`
    }else{
        localStorage.setItem(secretWord, data);
        alerts.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">Password Saved succesfully!
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`
    }

}
function GetPassword(secretWord){
    let savedItem = localStorage.getItem(secretWord);
    if(savedItem == null) return alerts.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">Unable to find <strong>${secretWord}</strong>. Please try another one.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`;
    let item = savedItem.split(",")
    if(item[2] == "encrypted"){
        bcrypt.compare(item[1], hash, function(err, result) {
            return result;
        });
    }else{
       return navigator.clipboard.writeText(item[0]).then(
            cliptext => alerts.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">Password copied in clipboard.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`
         )
    }
    
}

