<template>
  <div class="form-container">
    <h2>Edit User Information</h2>
    <form @submit.prevent="updateUser">
      <div class="form-group">
        <label for="user_name">Name:</label>
        <input type="text" v-model="user.user_name" id="user_name" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="user.email" id="email" required />
      </div>
      <div class="form-group">
        <label for="role">Role:</label>
        <input type="text" v-model="user.role" id="role" required />
      </div>
      <div class="form-group">
        <label for="account_status">Account Status:</label>
        <input type="text" v-model="user.account_status" id="account_status" required />
      </div>
      <div class="form-group">
        <label for="telephone">Telephone:</label>
        <input type="text" v-model="user.telephone" id="telephone" required />
      </div>
      <div class="form-group">
        <label for="address">Address:</label>
        <input type="text" v-model="user.address" id="address" required />
      </div>
      <div class="form-group">
        <label for="old_password">Old Password:</label>
        <input type="password" v-model="oldPassword" id="old_password" required />
      </div>
      <div class="form-group">
        <label for="new_password">New Password:</label>
        <input type="password" v-model="newPassword" id="new_password" required />
      </div>
      <button type="submit" class="submit-button">Update User</button>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        id: '', // Assuming you will fetch and set the user id
        user_name: '',
        email: '',
        role: '',
        account_status: '',
        telephone: '',
        address: ''
      },
      oldPassword: '',
      newPassword: '',
      errorMessage: ''
    };
  },
  methods: {
    async updateUser() {
      if (this.oldPassword === this.user.password) {
        this.errorMessage = "Old password is incorrect.";
        return;
      }
      if (this.oldPassword === this.newPassword) {
        this.errorMessage = "New password must be different from the old password.";
        return;
      }
      try {
        const response = await fetch(`/api/users/${this.user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Include JWT token if necessary
          },
          body: JSON.stringify({
            ...this.user,
            newPassword: this.newPassword
          })
        });
        const data = await response.json();
        if (response.ok) {
          console.log('Success:', data);
          // Handle success (e.g., navigate to another page or display a success message)
        } else {
          this.errorMessage = data.message || 'Failed to update user';
        }
      } catch (error) {
        console.error('Error:', error);
        this.errorMessage = 'An error occurred while updating the user';
      }
    }
  },
  created() {
    const userId = this.$route.params.id; // Assuming you're using Vue Router and passing the user id in the route params
    fetch(`/api/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Include JWT token if necessary
      }
    })
      .then(response => response.json())
      .then(data => {
        this.user = data;
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }
};
</script>

<style scoped>
.form-container {
  width: 300px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.submit-button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
