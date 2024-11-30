
<template>
    <div>
        <h2>Register</h2>
        <form @submit.prevent="register">
            <input v-model="name" type="text" placeholder="Name" required />
            <input v-model="email" type="email" placeholder="Email" required />
            <input v-model="password" type="password" placeholder="Password" required />
            <select v-model="role">
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            <button type="submit">Register</button>
        </form>
        <p v-if="error">{{ error }}</p>
    </div>
</template>

<script>
import API from '../../services/api';

export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            role: 'user',
            error: null,
        };
    },
    methods: {
        async register() {
            try {
                await API.post('/auth/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    role: this.role,
                });
                this.$router.push('/login');
            } catch (err) {
                this.error = err.response.data.message || 'Registration failed';
            }
        },
    },
};
</script>
        