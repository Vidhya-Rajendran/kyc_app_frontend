
<template>
   <div class="container h-100">
    <div class="row justify-content-center h-100">
      <div class="col-md-4">
        <div class="card p-4" v-if="user && fileStatus.uploaded">
            <p>
            You have successfully uploaded your ID document. Your document status is {{fileStatus.status}}!
            </p>
            <div style="display: block">
                <a
                    class="mr-2"
                    :href="fileStatus.filePath"
                    target="_blank"
                >
                    <img
                    :src="fileStatus.filePath"
                    class="img-fluid rounded-normal"
                    width="140px"
                    alt="document"
                    />
                </a>
            </div>
        </div>
        <div class="card p-4" v-else>
            <h4 class="mt-4 mb-4">Upload your document</h4>
            <form @submit.prevent="submitKyc">
                <div class="mb-3">
                    <label class="form-label label" >Name</label>
                    <input v-model="user.name" class="form-control" type="text" disabled placeholder="name" required />
                </div>
                <div class="mb-3">
                    <label class="form-label label" >Email</label>
                    <input v-model="user.email" class="form-control" type="email" disabled placeholder="name@example.com" required />
                </div>
                <div class="mb-3">
                    <label class="form-label label" >ID Document</label>
                    <input @change="handleFile" type="file" class="form-control" required />
                </div>
                <button type="submit" class="btn btn-primary mt-4 mb-4">Submit KYC</button>
            </form>
        </div>
      </div>
    </div></div>
</template>

<script>
import API from '../../services/api';

export default {
    data() {
        return {
            user: {},
            fileStatus: {},
            error: null,
        };
    },
    created(){
        this.userDetail();
    },
    methods: {
        handleFile(event) {
            this.file = event.target.files[0];
        },
        async submitKyc() {
            const formData = new FormData();
            formData.append('document', this.file);

            try {
                await API.post('/kyc', formData);
                this.userDetail();
            } catch (err) {
                this.error = err.response.data.message || 'KYC submission failed';
                alert(err.response.data.message);
            }
        },
        async userDetail(){
            try{
                const response = await API.get('/auth');
                this.user = response.data.user;
                this.fileStatus = response.data.fileStatus;
            } catch(err){
                alert(err.response.data.message);
            }
        }
    },
};
</script>

<style scoped>

.label{
    text-align: left;
    display: flex;
}
</style>
        