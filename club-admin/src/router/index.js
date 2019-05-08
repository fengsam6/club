import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'

import Main from '@/Main.vue'

import EditPassage from '@/components/passage/EditPassage'
import AddPassage from '@/components/passage/AddPassage'
import PassageList from '@/components/passage/PassageList'
import PassageTypeList from '@/components/passage/PassageTypeList'

import EditClub from '@/components/club/EditClub'
import AddClub from '@/components/club/AddClub'
import ClubList from '@/components/club/ClubList'
import ClubTypeList from '@/components/club/ClubTypeList'

import EditActivity from '@/components/activity/EditActivity'
import ActivityList from '@/components/activity/ActivityList'
import AddActivity from '@/components/activity/AddActivity'
import ActivityTypeList from '@/components/activity/ActivityTypeList'

import AddFile from '@/components/file/AddFile'
import EditFile from '@/components/file/EditFile'
import FileList from '@/components/file/FileList'

import AddUser from '@/components/user/AddUser'
import EditUser from '@/components/user/EditUser'
import UserList from '@/components/user/UserList'
import Login from '@/components/user/Login'
import UserRoleList from '@/components/user/UserRoleList'

Vue.use(Router)

export default new Router({
	mode: "history",
	routes: [{
			path: '/',
			name: 'Login',
			component: Login,
		},

		{
			path: '/',
			name: 'Main',
			component: Main,
			children: [{
					path: '/home',
					name: 'Home',
					component: Home,
				},
				{
					name: 'EditPassage',
					path: 'passages/edit.html',
					component: EditPassage
				},
				{
					name: 'AddPassage',
					path: 'passages/add.html',
					component: AddPassage
				},
				{
					name: 'PassageList',
					path: 'passages',
					component: PassageList
				},
				{
					name: 'PassageTypeList',
					path: 'passageTypes',
					component: PassageTypeList
				},

				{
					name: 'AddClub',
					path: 'clubs/add.html',
					component: AddClub
				},
				{
					name: 'ClubList',
					path: 'clubs',
					component: ClubList
				},
				{
					name: 'ClubTypeList',
					path: 'clubTypes',
					component: ClubTypeList
				},
				{
					name: 'EditClub',
					path: 'clubs/edit.html',
					component: EditClub
				},

				{
					path: 'activities/edit.html',
					name: 'EditActivity',
					component: EditActivity
				},
				{
					name: 'ActivityList',
					path: 'activities',
					component: ActivityList
				},
				{
					name: 'ActivityTypeList',
					path: 'activityTypes',
					component: ActivityTypeList
				},
				{
					path: 'activities/add.html',
					name: 'AddActivity',
					component: AddActivity
				},

				{
					name: 'AddFile',
					path: 'files/add.html',
					component: AddFile
				},
				{
					name: 'EditFile',
					path: 'files/edit.html',
					component: EditFile
				},
				{
					name: 'FileList',
					path: 'files',
					component: FileList
				},

				{
					name: 'AddUser',
					path: 'users/add.html',
					component: AddUser
				},
				{
					name: 'EditUser',
					path: 'users/edit.html',
					component: EditUser
				},
				{
					name: 'UserRoleList',
					path: 'user/userRoles',
					component: UserRoleList
				},
				{
					name: 'UserList',
					path: 'users',
					component: UserList
				},
			]
		},

		{
			path: '*',
			redirect: "/"
		}
	]
})
