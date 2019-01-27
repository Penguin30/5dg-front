<template>
    <div class="admin">
        <img alt="Vue logo" src="../assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import AdminComponent from '@/components/Admin.vue'; // @ is an alias to /src

    @Component({
        components: {
            AdminComponent,
        },
    })
    export default class Admin extends Vue {
    }
</script>