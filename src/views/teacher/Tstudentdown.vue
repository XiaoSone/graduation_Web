<template>
	<div>
		<div id="ref_page" class="am-g">
			<div class="tpl-content-page-title" style="margin-bottom: 10px">下载学生的各项材料</div>
			<div class="am-panel am-panel-default">
				<div class="am-panel-bd am-scrollable-horizontal">
					<div class="am-u-sm-12">
						<table class="am-table am-table-centered am-table-striped am-table-hover table-main">
							<thead>
								<tr>
									<th class="table-id">编号</th>
									<th class="table-title">姓名</th>
									<th>专业</th>
									<th>年级</th>
									<th>班级</th>
									<th>电话号码</th>
									<th>开题报告表</th>
									<th>中期检查表</th>
									<th>免答辩申请表</th>
									<th>论文</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(student, index) in students" :key="student.studentId">
									<td class="am-text-middle">{{ index + 1 }}</td>
									<td class="am-text-middle">{{ student.user.userName }}</td>
									<td class="am-text-middle">{{ student.classInfo.subject.subjectName }}</td>
									<td class="am-text-middle">{{ student.classInfo.grade.gradeName }}</td>
									<td class="am-text-middle">{{ student.classInfo.className }}</td>
									<td class="am-text-middle">{{ student.user.userTel }}</td>
									<td class="am-text-middle">
										<button style="color: black" :class="['am-btn am-btn-primary am-btn-sm', { 'am-disabled': !student.ktbg }]" :disabled="!student.ktbg" @click="downloadFile('ktbg', student.studentId,student.user.userName,student.user.userAccount)">下载 <i class="am-icon-cloud-download"></i></button>
									</td>
									<td class="am-text-middle">
										<button style="color: black" :class="['am-btn am-btn-primary am-btn-sm', { 'am-disabled': !student.zqjc }]" :disabled="!student.zqjc" @click="downloadFile('zqjc', student.studentId,student.user.userName,student.user.userAccount)">下载 <i class="am-icon-cloud-download"></i></button>
									</td>
									<td class="am-text-middle">
										<button style="color: black" :class="['am-btn am-btn-primary am-btn-sm', { 'am-disabled': !student.mdb }]" :disabled="!student.mdb" @click="downloadFile('mdb', student.studentId,student.user.userName,student.user.userAccount)">下载 <i class="am-icon-cloud-download"></i></button>
									</td>
									<td class="am-text-middle">
										<button style="color: black" :class="['am-btn am-btn-primary am-btn-sm', { 'am-disabled': !student.lunwen }]" :disabled="!student.lunwen" @click="downloadFile('lunwen', student.studentId,student.user.userName,student.user.userAccount)">下载 <i class="am-icon-cloud-download"></i></button>
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
	import axios from "axios";
	import "@/assets/amazeui/js/amazeui.min.js";
	export default {
		data() {
			return {
				students: [], // 存储学生数据
			};
		},
		mounted() {
			// 组件挂载时，加载学生数据
			this.fetchStudents();
		},
		methods: {
			// 获取学生数据
			fetchStudents() {
				axios
					.get("/teacherController/getStudentByTeacherId2")
					.then((response) => {
						this.students = response.data.map((student) => ({
							...student,
							ktbg: student.ktbg, // 开题报告
							zqjc: student.zqjc, // 中期检查
							mdb: student.mdb, // 免答辩申请
							lunwen: student.lunwen, // 论文
						}));
					})
					.catch((error) => {
						console.error("Error fetching student data:", error);
					});
			},
			// 下载文件的处理方法
			downloadFile(type, studentId, userName, userAccount) {
				let url = "";
				switch (type) {
					case "ktbg":
						// alert(studentId);
						this.downloadKtbg(studentId, userName, userAccount);

						break;
					case "zqjc":
						this.downloadZqjc(studentId, userName, userAccount);
						break;
					case "mdb":
						this.downloadMdb(studentId, userName, userAccount);
						break;
					case "lunwen":
						this.downloadLunwen(studentId, userName, userAccount);
						break;
					default:
						break;
				}
			}, // 下载开题报告表
			async downloadKtbg(studentId, userName, userAccount) {
				try {
					const response = await axios.get(`/studentController/downKtbg?studentId=${studentId}`, { responseType: "blob" });
					this.handleFileDownload(response, userAccount + userName + "-开题报告表.doc");
				} catch (error) {
					console.error("下载开题报告表失败:", error);
				}
			},
			// 下载中期检查反馈表
			async downloadZqjc(studentId, userName, userAccount) {
				try {
					const response = await axios.get(`/studentController/downZqjc?studentId=${studentId}`, { responseType: "blob"});
					this.handleFileDownload(response, userAccount + userName + "-中期检查反馈表.doc");
				} catch (error) {
					console.error("下载中期检查反馈表失败:", error);
				}
			},
			// 下载免答辩申请表
			async downloadMdb(studentId, userName, userAccount) {
				try {
					const response = await axios.get(`/studentController/downMdb?studentId=${studentId}`, { responseType: "blob"});
					this.handleFileDownload(response, userAccount + userName + "-免答辩申请表.doc");
				} catch (error) {
					console.error("下载免答辩申请表失败:", error);
				}
			}, // 下载学生论文
			async downloadLunwen(studentId, userName, userAccount) {
				try {
					const response = await axios.get(`/lunwenController/downloadResource?studentId=${studentId}`, { responseType: "blob"});
					this.handleFileDownload(response, userAccount + userName + "-论文.doc");
				} catch (error) {
					console.error("下载免答辩申请表失败:", error);
				}
			},
			// 处理文件下载
			handleFileDownload(response, fileName) {
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement("a");
				link.href = url;
				link.setAttribute("download", fileName);
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			},
		},
	};
</script>

<style>
	@import url("../../assets/amazeui/css/amazeui.min.css");
	@import url("../../assets/tstyle/css/admin.css");
	@import url("../../assets/tstyle/css/app.css");
</style>
