<template>
  <div class="row justify-content-center bd-danger mt-5">
    <div class="col-4">
        <form @submit.prevent="handleValidation" class="bg-info p-5 rounded-5">
            <h4 class="w-100 bg-secondary text-light p-1 rounded-3 mb-4">Admin Login Page</h4>
            <div class="row justify-content-center mx-1 mb-4">
                <input type="email" class="form-control w-100 mb-4" placeholder="Enter your email here" v-model="email" required>
                <input type="password" class="form-control w-100" placeholder="Enter your password here" v-model="password" required>
                <div v-if="passwordError" class="text-danger">
                    <small><i>{{ passwordStatus }}</i></small>
                </div>
            </div>
            <div class="row justify-content-center mx-1">
                <button class="btn btn-secondary">Click to Login</button>
            </div>
          </form>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            passwordError: false,
            passwordStatus: 'Password should be atleast 5 chars long'
        }
    },

    methods: {
        handleValidation(e) {
            e.preventDefault();
            console.log('login password:', this.password);

            // Validation:
            if(this.password.length > 5) {
                this.passwordError = false
                this.passwordStatus = ''
                this.handleLogin( this.email, this.password )
            }
            else {
                this.passwordError = true
                this.passwordStatus = 'Password should be atleast 5 chars long'
                alert('Password should be atleast 5 chars long')
            }
        },

        // HandleLogin:
        async handleLogin(email, password) {
            let url = this.restaurantsBaseURL + 'api/admin/auth/login';
            console.log('login_url:', url);

            let params = { email: email, password: password };
            console.log('Login_params:', params)

            await this.axios.post(url, params)
            .then((response) => {
                console.log('Login_response:', response);
                if(response.data.access_token != null) {
                    localStorage.setItem('isLoggedin', true);
                    localStorage.setItem('email', this.email);
                    localStorage.setItem('delivery_bearer_token', response.data.access_token)
                    this.getAdminProfile()
                }
                else {
                    alert('Login Failed - No access bearer token')
                }
            })
            .catch(error => {
                console.log('Login_error', error);
                alert('Login Failed - Incorrect email or password')
            })
        },

        // Authorization call:
        async getAdminProfile() {
            let url = this.restaurantsBaseURL + 'api/admin/profile';
            console.log('Admin_profile_url:', url)

            let bearerToken = localStorage.getItem('delivery_bearer_token');
            console.log('Admin_profifle_bearerToken:', bearerToken)

            const options = {
                headers: {Authorization: `Bearer ${bearerToken}`}
            }
            
            await this.axios.get(url, options)
            .then((response) => {
                console.log('Admin_profile_response:', response);
                localStorage.setItem('admin_role', response.data.role);
                localStorage.setItem('admin_phone', response.data.phone_number);
                localStorage.setItem('admin_fname', response.data.first_name);
                localStorage.setItem('admin_lname', response.data.last_name);
                localStorage.setItem('admin_email', response.data.email);
                localStorage.setItem('admin_id', response.data.id);
                this.$router.push('/home')
            })
            .catch(error => {
                console.log('Admin_profile_error:', error);
                alert('could not get admin profile pls try again')
            })
        }
    },
}
</script>

<style>

</style>