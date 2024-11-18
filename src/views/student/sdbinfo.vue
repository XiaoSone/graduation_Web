<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <div id="ref_page" class="am-g">
            <div class="tpl-content-page-title" style="margin-bottom: 10px">答辩/验收组信息</div>
            <div class="am-panel am-panel-default">
                <div class="am-panel-bd">
                    <ul class="am-list am-list-static am-list-border">
                        <li>
                            所在答辩/验收组：<span>{{ teamName }}</span>
                        </li>
                        <li>
                            答辩/验收组组长：<span>{{ teamLeader.name }}（联系电话：{{ teamLeader.tel }}）</span>
                        </li>
                        <li id="teacher_li">
                            答辩/验收组其他教师成员：
                            <span v-for="(teacher, index) in otherTeachers" :key="index"> {{ teacher.name }} （联系电话：{{ teacher.tel }}） </span>
                        </li>
                    </ul>
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
            teamName: "",
            teamLeader: {
                name: "",
                tel: "",
            },
            otherTeachers: [],
        };
    },
    mounted() {
        this.fetchYanSouInfo();
    },
    methods: {
        async fetchYanSouInfo() {
            try {
                // 获取组信息
                const response = await axios.get("/yansouController/selectYanSouInfoByid");
                const data = response.data;
                this.teamName = data.yansouTeamName;

                // 遍历教师信息，更新组长和其他教师成员信息
                data.yansouTeachers.forEach((teacher) => {
                    if (teacher.isLeader === 1) {
                        this.teamLeader.name = teacher.teacher.user.userName;
                        this.teamLeader.tel = teacher.teacher.user.userTel;
                    } else {
                        this.otherTeachers.push({
                            name: teacher.teacher.user.userName,
                            tel: teacher.teacher.user.userTel,
                        });
                    }
                });
            } catch (error) {
                console.error("获取组信息时出错:", error);
            }
        },
    },
};
</script>

<style>
@import url("../../assets/sstyle/css/app.css");
@import url("../../assets/sstyle/css/admin.css");
</style>
