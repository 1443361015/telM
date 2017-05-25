function btnJumpPay(){
    var btnJumpPay = document.getElementById("btnJumpPay");
    btnJumpPay.onclick = function(){
        window.location.href = 'html/pay.html';
    }
}
btnJumpPay();