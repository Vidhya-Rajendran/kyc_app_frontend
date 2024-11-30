
<template>
   <div class="container h-100">
        <div class="row justify-content-center h-100">
            <div class="col-md-7">
                <div class="card p-3">
                    <h4 class="p-3">Admin Dashboard</h4>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="card p-4">Total Users : {{totalUsers}}</div> 
                        </div>
                        <div class="col-md-3">
                            <div class="card p-4">Pending: {{kycCounts.pending}}</div> 
                        </div>
                        <div class="col-md-3">
                            <div class="card p-4">Approved: {{kycCounts.approved}}</div>  
                        </div>
                        <div class="col-md-3">
                            <div class="card p-4">Rejected: {{kycCounts.rejected}}</div>  
                        </div>
                    </div>
                    <table class="table table-hover mt-4">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Status</th>
                            <th scope="col">ID Document</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="kyc in kycs" :key="kyc._id">
                            <td>{{ kyc.user ? kyc.user.name : '' }}</td>
                            <td>{{ kyc.user ? kyc.user.email : '' }}</td>
                            <td>{{ kyc.status }}</td>
                            <td>
                                <a
                                    class="mr-2"
                                    :href="kyc.filePath"
                                    target="_blank"
                                >view</a></td>
                            <td v-if="kyc.status === 'pending'">
                                <button class="btn-green" style="padding-right:10px" @click="updateStatus(kyc._id, 'approve')">Approve</button>
                                <button class="btn-red" @click="updateStatus(kyc._id, 'reject')">Reject</button>
                            </td>
                            <td v-else>
                            </td>
                        </tr>
                        </tbody>
                    </table>
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
            kycs: [{}],
            totalUsers: 0,
            kycCounts: {},
        };
    },
    async created() {
        this.fetchData();
        this.statusCounts();
    },
    methods: {
        async fetchData() {
            const response = await API.get('/kyc');
            this.kycs = response.data;
        },
        async statusCounts() {
            const response = await API.get('/kyc/dashboard');
            this.totalUsers = response.data.totalUsers;
            this.kycCounts = response.data.kycCounts;
        },
        async updateStatus(id, action) {
            await API.put(`/kyc/${id}/${action}`);
            this.fetchData();
        },
    },
};
</script>

<style scoped>
.btn-green{
    background-color: green;
    color: white;
    border-radius: 10px;
    outline: auto;
    cursor: pointer;
    margin-right: 5px;
}
.btn-red{
    background-color: red;
    color: white;
    border-radius: 10px;
    outline: auto;
    cursor: pointer;
}
</style>
        