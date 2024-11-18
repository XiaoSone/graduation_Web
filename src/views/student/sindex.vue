<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <header class="am-topbar am-topbar-inverse admin-header">
            <div class="am-topbar-brand">
                <a href="javascript:;" style="padding-left: 18px; color: #3599d6" class=""><strong>毕业设计（论文）管理系统</strong></a>
            </div>
            <div>
                <a href="javascript:;">
                    <span class="am-icon-list tpl-header-nav-hover-ico am-fl am-margin-right"></span>
                </a>
            </div>
            <button class="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-success am-show-sm-only" data-am-collapse="{target: '#topbar-collapse'}">
                <span class="am-sr-only">导航切换</span>
                <span class="am-icon-bars"></span>
            </button>
            <div class="am-collapse am-topbar-collapse" id="topbar-collapse">
                <ul class="am-nav am-nav-pills am-topbar-nav am-topbar-right admin-header-list tpl-header-list">
                    <li class="am-dropdown" data-am-dropdown data-am-dropdown-toggle>
                        <a @click="showfile" class="tpl-header-list-link" href="javascript:;" id="open_file_btn" style="outline: none"> <span class="am-icon-cloud-upload"></span> 上传论文 </a>
                    </li>

                    <li class="am-dropdown" data-am-dropdown data-am-dropdown-toggle>
                        <a class="am-dropdown-toggle tpl-header-list-link" href="javascript:;">
                            <span class="tpl-header-list-user-nick" id="loginName"></span>
                            <span class="tpl-header-list-user-ico">
                                <img id="userPortrait" src="" />
                            </span>
                        </a>
                        <ul class="am-dropdown-content">
                            <li>
                                <a id="userInfo_a" @click="showInfo" style="outline: none">
                                    <span class="am-icon-user"></span>
                                    信息
                                </a>
                            </li>
                            <li>
                                <a id="update_password" @click="showUpdatePassword" style="outline: none"> <span class="am-icon-edit"></span> 修改密码</a>
                            </li>
                            <li>
                                <a @click="logout" style="outline: none"> <span class="am-icon-power-off"></span> 退出</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a @click="logout" class="tpl-header-list-link"> <span class="am-icon-sign-out tpl-header-list-ico-out-size"></span></a>
                    </li>
                </ul>
            </div>
        </header>
        <div class="tpl-page-container tpl-page-header-fixed">
            <div class="tpl-left-nav tpl-left-nav-hover">
                <div class="tpl-left-nav-title">功能列表</div>
                <div class="tpl-left-nav-list">
                    <ul class="tpl-left-nav-menu">
                        <li class="tpl-left-nav-item">
                            <router-link to="/scontent" class="nav-link active link_a" target="iframe_a"> <i class="am-icon-home"></i> <span>首页</span> </router-link>
                        </li>
                        <li class="tpl-left-nav-item">
                            <router-link to="/schoose" class="nav-link link_a" target="iframe_a"> <i class="am-icon-check-square-o"></i> <span>选择课题</span> </router-link>
                        </li>
                        <li class="tpl-left-nav-item">
                            <a href="javascript:void(0);" class="nav-link tpl-left-nav-link-list left-nav-link">
                                <i class="am-icon-tasks"></i> <span>流程管理</span>
                                <i class="am-icon-angle-right tpl-left-nav-more-ico am-fr am-margin-right"></i>
                            </a>
                            <ul class="tpl-left-nav-sub-menu">
                                <li>
                                    <router-link to="/sktbg" class="link_a" target="iframe_a"> <i class="am-icon-angle-right"></i> <span>开题报告</span> </router-link>
                                    <router-link to="/szqjc" class="link_a" target="iframe_a"> <i class="am-icon-angle-right"></i> <span>中期检查</span> </router-link>
                                    <router-link to="/smdb" class="link_a" target="iframe_a"> <i class="am-icon-angle-right"></i> <span>免答辩申请</span> </router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="tpl-left-nav-item">
                            <a href="javascript:void(0);" class="nav-link tpl-left-nav-link-list left-nav-link">
                                <i class="am-icon-wpforms"></i> <span>查看信息</span>
                                <i class="am-icon-angle-right tpl-left-nav-more-ico am-fr am-margin-right"></i>
                            </a>
                            <ul class="tpl-left-nav-sub-menu">
                                <li>
                                    <router-link to="/sdbinfo" class="link_a" target="iframe_a"> <i class="am-icon-angle-right"></i> <span>答辩/验收信息</span> </router-link>
                                    <router-link to="/score" class="link_a" target="iframe_a"> <i class="am-icon-angle-right"></i> <span>得分信息</span> </router-link>
                                    <router-link to="/smdbinfo" class="link_a" target="iframe_a"> <i class="am-icon-angle-right"></i> <span>免答辩申请结果</span> </router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="tpl-left-nav-item">
                            <router-link to="/sdownload" class="nav-link tpl-left-nav-link-list link_a" target="iframe_a"> <i class="am-icon-download"></i> <span>表格材料下载</span> </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <!--begin  -->
            <div class="tpl-content-wrapper">
                <router-view></router-view>
            </div>
            <!--end  -->
        </div>
        <!-- <div>
			<div class="am-g" style="position: fixed; bottom: 0">
				<div class="am-u-lg-12">
					<footer data-am-widget="footer" class="am-footer am-footer-default" style="border-radius: 6px">
						<div class="am-footer-switch"></div>
						<div class="am-footer-miscs">
							<p>
								由
								<a href="https://github.com/XiaoSone" title="XiaoSon" target="_blank">XiaoSon</a>
								提供技术支持
							</p>
							<p>copyright &copy; 2018-2024, All Rights Reserved.</p>
						</div>
					</footer>
				</div>
			</div>
		</div> -->
        <div class="am-modal am-modal-no-btn" tabindex="-1" id="file-modal">
            <div class="am-modal-dialog">
                <div class="am-modal-hd">上传论文<small>(文件大小不要超过10M)</small><a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a></div>
                <div class="am-modal-bd">
                    <form id="upload_form" class="am-form am-form-horizontal">
                        <!-- 		<form class="am-form am-form-horizontal"> -->
                        <input type="hidden" id="user_id" name="userId" />
                        <div class="am-form-group am-form-file" style="margin-top: 30px">
                            <label for="doc-ipt-file-2" class="am-u-sm-3 am-form-label">选择文件</label>
                            <div class="am-u-sm-9">
                                <button type="button" class="am-btn am-btn-default am-btn-sm" style="float: left"><i class="am-icon-cloud-upload"></i> 选择你的论文</button>
                                <div id="file-list" style="float: left; margin: 2px 0 0 10px"></div>
                            </div>
                            <input type="file" id="doc-ipt-file-2" name="lunwen" @change="showFileName" />
                        </div>
                        <span @click="uploadLunwen" type="button" id="lunwen_uploadBtn" style="margin-top: 25px" class="am-btn am-btn-primary am-btn-block"> 点击完成上传 </span>
                        <div class="am-progress am-progress-striped am-progress-sm am-active">
                            <div id="progress_div" class="am-progress-bar am-progress-bar-secondary" style="width: 0%; display: none"></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="am-modal am-modal-alert" tabindex="-1" id="userInfo-modal">
            <div class="am-modal-dialog">
                <div class="am-modal-hd">
                    个人基本信息
                    <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>
                </div>
                <div class="am-modal-bd" id="userInfo-bd" style="margin-top: 10px">
                    <form class="am-form am-form-horizontal">
                        <div class="am-form-group">
                            <label for="userName" class="am-u-sm-2 am-form-label">姓名</label>
                            <div class="am-u-sm-10">
                                <input type="text" id="userName" name="doc-ipt-1" />
                            </div>
                        </div>
                        <div class="am-form-group">
                            <label class="am-u-sm-2 am-form-label">账号</label>
                            <div class="am-u-sm-10">
                                <input type="text" id="account" disabled />
                            </div>
                        </div>
                        <div class="am-form-group">
                            <label for="tel" class="am-u-sm-2 am-form-label">电话</label>
                            <div class="am-u-sm-10">
                                <input type="text" id="tel" name="doc-ipt-pwd-6" />
                            </div>
                        </div>
                        <div class="am-form-group">
                            <label class="am-u-sm-2 am-form-label">性别</label>
                            <div class="am-u-sm-10">
                                <label class="am-radio-inline am-fl">
                                    <input type="radio" name="radio11" value="1" data-am-ucheck />
                                    男
                                </label>
                                <label class="am-radio-inline am-fl">
                                    <input type="radio" name="radio11" value="0" data-am-ucheck />
                                    女
                                </label>
                            </div>
                        </div>
                        <div class="am-form-group">
                            <label class="am-u-sm-2 am-form-label">头像</label>
                            <div class="am-u-sm-10">
                                <div class="am-form-group am-form-file am-fl">
                                    <button type="button" class="am-btn am-btn-default am-btn-sm"><i class="am-icon-cloud-upload"></i> 选择要上传的头像</button>
                                    <input type="file" id="portrait" multiple />
                                </div>
                                <small class="am-fl" style="margin: 5px 0 0 10px">(图片大小不要超过10M)</small>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="am-modal-footer">
                    <span class="am-modal-btn" id="updateInfo_btn" @click="updateUserInfo">修改</span>
                </div>
            </div>
        </div>
        <div class="am-modal am-modal-alert" tabindex="-1" id="password-modal">
            <div class="am-modal-dialog">
                <div class="am-modal-hd">
                    修改密码
                    <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>
                </div>
                <div class="am-modal-bd" style="margin-top: 10px">
                    <form class="am-form am-form-horizontal">
                        <div class="am-form-group">
                            <label for="password" class="am-u-sm-2 am-form-label" id="password_label">原始<br />密码</label>
                            <div class="am-u-sm-10">
                                <input type="text" id="password" name="doc-ipt-pwd-3" />
                            </div>
                        </div>
                        <div class="am-form-group">
                            <label for="newPassword" class="am-u-sm-2 am-form-label">新密码</label>
                            <div class="am-u-sm-10">
                                <input type="text" id="newPassword" name="doc-ipt-pwd-4" />
                            </div>
                        </div>
                        <div class="am-form-group">
                            <label for="newPassword2" class="am-u-sm-2 am-form-label" id="newPassword2_label">确认<br />密码</label>
                            <div class="am-u-sm-10">
                                <input type="text" id="newPassword2" name="doc-ipt-pwd-5" />
                            </div>
                        </div>
                    </form>
                </div>
                <div class="am-modal-footer">
                    <span class="am-modal-btn" id="updatePassword_btn" @click="updatePassword">修改</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "@/assets/sstyle/js/amazeui.min.js";
