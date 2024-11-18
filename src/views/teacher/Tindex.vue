<template>
    <div>
        <header class="am-topbar am-topbar-inverse admin-header">
            <div class="am-topbar-brand">
                <a href="javascript:;" style="padding-left: 18px; color: #3599d6" class=""><strong>毕业设计（论文）管理系统</strong></a>
            </div>
            <div>
                <a href="javascript:;"> <span class="am-icon-list tpl-header-nav-hover-ico am-fl am-margin-right"></span> </a>
            </div>

            <button class="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-success am-show-sm-only" data-am-collapse="{target: '#topbar-collapse'}"><span class="am-sr-only">导航切换</span> <span class="am-icon-bars"></span></button>

            <div class="am-collapse am-topbar-collapse" id="topbar-collapse">
                <ul class="am-nav am-nav-pills am-topbar-nav am-topbar-right admin-header-list tpl-header-list">
                    <li class="am-dropdown" data-am-dropdown data-am-dropdown-toggle @click="toggleClass" :class="{ 'am-active am-dropdown-flip': isActive }">
                        <a class="am-dropdown-toggle tpl-header-list-link" href="javascript:;">
                            <span class="tpl-header-list-user-nick" id="loginName"></span>
                            <span class="tpl-header-list-user-ico">
                                <img id="userPortrait" src="../../assets/img/gan.png" />
                            </span>
                        </a>
                        <ul class="am-dropdown-content">
                            <li @click="toggleInfor">
                                <a href="#" id="userInfo_a" style="outline: none"><span class="am-icon-user"></span> 信息</a>
                            </li>
                            <li @click="toggleChange">
                                <a href="#" id="update_password" style="outline: none"><span class="am-icon-edit"></span> 修改密码</a>
                            </li>
                            <li>
                                <a @click="logout" style="outline: none"><span class="am-icon-power-off"></span> 退出</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a @click="logout" class="tpl-header-list-link"><span class="am-icon-sign-out tpl-header-list-ico-out-size"></span></a>
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
                            <router-link class="nav-link link_a" to="/tcontent"> <i class="am-icon-home"></i> <span>首页</span> </router-link>
                        </li>
                        <li class="tpl-left-nav-item">
                            <router-link class="nav-link link_a" to="/tkt"> <i class="am-icon-home"></i> <span>课题申报</span> </router-link>
                        </li>

                        <li class="tpl-left-nav-item">
                            <a href="javascript:;" class="nav-link tpl-left-nav-link-list left-nav-link" @click="toggleMenu">
                                <i class="am-icon-tasks"></i> <span>流程管理</span>
                                <i class="am-icon-angle-right tpl-left-nav-more-ico am-fr am-margin-right tpl-left-nav-more-ico-rotate"></i>
                            </a>
                            <ul class="tpl-left-nav-sub-menu" style="display: block" :style="{ display: isMenuVisible ? 'block' : 'none' }">
                                <li>
                                    <router-link class="link_a" to="/tsure"><i class="am-icon-angle-right"></i> <span>确认选题</span></router-link>
                                    <router-link class="link_a" to="/tstudentlist"><i class="am-icon-angle-right"></i> <span>教师评审</span></router-link>
                                    <router-link class="link_a" to="/tstudentlist2"><i class="am-icon-angle-right"></i> <span>成绩评定</span></router-link>
                                    <router-link class="link_a" to="/tmdbstudentlist"><i class="am-icon-angle-right"></i> <span>审核免答辩申请</span></router-link>
                                    <router-link class="link_a" to="/tyansou"><i class="am-icon-angle-right"></i> <span>系统验收</span></router-link>
                                </li>
                            </ul>
                        </li>

                        <li class="tpl-left-nav-item">
                            <a href="javascript:;" class="nav-link tpl-left-nav-link-list left-nav-link" @click="toggleMenu1">
                                <i class="am-icon-wpforms"></i> <span>查看信息</span>
                                <i class="am-icon-angle-right tpl-left-nav-more-ico am-fr am-margin-right"></i>
                            </a>

                            <ul class="tpl-left-nav-sub-menu" style="display: block" :style="{ display: isMenuVisible1 ? 'block' : 'none' }">
                                <li>
                                    <router-link class="link_a" to="/tstudentinfo"><i class="am-icon-angle-right"></i> <span>学生联系信息</span></router-link>
                                    <router-link class="link_a" to="/tinfo"><i class="am-icon-angle-right"></i> <span>教师分组信息</span></router-link>
                                </li>
                            </ul>
                        </li>

                        <li class="tpl-left-nav-item">
                            <router-link class="nav-link tpl-left-nav-link-list link_a" to="/tstudentdown"> <i class="am-icon-download"></i> <span>学生材料下载</span> </router-link>
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
      <div class="am-g" style="position: fixed; bottom: 0;">
        <div class="am-u-lg-12">
          <footer data-am-widget="footer" class="am-footer am-footer-default" style="border-radius: 6px;">
            <div class="am-footer-switch"></div>
            <div class="am-footer-miscs ">
              <p>
                由 <a href="https://github.com/Li-Zhan" title="李展" target="_blank">李展</a>
                提供技术支持
              </p>
              <p>copyright &copy; 2018-XXXX, All Rights Reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    </div> -->

        <!-- 个人基本信息模态框 -->
        <div class="am-modal am-modal-alert am-modal-active" tabindex="-1" id="userInfo-modal" :style="{ display: isInfor ? 'block' : 'none' }">
            <div class="am-modal-dialog">
                <div class="am-modal-hd">
                    个人基本信息
                    <a href="javascript: void(0)" class="am-close am-close-spin" @click="toggleInfor">&times;</a>
                </div>
                <div class="am-modal-bd" style="margin-top: 10px">
                    <form class="am-form am-form-horizontal">
                        <div class="am-form-group">
                            <label for="userName" class="am-u-sm-2 am-form-label">姓名</label>
                            <div class="am-u-sm-10">
                                <input type="text" v-model="userInfo.userName" id="userName" />
                            </div>
                        </div>
                        <div class="am-form-group">
                            <label for="describe" class="am-u-sm-2 am-form-label">教学<br />方向</label>
                            <div class="am-u-sm-10">
                                <textarea style="width: 100%" v-model="userInfo.teacherDescribe" id="describe"></textarea>
                            </div>
                        </div>
                        <div class="am-form-group">
                            <label class="am-u-sm-2 am-form-label">账号</label>
                            <div class="am-u-sm-10">
                                <input type="text" v-model="userInfo.userAccount" disabled />
                            </div>
                        </div>
                        <div class="am-form-group">
                            <label for="tel" class="am-u-sm-2 am-form-label">电话</label>
                            <div class="am-u-sm-10">
                                <input type="text" v-model="userInfo.userTel" id="tel" />
                            </div>
                        </div>
                        <div class="am-form-group">
                            <label class="am-u-sm-2 am-form-label">性别</label>
                            <div class="am-u-sm-10">
                                <label class="am-radio-inline am-fl"> <input type="radio" v-model="userInfo.userGender" value="1" /> 男 </label>
                                <label class="am-radio-inline am-fl"> <input type="radio" v-model="userInfo.userGender" value="0" /> 女 </label>
                            </div>
                        </div>
                        <div class="am-form-group">
                            <label class="am-u-sm-2 am-form-label">头像</label>
                            <div class="am-u-sm-10">
                                <div class="am-form-group am-form-file am-fl">
                                    <button type="button" class="am-btn am-btn-default am-btn-sm" @click="selectFile"><i class="am-icon-cloud-upload"></i> 选择要上传的头像</button>
                                    <input type="file" ref="portrait" id="portrait" multiple />
                                </div>
                                <small class="am-fl" style="margin: 5px 0 0 10px">(图片大小不要超过10M)</small>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="am-modal-footer">
                    <span class="am-modal-btn" @click="updateUserInfo">修改</span>
                </div>
            </div>
        </div>

        <!-- 修改密码模态框 -->
        <div class="am-modal am-modal-alert am-modal-active" tabindex="-1" id="password-modal" :style="{ display: isChange ? 'block' : 'none' }">
            <div class="am-modal-dialog">
                <div class="am-modal-hd">
                    修改密码
                    <a href="javascript: void(0)" class="am-close am-close-spin" @click="toggleChange">&times;</a>
                </div>
                <div class="am-modal-bd" style="margin-top: 10px">
                    <form class="am-form am-form-horizontal">
                        <div class="am-form-group">
                            <label for="password" class="am-u-sm-2 am-form-label">原始<br />密码</label>
                            <div class="am-u-sm-10">
                                <input type="password" v-model="password.oldPassword" id="password" />
                            </div>
                        </div>
                        <div class="am-form-group">
                            <label for="newPassword" class="am-u-sm-2 am-form-label">新密码</label>
                            <div class="am-u-sm-10">
                                <input type="password" v-model="password.newPassword" id="newPassword" />
                            </div>
                        </div>
                        <div class="am-form-group">
                            <label for="newPassword2" class="am-u-sm-2 am-form-label">确认<br />密码</label>
                            <div class="am-u-sm-10">
                                <input type="password" v-model="password.confirmPassword" id="newPassword2" />
                            </div>
                        </div>
                    </form>
                </div>
                <div class="am-modal-footer">
                    <span class="am-modal-btn" @click="updatePassword">修改</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "@/assets/amazeui/js/amazeui.min.js";
