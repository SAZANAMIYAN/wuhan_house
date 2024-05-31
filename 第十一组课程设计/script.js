// 获取登录表单和按钮元素
const loginForm = document.getElementById('loginForm');
const loginButton = document.querySelector('#loginForm button');

// 监听登录/注册按钮的点击事件
loginButton.addEventListener('click', function1);

// 处理登录逻辑的函数
function function1(event) {
  // 阻止表单默认提交行为
  event.preventDefault();

  // 获取输入的用户名和密码
  var usernameInput = document.getElementById('account');
  var passwordInput = document.getElementById('pwd');
  var username = usernameInput.value;
  var password = passwordInput.value;

  // 在这里执行登录逻辑，例如发送 AJAX 请求到服务器验证用户名和密码
  // 然后根据验证结果做出相应的处理

  // 示例：如果用户名和密码都是 'admin'，则登录成功，否则登录失败
  if (username === 'xiao' && password === '123456') {
    alert('登录成功');
    location.href="首页.html";
  } else {
    alert('登录失败，请检查用户名和密码');
  }
}