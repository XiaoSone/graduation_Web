<template>
    <div>
        <header class="am-topbar am-topbar-fixed-top">
            <div class="am-container">
                <h1 class="am-topbar-brand">
                    <label>毕业设计（论文）管理系统</label>
                </h1>
            </div>
        </header>

        <div id="login_imgDiv" class="am-panel am-panel-default am-u-lg-12">
            <div class="am-panel-bd">
                <div id="login_div" class="am-fr">
                    <section class="am-panel am-panel-default">
                        <header class="am-panel-hd">
                            <h3 class="am-panel-title" style="text-align: center;">账号密码登录</h3>
                        </header>
                        <div class="am-panel-bd">
                            <form class="am-form tpl-form-line-form">
                                <div class="am-form-group am-input-group">
                                    <span class="am-input-group-label"><i class="am-icon-user am-icon-fw"></i></span>
                                    <input v-model="account" type="text" class="tpl-form-input" id="user-account" placeholder="请输入账号">
                                </div>
                                <div class="am-form-group am-input-group">
                                    <span class="am-input-group-label"><i class="am-icon-lock am-icon-fw"></i></span>
                                    <input v-model="password" type="password" class="tpl-form-input" id="user-password" placeholder="请输入密码">
                                </div>
                                <div class="am-form-group am-cf am-form-icon am-form-feedback">
                                    <div class="am-fl" style="width: 56%;">
                                        <input v-model="randStr" id="randStr" type="text" class="tpl-form-input" placeholder="请输入验证码">
                                    </div>
                                    <div class="am-fl" style="margin: 3px 0 0 5px;">
                                        <img id="imgValidate"  style="width: 86px;" :src="captchaImage" @click="refresh()" title="看不清可单击图片刷新">
                                        <a id="imgValidate_a" href="#" class="am-fr" style="margin: 3px 0 0 3px;" @click="refresh()">看不清</a>
                                    </div>
                                </div>
                                <div class="am-form-group">
                                    <button id="login_btn" @click="login" type="button" class="am-btn am-btn-primary  am-btn-block tpl-btn-bg-color-success  tpl-login-btn">登录</button>
                                </div>
                                <div class="am-form-group tpl-login-remember-me" style="display: inline;">
                                    <input id="remember-me" type="checkbox">
                                    <label for="remember-me">记住密码</label>
                                </div>
                                <span class="am-fr detail-p" style="color: #999;position: relative;top: -30px;">忘记密码请联系管理员</span>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </div>

        <div class="am-u-lg-7" style="margin-top: 10px;" >
            <div class="am-panel am-panel-default" style="border-radius: 6px;">
                <header class="am-panel-hd">
                    <h3 class="am-panel-title">通知公告</h3>
                </header>
                <ul id="inform_ul" class="am-list am-list-border"></ul>
                <div class="am-panel-footer" style="text-align: right;">
                    <a href="javascript:;" id="inform_many_a">
                        <span style="margin-right: 5px;">查看更多通知公告请点击</span>
                        <span class="am-icon-angle-double-right am-icon-sm"></span>
                    </a>
                </div>
            </div>
        </div>
        <div class="am-u-lg-5" style="margin-top: 10px;" >
            <div class="am-panel am-panel-default" style="border-radius: 6px;">
                <header class="am-panel-hd">
                    <h3 class="am-panel-title">文件下载</h3>
                </header>
                <ul id="down_ul" class="am-list am-list-border"></ul>
                <div class="am-panel-footer" style="text-align: right;">
                    <a href="javascript:;" id="down_many_a">
                        <span style="margin-right: 5px;">查看更多文件下载请点击</span>
                        <span class="am-icon-angle-double-right am-icon-sm"></span>
                    </a>
                </div>
            </div>
        </div>

        <div>
            <div class="am-g am-container">
                <div class="am-u-lg-12">
                    <footer data-am-widget="footer" class="am-footer am-footer-default">
                        <div class="am-footer-switch"></div>
                        <div class="am-footer-miscs ">
                            <p>
                                由 <a href="https://github.com/XiaoSone" title="XiaoSon" target="_blank">XiaoSon</a>
                                提供技术支持
                            </p>
                            <p>copyright &copy; 2018-2024, All Rights Reserved.</p>
                        </div>
                    </footer>
                </div>
            </div>
        </div>

        <div data-am-widget="gotop" class="am-gotop am-gotop-fixed" >
            <a href="#top" title="回到顶部">
                <span class="am-gotop-title">回到顶部</span>
                <i class="am-gotop-icon am-icon-chevron-up"></i>
            </a>
        </div>

        <div>
            <div class="am-modal am-modal-no-btn" tabindex="-1" id="inform-modal">
                <div class="am-modal-dialog">
                    <span id="modal_title" class="am-modal-hd"></span>
                    <span class="am-text-sm"></span>
                    <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>
                    <div id="model_body" class="am-modal-bd am-text-left" ></div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import '@/assets/amazeui/js/amazeui.min.js';
    import '@/assets/js/crypto-js.js';
    import '@/assets/js/util.js';
    import axios from 'axios';

