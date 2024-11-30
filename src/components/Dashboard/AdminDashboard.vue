
<template>
    <div>
        <h2>Admin Dashboard</h2>
        <table>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
            <tr v-for="user in users" :key="user._id">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.status }}</td>
                <td>
                    <button @click="updateStatus(user._id, 'approve')">Approve</button>
                    <button @click="updateStatus(user._id, 'reject')">Reject</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import API from '../../services/api';

export default {
    data() {
        return {
            users: [],
        };
    },
    async created() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            const response = await API.get('/kyc');
            this.users = response.data;
        },
        async updateStatus(id, action) {
            await API.put(`/kyc/${id}/${action}`);
            this.fetchData();
        },
    },
};
</script>
        