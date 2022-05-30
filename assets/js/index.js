
// 获取用户信息
function geiUserInfo() {
    $.ajax({
        type: "GET",
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: (res) => {
            if (res.status !== 0) return layer.msg('获取用户信息失败！')
            layer.msg('获取用户信息成功！')
            renderAvatar(res.data)
        }
    })
}


// 渲染用户头像
const renderAvatar = (user) => {
    // console.log(user);
    // 获取用户名字
    let uanme = user.nickname || user.username
    // 设置欢迎文本
    $('#welcome').html(`欢迎 ${uanme}`)

    // 按需渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src', user.user_pic).show()
    } else {
        // 渲染文本头像
        $('.text-avatar').html(uanme[0].toUpperCase()).show()
        $('.layui-nav-img').hide()
    }
}

// 退出登录

$('#btnLogout').on('click', function () {
    layui.layer.confirm("确定退出登录？", { icon: 3, title: "" }, function (index) {
        // 清空本地存储里面的 token
        localStorage.removeItem('token')
        // 重新跳转到登录页面
        location.href = '/login.html'
    }
    );
})
geiUserInfo()