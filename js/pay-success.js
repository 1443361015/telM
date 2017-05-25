function paysuccess(){
    var payMoney = document.getElementById("payMoney"),
        num = Number(localStorage.getItem("payCount")).toFixed(2);
    payMoney.textContent = num+"元";
}
function success(){
    var succ = document.getElementsByClassName("success")[0];
    succ.onclick = function(){
        location.href = '../index.html'
    }
}
window.onload = function(){
    paysuccess();
    success();
}