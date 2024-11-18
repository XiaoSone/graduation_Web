<template>
    <div id="ref_page" class="am-g">
        <!-- 页面标题 -->
        <div class="tpl-content-page-title" style="margin-bottom: 10px">申请免答辩的学生</div>

        <!-- 主要面板 -->
        <div class="am-panel am-panel-default">
            <div class="am-panel-bd am-scrollable-horizontal">
                <div class="am-u-sm-12">
                    <!-- 表格，用于展示学生信息 -->
                    <table class="am-table am-table-centered am-table-striped am-table-hover table-main">
                        <thead>
                            <tr>
                                <th class="table-id">编号</th>
                                <th class="table-title">姓名</th>
                                <th class="table-type">性别</th>
                                <th>专业</th>
                                <th>年级</th>
                                <th>班级</th>
                                <th>电话号码</th>
                                <th>选题</th>
                                <th>审核免答辩申请</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- 使用 v-for 循环遍历 students 列表 -->
                            <tr v-for="(student, index) in students" :key="student.studentId">
                                <td class="am-text-middle">{{ index + 1 }}</td>
                                <td class="am-text-middle">{{ student.user.userName }}</td>
                                <td class="am-text-middle">{{ student.user.userGender === 1 ? "男" : "女" }}</td>
                                <td class="am-text-middle">{{ student.classInfo.subject.subjectName }}</td>
                                <td class="am-text-middle">{{ student.classInfo.grade.gradeName }}</td>
                                <td class="am-text-middle">{{ student.classInfo.className }}</td>
                                <td class="am-text-middle">{{ student.user.userTel }}</td>
                                <td class="am-text-middle">{{ student.project.projectName }}</td>
                                <td class="am-text-middle">
                                    <a :href="'/mdbController/gotoTsureMdb?studentId=' + student.studentId" class="mdb_a"> 进入审核 </a>
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
import axios from "axios"; // 引入 axios

export default {
    data() {
        return {
            students: [], // 存储学生信息
        };
    },
    mounted() {
        // 组件加载时获取学生数据
        this.fetchStudents();
    },
    methods: {
        // 获取学生数据的方法
        async fetchStudents() {
            try {
                // 使用 axios 发送 GET 请求
                const response = await axios.get("/teacherController/getStudentByTeacherId2");
                const data = response.data;

                // 过滤出有免答辩申请的学生并存入 students 数组
                this.students = data.filter((student) => student.mdb != null && student.mdb !== "");
            } catch (error) {
                console.error("Error fetching students:", error);
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
