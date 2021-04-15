import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import UsersFooter from './components/users/UserFooter.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'teams',
            path: '/teams',
            meta: {
                needsAuth: true
            },
            components: {
                default: TeamsList,
                footer: TeamsFooter
            },
            children: [{
                name: 'team-members',
                path: ':teamId',
                component: TeamMembers,
                props: true
            }
            ],
            alias: '/'
        },
        {
            path: '/users',
            components: {
                default: UsersList,
                footer: UsersFooter
            },
            beforeEnter(to, from, next) {
                console.log("Users Beforeenter");
                console.log(to, from);
                next();
            }
        },
        {
            path: '/teams/:teamId',
            component: TeamMembers,
            props: true
        },
        {
            path: '/:notFound(.*)',
            redirect: '/teams'
        }

    ],
    linkActiveClass: 'active',
    scrollBehavior(_, _2, savedPositions) {
        if (savedPositions) {
            return savedPositions;
        }
        return {
            left: 0,
            top: 0
        }
    }
});

router.beforeEach(function (to, from, next) {
    console.log("Global: BeforeEach");
    console.log(to, from);
    if (to.meta.needsAuth) {
        console.log("Meta property was set!")
    }
    next();
});

router.afterEach(function (to, from) {
    //good place for doing audit
    console.log("AfterEACH");
    console.log(to, from);
});

export default router;