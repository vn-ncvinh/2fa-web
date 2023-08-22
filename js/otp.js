var totp = new jsOTP.totp();

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('secret')) {
    const secretParam = urlParams.get('secret');
    document.getElementById("secret").value = secretParam;
    console.log(document.getElementById("secret").value);
    
}

function copyText() {
    var copyText = totp.getOtp(secret);
    navigator.clipboard.writeText(copyText);
}

function updatSecret() {
    secret = document.getElementById("secret").value.replaceAll(" ", "");
    updateTotp();
}

function updateTicker(tick) {
    document.getElementById("ticker").innerText = "Expires later: " + tick + " second";

}

function updateTotp() {
    document.getElementById("code-1").innerText = totp.getOtp(secret);
}

updatSecret();
updateTotp();

function timeLoop() {
    var epoch = Math.round(new Date().getTime() / 1000.0);
    var countDown = 30 - (epoch % 30);
    document.getElementById("timecountdown").value = 30 - countDown;
    updateTicker(countDown);
    if (epoch % 30 == 0) updateTotp();
}

setInterval(timeLoop, 1000);
