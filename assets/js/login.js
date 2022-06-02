$(function () {
    // 登录注册绑定切换事件
    $('#link_reg').click(() => {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    $('#link_login').click(() => {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    // 从 LayUI 中获取 form 对象
    const form = layui.form
    // 获取 layui 弹窗
    const layer = layui.layer;
    // 通过 form.verify() 方法自定义校验规则
    form.verify({
        // 自定义一个叫 pwd 的校验规则
        psw: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: (value) => {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            const pwd = $('#form_reg [name=password]').val();
            if (pwd !== value) return "两次密码不一致"
        }
    })

    // 设置请求根路径
    // const baseUrl = "http://www.liulongbin.top:3007"
    // 监听注册表单，发送注册请求
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name="username"]').val(),
                password: $('#form_reg [name="password"]').val()
            },
            success: (res) => {
                if (res.status !== 0) return layer.msg('注册失败！')
                layer.msg('注册成功！')
                // 注册成功后跳转到登录界面
                $('#link_login').click()
            }
        })
    })

    // 监听登录表单，发送登录请求
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status !== 0) return layer.msg('登录失败！')
                layer.msg('登录成功！')
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                // 跳转到主页
                location.href = '/index.html'
            }
        })
    })





})