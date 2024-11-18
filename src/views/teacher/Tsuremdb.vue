<template>
  <div>
    <div id="ref_page" class="am-g">
      <div class="tpl-content-page-title" style="margin-bottom: 10px;">审核免答辩申请表</div>

      <ol class="am-breadcrumb">
        <li><router-link to="/tmdbstudentlist" class="am-icon-users">申请学生</router-link></li>
        <li class="am-active">免答辩申请表</li>
      </ol>

      <div class="am-panel am-panel-default">
        <div class="am-panel-bd">
          <div class="am-scrollable-horizontal">
            <table class="am-table am-table-bordered am-table-centered am-text-nowrap">
              <thead>
                <tr>
                  <th colspan="9">人工智能学院本科生毕业设计（论文）免答辩申请表</th>
                </tr>
              </thead>
              <tbody>
                <tr id="tr1">
                  <td colspan="2">学 号</td>
                  <td colspan="2">{{ student.userAccount }}</td>
                  <td>姓 名</td>
                  <td colspan="2">{{ student.userName }}</td>
                  <td>性 别</td>
                  <td>{{ student.userGender === 1 ? '男' : '女' }}</td>
                </tr>
                <tr id="tr2">
                  <td colspan="2">专 业</td>
                  <td colspan="3">{{ student.subjectName }}</td>
                  <td>年 级</td>
                  <td>{{ student.gradeName }}</td>
                  <td>班 级</td>
                  <td>{{ student.className }}</td>
                </tr>
                <tr id="tr3">
                  <td colspan="2">申请人签名</td>
                  <td colspan="3"></td>
                  <td colspan="2">联系电话</td>
                  <td colspan="2">{{ student.userTel }}</td>
                </tr>
                <tr id="tr4">
                  <td colspan="2">论文题目</td>
                  <td colspan="3">{{ student.projectName }}</td>
                  <td colspan="2">导师姓名</td>
                  <td colspan="2">{{ student.teacherName }}</td>
                </tr>
                <tr style="height: 260px;">
                  <td colspan="2" class="am-text-middle">申请理由</td>
                  <td colspan="7"><textarea v-model="column1" style="width: 100%; height: 260px;" disabled></textarea>
                  </td>
                </tr>
                <tr style="height: 260px;">
                  <td colspan="2" class="am-text-middle">指导老师意见</td>
                  <td colspan="7"><textarea v-model="column2" style="width: 100%; height: 260px;"></textarea></td>
                </tr>
              </tbody>
            </table>
            <button @click="submitOpinion" :disabled="isSubmitDisabled" type="button"
              class="am-btn am-btn-primary am-radius am-fr"
              :data-am-loading="{ spinner: 'circle-o-notch', loadingText: '提交中...', resetText: '提交完成' }">
              提交审核意见
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入 axios
import axios from 'axios';
import '@/assets/amazeui/js/amazeui.min.js';
export default {
  data() {
    return {
      studentId: this.getQueryString("studentId"),
      student: {
        userAccount: '',
        userName: '',
        userGender: '',
        subjectName: '',
        gradeName: '',
        className: '',
        userTel: '',
        projectName: '',
        teacherName: ''
      },
      column1: '', // 免答辩申请理由
      column2: '', // 指导老师意见
      isSubmitDisabled: false,
      mdbId: null
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

    // 使用 axios 获取学生数据
    async fetchStudentData() {
      try {
        const response = await axios.get(`/studentController/getStudentAndMdbBySid?studentId=${this.studentId}`);
        const data = response.data;

        this.student = {
          userAccount: data.user.userAccount,
          userName: data.user.userName,
          userGender: data.user.userGender,
          subjectName: data.classInfo.subject.subjectName,
          gradeName: data.classInfo.grade.gradeName,
          className: data.classInfo.className,
          userTel: data.user.userTel,
          projectName: data.project.projectName,
          teacherName: data.teacher.user.userName
        };

        this.column1 = data.mdb.column1;

        if (data.mdb.column2) {
          this.column2 = data.mdb.column2;
          this.isSubmitDisabled = true;
        } else {
          this.mdbId = data.mdb.mdbId;
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    },
    // 使用 axios 提交审核意见
    submitOpinion() {
      // 校验 column2 是否为空
      if (!this.column2) {
        console.error('column2 is invalid:', this.column2);
        return;
      }

      this.isSubmitting = true; // 设置提交状态
      const btn = document.getElementById('mdb_btn'); // 获取按钮元素
      if (btn) {
        btn.classList.add('am-disabled'); // 禁用按钮
        btn.innerText = '提交中...';
      }

      // 使用 axios 发送请求
      axios.post('/mdbController/updateColumnById', {
        '_method': 'post', // 后端需要的伪方法参数
        mdbId: this.mdbId, // 隐藏字段值
        column2: this.column2, // 输入字段值
      })
        .then(response => {
          // 响应成功处理
          if (response.data) {
            setTimeout(() => {
              if (btn) {
                btn.innerText = '提交完成'; // 更新按钮状态
                btn.classList.add('btn-disabled'); // 添加禁用样式
              }
              this.isSubmitDisabled = true; // 禁用其他提交操作
              alert('提交完成'); // 提示提交成功
            }, 1000);
          }
        })
        .catch(error => {
          // 捕获错误
          console.error('Error submitting opinion:', error);
        })
        .finally(() => {
          this.isSubmitting = false; // 确保提交状态复位
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