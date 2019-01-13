<template>
  <v-container fluid text-xs-center class="bg">
    <v-layout  align-center justify-center row fill-height>
      <v-flex d-flex xs12 sm6 md4 >
        <v-card class="elevation-12" justify-space-around >
            <v-card-text headline>
                <div class="loginform">
                    <div class="loginform-vertical-centered">
                        <h1>Login</h1>
                        <form @submit.prevent="loginSubmit">
                            <v-text-field
                            v-model="codename"
                            placeholder="What do you want to be called?"
                            label="Screen Name"
                            
                            required
                            ></v-text-field>
                            <v-text-field
                            v-model="gender"
                            placeholder="You can be anyone you like"
                            label="Gender"
                            
                            required
                            ></v-text-field>
                            <v-btn block round type="submit" :to="{name: 'Home', params: { codename: this.codename }}" dark class="login-continue-btn">Continue</v-btn>
                        </form>
                    </div>
                </div>
            </v-card-text>
        </v-card>
           
      </v-flex>
      <v-flex>
         
      </v-flex>
    </v-layout>
    
  </v-container>
  
</template>

<script>

export default {
    
    data() {
        return {
            codename: '',
            gender: ''
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg{
    background-image: url('https://i.imgur.com/9JfKz1v.png');
    background-size: 90% 100%;
    background-position-x: 10rem;
}

.loginform {
    height: 89vh;
    display: table;
    width: 100%;
}

.loginform-vertical-centered {
    display: table-cell;
    vertical-align: middle;
    padding: 10%;
}

.elevation-12 {
    height: 100%;
}
.login-continue-btn {
  background-image: linear-gradient(to right,#e92245, #dc54dc);
}
</style>
