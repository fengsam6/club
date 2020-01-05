<template>
  <div v-if="passagePage != null">
    <el-form :inline="true" size="small">
      <el-form-item label="文章标题">
        <el-input placeholder="请输入文章标题" prefix-icon="el-icon-search" v-model="title" class="input-with-select"
                  width="120px"></el-input>
      </el-form-item>
      <el-form-item label="新闻类型">
        <el-select v-model="pasageTypeId" placeholder="请选择新闻类型">
          <el-option label="所有" value=""></el-option>
          <el-option v-for="newsType in newsTypeList" :key="newsType.id" :label="newsType.type"
                     :value="newsType.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="find" icon="el-icon-search">查询</el-button>
      </el-form-item>
      <el-button type="success" icon="el-icon-plus" @click="addPage()" size="small">添加</el-button>
    </el-form>
    <el-table :data="passageData" height="480" size="mini" stripe style="width:100%" border>
      <el-table-column prop="id" label="id" width="80" :sortable="true"></el-table-column>
      <el-table-column prop="title" label="标题" width="180" :sortable="true"></el-table-column>
      <el-table-column prop="passageType.type" label="文章类型" width="180" :sortable="true"></el-table-column>
      <el-table-column prop="publisher" label="发布者" width="180" :sortable="true"></el-table-column>
      <el-table-column prop="publishTime" label="发布时间" :sortable="true"></el-table-column>
      <el-table-column prop="clickNum" label="点击次数" width="180" :sortable="true"></el-table-column>
      <el-table-column fixed="right" label="操作" width="320">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="editPage(scope.row)" size="mini">编辑</el-button>
          <el-button type="success" icon="el-icon-plus" @click="addPage()" size="mini">添加</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="deletePassage(scope.row)" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page"
      background
      layout="total, sizes, prev, pager, next"
      :current-page.sync="currentPage"
      :total="passagePage.total"
      @current-change="refreshPassagePage"
      @size-change="handleSizeChange"
      :page-size="pageSize"
      :page-sizes="pageSizeArray"
    ></el-pagination>
  </div>
</template>

<script>
    const OK = 200;
    export default {
        data() {
            return {
                passagePage: {},
                pageSize: 20,
                pageSizeArray: [],
                title: null,
                pasageTypeId: null,
                passageData: [],
                search: {},
                newsTypeList: [],
                currentPage: 1
            };
        },
        components: {},
        methods: {
            init: function () {
                this.pageSize = this.GLOBAL.pageSize;
                this.pageSizeArray = this.GLOBAL.pageSizeArray
            },
            getPassagePage: function (pageNum, pageSize) {
                this.$axios
                    .get('/api/passages', {
                        params: {
                            passageTypeId: this.pasageTypeId,
                            title: this.title,
                            pageNum: pageNum,
                            pageSize: pageSize
                        }
                    })
                    .then(res => {
                        if (res != null && res.data.code == OK) {
                            this.passagePage = res.data.data;
                            this.passageData = this.passagePage.list;
                        } else {
                            this.$message.error(res.data.data);
                        }
                    });
            },
            editPage: function (row) {
                var id = row.id;
                console.log(row.id);
                this.$router.push({name: 'EditPassage', query: {id: id}});
            },
            addPage: function () {
                this.$router.push({name: 'AddPassage'});
            },
            deleteDao: function (passageId) {
                this.$axios.delete('/api/passages/' + passageId).then(res => {
                    if (res.data.code == OK) {
                        this.$message.success('删除成功');
                    } else {
                        this.$message.error(res.data.data);
                    }
                });
            },
            deletePassage: function (row) {
                var id = row.id;
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteDao(id);
                    this.getPassagePage(this.currentPage, this.pageSize);
                });
            },
            find: function () {
                this.getPassagePage(this.currentPage, this.pageSize);
            },
            refreshPassagePage: function (currentPage) {
                this.currentPage=currentPage;
                this.getPassagePage(currentPage, this.pageSize);
                debugger
            },
            handleSizeChange: function(pageSize){
                this.pageSize=pageSize
                this.getPassagePage(this.currentPage, pageSize);
                debugger
            },
            getNewsTypeList: function () {
                this.$axios.get('/api/passageTypes').then(res => {
                    if (res != null && res.data.code == OK) {
                        this.newsTypeList = res.data.data;
                    } else {
                        this.$message.error(res.data.data);
                    }
                });
            }
        },
        mounted() {
            this.init()
            this.getPassagePage(this.currentPage, this.pageSize);
            this.getNewsTypeList();
        },
        watch: {
            $route(to, from) {
                this.getPassagePage(this.currentPage, this.pageSize);
            }
        }
    };
</script>
<style scoped="scoped">
  @import "../../css/common.css";
</style>
