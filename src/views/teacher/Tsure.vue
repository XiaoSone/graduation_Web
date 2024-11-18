<template>
  <div id="ref_page" class="am-g">
    <div class="tpl-content-page-title" style="margin-bottom: 10px;">确认选题</div>
    <div class="am-panel am-panel-default">
      <div class="am-panel-bd am-scrollable-horizontal">
        <div class="am-u-sm-12">
          <table class="am-table am-table-centered am-table-striped am-table-hover table-main">
            <thead>
              <tr>
                <th>编号</th>
                <th>课题名</th>
                <th>选题学生</th>
                <th>班级</th>
                <th>电话号码</th>
                <th><span style="margin-left: 50%;">操作</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(project, index) in projectList" :key="project.projectId">
                <td class="am-text-middle">{{ index + 1 }}</td>
                <td class="am-text-middle">{{ project.projectName }}</td>
                <td class="am-text-middle">{{ project.student?.user?.userName || '无' }}</td>
                <td class="am-text-middle">{{ project.student?.classInfo?.className || '无' }}</td>
                <td class="am-text-middle">{{ project.student?.user?.userTel || '无' }}</td>
                <td class="am-text-middle">
                  <div class="am-btn-toolbar">
                    <div class="am-btn-group am-btn-group-xs" style="float: right;">
                      <button v-if="project.student" type="button" class="am-btn am-btn-default am-btn-xs am-text-secondary" @click="confirmProject(project)">
                        <span class="am-icon-check"></span> 确定
                      </button>
                      <button v-if="project.student" type="button" class="am-btn am-btn-default am-btn-xs am-text-danger" @click="cancelProject(project)">
                        <span class="am-icon-times"></span> 取消
                      </button>
                    </div>
                  </div>
                  <input type="hidden" :value="project.student?.studentId" class="studentId">
                  <input type="hidden" :value="teacherId" class="teacherId">
                  <input type="hidden" :value="project.projectId" class="projectId">
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
import axios from 'axios';

export default {
  data() {
    return {
      teacherId: null,
      projectList: [],
    };
  },
  mounted() {
    this.fetchProjectData();
  },
  methods: {
    // 获取课题数据
    async fetchProjectData() {
      try {
        const response = await axios.get('/teacherController/findTeacherAndProject');
        const data = response.data;
        this.teacherId = data.teacherId;
        this.projectList = data.projectList;
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    },

    // 确定选题
    async confirmProject(project) {
      if (!project.student?.studentId) {
        return;
      }
      try {
        const response = await axios.put('/studentController/updateProjectNum', {
          studentId: project.student.studentId,
          projectId: project.projectId,
          teacherId: this.teacherId,
        });
        if (response.data) {
          project.student = null; // 清除已选学生
        }
      } catch (error) {
        console.error('Error confirming project:', error);
      }
    },

    // 取消选题
    async cancelProject(project) {
      if (!project.student?.studentId) {
        return;
      }
      try {
        const response = await axios.put('/studentController/updateNoProjectNum', {
          studentId: project.student.studentId,
          projectId: project.projectId,
        });
        if (response.data) {
          project.student = null; // 清除选题
        }
      } catch (error) {
        console.error('Error cancelling project:', error);
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