$(function () {
    const form = layui.form
    form.verify({
        nickname: (val) => {
            if (val.length > 6) return '昵称长度必须在 1 ~ 6 个字符之间！'
        }
    })

    // 获取用户信息
    const initUserInfo = () => {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: (res) => {
                if (res.status !== 0) return layer.msg('获取用户信息失败')
                // console.log(res);
                // 为表单指定 lay-filter 属性
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 重置功能
    $('#btnReset').on('click', (e) => {
        e.preventDefault()
        initUserInfo()
    })

    // 更新用户数据
    $('.layui-form').on('submit', (e) => {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(".layui-form").serialize(),
            success: res => {
                if (res.status !== 0) return layer.msg('获取用户信息失败！')
                // layer.msg('获取用户信息成功！')
                window.parent.geiUserInfo()
            }
        })
    })


    initUserInfo()
})