<template>
    <div class="form-container">
        <div id="ref_page" class="am-g">
            <div class="tpl-content-page-title">填写中期检查反馈表</div>
            <div class="am-panel am-panel-default">
                <div class="am-panel-bd">
                    <div class="form-content">
                        <table class="am-table am-table-bordered am-table-centered am-table-compact">
                            <thead>
                                <tr>
                                    <th colspan="6" class="am-text-middle">本科毕业论文（设计）中期检查</th>
                                </tr>
                                <tr>
                                    <td>院(系)：</td>
                                    <td>信息技术学院</td>
                                    <td>专业：</td>
                                    <td>{{ subjectName }}</td>
                                    <td>年级:</td>
                                    <td>{{ gradeName }}</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="2">题目</td>
                                    <td colspan="4">《{{ projectName }}》</td>
                                </tr>
                                <tr>
                                    <td>学号</td>
                                    <td colspan="2">{{ userAccount }}</td>
                                    <td>姓名</td>
                                    <td colspan="2">{{ userName }}</td>
                                </tr>
                                <tr>
                                    <td>指导老师</td>
                                    <td colspan="2">{{ teacherName }}</td>
                                    <td>职称</td>
                                    <td colspan="2">{{ teacherTitle }}</td>
                                </tr>
                                <tr>
                                    <td colspan="6">
                                        <div v-if="btnText === '教师已评审'" class="textarea-container">
                                            <textarea v-model="column1" class="textarea reduced" placeholder="已经完成的内容：" readonly></textarea>
                                            <div class="read-only-container">教师评审意见：{{ column3 }}</div>
                                        </div>
                                        <div v-else>
                                            <textarea v-model="column1" class="textarea" placeholder="已经完成的内容："></textarea>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="6">
                                        <div v-if="btnText === '教师已评审'" class="textarea-container">
                                            <textarea v-model="column2" class="textarea reduced" placeholder="未完成内容及原因：" readonly></textarea>
                                            <div class="read-only-container">备注：{{ column4 }}</div>
                                        </div>
                                        <div v-else>
                                            <textarea v-model="column2" class="textarea" placeholder="未完成内容及原因："></textarea>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button @click="submitZqjc" :disabled="isBtnDisabled" class="am-btn am-btn-primary am-radius am-fr" :data-am-loading="{ spinner: 'circle-o-notch', loadingText: '提交中...', resetText: '提交完成' }">{{ btnText }}</button>
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
            subjectName: "",
            gradeName: "",
            projectName: "",
            userAccount: "",
            userName: "",
            teacherName: "",
            teacherTitle: "",
            column1: "",
            column2: "",
            column3: "",
            column4: "",
            studentId: null,
            zqjcId: null,
            isBtnDisabled: false,
            btnText: "提交",
        };
    },
    created() {
        this.getStudentData();
    },
    methods: {
        // 获取学生数据
        async getStudentData() {
            try {
                const response = await axios.get("/studentController/getStuAndProjectAndTeacher");
                const data = response.data;
                if (data.studentId) {
                    this.studentId = data.studentId;
                    this.subjectName = data.classInfo.subject.subjectName;
                    this.gradeName = data.classInfo.grade.gradeName;
                    this.projectName = data.project.projectName;
                    this.userAccount = data.user.userAccount;
                    this.userName = data.user.userName;
                    this.teacherName = data.teacher.user.userName;
                    this.teacherTitle = data.teacher.zhicheng;
                    this.checkBeforeZqjc(this.studentId);
                } else {
                    this.isBtnDisabled = true;
                }
            } catch (error) {
                console.error("Error fetching student data:", error);
                alert("加载数据时出错，请重试。");
            }
        },
        // 检查学生是否已经提交过中期检查
        async checkBeforeZqjc(studentId) {
            try {
                const response = await axios.get("/ktbgController/getKtbgByStudentId", { params: { studentId } });
                const data = response.data;
                if (!data.ktbgStatus || data.ktbgStatus === 0) {
                    this.isBtnDisabled = true;
                    this.btnText = "开题报告尚未通过";
                } else {
                    this.checkZqjcStatus(studentId);
                }
            } catch (error) {
                console.error("Error checking before ZQJC:", error);
            }
        },

        async checkZqjcStatus(studentId) {
            try {
                const response = await axios.get("/zqjcController/getzqjcByStudentId", { params: { studentId } });
                const data = response.data;
                if (data.column3) {
                    this.isBtnDisabled = true;
                    this.btnText = "教师已评审";
                    this.column1 = data.column1;
                    this.column2 = data.column2;
                    this.column3 = data.column3; // 设置教师评审意见
                    this.column4 = data.column4; // 设置备注信息
                } else if (data.zqjcId) {
                    this.zqjcId = data.zqjcId;
                    this.column1 = data.column1;
                    this.column2 = data.column2;
                    this.isBtnDisabled = false;
                    this.btnText = "更新，请等待教师评审";
                }
            } catch (error) {
                console.error("Error checking ZQJC status:", error);
            }
        },

        async submitZqjc() {
            if (!this.column1 || !this.column2 || !this.studentId) {
                alert("请填写所有必填字段。");
                return;
            }

            try {
                this.isBtnDisabled = true;
                this.btnText = "提交中...";

                const response = await axios.post("/zqjcController/insertSelective", {
                    zqjcId: this.zqjcId,
                    studentId: this.studentId,
                    column1: this.column1,
                    column2: this.column2,
                });

                if (response.data) {
                    setTimeout(() => {
                        this.isBtnDisabled = false;
                        this.btnText = "更新，请等待教师评审";
                        alert("提交成功！");
                    }, 3000);
                }
            } catch (error) {
                console.error("Error submitting ZQJC:", error);
                alert("提交失败，请重试。");
            }
        },
    },
};
</script>

<style>
@import url("../../assets/sstyle/css/app.css");
@import url("../../assets/sstyle/css/admin.css");
.form-container {
    max-height: 800px;
    overflow-y: auto;
}
.form-content {
    height: 650px;
}
.textarea {
    width: 100%;
    height: 200px;
}
.textarea.reduced {
    width: 48%;
    float: left;
}
.textarea-container {
    display: flex;
    justify-content: space-between;
}
.read-only-container {
  text-align: left;
  margin-left: 10px;
    width: 48%;
    height: 200px;
    border: 1px solid #ccc;
    padding: 10px;
    background-color: #f9f9f9;
    overflow-y: auto;
}
</style>
