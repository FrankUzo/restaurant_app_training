<template>
  <div class="home">
    <div id="btn">
      <button class="btn btn-primary m-2" @click="handleLogout">Click to Logout</button>
    </div>
    <div class="bg-primary my-2">
      <marquee behavior="" direction=""><h4 class="text-light p-2">Welcome, {{ firstName }} {{ lastName }}</h4></marquee>
    </div>
    <div>
      <table class="table table-hover table-bordered border-danger">
        <thead>
          <tr>
            <th scope="col">S/N</th>
            <th scope="col">Email</th>
            <th scope="col">Location</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Desription</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="restaurant in restaurants" :key="restaurant.id">
            <th scope="row">{{ restaurant.id }}</th>
            <th scope="row">{{ restaurant.name }}</th>
            <th scope="row">{{ restaurant.location }}</th>
            <th scope="row">{{ restaurant.phone_number }}</th>
            <th scope="row">{{ restaurant.description }}</th>
            <th scope="row"><img :src="restaurantImageLink+restaurant.restaurant_image" class="img-responsive img-thumbnail" style="height: 150px; width: 150px;"  alt=""></th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>


export default {
  name: 'HomeView',
  components: { },
  data() {
    return {
      restaurants: [],
      firstName: localStorage.getItem('admin_fname'),
      lastName: localStorage.getItem('admin_lname'),
      restaurantImageLink: this.storageURL + 'restaurant_images/'
    }
  },
  mounted() {
    this.getRestaurants()
  },
  methods: {
    async getRestaurants() {
      let url =  this.restaurantsBaseURL + 'api/admin/restaurant/get_all';
      console.log('Restaurants_url:', url)

      let bearerToken = localStorage.getItem('delivery_bearer_token');
            console.log('Admin_profifle_bearerToken:', bearerToken)

      const options = {
          headers: {Authorization: `Bearer ${bearerToken}`}
      }

      var response = await this.axios.get(url, options);
      console.log('Restaurants_response:', response)
      this.restaurants = response.data.data
    },
    handleLogout() {
      localStorage.clear();
      this.$router.push('/');
    }
  },
}
</script>

<style>
  #btn {
    text-align: right;
  }
</style>