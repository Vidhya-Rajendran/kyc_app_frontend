
<template>
   <div class="container h-100">
    <div class="row justify-content-center h-100">
      <div class="col-md-4">
        <div class="card p-3">
        <h4 class="mt-4">Register</h4>
        <form @submit.prevent="register">
            <div class="mb-3">
                <label class="form-label label" >Name</label>
                <input v-model="name" class="form-control" type="text" placeholder="name" required />
            </div>
            <div class="mb-3">
                <label class="form-label label" >Email</label>
                <input v-model="email" class="form-control" type="email" placeholder="name@example.com" required />
            </div>
            <div class="mb-3">
                <label class="form-label label" >Password</label>
                <input v-model="password" class="form-control" type="password" placeholder="password" required />
            </div>
            <div class="mb-3">
                <label class="form-label label" >Role</label>
                <select v-model="role" class="form-select">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary mt-4 mb-4 w-100">Register</button>
        </form>
    </div>
      </div>
    </div>
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
                alert('User Registered successfully! Please Login')
                this.$router.push('/login');
            } catch (err) {
                this.error = err.response.data.message || 'Registration failed';
                alert(this.error)
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
        