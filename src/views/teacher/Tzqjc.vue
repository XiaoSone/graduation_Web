<template>
    <div>
        <div id="ref_page" class="am-g">
            <div class="tpl-content-page-title" style="margin-bottom: 10px">审阅中期检查</div>

            <ol class="am-breadcrumb">
                <li><router-link to="/tstudentlist" class="am-icon-users">学生列表</router-link></li>

                <li class="am-active">中期检查</li>
            </ol>

            <div class="am-panel am-panel-default">
                <div class="am-panel-bd">
                    <div style="height: 1060px">
                        <table class="am-table am-table-bordered am-table-centered am-table-compact">
                            <thead>
                                <tr>
                                    <th colspan="6" class="am-text-middle">阳光学院本科毕业论文（设计）中期检查</th>
                                </tr>
                                <tr id="tr1">
                                    <td>院(系)：</td>
                                    <td>人工智能学院</td>
                                    <td>专业：</td>
                                    <td class="am-text-left">{{ student.subjectName }}</td>
                                    <td>年级:</td>
                                    <td>{{ student.gradeName }}</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr id="tr2">
                                    <td class="am-text-middle" colspan="2">题目</td>
                                    <td colspan="4">{{ student.projectName }}</td>
                                </tr>
                                <tr id="tr3">
                                    <td>学号</td>
                                    <td colspan="2">{{ student.userAccount }}</td>
                                    <td>姓名</td>
                                    <td colspan="2">{{ student.userName }}</td>
                                </tr>
                                <tr id="tr4">
                                    <td>指导老师</td>
                                    <td colspan="2">{{ student.teacherName }}</td>
                                    <td>职称</td>
                                    <td colspan="2">{{ student.teacherTitle }}</td>
                                </tr>
                                <tr>
                                    <td colspan="6" class="am-text-left">
                                        <textarea v-model="column1" style="width: 100%; height: 200px" placeholder="已经完成的内容：" disabled></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="6" class="am-text-left">
                                        <textarea v-model="column2" style="width: 100%; height: 200px" placeholder="未完成内容及原因：" disabled></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="6">
                                        <textarea v-model="column3" style="width: 100%; height: 200px" placeholder="指导教师意见："></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="6">
                                        <textarea v-model="column4" style="width: 100%; height: 200px" placeholder="备注："></textarea>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button id="zqjc_btn" @click="submitCheck" :disabled="isButtonDisabled" type="button" class="am-btn am-btn-primary am-radius am-fr" :data-am-loading="{ spinner: 'circle-o-notch', loadingText: '提交中...', resetText: '完成' }">提交</button>
                    </div>
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
            studentId: this.getQueryString("studentId"),
            student: {
                subjectName: "",
                gradeName: "",
                projectName: "",
                userAccount: "",
                userName: "",
                teacherName: "",
                teacherTitle: "",
            },
            column1: "", // 已经完成的内容
            column2: "", // 未完成内容及原因
            column3: "", // 指导教师意见
            column4: "", // 备注
            zqjcId: null, // 中期检查ID
            isButtonDisabled: false,
        };
    },
    mounted() {
        this.fetchStudentData();
    },
    methods: {
        getQueryString(name) {
            const url = window.location.href;
            const regex = new RegExp("[?&]" + name + "=([^&]*)", "i");
            const result = regex.exec(url);
            return result ? decodeURIComponent(result[1]) : null;
        },
        // 获取学生中期检查数据
        async fetchStudentData() {
            try {
                const response = await axios.get("/studentController/getStudentAndZqjcBySid", {
                    params: { studentId: this.studentId },
                });

                const data = response.data;

                if (data.zqjc) {
                    this.student.subjectName = data.classInfo.subject.subjectName;
                    this.student.gradeName = data.classInfo.grade.gradeName;
                    this.student.projectName = data.project.projectName;
                    this.student.userAccount = data.user.userAccount;
                    this.student.userName = data.user.userName;
                    this.student.teacherName = data.teacher.user.userName;
                    this.student.teacherTitle = data.teacher.zhicheng;

                    this.column1 = data.zqjc.column1;
                    this.column2 = data.zqjc.column2;

                    this.column3 = data.zqjc.column3 || "";
                    this.column4 = data.zqjc.column4 || "";
                    this.zqjcId = data.zqjc.zqjcId;
                } else {
                    // 如果没有中期检查，禁用相关文本框
                    this.column3 = "";
                    this.column4 = "";
                    this.isButtonDisabled = true; // 禁用提交按钮
                }
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        },
        // 提交中期检查
        async submitCheck() {
            try {
                const response = await axios.post("/zqjcController/updateByPrimaryKeySelective", {
                    zqjcId: this.zqjcId,
                    column3: this.column3,
                    column4: this.column4,
                });
                if (response.data) {
                    const btn = document.getElementById("zqjc_btn");
                    btn.classList.add("am-disabled");
                    btn.innerText = "完成";
                    this.isButtonDisabled = true;
                    alert("提交完成");
                }
            } catch (error) {
                console.error("Error submitting check:", error);
            }
        },
    },
};
</script>

<style>
@import url("../../assets/amazeui/css/amazeui.min.css");
@import url("../../assets/tstyle/css/admin.css");
@import url("../../assets/tstyle/css/app.css");
</style>
