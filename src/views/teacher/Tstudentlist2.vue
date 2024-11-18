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
			  <tr v-for="(student, index) in students" :key="student.studentId">
				<td>{{ index + 1 }}</td>
				<td>{{ student.project.projectName }}</td>
				<td>{{ student.user.userName }}</td>
				<td>{{ student.classInfo.className }}</td>
				<td>{{ student.user.userTel }}</td>
				<td>
				  <button style="background-color:#0FA6DC;"
					type="button" 
					class="am-btn am-btn-primary am-btn-block" 
					@click="goToScorePage(student.studentId)">
					进入评分
				  </button>
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
		students: []  // 用来存储学生数据
	  };
	},
	mounted() {
	  // 页面加载时获取数据
	  this.fetchStudents();
	},
	methods: {
	  // 获取学生数据
	  fetchStudents() {
		axios.get('/teacherController/getStudentByTeacherId')
		  .then(response => {
			this.students = response.data;  // 将返回的数据赋值给students
		  })
		  .catch(error => {
			console.error('获取学生数据失败', error);
		  });
	  },
	  // 进入评分页面的跳转方法
	  goToScorePage(studentId) {
		const url = `/studentController/gotoTstudentscore?studentId=${studentId}`;
		const form = document.createElement('form');
		form.setAttribute('action', url);
		form.setAttribute('method', 'post');
		document.body.appendChild(form);
		form.submit();  // 提交表单，跳转到评分页面
	  }
	}
  };
  </script>

<style>
@import url("../../assets/amazeui/css/amazeui.min.css");
@import url("../../assets/tstyle/css/admin.css");
@import url("../../assets/tstyle/css/app.css");
</style>