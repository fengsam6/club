import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/home/Home'
// 
// import Main from '@/Main.vue'
// 
// import EditPassage from '@/components/passage/EditPassage'
// import AddPassage from '@/components/passage/AddPassage'
// import PassageList from '@/components/passage/PassageList'
// import PassageTypeList from '@/components/passage/PassageTypeList'
// 
// import EditClub from '@/components/club/EditClub'
// import AddClub from '@/components/club/AddClub'
// import ClubList from '@/components/club/ClubList'
// import ClubTypeList from '@/components/club/ClubTypeList'
// 
// import EditActivity from '@/components/activity/EditActivity'
// import ActivityList from '@/components/activity/ActivityList'
// import AddActivity from '@/components/activity/AddActivity'
// import ActivityTypeList from '@/components/activity/ActivityTypeList'
// 
// import AddFile from '@/components/file/AddFile'
// import EditFile from '@/components/file/EditFile'
// import FileList from '@/components/file/FileList'
// import CarouselList from '@/components/file/CarouselList'
// import HotActivities from '@/components/file/HotActivities'


// import AddUser from '@/components/user/AddUser'
// import EditUser from '@/components/user/EditUser'
// import UserList from '@/components/user/UserList'
// import Login from '@/components/user/Login'
// import UserRoleList from '@/components/user/UserRoleList'

Vue.use(Router)

export default new Router({
	mode: "history",
	routes: [{
			path: '/',
			name: 'Login',
			component: resolve => require(['@/components/user/Login'],resolve),
		},

		{
			path: '/',
			name: 'Main',
			component: resolve => require(['@/Main.vue'],resolve),
			children: [{
					path: '/home',
					name: 'Home',
					component: resolve => require(['@/components/home/Home'],resolve),
				},
				{
					name: 'EditPassage',
					path: 'passages/edit.html',
					component:resolve => require(['@/components/passage/EditPassage'],resolve)
				},
				{
					name: 'AddPassage',
					path: 'passages/add.html',
					component:resolve => require(['@/components/passage/AddPassage'],resolve)
				},
				{
					name: 'PassageList',
					path: 'passages',
					component:resolve => require(['@/components/passage/PassageList'],resolve)
				},
				{
					name: 'PassageTypeList',
					path: 'passageTypes',
					component:resolve => require(['@/components/passage/PassageTypeList'],resolve)
				},

				{
					name: 'AddClub',
					path: 'clubs/add.html',
					component:resolve => require(['@/components/club/AddClub'],resolve)
				},
				{
					name: 'ClubList',
					path: 'clubs',
					component:resolve => require(['@/components/club/ClubList'],resolve)
				},
				{
					name: 'ClubTypeList',
					path: 'clubTypes',
					component:resolve => require(['@/components/club/ClubTypeList'],resolve)
				},
				{
					name: 'EditClub',
					path: 'clubs/edit.html',
					component:resolve => require(['@/components/club/EditClub'],resolve)
				},

				{
					path: 'activities/edit.html',
					name: 'EditActivity',
					component:resolve => require(['@/components/activity/EditActivity'],resolve)
				},
				{
					name: 'ActivityList',
					path: 'activities',
					component:resolve => require(['@/components/activity/ActivityList'],resolve)
				},
				{
					name: 'ActivityTypeList',
					path: 'activityTypes',
					component:resolve => require(['@/components/activity/ActivityTypeList'],resolve)
				},
				{
					path: 'activities/add.html',
					name: 'AddActivity',
					component:resolve => require(['@/components/activity/AddActivity'],resolve)
				},

				{
					name: 'AddFile',
					path: 'files/add.html',
					component:resolve => require(['@/components/file/AddFile'],resolve)
				},
				{
					name: 'EditFile',
					path: 'files/edit.html',
					component:resolve => require(['@/components/file/EditFile'],resolve)
				},
				{
					name: 'FileList',
					path: 'files',
				    component:resolve => require(['@/components/file/FileList'],resolve)
				},
				{
					name: 'CarouselList',
					path: 'carousels',
					component:resolve => require(['@/components/file/CarouselList'],resolve)
				},
				{
					name: 'HotActivities',
					path: 'hotActivities',
					component:resolve => require(['@/components/file/HotActivities'],resolve)
				},
				
				
				{
					name: 'AddUser',
					path: 'users/add.html',
					component:resolve => require(['@/components/user/AddUser'],resolve)
				},
				{
					name: 'EditUser',
					path: 'users/edit.html',
					component:resolve => require(['@/components/user/EditUser'],resolve)
				},
				{
					name: 'UserRoleList',
					path: 'user/userRoles',
					component:resolve => require(['@/components/user/UserRoleList'],resolve)
				},
				{
					name: 'UserList',
					path: 'users',
					component:resolve => require(['@/components/user/UserList'],resolve)
				},
			]
		},

		{
			path: '*',
			redirect: "/"
		}
	]
})
