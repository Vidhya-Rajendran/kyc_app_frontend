
<template>
    <div>
        <h2>User Dashboard</h2>
        <form @submit.prevent="submitKyc">
            <input v-model="name" type="text" placeholder="Name" required />
            <input v-model="email" type="email" placeholder="Email" required />
            <input @change="handleFile" type="file" required />
            <button type="submit">Submit KYC</button>
        </form>
        <p v-if="status">KYC Status: {{ status }}</p>
    </div>
</template>

<script>
import API from '../../services/api';

export default {
    data() {
        return {
            name: '',
            email: '',
            file: null,
            status: null,
        };
    },
    methods: {
        handleFile(event) {
            this.file = event.target.files[0];
        },
        async submitKyc() {
            const formData = new FormData();
            formData.append('name', this.name);
            formData.append('email', this.email);
            formData.append('document', this.file);

            try {
                await API.post('/kyc', formData);
                this.status = 'Pending';
            } catch (err) {
                console.error(err.response.data.message || 'KYC submission failed');
            }
        },
    },
};
</script>
        