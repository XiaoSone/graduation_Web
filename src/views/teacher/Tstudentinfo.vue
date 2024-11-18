<template>
    <div>
      <div id="ref_page" class="am-g">
        <div class="tpl-content-page-title" style="margin-bottom: 10px;">查看学生信息</div>
        <div class="am-panel am-panel-default">
          <div class="am-panel-bd am-scrollable-horizontal">
            <div class="am-u-sm-12">
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
                    <th>是否免答辩</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- 使用 v-for 遍历学生数据 -->
                  <tr v-for="(student, index) in students" :key="student.studentId">
                    <td class="am-text-middle">{{ index + 1 }}</td>
                    <td class="am-text-middle">{{ student.user.userName }}</td>
                    <td class="am-text-middle">{{ student.user.userGender === 1 ? '男' : '女' }}</td>
                    <td class="am-text-middle">{{ student.classInfo.subject.subjectName }}</td>
                    <td class="am-text-middle">{{ student.classInfo.grade.gradeName }}</td>
                    <td class="am-text-middle">{{ student.classInfo.className }}</td>
                    <td class="am-text-middle">{{ student.user.userTel }}</td>
                    <td class="am-text-middle">{{ student.project.projectName }}</td>
                    <td class="am-text-middle">{{ student.goodBoy === 1 ? '是' : '否' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import '@/assets/amazeui/js/amazeui.min.js';
  export default {
    data() {
      return {
        students: []  // 存储学生数据
      };
    },
    mounted() {
      // 组件挂载时获取学生数据
      this.fetchStudents();
    },
    methods: {
      // 获取学生数据
      fetchStudents() {
        axios.get('/teacherController/getStudentByTeacherId2')
          .then(response => {
            // 将响应数据存储到 students 数组中
            this.students = response.data;
          })
          .catch(error => {
            console.error('Error fetching student data:', error);
          });
      }
    }
  };
  </script>

<style>
@import url("../../assets/amazeui/css/amazeui.min.css");
@import url("../../assets/tstyle/css/admin.css");
@import url("../../assets/tstyle/css/app.css");
</style>