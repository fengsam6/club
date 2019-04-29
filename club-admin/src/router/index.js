import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'

import EditPassage from '@/components/passage/EditPassage'
import AddPassage from '@/components/passage/AddPassage'
import PassageList from '@/components/passage/PassageList'

import EditClub from '@/components/club/EditClub'
import AddClub from '@/components/club/AddClub'
import ClubList from '@/components/club/ClubList'

import EditActivity from '@/components/activity/EditActivity'
import ActivityList from '@/components/activity/ActivityList'
import AddActivity from '@/components/activity/AddActivity'

import File from '@/components/file/File'
import FileList from '@/components/file/FileList'

import AddUser from '@/components/user/AddUser'
import EditUser from '@/components/user/EditUser'
import UserList from '@/components/user/UserList'

Vue.use(Router)

export default new Router({
	mode: "history",
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
		{
			name: 'EditPassage',
			path: '/passages/edit.html',
			component: EditPassage
		},
		{
			name: 'AddPassage',
			path: '/passages/add.html',
			component: AddPassage
		},
		{
			name: 'PassageList',
			path: '/passages',
			component: PassageList
		},
		
		{
			name: 'AddClub',
			path: '/clubs/add.html',
			component: AddClub
		},
		{
			name: 'ClubList',
			path: '/clubs',
			component: ClubList
		},
		{
			name: 'EditClub',
			path: '/clubs/edit.html',
			component: EditClub
		},

		{
			path: '/activities/edit.html',
			name: 'EditActivity',
			component: EditActivity
		},
		{
			name: 'ActivityList',
			path: '/activities',
			component: ActivityList
		},
		{
			path: '/activities/add.html',
			name: 'AddActivity',
			component: AddActivity
		},
		
		{
			name: 'File',
			path: '/files/:id',
			component: File
		},
		{
			name: 'FileList',
			path: '/files',
			component: FileList
		},
		
		{
			name: 'AddUser',
			path: '/users/add.html',
			component: AddUser
		},
		{
			name: 'EditUser',
			path: '/users/edit.html',
			component: EditUser
		},
		{
			name: 'UserList',
			path: '/users',
			component: UserList
		},
		
		{
			path: '*',
			redirect: "/"
		}
  ]
})
