var pwd = [];
var name = "魏哥";
function numberPad(){
    //密码错误提示
    var pwdtishi = document.getElementById("pwdtishi");
    var pay = document.getElementById("pay");
    //数字键盘1-9
    var numPwd = document.getElementsByClassName("numberPad")[0].getElementsByTagName("td");
    for(var i = 0; i < 9; i++){
        numPwd[i].index = i+1;
        numPwd[i].onclick = function(){
            console.log(this.index);
            pwd.push(this.index);
            checked();
            setTimeout("pay();",10);
            //清楚密码错误
            removePwd(pwdtishi);
        }
    }
    //按钮0
    var zero = document.getElementById("zero");
    zero.onclick = function(){
        pwd.push(0);
        checked();
        setTimeout("pay();",10);
        //清楚密码错误
        removePwd(pwdtishi);
    }
    //清除一个密码
    var clearOne = document.getElementById("clearOne");
    clearOne.onclick = function(){
        //清除一个密码
        removeChecked();
        //清楚密码错误
        removePwd(pwdtishi);
    }
    //关闭支付密码
    var closePay = document.getElementById("closePay");
    closePay.onclick = function(){
        pay.style.display = "none";
        pay.innerHTML = '';
    }
}
function checked(){
    var inPwd = document.getElementsByName("pwd");
    inPwd[pwd.length - 1].checked = true;
}
 //清除一个密码
function removeChecked(){
    pwd.pop();
    var inPwd = document.getElementsByName("pwd");
    inPwd[pwd.length].checked = false;
}
function pay(){
    //密码长度是否等于6
    if(pwd.length == 6){
        //密码正确
        if(pwd.join("") == "123456"){
            var payCount = document.getElementById("payCount");
            localStorage.setItem("payCount",payCount.value);
            window.location.href = '../html/pay-success.html';
        }
        //密码错误
        else{
            var pwdtishi = document.getElementById("pwdtishi");
            pwd = [];
            button(pwdtishi,"密码输入错误");
            //密码错误，清除所有
            var inPwd = document.getElementsByName("pwd"),
                inPwd_leng = inPwd.length;
            for(let i = 0; i < inPwd_leng; i++){
                inPwd[i].checked = false;
            }
        }
    }
}

function main(){
    var backOff = document.getElementById("backOff"),
        btnPay = document.getElementById("btnPay"),
        pay = document.getElementById("pay"),
        payCount = document.getElementById("payCount");
    //focus文本框，清楚错误信息
    payCount.onfocus = function(){
        if(/^[0-9]+(.[0-9]{1,2})?$/.test(payCount.value)){
            
        }
        removeerror(payCount);
    }
    //后退，返回
    backOff.onclick = function(){
        history.back();
    }
    //支付
    btnPay.onclick = function(){
        if(payCount.value > 0){
        var money = Number(payCount.value).toFixed(2);
        //生成支付界面
        pay.innerHTML = `
<div class="pwd">
            <div class="title">
                <i id="closePay" class="leftbtn">×</i>
                <label>请输入支付密码</label>
            </div>
            <div class = "info">
                <p>向${name}转账</p>
                <span>￥${money}</span>
            </div>
            <ul>
                <li id="pwdtishi">
                    <input name="pwd" type="checkbox" >
                    <i></i>
                </li>
                <li>
                    <input  name="pwd" type="checkbox">
                    <i></i>
                </li>
                <li>
                    <input name="pwd" type="checkbox">
                    <i></i>
                </li>
                <li>
                    <input name="pwd" type="checkbox">
                    <i></i>
                </li>
                <li>
                    <input name="pwd" type="checkbox">
                    <i></i>
                </li>
                <li>
                    <input name="pwd" type="checkbox">
                    <i></i>
                </li>
            </ul>
        </div>
        <nav class="numberPad">
            <table>
                <tr>
                    <td id="one">1</td>
                    <td id="two">2</td>
                    <td id="three">3</td>
                </tr>
                <tr>
                    <td id="four">4</td>
                    <td id="five">5</td>
                    <td id="six">6</td>
                </tr>
                <tr>
                    <td id="seven">7</td>
                    <td id="eight">8</td>
                    <td id="Nine">9</td>
                </tr>
                <tr>
                    <td></td>
                    <td id="zero">0</td>
                    <td id="clearOne">←</td>
                </tr>
            </table>
        </nav>
        `;
        pay.style.display = "block";
        numberPad();
        }else{
            button(btnPay,"金额不能小于0")
        }
    }
}
//提示错误
function button(nid,titel){
    var erroNode = nid.parentElement.firstElementChild,
        nidvalue = nid.value;
    //已有错误信息
    if(erroNode.tagName.toLowerCase() == "p"){
        //返回
        return;
    }
    var errorNode = document.createElement("p");
    var errorTxt = document.createTextNode(titel);
    errorNode.appendChild(errorTxt);
    var formLine = nid.parentElement;
    // 错误信息插入容器
    var insertPos = formLine.firstChild;
    // 在这行div的开头插入错误信息
    formLine.insertBefore(errorNode,insertPos);
    removeerror(nid);
}
//清除错误
function removeerror(nid){
    nid.onfocus = function(){
        var erroNode = this.parentElement.firstElementChild;
        if(erroNode.tagName.toLowerCase() == "p") {
            erroNode.remove();
        }
    }
}
//清除密码错误
function removePwd(nid){
        var erroNode = nid.parentElement.firstElementChild;
        if(erroNode.tagName.toLowerCase() == "p") {
            erroNode.remove();
        }
}
main();