<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <div id="ref_page" style="height: 500px">
            <div class="teacher_search_title am-panel am-panel-default">
                <div class="am-panel-bd">
                    <div class="am-cf">
                        <div class="am-fl">
                            <span class="tpl-content-page-title">教师列表</span>
                        </div>
                        <div class="am-fr" style="width: 300px">
                            <div class="am-input-group am-input-group-sm">
                                <span class="am-input-group-btn" style="width: 30%">
                                    <button @click="getTeachers" class="am-btn am-btn-default" type="button">取消</button>
                                </span>
                                <input id="searchInput" @keyup.enter="searchTeacher" type="text" class="am-form-field" placeholder="根据教师姓名搜索" />
                                <span class="am-input-group-btn" style="width: 30%">
                                    <button id="searchTeacher" @click="searchTeacher" class="am-btn am-btn-default" type="button">搜索</button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="teacher_search_title am-panel am-panel-default">
                <div class="am-panel am-panel-default">
                    <div class="am-panel-bd am-scrollable-horizontal">
                        <table class="am-table am-table-centered am-table-striped am-table-hover">
                            <thead>
                                <tr>
                                    <th>姓名</th>
                                    <th>教学方向</th>
                                    <th>性别</th>
                                    <th>联系方式</th>
                                    <th>科室</th>
                                    <th>剩余课题数</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody id="chooseBody">
                                <tr v-for="(teacher, index) in teachers" :key="index">
                                    <td>{{ teacher.user.userName }}</td>
                                    <td>{{ teacher.teacherDescribe }}</td>
                                    <td>
                                        {{ teacher.user.userGender === 1 ? "男" : "女" }}
                                    </td>
                                    <td>{{ teacher.user.userTel }}</td>
                                    <td>
                                        {{ teacher.dept ? teacher.dept.deptName : "" }}
                                    </td>
                                    <td>{{ teacher.noChooseProject }}</td>
                                    <td>
                                        <a v-if="teacher.noChooseProject > 0" @click="openProjectModal(teacher.teacherId)">查看可选课题</a>
                                        <a v-else href="javascript:;" class="disabled-link">暂无可选课题</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <footer class="am-panel-footer" style="height: 50px">
                        <div class="am-fr">
                            <div id="news-Pagination-1"></div>
                        </div>
                    </footer>
                </div>
            </div>
            <div>
                <am-modal class="am-modal am-modal-alert" title="可选课题列表" tabindex="-1" id="projectModal">
                    <div class="am-modal-dialog">
                        <div class="am-modal-hd">
                            可选课题
                            <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>
                        </div>
                        <div class="am-modal-bd" style="margin-top: 10px">
                            <table style="width: 100%; border-collapse: collapse">
                                <thead>
                                    <tr style="border: 1px solid #ddd">
                                        <th style="text-align: center">项目名称</th>
                                        <th style="text-align: center">项目描述</th>
                                        <th style="text-align: center">操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="project in availableProjects" :key="project.id">
                                        <td style="border-bottom: 1px solid #ddd; border-right: 1px solid #ddd">
                                            {{ project.projectName }}
                                        </td>
                                        <td style="border-bottom: 1px solid #ddd">
                                            {{ project.projectDescribe }}
                                        </td>
                                        <td>
                                            <button @click="selectProject(project.projectId)">选择此课题</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </am-modal>
            </div>
        </div>
    </div>
</template>

<script>
import "@/assets/sstyle/js/amazeui.min.js";
import axios from "axios";

export default {
    data() {
        return {
            teacherName: "",
            teachers: [],
            totalTeachers: 0,
            pageSize: 8,
            pageNum: 1,
            paginationVisible: false,
            isFirstPageLoad: true,
            availableProjects: [],
        };
    },
    methods: {
        // 获取教师数据并更新页面
        getTeachers() {
            axios
                .get("/teacherController/getSubTeacher", {
                    params: { pageNum: this.pageNum, pageSize: this.pageSize },
                })
                .then((response) => {
                    const data = response.data;
                    this.teachers = data.list;
                    this.totalTeachers = data.total;
                    this.paginationVisible = data.list.length !== 0;

                    if (this.isFirstPageLoad) {
                        this.isFirstPageLoad = false;
                        this.setupPagination();
                    }
                })
                .catch((error) => {
                    console.error("Error fetching teachers:", error);
                });
        },

        // 获取根据教师姓名搜索的教师数据
        searchTeachersByName(teacherName, pageNum, pageSize) {
            axios
                .get("/teacherController/findTeacherByTeacherName", {
                    params: { teacherName, pageNum, pageSize },
                })
                .then((response) => {
                    const data = response.data;
                    this.teachers = data.list;
                    this.totalTeachers = data.total;
                    this.paginationVisible = data.list.length !== 0;

                    if (this.isFirstPageLoad) {
                        this.isFirstPageLoad = false;
                        this.setupPagination();
                    }
                })
                .catch((error) => {
                    console.error("Error searching teachers:", error);
                });
        },

        // 搜索教师
        searchTeacher() {
            let teacherName = document.getElementById("searchInput").value;
            if (teacherName.trim()) {
                this.searchTeachersByName(teacherName, 1, this.pageSize);
            } else {
                this.getTeachers(1, this.pageSize);
            }
        },

        // 设置分页功能
        setupPagination() {
            const paginationOptions = {
                totalItems: this.totalTeachers,
                itemsPerPage: this.pageSize,
                onPageChange: this.handlePaginationChange,
            };
            this.$nextTick(() => {
                this.$refs.pagination.setup(paginationOptions);
            });
        },

        // 处理分页点击
        handlePaginationChange(newPageNum) {
            this.pageNum = newPageNum;
            if (this.teacherName.trim()) {
                this.searchTeachersByName(this.teacherName, this.pageNum, this.pageSize);
            } else {
                this.getTeachers(this.pageNum, this.pageSize);
            }
        },

        async openProjectModal(teacherId) {
            this.showprojectModal();
            try {
                const res = await axios.get("/projectController/getProjectListByTeacherId", {
                    params: { teacherId: teacherId },
                });
                console.log(res.data);
                let projectData = res.data.list.filter((project) => project.studentId === null);
                console.log(projectData);
                this.availableProjects = projectData.map((project) => ({
                    projectName: project.projectName,
                    projectDescribe: project.projectDescribe,
                    projectId: project.projectId,
                }));
                console.log(this.availableProjects);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        },
        async selectProject(projectId) {
            // alert(projectId);
            try {
                await axios.put(`/studentController/updateProjectByStudentId/${projectId}`);
                alert("课题已选择成功！");
                this.getTeachers(this.pageNum, this.pageSize);
                this.closeprojectModal();
            } catch (error) {
                console.error("Error selecting project:", error);
                alert("选择课题失败，请重试。");
            }
        },
        showprojectModal() {
            // eslint-disable-next-line no-undef
            $("#projectModal").modal("open");
            return false;
        },
        closeprojectModal() {
            // eslint-disable-next-line no-undef
            $("#projectModal").modal("close");
            return false;
        },
    },
    created() {
        this.getTeachers(this.pageNum, this.pageSize);
    },
};
</script>

<style>
@import url("../../assets/sstyle/css/app.css");
@import url("../../assets/sstyle/css/admin.css");

.disabled-link {
    color: gray;
    pointer-events: none;
    cursor: not-allowed;
}
</style>
