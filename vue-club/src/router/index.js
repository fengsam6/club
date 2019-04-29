import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Passage from '@/components/passage/Passage'
import PassageList from '@/components/passage/PassageList'
import Club from '@/components/club/Club'
import ClubList from '@/components/club/ClubList'
import Activity from '@/components/activity/Activity'
import ActivityList from '@/components/activity/ActivityList'
import File from '@/components/file/File'
import FileList from '@/components/file/FileList'

import Login from '@/components/user/Login'

Vue.use(Router)
/* eslint-disable */
export default new Router({
	mode: "history",
	routes: [{
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			name: 'Passage',
			path: '/passages/:id',
			component: Passage
		},
		{
			name: 'PassageList',
			path: '/passages',
			component: PassageList
		},
		{
			name: 'Club',
			path: '/clubs/:num',
			component: Club
		},
		{
			name: 'ClubList',
			path: '/clubs',
			component: ClubList
		},

		{
			path: '/activities/:id',
			name: 'Activity',
			component: Activity
		},
		{
			name: 'ActivityList',
			path: '/activities',
			component: ActivityList
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
			name: 'Login',
			path: '/login.html',
			component: Login
		},
		{
			path: '*',
			redirect: "/"
		}
	]
})
