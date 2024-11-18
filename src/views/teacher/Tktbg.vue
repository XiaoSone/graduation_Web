<template>
    <div>
      <div id="ref_page" class="am-g" style="height: 905px;">
        <div class="tpl-content-page-title" style="margin-bottom: 10px;">审阅开题报告</div>
        <ol class="am-breadcrumb">
            <li><router-link to="/tstudentlist" class="am-icon-users">学生列表</router-link></li>
            <li class="am-active">开题报告</li>
        </ol>
        <div class="am-panel am-panel-default">
          <div class="am-panel-bd">
            <div id="ktbg_title" style="margin-bottom: 10px;">
              <span class="am-text-lg">是否审核通过：</span>
              <select v-model="ktbgStatus" class="am-form-select" placeholder="请选择">
                <option value="">请选择</option>
                <option value="1">是</option>
                <option value="0">否</option>
              </select>
              <button id="ktbg_btn"
                :disabled="isSubmitDisabled"
                @click="submitKtbg"
                class="am-btn am-btn-primary am-radius"
                :loading="isSubmitting"
              >提交</button>
            </div>
            <hr>
            <div class="am-scrollable-horizontal">
              <table class="am-table am-table-bordered am-table-centered am-text-nowrap">
                <tbody>
                  <tr>
                    <td rowspan="6" style="width: 45px;" class="am-text-middle">开题报告</td>
                    <td colspan="2">姓 名</td>
                    <td>性别</td>
                    <td colspan="2">学 号</td>
                    <td colspan="2">专 业</td>
                    <td colspan="2">年 级</td>
                  </tr>
                  <tr>
                    <td colspan="2">{{ student.name }}</td>
                    <td>{{ student.gender }}</td>
                    <td colspan="2">{{ student.account }}</td>
                    <td colspan="2">{{ student.major }}</td>
                    <td colspan="2">{{ student.grade }}</td>
                  </tr>
                  <tr>
                    <td rowspan="2" class="am-text-middle">题目</td>
                    <td colspan="6" rowspan="2" class="am-text-middle" id="projectName">{{ project.name }}</td>
                    <td colspan="2">课题来源</td>
                  </tr>
                  <tr>
                    <td id="projectFrom">{{ project.from }}</td>
                  </tr>
                  <tr style="height: 260px;">
                    <td class="am-text-middle" style="width: 30px;">概述</td>
                    <td colspan="8">
                      <textarea v-model="ktbg.column1" placeholder="说明选题目的、意义，国内外研究现状等" style="width: 100%; height: 260px;" disabled></textarea>
                    </td>
                  </tr>
                  <tr style="height: 260px;">
                    <td class="am-text-middle">思路及方法</td>
                    <td colspan="8">
                      <textarea v-model="ktbg.column2" style="width: 100%; height: 260px;" disabled></textarea>
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
  import axios from 'axios';
  import '@/assets/amazeui/js/amazeui.min.js';
  export default {
    data() {
      return {
        studentId: null,  // 存储学生 ID
        student: {
          name: '',
          gender: '',
          account: '',
          major: '',
          grade: ''
        },
        project: {
          name: '',
          from: ''
        },
        ktbg: {
          column1: '',
          column2: ''
        },
        ktbgStatus: '', // 审核状态
        ktbgId: null,
        isSubmitting: false, // 是否正在提交
        isSubmitDisabled: false // 提交按钮是否禁用
      };
    },
    created() {
      // 获取 URL 中的 studentId
      this.studentId = this.getQueryString("studentId");
      // 获取学生和开题报告数据
      this.fetchStudentData();
    },
    methods: {

      // 获取 URL 参数
      getQueryString(name) {
        const url = window.location.href;
        const regex = new RegExp("[?&]" + name + "=([^&]*)", "i");
        const result = regex.exec(url);
        return result ? decodeURIComponent(result[1]) : null;
      },

      // 获取学生数据和开题报告数据
      fetchStudentData() {
        axios.get('/studentController/getStudentAndKtbgBySid', {
          params: { studentId: this.studentId }
        }).then(response => {
          const data = response.data;
          console.log(data)
          if (data && data.ktbg) {
            this.student = {
              name: data.user.userName,
              gender: data.user.userGender === 1 ? '男' : '女',
              account: data.user.userAccount,
              major: data.classInfo.subject.subjectName,
              grade: data.classInfo.grade.gradeName
            };
            this.project = {
              name: data.project.projectName,
              from: data.project.projectFrom.projectFromName
            };
            this.ktbg = {
              column1: data.ktbg.column1,
              column2: data.ktbg.column2
            };
            this.ktbgId = data.ktbg.ktbgId;

            // 更新按钮文本
            this.updateSubmitButton();
          } else {
            this.isSubmitDisabled = true;
          }
        }).catch(error => {
          console.error(error);
        });
      },

      // 更新提交按钮文本
      updateSubmitButton() {
        axios.get('/ktbgController/getKtbgStatus', {
          params: { ktbgId: this.ktbgId }
        }).then(response => {
          const data = response.data;
          if (data.ktbgStatus !== null) {
            this.isSubmitDisabled = false;
            this.$nextTick(() => {
              document.getElementById('ktbg_btn').innerText = `更新 (上次审核结果为: ${data.ktbgStatus === 1 ? '是' : '否'})`;
            });
          }
        }).catch(error => {
          console.error(error);
        });
      },

      // 提交开题报告
      submitKtbg() {
        if (this.ktbgStatus === '') {
          return;
        }
        this.isSubmitting = true;
        axios.post('/ktbgController/updateByPrimaryKeySelective', {
          ktbgId: this.ktbgId,
          ktbgStatus: this.ktbgStatus
        }).then(response => {
          this.isSubmitting = false;
          this.isSubmitDisabled = true;
          setTimeout(() => {
            alert('提交完成');
          }, 500);
        }).catch(error => {
          this.isSubmitting = false;
          console.error(error);
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