import axios from "axios";

export default {
    data() {
        return {
            isActive: false, //头像信息隐藏
            isMenuVisible: false, // 初始时流程管理菜单隐藏
            isMenuVisible1: false, // 初始时查看信息菜单隐藏
            isInfor: false, // 初始值为 false，表示信息隐藏
            isChange: false, // 初始值为 false，表示修改密码隐藏
            isShow: null, //点击菜单高亮

            userInfo: {
                userName: "",
                userAccount: "",
                userTel: "",
                userGender: 1,
                teacherDescribe: "",
                userPortrait: "", // 存储头像
                teacherId: "",
                userId: "",
            },
            password: {
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            },
        };
    },
    methods: {
        toggleMenu() {
            this.isMenuVisible = !this.isMenuVisible; // 切换显示状态
        },
        toggleMenu1() {
            this.isMenuVisible1 = !this.isMenuVisible1; // 切换显示状态
        },
        toggleInfor() {
            this.isInfor = !this.isInfor; // 切换显示状态
        },
        toggleChange() {
            this.isChange = !this.isChange; // 切换显示状态
        },
        toggleClass() {
            // 每次点击时，切换 isActive 的值
            this.isActive = !this.isActive;
        },
        setShow(index) {
            this.isShow = index;
        },

        // 获取用户信息
        getUserInfo() {
            axios
                .get("/teacherController/findTeacher")
                .then((response) => {
                    const data = response.data;
                    if (!data.user) {
                        window.location.href = "../login.html";
                        return;
                    }
                    this.userInfo = {
                        userName: data.user.userName,
                        userAccount: data.user.userAccount,
                        userTel: data.user.userTel,
                        userGender: data.user.userGender,
                        teacherDescribe: data.teacherDescribe,
                        userPortrait: data.user.userPortrait,
                        teacherId: data.teacherId,
                        userId: data.userId,
                    };
                })
                .catch((error) => {
                    console.error("Error fetching user info:", error);
                });
        },
        // 选择文件
        selectFile() {
            this.$refs.portrait.click();
        },
        // 处理文件上传无法处理
        // handleFileChange(event) {
        //   const file = event.target.files[0];
        //   if (file && file.size > 10 * 1024 * 1024) {
        //     alert('图片大小不能超过10MB');
        //     return;
        //   }
        //   this.userInfo.userPortrait = file;
        // },
        // 更新用户信息
        updateUserInfo() {
            const formData = new FormData();
            formData.append("portrait", this.userInfo.userPortrait);
            formData.append("teacherId", this.userInfo.teacherId);
            formData.append("user.userName", this.userInfo.userName);
            formData.append("user.userId", this.userInfo.userId);
            formData.append("teacherDescribe", this.userInfo.teacherDescribe);
            formData.append("user.userTel", this.userInfo.userTel);
            formData.append("user.userGender", this.userInfo.userGender);

            axios
                .post("/teacherController/updateTeacherInfo", formData)
                .then((response) => {
                    if (response.data) {
                        this.toggleInfor(); // 关闭模态框
                        this.getUserInfo(); // 刷新用户信息
                    } else {
                        alert("更新失败，请重试");
                    }
                })
                .catch((error) => {
                    console.error("Error updating user info:", error);
                });
        },
        // 更新密码
        updatePassword() {
            if (this.password.newPassword !== this.password.confirmPassword) {
                alert("新密码和确认密码不匹配");
                return;
            }
            axios
                .post("/userController/updatePwd", {
                    userId: this.userInfo.userId,
                    userPassword: this.password.newPassword,
                })
                .then((response) => {
                    if (response.data) {
                        this.toggleChange(); // 关闭模态框
                        this.logout();
                    } else {
                        alert("密码更新失败");
                    }
                })
                .catch((error) => {
                    console.error("Error updating password:", error);
                });
        },
        logout() {
            axios.get("/userController/logout").then((response) => {
                this.$router.push({ path: response.data });
            });
        },
    },
    created() {
        this.getUserInfo(); // 页面加载时获取用户信息
    },
};
</script>

<style>
@import "../../assets/amazeui/css/amazeui.min.css";
@import "../../assets//amazeui/css/amazeui.flat.min.css";
@import url("../../assets/tstyle/css/admin.css");
@import url("../../assets/tstyle/css/app.css");
</style>
