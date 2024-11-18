<template>
	<div>
	  <div id="ref_page" class="am-g">
		<div class="tpl-content-page-title" style="margin-bottom: 10px;">学生列表</div>
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
				  <th>操作</th>
				</tr>
			  </thead>
			  <tbody>
				<tr v-for="(student, index) in studentList" :key="student.studentId">
				  <td>{{ index + 1 }}</td>
				  <td>{{ student.project.projectName }}</td>
				  <td>{{ student.user.userName }}</td>
				  <td>{{ student.classInfo.className }}</td>
				  <td>{{ student.user.userTel }}</td>
				  <td>
					<div class="am-btn-group">
					  <a
						v-if="student.studentId"
						class="am-btn am-btn-default am-btn-primary"
						:href="'/ktbgController/gotoTktbg?studentId=' + student.studentId"
						role="button"
					  >开题报告</a>
					  <a
						v-if="student.studentId"
						class="am-btn am-btn-default am-btn-primary"
						:href="'/zqjcController/gotoTzqjc?studentId=' + student.studentId"
						role="button"
					  >中期检查</a>
					  <a
						v-if="student.studentId"
						class="am-btn am-btn-default am-btn-primary"
						:href="'/lunwenController/gotoTstudentlunwen?studentId=' + student.studentId"
						role="button"
					  >论文</a>
					</div>
				  </td>
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
  import '@/assets/amazeui/js/amazeui.min.js';
  import axios from 'axios';
  
  export default {
	data() {
	  return {
		studentList: [], // 存储学生列表数据
	  };
	},
	mounted() {
	  this.fetchStudentList(); // 在组件挂载时请求数据
	},
	methods: {
	  // 获取学生列表数据
	  async fetchStudentList() {
		try {
		  const response = await axios.get('/teacherController/getStudentByTeacherId');
		  this.studentList = response.data; // 将返回的数据赋值给 studentList
		} catch (error) {
		  console.error("Error fetching student list:", error);
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