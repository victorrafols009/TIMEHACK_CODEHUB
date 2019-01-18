<template>
  <v-container fluid text-xs-center class="bg">
    <v-layout align-center justify-center row fill-height>
      <v-flex d-flex class="mobile-form">
        <v-card class="elevation-12" justify-space-around>
          <v-card-text headline>
            <div class="loginform flex flex__center flex__column flex__space-around">
              <div class="logo">
                <img src="../assets/chilly.svg">
                <div class="logo__name">
                  <h1 class="font__purple">Chill</h1>
                  <h1 class="font__red">Chat</h1>
                </div>
              </div>
              <form class="login-card" @submit.prevent="loginSubmit">
                <v-text-field
                  v-model="codename"
                  placeholder="What do you want to be called?"
                  label="Screen Name"
                  autofocus
                  required
                ></v-text-field>
                <v-text-field
                  v-model="gender"
                  placeholder="You can be anything you like"
                  label="Gender"
                  required
                ></v-text-field>
                <v-btn
                  block
                  round
                  type="submit"
                  :disabled="!isComplete"
                  :to="{name: 'Home', params: { codename: this.codename }}"
                  dark
                  class="login-continue-btn"
                >Continue</v-btn>
              </form>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex class="bg">
        <img src="../assets/login.svg">
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      codename: "",
      gender: ""
    };
  },
  methods: {
    addSession() {
      sessionStorage.setItem("isLogin", true);
    }
  },
  computed: {
    isComplete() {
      return this.codename && this.gender;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$black: #464646;
$gray2: #eee;
$light-gray: #fafafa;
$gray: #bdbdbd;
$purple: #d470f1;
$red: #ff5477;
$cyan: #54edff;
$blue: #7079f1;
.bg {
  img {
    margin-left: 15px;
    height: 95vh;
  }
}

.loginform {
  height: 89vh;
  width: 100%;
}
.logo {
  &__name {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  width: 100%;
  img {
    height: 200px;
  }
  h1 {
    font-size: 80px;
    margin-left: 10px;
  }
}
.login-card {
  width: 70%;
}
.v-card__text {
  min-width: 30%;
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
  background-image: linear-gradient(to right, #e92245, #dc54dc);
  height: 60px;
  &:disabled {
    background-image: $gray;
  }
}
input {
  border: solid 1px $gray !important;
  border-radius: 50% !important;
  height: 60px;
}
@media only screen and (max-width: 1020px) {
  .bg {
    z-index: 10;
    position: absolute;
  }
  .mobile-form {
    z-index: 100;
    margin: 0;
    height: 100vh;
    width: 100%;
  }
  .container {
    padding: 0;
  }
}
</style>
