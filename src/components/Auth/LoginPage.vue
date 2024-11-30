
<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="login">
            <input v-model="email" type="email" placeholder="Email" required />
            <input v-model="password" type="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
        <p v-if="error">{{ error }}</p>
    </div>
</template>

<script>
import API from '../../services/api';

export default {
    data() {
        return {
            email: '',
            password: '',
            error: null,
        };
    },
    methods: {
        async login() {
            try {
                const response = await API.post('/auth/login', {
                    email: this.email,
                    password: this.password,
                });
                localStorage.setItem('token', response.data.token);
                const userRole = JSON.parse(atob(response.data.token.split('.')[1])).role;
                this.$router.push(userRole === 'admin' ? '/admin-dashboard' : '/user-dashboard');
            } catch (err) {
                this.error = err.response.data.message || 'Login failed';
            }
        },
    },
};
</script>
        