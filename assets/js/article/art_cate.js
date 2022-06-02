$(function () {
    const initArtCateList = () => {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                const htmlStr = template('tpl-table', res)
                $('tbody').empty().append(htmlStr)
            }
        })
    }

    initArtCateList()


    // 新增分类
    let indexAdd = null;
    $('#btnAddCate').on('click', function (e) {
        indexAdd = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "添加文章分类",
            content: $('#dialog-add').html()
        });
    })

    // 通过代理监听 submit 事件
    $('html').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: res => {
                // console.log(res);
                if (res.status !== 0) return layer.msg('提交列表失败！');
                layer.msg('提交列表成功！');
                initArtCateList()
                layer.close(indexAdd);

            }
        })
    })


    // 通过代理方式，为 btn-edit 按钮绑定点击事件
    let indexEdit = null;
    $("tbody").on("click", ".btn-edit", function () {
        // 弹出修改文章分类的弹窗
        indexEdit = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "修改文章分类",
            content: $("#dialog-edit").html(),
        });
        // 发起请求获取对应分类的数据
        const id = $(this).attr("data-id");
        $.ajax({
            type: 'GET',
            url: '/my/article/cates/' + id,
            success: res => {
                layui.form.val("form-edit", res.data);
            }
        })
    });

    // 文章跟新
    $('html').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) return layer.msg('列表跟新失败！');
                layer.msg('列表跟新成功！')
                initArtCateList()
                layer.close(indexEdit)
            }
        })
    })

    // 删除文章分类
    $('tbody').on('click', '.btn-delete', function (e) {
        const id = $(this).attr('data-id');
        // 提示用户是否删除
        layer.confirm('你确定删除吗？', { icon: 3, title: '删除文章列表' }, function (index) {
            $.ajax({
                type: 'GET',
                url: "/my/article/deletecate/" + id,
                success: res => {
                    if (res.status !== 0) return layer.msg('删除列表失败！')
                    layer.msg('删除列表成功！')
                    initArtCateList()
                    layer.close(index);
                }
            })
        });
    })

})