function checkInput() {
    $("#password_hidden").val(encrypt($("#password").val()));
    return true;
}
function encrypt(word){
    var key = CryptoJS.enc.Utf8.parse("abcdefgabcdefg13");
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
}