<template>
    <div>
      <div id="ref_page" class="am-g">
        <div class="tpl-content-page-title" style="margin-bottom: 10px;">成绩评定</div>

        <ol class="am-breadcrumb">
            <li><router-link to="/tstudentlist2" class="am-icon-users">学生列表</router-link></li>
          <li class="am-active">成绩评价表</li>
        </ol>

        <div class="am-panel am-panel-default">
          <div class="am-panel-bd">
            <div class="am-scrollable-horizontal">
              <table class="am-table am-table-bordered am-table-radius am-table-centered">
                <thead>
                  <tr>
                    <th colspan="5">毕业设计（论文）完成情况评价表(指导教师用，满分30分)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>学生学号</td>
                    <td>{{ student.userAccount }}</td>
                    <td>学生姓名</td>
                    <td>{{ student.userName }}</td>
                  </tr>
                  <tr>
                    <td>专业</td>
                    <td>{{ student.subjectName }}</td>
                    <td>班级</td>
                    <td>{{ student.className }}</td>
                  </tr>
                  <tr>
                    <td>设计题目</td>
                    <td colspan="3">{{ student.projectName }}</td>
                  </tr>
                  <tr v-for="(scoreOption, index) in scoreOptions" :key="index">
                    <td colspan="4">
                      <p class="am-text-left"><strong>{{ scoreOption.label }}</strong></p>
                      <label v-for="option in scoreOption.options" :key="option.value" class="am-radio am-secondary">
                        <input type="radio" :name="scoreOption.name" :value="option.value" v-model="scoreArray[index]" />
                        <p class="am-text-left">{{ option.text }} <span class="am-fr">（{{ option.value }}分）</span></p>
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td class="am-text-left"><strong>毕业设计完成情况总成绩：</strong></td>
                    <td colspan="4">{{ totalScore }}</td>
                  </tr>
                  <tr>
                    <td colspan="5">
                      <textarea placeholder="指导教师评语" v-model="teacherEvaluate" style="width: 100%; height: 260px;"></textarea>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                :disabled="!canSubmit"
                @click="submitScore"
                class="am-btn am-btn-primary am-radius am-fr"
                :data-am-loading="loadingState"
              >
                {{ buttonText }}
              </button>
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
        studentId: this.getQueryString("studentId"), // 获取学生ID
        student: {
          userAccount: "",
          userName: "",
          subjectName: "",
          className: "",
          projectName: ""
        },
        scoreOptions: [
          {
            name: "radio1",
            label: "1．文献检索、阅读及综述能力分",
            options: [
              { value: 5, text: "A  文献查阅、翻译、阅读、综述能力强" },
              { value: 4, text: "B  介于A、C之间" },
              { value: 3, text: "C  文献查阅能力一般" },
              { value: 2, text: "D  低于C的" }
            ]
          },
          {
            name: "radio2",
            label: "2．实验方案设计能力分",
            options: [
              { value: 5, text: "A  方案具有独到见解" },
              { value: 4, text: "B  介于A、C之间" },
              { value: 3, text: "C  只有在指导教师的指导下，才能确定方案" },
              { value: 2, text: "D  低于C的" }
            ]
          },
          {
            name: "radio3",
            label: "3．基本理论运用及自学能力分",
            options: [
              { value: 5, text: "A  基本概念清晰、基本理论扎实，并能在设计中很好运用，自学能力强" },
              { value: 4, text: "B  介于A、C之间" },
              { value: 3, text: "C  基本概念、基本理论掌握程度一般，基本理论运用及自学能力一般" },
              { value: 2, text: "D  低于C的" }
            ]
          },
          {
            name: "radio4",
            label: "4．分析问题、解决问题及计算机运用能力分",
            options: [
              { value: 5, text: "A  能正确地分析毕业设计实施过程中遇到的各种问题，并提出解决问题的有效措施，同时具有很强的计算机运用技能" },
              { value: 4, text: "B  介于A、C之间" },
              { value: 3, text: "C  能对设计过程中遇到的问题作初步分析，解决措施得当，计算机运用技能一般" },
              { value: 2, text: "D  低于C的" }
            ]
          },
          {
            name: "radio5",
            label: "5．动手能力分，包括程序调试、绘图、计算、实验、制作、数据处理等能力",
            options: [
              { value: 5, text: "A  程序调试、原始实验记录或工作记录详细准确，系统测试准确，能正确分析与取舍所掌握的数据，能正确分析数据形成的各种原因，正确选择设计方法、计算结果正确" },
              { value: 4, text: "B  介于A、C之间" },
              { value: 3, text: "C  程序调试、数据处理、理论计算能力一般" },
              { value: 2, text: "D  低于C的" }
            ]
          },

        ],
        scoreArray: Array(7).fill(0),
        totalScore: 0,
        teacherEvaluate: "",
        canSubmit: true,
        loadingState: "circle-o-notch",
        buttonText: "提交"
      };
    },
    mounted() {
      this.fetchStudentData();
      this.checkSubmissionEligibility();
    },
    watch: {
    // 监听 scoreArray 的变化，动态更新 totalScore
    scoreArray(newScores) {
      this.totalScore = newScores.reduce((sum, score) => sum + Number(score), 0);
    }
  },
    methods: {
      getQueryString(name) {
        const url = window.location.href;
        const regex = new RegExp("[?&]" + name + "=([^&]*)", "i");
        const result = regex.exec(url);
        return result ? decodeURIComponent(result[1]) : null;
      },

      async fetchStudentData() {
        try {
          const response = await axios.get("/studentController/getStuAndProject", {
            params: { studentId: this.studentId }
          });
          const data = response.data;
          if (data.studentScore) {
            this.buttonText = `更新(上次评分为: ${data.studentScore})`;
          }
          this.student = {
            userAccount: data.user.userAccount,
            userName: data.user.userName,
            subjectName: data.classInfo.subject.subjectName,
            className: data.classInfo.className,
            projectName: data.project.projectName
          };
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      },
      async checkSubmissionEligibility() {
        try {
          const response = await axios.get("/lunwenController/getLunwenBySid", {
            params: { studentId: this.studentId }
          });
          if (response.data.lunwenStatus === 1) {
            this.canSubmit = true;
          } else {
            this.canSubmit = false;
          }
        } catch (error) {
          console.error("Error checking submission eligibility:", error);
        }
      },
      async submitScore() {
        try {
          const response = await axios.post("/studentController/updateScore", {
            studentId: this.studentId,
            studentScore: this.totalScore,
            teacherEvaluate: this.teacherEvaluate
          });
          if (response.data) {
            this.loadingState = "circle-o-notch";
            this.buttonText = "提交完成";
            setTimeout(() => {
              this.loadingState = "";
              this.buttonText = "提交";
            }, 500);
          }
        } catch (error) {
          console.error("Error submitting score:", error);
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