import axios from "axios";

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".tpl-left-nav-link-list").forEach(function (link) {
        link.addEventListener("click", function () {
            const submenu = link.nextElementSibling;
            if (submenu) {
                submenu.style.display = submenu.style.display === "block" ? "none" : "block";
            }
            const icon = link.querySelector(".tpl-left-nav-more-ico");
            if (icon) {
                icon.classList.toggle("tpl-left-nav-more-ico-rotate");
            }
        });
    });

    const headerNavIcon = document.querySelector(".tpl-header-nav-hover-ico");
    if (headerNavIcon) {
        headerNavIcon.addEventListener("click", function () {
            const sideNav = document.querySelector(".tpl-left-nav");
            const contentWrapper = document.querySelector(".tpl-content-wrapper");
            if (sideNav) sideNav.classList.toggle("hidden");
            if (contentWrapper) contentWrapper.classList.toggle("tpl-content-wrapper-hover");
        });
    }
});
export default {
    data() {
        return {
            userInfo: {
                userName: "",
                userAccount: "",
                userTel: "",
                userGender: "",
                userPortrait: "",
            },
            studentId: "",
        };
    },
    methods: {
        // 自定义 this.isNull 函数
        isNull(value) {
            return value === null || value === undefined;
        },
        // 得到用户信息
        getUserInfo() {
            axios
                .get("/studentController/findStudent")
                .then((response) => {
                    const data = response.data;
                    console.log(data);
                    this.studentId = data.studentId;
                    this.userInfo.userName = data.user.userName;
                    this.userInfo.userAccount = data.user.userAccount;
                    this.userInfo.userTel = data.user.userTel;
                    this.userInfo.userGender = data.user.userGender;
                    this.userInfo.userPortrait = this.isNull(data.user.userPortrait) ? require("../../assets/img/user01.png") : require("../../assets" + data.user.userPortrait);

                    console.log(this.userInfo);

                    document.getElementById("loginName").textContent = this.userInfo.userName;

                    document.getElementById("userName").value = this.userInfo.userName;
                    document.getElementById("userPortrait").src = this.userInfo.userPortrait;
                    document.getElementById("account").value = this.userInfo.userAccount;
                    document.getElementById("tel").value = this.userInfo.userTel;

                    document.querySelectorAll("input[name=radio11]").forEach((input, index) => {
                        if ((1 === this.userInfo.userGender && index === 0) || (0 === this.userInfo.userGender && index === 1)) {
                            input.checked = true;
                        }
                    });

                    const updateInfoBtn = document.getElementById("updateInfo_btn");
                    const hiddenInput = document.createElement("input");
                    hiddenInput.type = "hidden";
                    hiddenInput.name = "userId";
                    hiddenInput.value = data.userId;
                    updateInfoBtn.appendChild(hiddenInput);
                    document.getElementById("user_id").value = data.userId;
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.status === 404 && error.response) {
                        this.$router.push({ path: "/login" });
                    }
                });
        },

        // 修改个人信息
        updateUserInfo() {
            const formData = new FormData();
            // 图片暂时无法上传
            // formData.append("portrait", document.getElementById("portrait").files[0]);
            // formData.append("userId", document.querySelector('input[name=userId]').value);
            formData.append("userName", document.getElementById("userName").value);
            formData.append("userTel", document.getElementById("tel").value);
            formData.append("userGender", document.querySelector("input[name=radio11]:checked").value);

            axios.post("/userController/updateInfo", formData).then((response) => {
                if (response.data) {
                    // eslint-disable-next-line no-undef
                    $("userInfo-modal").modal("close");
                    this.getUserInfo();
                    alert("修改成功");
                } else {
                    alert("修改失败");
                }
            });
        },

        // 修改密码
        updatePassword() {
            const formData = new FormData();
            const password = document.getElementById("password").value;
            const newPassword2 = document.getElementById("newPassword2").value;
            formData.append("userPassword", document.getElementById("newPassword").value);

            if ((password === formData.get("userPassword")) === newPassword2) {
                alert("新密码不能与旧密码相同");
                return false;
            }

            if (this.isNull(formData.get("userPassword")) || this.isNull(newPassword2)) {
                alert("密码不能为空");
                return false;
            }

            if (password !== formData.get("userPassword") && formData.get("userPassword") === newPassword2) {
                axios.post("/userController/updatePwd", formData).then((response) => {
                    if (response.data) {
                        this.logout();
                        document.getElementById("password-modal").modal("close");
                    }
                });
            }
            return false;
        },

        // 论文上传
        uploadLunwen(event) {
            event.preventDefault();

            const form = document.getElementById("upload_form");
            const fileInput = document.getElementById("doc-ipt-file-2");
            const file = fileInput.files[0];
            console.log(file);

            if (file === null) {
                return false;
            }

            const filesize = file.size / 1024 / 1024;
            if (filesize > 10) {
                document.getElementById("lunwen_uploadBtn").textContent = "文件大小超过限制,最多10M";
                setTimeout(() => {
                    document.getElementById("lunwen_uploadBtn").textContent = "点击完成上传";
                }, 3000);
                return false;
            }

            const formData = new FormData(form);
            console.log(formData);
            axios
                .post("/lunwenController/upload_lunwen", formData, {
                    onUploadProgress: function (progressEvent) {
                        const percentComplete = (progressEvent.loaded / progressEvent.total) * 100;
                        document.getElementById("lunwen_uploadBtn").textContent = `${percentComplete}%`;
                    },
                })
                .then((response) => {
                    console.log(response);
                    document.getElementById("lunwen_uploadBtn").textContent = "点击完成上传";
                    // eslint-disable-next-line no-undef
                    $("#file-modal").modal("close");
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        // 检查中期检查是否完成
        checkZqjc() {
            axios
                .get("/zqjcController/getzqjcByStudentId")
                .then((response) => {
                    if (this.isNull(response.data.column3)) {
                        document.getElementById("lunwen_uploadBtn").setAttribute("disabled", "disabled");
                        document.getElementById("lunwen_uploadBtn").textContent = "请先完成中期检查";
                    }
                })
                .catch((error) => {
                    console.error("Error checking zqjc:", error);
                });
        },

        // 切换左侧菜单的展开与收起
        toggleLeftNav(event) {
            document.querySelectorAll(".tpl-left-nav-sub-menu").forEach((submenu) => {
                submenu.style.display = "none";
            });
            const submenu = event.target.parentElement.querySelector("ul");
            submenu.style.display = "block";

            document.querySelectorAll(".tpl-left-nav-sub-menu").forEach((submenu) => {
                const icon = submenu.parentElement.querySelector("a").children[1];
                if (submenu.style.display === "block") {
                    icon.classList.add("tpl-left-nav-more-ico-rotate");
                } else {
                    icon.classList.remove("tpl-left-nav-more-ico-rotate");
                }
            });
        },

        // 监听页面加载事件
        // iframeLoad() {
        // 	const iframe = document.getElementById('iframepage');
        // 	iframe.addEventListener('load', () => {
        // 		const height = iframe.contentWindow.document.getElementById('ref_page').offsetHeight;
        // 		iframe.style.height = height < 100 ? '850px' : (height + 60) + 'px';
        // 	});
        // },

        // 知道点击的是菜单的哪个选项
        setActiveLink(event) {
            document.querySelectorAll(".link_a").forEach((link) => {
                link.classList.remove("active");
            });
            event.target.classList.add("active");
        },
        // 点击信息显示信息框
        showInfo() {
            // eslint-disable-next-line no-undef
            $("#userInfo-modal").modal("open");
            return false;
        },
        showUpdatePassword() {
            // eslint-disable-next-line no-undef
            $("#password-modal").modal("open");
            return false;
        },
        showfile() {
            // eslint-disable-next-line no-undef
            $("#file-modal").modal("open");
            return false;
        },
        logout() {
            axios.get("/userController/logout").then((response) => {
                this.$router.push({ path: response.data });
            });
        },
        showFileName() {
            const file = document.getElementById("doc-ipt-file-2").files;
            console.log(file[0]);
            alert(file[0].name);
            if (file.length > 0) {
                document.getElementById("file-list").innerHTML = file[0].name;
            } else {
                document.getElementById("file-list").innerHTML = "";
            }
        },
    },
    created() {
        this.getUserInfo();
        // 页面刷新回到首页
        window.addEventListener("unload", () => {
            this.$router.push({ path: "/sindex" });
        });
        // 检查中期检查是否完成
        this.checkZqjc();
        // 设置左侧菜单的展开与收起
        document.querySelectorAll(".left-nav-link").forEach((link) => {
            link.addEventListener("click", (event) => this.toggleLeftNav(event));
        });
        // 设置链接点击状态
        document.querySelectorAll(".link_a").forEach((link) => {
            link.addEventListener("click", (event) => this.setActiveLink(event));
        });
    },
};
</script>

<style scoped>
@import "../../assets/sstyle/css/app.css";
@import "../../assets/sstyle/css/admin.css";
</style>