export default {
    // mounted() {
    //     // let script = document.createElement('script');
    //     // script.src = '../assets/js/login.js';
    //     // script.type = 'text/javascript';
    // },
    data() {
        return {
            account: '',
            password: '',
            randStr: '',
            captchaImage: '',
            session_key: ''
        };
    },
    methods: {
        refresh() {
            axios.get('/captcha?' + Date.now(), {
                responseType: 'blob',
                withCredentials: true
            }).then(response => {
                // 获取返回的图片 URL
                const imageURL = URL.createObjectURL(response.data);
                this.captchaImage = imageURL;
            });
        },
        login() {
            if (!this.account || !this.password || !this.randStr) {
                this.refresh();
            }
            axios.post('/userController/login', {
                randStr: this.randStr,
                account: this.account,
                password: this.password
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                withCredentials: true
            }).then(res=> {
                if (res.data === 'randStrError') {
                    console.log('验证码错误');
                } else if (res.data === '用户名或密码错误') {
                    console.log('账号或密码错误');
                } else {
                    console.log(res.data);
                    this.$router.push({path: res.data});
                }
            })
        },
        getSubInform() {
            axios.get('/informController/getSubInform', {
                params: {
                    pageNum: '1',
                    pageSize: '6',
                    navigatePages: '1'
                }
            }).then(res => {
                const data = res.data;
                for (let i = 0; i < 6; i++) {
                    const times = data.list[i].createDate;
                    const a = document.createElement('a');
                    a.href = '#';
                    a.classList.add('am-text-truncate');

                    const spanTitle = document.createElement('span');
                    spanTitle.textContent = data.list[i].informTitle;
                    a.appendChild(spanTitle);

                    const spanDate = document.createElement('span');
                    spanDate.textContent =(new Date(times).getFullYear()) + '-' + String(new Date(times).getMonth() + 1).padStart(2, '0') + '-' + String(new Date(times).getDate()).padStart(2, '0');
                    a.appendChild(spanDate);

                    const spanId = document.createElement('span');
                    spanId.textContent = data.list[i].informId;
                    spanId.style.display = 'none';
                    a.appendChild(spanId);

                    a.addEventListener('click', function () {
                        axios.get('/informController/getSubInformById', {
                            params: {
                                informId: spanId.textContent
                            }
                        }).then(response => {
                            document.getElementById('model_body').innerHTML = response.data.informBody;
                        });
                        // eslint-disable-next-line no-undef
                        $('#inform-modal').modal('open');
                        return false;
                    });

                    const li = document.createElement('li');
                    li.appendChild(a);
                    document.getElementById('inform_ul').appendChild(li);
                }
            })
        },
        getSubDown() {
            axios.get('/downController/getSubDown', {
                params: {
                    pageNum: '1',
                    pageSize: '6',
                    navigatePages: '1'
                }
            }).then(res => {
                const data = res.data;
                for (let i = 0; i < 6; i++) {
                    const times = data.list[i].createDate;
                    const a = document.createElement('a');
                    a.href = '#';
                    a.classList.add('am-text-truncate');

                    const spanTitle = document.createElement('span');
                    spanTitle.textContent = data.list[i].downTitle;
                    a.appendChild(spanTitle);

                    const spanDate = document.createElement('span');
                    spanDate.textContent = (new Date(times).getFullYear()) + '-' + String(new Date(times).getMonth() + 1).padStart(2, '0') + '-' + String(new Date(times).getDate()).padStart(2, '0');
                    a.appendChild(spanDate);

                    const spanPath = document.createElement('span');
                    spanPath.textContent = data.list[i].downPath;
                    spanPath.style.display = 'none';
                    a.appendChild(spanPath);

                    const fileName = data.list[i].downPath;
                    console.log(fileName);
                    if (fileName != null && fileName !== '') {
                        axios.get('/downController/downloadResource', {
                            params: {
                                fileName: fileName
                            },
                            responseType: 'blob'
                        }).then(response => {
                            const blob = new Blob([response.data]);
                            const url = window.URL.createObjectURL(blob);
                            a.href = url;
                            a.download = fileName;
                        })
                    }

                    const li = document.createElement('li');
                    li.appendChild(a);
                    document.getElementById('down_ul').appendChild(li);
                }
            }
            )
        }
    },
    created() {
        this.refresh();
        this.getSubInform();
        this.getSubDown();
    }
}
</script>

<style  scoped>
    @import '../assets/css/login.css';
    @import '../assets/amazeui/css/amazeui.min.css';
    @import '../assets/amazeui/css/amazeui.flat.min.css';
    @import '../assets/css/pagination.css';
    @import '../assets/amazeui/css/admin.css';
</style>
