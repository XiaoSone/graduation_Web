<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div style="max-height: 800px; overflow-y: auto">
        <div id="ref_page" class="am-g">
            <div class="tpl-content-page-title" style="margin-bottom: 10px">填写开题报告</div>

            <div class="am-panel am-panel-default">
                <div class="am-panel-bd">
                    <div class="am-scrollable-horizontal">
                        <table class="am-table am-table-bordered am-table-centered am-text-nowrap">
                            <tbody>
                                <tr>
                                    <td rowspan="6" style="width: 45px" class="am-text-middle">开题报告</td>
                                    <td colspan="2">姓 名</td>
                                    <td>性别</td>
                                    <td colspan="2">学 号</td>
                                    <td colspan="2">专 业</td>
                                    <td colspan="2">年 级</td>
                                </tr>
                                <tr id="stuInfo1">
                                    <td colspan="2">{{ userName }}</td>
                                    <td>{{ gender }}</td>
                                    <td colspan="2">{{ userAccount }}</td>
                                    <td colspan="2">{{ subjectName }}</td>
                                    <td colspan="2">{{ gradeName }}</td>
                                </tr>
                                <tr>
                                    <td rowspan="2" class="am-text-middle">题目</td>
                                    <td colspan="6" rowspan="2" class="am-text-middle">《{{ projectName }}》</td>
                                    <td colspan="2">课题来源</td>
                                </tr>
                                <tr>
                                    <td>{{ projectFrom }}</td>
                                </tr>
                                <tr>
                                    <td class="am-text-middle">概述</td>
                                    <td colspan="8" v-if="btnText != '已审核'">
                                        <textarea v-model="column1" placeholder="说明选题目的、意义，国内外研究现状等" class="input-textarea"></textarea>
                                    </td>
                                    <td colspan="8" v-else>
                                        <textarea v-model="column1" placeholder="说明选题目的、意义，国内外研究现状等" class="input-textarea" readonly></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="am-text-middle">思路及方法</td>
                                    <td colspan="8" v-if="btnText != '已审核'">
                                        <textarea v-model="column2" class="input-textarea"></textarea>
                                    </td>
                                    <td colspan="8" v-else>
                                        <textarea v-model="column2" class="input-textarea" readonly></textarea>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button @click="handleSubmit" :disabled="isBtnDisabled" class="am-btn am-btn-primary am-radius am-fr" :data-am-loading="{ spinner: 'circle-o-notch', loadingText: '提交中...', resetText: '提交完成' }">{{ btnText }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            userName: "",
            gender: "",
            userAccount: "",
            subjectName: "",
            gradeName: "",
            projectName: "",
            projectFrom: "",
            column1: "",
            column2: "",
            studentId: null,
            ktbgId: null,
            isBtnDisabled: false,
            btnText: "提交",
        };
    },
    created() {
        this.getStudentData();
    },
    methods: {
        isNull(value) {
            return value === null || value === undefined || value === "";
        },
        // 获取学生信息
        async getStudentData() {
            try {
                const response = await axios.get("/studentController/getStuAndProject");
                const data = response.data;

                if (!this.isNull(data.studentId)) {
                    this.userName = data.user.userName;
                    this.gender = data.user.userGender === 1 ? "男" : "女";
                    this.userAccount = data.user.userAccount;
                    this.subjectName = data.classInfo.subject.subjectName;
                    this.gradeName = data.classInfo.grade.gradeName;
                    this.projectName = data.project.projectName;
                    this.projectFrom = data.project.projectFrom.projectFromName;
                    this.studentId = data.studentId;
                    this.checkSubmitButtonStatus(this.studentId);
                } else {
                    this.isBtnDisabled = true;
                    this.btnText = "请先选择课题";
                }
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        },
        // 检查提交按钮状态
        async checkSubmitButtonStatus(studentId) {
            try {
                const response = await axios.get("/ktbgController/getKtbgByStudentId", {
                    params: { studentId },
                });

                const data = response.data;
                if (!this.isNull(data.ktbgStatus)) {
                    if (data.ktbgStatus === 1) {
                        this.column1 = data.column1;
                        this.column2 = data.column2;
                        this.isBtnDisabled = true;
                        this.btnText = "已审核";
                    }
                } else if (!this.isNull(data.ktbgId)) {
                    this.ktbgId = data.ktbgId;
                    this.column1 = data.column1;
                    this.column2 = data.column2;
                    this.btnText = "更新";
                }
            } catch (error) {
                console.error("Error checking submit button status:", error);
            }
        },
        async handleSubmit() {
            if (this.isNull(this.column1) || this.isNull(this.column2) || this.isNull(this.studentId)) {
                alert("请填写完整的报告信息。");
                return;
            }

            const postData = {
                ktbgId: this.ktbgId,
                studentId: this.studentId,
                column1: this.column1,
                column2: this.column2,
            };
            console.log(postData);
            try {
                this.isBtnDisabled = true;
                this.btnText = "提交中...";

                const response = await axios.post("/ktbgController/insertSelective", postData);

                if (response.data) {
                    setTimeout(() => {
                        this.isBtnDisabled = false;
                        this.btnText = "更新";
                        alert("提交成功！");
                    }, 3000);
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                this.isBtnDisabled = false;
                this.btnText = "提交";
                alert("提交失败，请稍后重试。");
            }
        },
    },
};
</script>

<style scoped>
.am-text-middle {
    width: 30px;
}
.input-textarea {
    width: 100%;
    height: 260px;
}
@import url("../../assets/sstyle/css/app.css");
@import url("../../assets/sstyle/css/admin.css");
</style>
