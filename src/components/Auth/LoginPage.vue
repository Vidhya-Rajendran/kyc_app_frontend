
<template>
   <div class="container h-100">
        <div class="row justify-content-center h-100">
            <div class="col-md-4">
                <div class="card p-3">
                    <h4 class="mt-4 label">Login</h4>
                    <div class="d-flex mb-2">
                        <div class="label align-items-center">Doesn't have an account?</div>
                        <div style="margin-left:5px">
                            <router-link to="/register">Sign up</router-link>
                        </div>
                    </div>
                    <form @submit.prevent="login">
                        <div class="mb-3">
                            <label class="form-label label" >Email</label>
                            <input v-model="email" class="form-control" type="email" placeholder="name@example.com" required />
                        </div>
                        <div class="mb-3">
                            <label class="form-label label">Password</label>
                            <input v-model="password" class="form-control" type="password" placeholder="password" required />
                        </div>
                        <button type="submit" class="btn btn-primary mt-4 mb-4 w-100">Login</button>
                    </form>
                    <p v-if="error">{{ error }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import API from '../../services/api';

export default {
    name: 'login-page',
    data() {
        return {
            email: '',
            password: '',
            isError: false,
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
                const user = response.data.user;       
                console.log(user, 'user')        
                this.$router.push({
                    path: userRole === 'admin' ? '/admin-dashboard' : '/user-dashboard',
                    state: { user },
                });
            } catch (err) {
                this.error = err.response.data.message || 'Login failed';
                alert('User not found! Register your account.')
            }
        },
    },
};
</script>

<style scoped>
.label{
    text-align: left;
    display: flex;
}
</style>
        