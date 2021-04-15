<template>
  <ul>
    <user-item
      v-for="user in users"
      :key="user.id"
      :name="user.fullName"
      :role="user.role"
    ></user-item>
  </ul>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],
  beforeRouteEnter(to, from, next) {
    console.log('From component');
    console.log(to, from);
    next();
  },
  unmounted() {
    console.log('Unmounted');
  },
  beforeRouteLeave(to, from, next) {
    console.log('BeforeRouteLeave Function!');
    next();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>