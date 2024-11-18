<template>
  <div>
    <div id="ref_page" class="am-g">
      <div class="tpl-content-page-title" style="margin-bottom: 10px;">得分信息</div>
      <div class="am-panel am-panel-default">
        <div class="am-panel-bd">
          <table class="am-table am-table-bordered am-table-radius am-table-centered">
            <tr>
              <th class="am-text-center">指导老师打分</th>
              <th class="am-text-center">答辩组打分</th>
              <th class="am-text-center">总分</th>
            </tr>
            <tr id="score">
              <td class="am-text-center">{{ score1 }}</td>
              <td class="am-text-center">{{ score2 }}</td>
              <td class="am-text-center">{{ totalScore }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      score1: '', // 存储指导老师打分
      score2: '', // 存储答辩组打分
      totalScore: '', // 存储总分
    };
  },
  created() {
    this.getScores();
  },
  methods: {
    async getScores() {
      try {
        // 获取指导老师打分
        const response1 = await axios.get('/studentController/getThisStudentScore');
        this.score1 = response1.data !== -1 ? response1.data : '还未评分';
      } catch (error) {
        console.error('Error fetching first score:', error);
      }

      try {
        // 获取答辩组打分
        const response2 = await axios.get('/dabianController/getThisStudentScore');
        this.score2 = response2.data !== -1 ? response2.data : '还未评分';
      } catch (error) {
        console.error('Error fetching second score:', error);
      }
    },
    calculateTotal() {
      // 转换分数为整数以进行求和，若不是数字则默认为 0
      const score1Int = isNaN(this.score1) ? 0 : parseInt(this.score1, 10);
      const score2Int = isNaN(this.score2) ? 0 : parseInt(this.score2, 10);

      const sum = score1Int + score2Int;
      let grade = '';

      if (sum >= 90) {
        grade = '优秀';
      } else if (sum >= 80) {
        grade = '良好';
      } else if (sum >= 70) {
        grade = '中等';
      } else if (sum >= 60) {
        grade = '及格';
      } else {
        grade = '不及格';
      }

      this.totalScore = `${sum} [${grade}]`;
    },
  },
  watch: {
    score1: 'calculateTotal',
    score2: 'calculateTotal',
  },
};
</script>

<style>
@import url("../../assets/sstyle/css/app.css");
@import url("../../assets/sstyle/css/admin.css");
</style>
