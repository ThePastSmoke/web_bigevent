$(function () {
    const form = layui.form
    form.verify({
        wpd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        samePwd: (value) => {
            if (value === $('[name=oldPwd]').val()) return '新旧密码不能一致！'
        },
        rePwd: (value) => {
            if (value !== $('[name=newPwd]').val()) return '两次密码输入不一致！'
        }
    })

    // 跟新密码
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) return layer.msg('修改密码失败！')
                localStorage.removeItem('token')
                window.parent.location.href = '/login.html'
            }
        })
    })
})