<template>
<div id="ref_page" class="am-g" style="height: 300px;">
    <div class="tpl-content-page-title" style="margin-bottom: 10px;">教师分组信息</div>
    <div class="am-panel am-panel-default">
      <div class="am-panel-bd am-scrollable-horizontal">
        <div class="am-u-sm-12">
          <table class="am-table am-table-centered table-main">
            <thead>
              <tr>
                <th class="table-title">姓名</th>
                <th>所在验收/答辩组</th>
                <th>是否为验收/答辩组组长</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(teacher, index) in yansouTeachers" :key="index">
                <td class="am-text-middle">
                  <span>{{ teacher.teacher.user.userName }}</span>
                </td>
                <td class="am-text-middle">
                  <span>{{ yansouTeamName }}</span>
                </td>
                <td class="am-text-middle">
                  <span>{{ teacher.isLeader === 1 ? '是' : '否' }}</span>
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


// 导入 axios 库
import axios from 'axios';
import '@/assets/amazeui/js/amazeui.min.js';
import "../../assets/js/wangEditor.min.js";

export default {
  data() {
    return {
      yansouTeachers: [], // Data for teachers
      yansouTeamName: ''  // Team name
    };
  },
  mounted() {
    this.fetchTeacherInfo();
  },
  methods: {
    async fetchTeacherInfo() {
      try {
        const response = await axios.get('/teacherController/getTeacherYansouInfo');
        this.yansouTeachers = response.data.yansouTeachers;
        this.yansouTeamName = response.data.yansouTeamName;
      } catch (error) {
        console.error('Error fetching teacher info:', error);
      }
    }
  }
};
</script>

<style>
@import url("../../assets/amazeui/css/amazeui.min.css");
@import url("../../assets/tstyle/css/admin.css");
@import url("../../assets/tstyle/css/app.css");
</style>