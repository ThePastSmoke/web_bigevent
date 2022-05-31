// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter((options) => {
    // console.log(options.url);
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
    // 统一为有权限的接口，设置 headers 请求头
    if (options.url.includes('/my/')) {
        options.headers = { Authorization: localStorage.getItem('token') }
    }

    options.complete = (res) => {
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清除本地存储
            localStorage.removeItem('token')
            // 跳转到登录界面
            location.href = '/login.html'
        }
    }
})