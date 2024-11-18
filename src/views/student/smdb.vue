<template>
    <div>
        <div id="ref_page" class="am-g">
            <div class="tpl-content-page-title" style="margin-bottom: 10px">填写免答辩申请表</div>

            <div class="am-panel am-panel-default">
                <div class="am-panel-bd">
                    <div class="am-scrollable-horizontal">
                        <table class="am-table am-table-bordered am-table-centered am-text-nowrap">
                            <thead>
                                <tr>
                                    <th colspan="9">信息技术学院本科生毕业设计（论文）免答辩申请表</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr id="tr1">
                                    <td colspan="2">学 号</td>
                                    <td colspan="2">{{ studentAccount }}</td>
                                    <td>姓 名</td>
                                    <td colspan="2">{{ studentName }}</td>
                                    <td>性 别</td>
                                    <td>{{ gender }}</td>
                                </tr>
                                <tr id="tr2">
                                    <td colspan="2">专 业</td>
                                    <td colspan="3">{{ subjectName }}</td>
                                    <td>年 级</td>
                                    <td>{{ gradeName }}</td>
                                    <td>班 级</td>
                                    <td>{{ className }}</td>
                                </tr>
                                <tr id="tr3">
                                    <td colspan="2">申请人签名</td>
                                    <td colspan="3">{{ studentName }}</td>
                                    <td colspan="2">联系电话</td>
                                    <td colspan="2">{{ userTel }}</td>
                                </tr>
                                <tr id="tr4">
                                    <td colspan="2">论文题目</td>
                                    <td colspan="3">{{ projectName }}</td>
                                    <td colspan="2">导师姓名</td>
                                    <td colspan="2">{{ teacherName }}</td>
                                </tr>
                                <tr style="height: 260px">
                                    <td colspan="2" class="am-text-middle">申请理由</td>
                                    <td colspan="7">
                                        <textarea v-model="applicationReason" style="width: 100%; height: 260px"></textarea>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button id="mdb_btn" type="button" class="am-btn am-btn-primary am-radius am-fr" :disabled="isBtnDisabled" @click="handleSubmit">
                            {{ btnText }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 免答辩提示弹窗 -->
        <div class="am-modal am-modal-alert" tabindex="-1" id="my-alert">
            <div class="am-modal-dialog">
                <div class="am-modal-hd">说明</div>
                <div class="am-modal-bd">
                    <ul class="am-list am-list-border am-text-justify" style="margin-bottom: -3px">
                        <li>1.凡参加省级<small>（含）</small>以上专业竞赛，获得省级二等奖及以上、国家级三等奖及以上、参加厅级<small>（含）</small>以上项目<small>（本人参与项目内容需与毕业设计或毕业论文一致）</small>、公开发表专业学术论文<small>（限前2名，内容需与毕业设计或毕业论文一致）</small>的学生，可申请免答辩。</li>
                        <li>2.申请表中“申请理由”部分由学生本人如实填写，还需向指导老师提供相关佐证材料原件和复印件<small>（获奖证书、期刊、项目结项证书等，原件核实后退回）</small>。</li>
                        <li>3.指导教师会对“申请理由”进行认定、签名。</li>
                        <li>4.学位委员会根据指导教师意见给出“同意”或“不同意”意见。</li>
                        <li>5.最终申请结果可以在查看信息处查看。</li>
                    </ul>
                </div>
                <div class="am-modal-footer">
                    <span class="am-modal-btn">确定</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import "@/assets/sstyle/js/amazeui.min.js";

export default {
    data() {
        return {
            studentAccount: "",
            studentName: "",
            gender: "",
            subjectName: "",
            gradeName: "",
            className: "",
            userTel: "",
            projectName: "",
            teacherName: "",
            applicationReason: "",
            studentId: null,
            applicationId: null,
            isBtnDisabled: false,
            btnText: "提交",
        };
    },
    created() {
        this.showModal();
        this.getStudentData();

    },
    methods: {
        isNull(value) {
            return value === null || value === undefined || value === "";
        },

        async getStudentData() {
            try {
                const response = await axios.get("/studentController/getStuAndProjectAndTeacher");
                const data = response.data;

                if (!this.isNull(data.studentId)) {
                    this.studentAccount = data.user.userAccount;
                    this.studentName = data.user.userName;
                    this.gender = data.user.userGender === 1 ? "男" : "女";
                    this.subjectName = data.classInfo.subject.subjectName;
                    this.gradeName = data.classInfo.grade.gradeName;
                    this.className = data.classInfo.className;
                    this.userTel = data.user.userTel;
                    this.projectName = data.project.projectName;
                    this.teacherName = data.teacher.user.userName;
                    this.studentId = data.studentId;

                    this.checkSubmitButtonStatus(this.studentId);
                } else {
                    this.isBtnDisabled = true;
                    this.btnText = "请先选择课题";
                }
            } catch (error) {
                console.error("Error fetching student data:", error);
                alert("获取学生信息失败，请重试。");
            }
            this.showModal();
        },

        async checkSubmitButtonStatus(studentId) {
            try {
                const response = await axios.get("/mdbController/getMdbByStudentId", {
                    params: { studentId },
                });
                const data = response.data;

                if (!this.isNull(data.mdbStatus)) {
                    this.isBtnDisabled = true;
                    this.applicationId = data.mdbId;
                    this.applicationReason = data.column1;
                    this.btnText = "已审核";
                } else if (!this.isNull(data.mdbId)) {
                    this.applicationId = data.mdbId;
                    this.applicationReason = data.column1;
                    this.btnText = "更新";
                }
            } catch (error) {
                console.error("Error checking submit button status:", error);
                alert("检查提交状态时发生错误，请稍后重试。");
            }
        },

        async handleSubmit() {
            if (this.isNull(this.applicationReason) || this.isNull(this.studentId)) {
                alert("请填写完整的申请理由。");
                return;
            }

            const postData = {
                mdbId: this.applicationId,
                studentId: this.studentId,
                column1: this.applicationReason,
            };

            try {
                this.isBtnDisabled = true;
                this.btnText = "提交中...";

                const response = await axios.post("/mdbController/insertSelective", postData);

                if (response.data) {
                    alert("提交成功！");
                    this.isBtnDisabled = false;
                    this.btnText = "更新";
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                alert("提交申请表时出错，请重试。");
            }
        },

        showModal() {
            $("#my-alert").modal("open");
        },
    },
};
</script>

<style>
@import url("../../assets/sstyle/css/app.css");
@import url("../../assets/sstyle/css/admin.css");
</style>
