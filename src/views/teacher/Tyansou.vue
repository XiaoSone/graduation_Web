<template>
    <div id="ref_page" class="am-g">
        <div class="tpl-content-page-title" style="margin-bottom: 10px">验收评分</div>

        <div class="am-panel am-panel-default">
            <div class="am-panel-bd am-scrollable-horizontal">
                <div class="am-u-sm-12">
                    <table class="am-table am-table-centered am-table-striped am-table-hover table-main">
                        <thead>
                            <tr>
                                <th>学号</th>
                                <th>姓名</th>
                                <th>性别</th>
                                <th>联系方式</th>
                                <th>班级</th>
                                <th>指导老师</th>
                                <th>毕设题目</th>
                                <th>打分(1~70分)</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(student, index) in students" :key="index">
                                <td>{{ student.user.userAccount }}</td>
                                <td>{{ student.user.userName }}</td>
                                <td>{{ student.user.userGender === 1 ? "男" : "女" }}</td>
                                <td>{{ student.user.userTel }}</td>
                                <td>{{ student.classInfo.className }}</td>
                                <td>{{ student.teacher.user.userName }}</td>
                                <td>{{ student.project.projectName }}</td>
                                <td>
                                    <input v-if="student.daBian || student.daBian.dabianScore != null" v-model.number="student.daBian.dabianScore" type="number" min="1" max="70" :disabled="!student.isEditable" />
                                    <input v-else placeholder="暂无评分" type="number" min="1" max="70" v-model="student.dabianScore" :disabled="!student.isEditable" />
                                </td>
                                <td>
                                    <div class="am-btn-toolbar">
                                        <div class="am-btn-group am-btn-group-xs" style="float: right">
                                            <button class="am-btn am-btn-default am-btn-xs am-text-secondary" :disabled="student.dabianId || isEditDisabled" @click="enableEditing(student)"><span class="am-icon-pencil-square-o"></span> 编辑</button>
                                            <button class="am-btn am-btn-default am-btn-xs am-text-secondary" :disabled="student.dabianId || student.isSubmitDisabled" @click="submitScore(student)"><span class="am-icon-check"></span> 提交</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
            students: [], // 存储学生列表
            currentPage: 1,
            pageSize: 8,
            isEditDisabled: false,
        };
    },
    created() {
        this.fetchStudents();
    },
    methods: {
        // 获取学生数据
        async fetchStudents() {
            try {
                const response = await axios.get("/teacherController/getYansouTeamStu", {
                    params: {
                        pageNum: this.currentPage,
                        pageSize: this.pageSize,
                    },
                });
                this.checkIfTeacherIsLeader();
                const data = response.data;
                console.log(data);

                if (data.list && data.list.length) {
                    this.students = data.list.map((student) => ({
                        ...student,
                        isEditable: false,
                        isSubmitDisabled: true,
                    }));
                } else {
                    this.students = [];
                }
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        },

        // 检查教师是否为组长
        async checkIfTeacherIsLeader() {
            try {
                const response = await axios.get("/teacherController/thisTeacherisLeader");
                if (response.data.isLeader === 1) {
                    this.students.forEach((student) => {
                        student.isEditable = true;
                    });
                }
            } catch (error) {
                console.error("检查教师身份失败:", error);
            }
        },

        // 启用编辑模式
        enableEditing(student) {
            student.isEditable = true;
            student.dabianScore = student.dabianScore || "";
            this.isSubmitDisabled = true;
            student.isSubmitDisabled = false;
        },

        // 提交评分
        async submitScore(student) {
            if (!student.dabianScore || student.dabianScore < 1 || student.dabianScore > 70) {
                if (!student.daBian.dabianScore || student.daBian.dabianScore < 1 || student.daBian.dabianScore > 70) {
                    alert("评分必须在1到70之间");
                    return;
                }
                student.dabianScore = student.daBian.dabianScore;
                student.dabianId = student.daBian.id;
            }
            try {
                const response = await axios.post("/dabianController/insertOrUpdate", {
                    studentId: student.studentId,
                    id: student.dabianId,
                    dabianScore: student.dabianScore,
                });
                if (response.data && response.data.id) {
                    student.dabianId = response.data.id;
                    student.isEditable = false;
                }
            } catch (error) {
                console.error("提交失败:", error);
            }
            this.fetchStudents();
        },
    },
};
</script>

<style>
@import url("../../assets/amazeui/css/amazeui.min.css");
@import url("../../assets/tstyle/css/admin.css");
@import url("../../assets/tstyle/css/app.css");
</style>
