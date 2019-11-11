<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Register</h3>
          <p class="subtitle has-text-grey">Please register to proceed.</p>
          <div class="box">
            <figure class="avatar">
                <img src="https://placehold.it/128x128">
            </figure>
            <form>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                        @blur="$v.form.userName.$touch()"
                         type="text"
                         placeholder="Username"
                         v-model="form.userName">
                </div>
                <div class="form-error" v-if="$v.form.userName.$error">
                  <!-- <span v-if="$v.form.email.$error" class="help is-danger">Error message</span> -->
                  <span v-if="!$v.form.userName.required" class="help is-danger">Username is required</span>                  
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                        @blur="$v.form.name.$touch()"
                         type="text"
                         placeholder="Name"
                         v-model="form.name">
                </div>
                <div class="form-error" v-if="$v.form.name.$error">
                  <!-- <span v-if="$v.form.email.$error" class="help is-danger">Error message</span> -->
                  <span v-if="!$v.form.name.required" class="help is-danger">Name is required</span>                  
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                          @blur="$v.form.email.$touch()"
                         type="email"
                         placeholder="Your Email"
                         v-model="form.email">
                </div>
                <div class="form-error" v-if="$v.form.email.$error">
                  <!-- <span v-if="$v.form.email.$error" class="help is-danger">Error message</span> -->
                  <span v-if="!$v.form.email.required" class="help is-danger">Email is required</span>
                  <span v-if="!$v.form.email.email" class="help is-danger">Provide a valid email address</span>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                        @blur="$v.form.avatar.$touch()"
                         type="text"
                         placeholder="Avatar"
                         autocomplete=""
                         v-model="form.avatar">
                </div>
                <div class="form-error" v-if="$v.form.avatar.$error">
                  <!-- <span v-if="$v.form.email.$error" class="help is-danger">Error message</span> -->
                  <span v-if="!$v.form.avatar.required" class="help is-danger">Avatar is required</span>                  
                  <span v-if="!$v.form.avatar.url" class="help is-danger">Url format is not valid</span>      
                  <span v-if="!$v.form.avatar.supportedFileType" class="help is-danger">File type not supported</span>                  
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                        @blur="$v.form.password.$touch()"
                         type="password"
                         placeholder="Your Password"
                         autocomplete="new-password"
                         v-model="form.password">
                </div>
                <div class="form-error" v-if="$v.form.password.$error">
                  <!-- <span v-if="$v.form.email.$error" class="help is-danger">Error message</span> -->
                  <span v-if="!$v.form.password.required" class="help is-danger">Password is required</span>                  
                  <span v-if="!$v.form.password.minLength" class="help is-danger">Password must have a minimum length of 6</span>                  
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                        @blur="$v.form.passwordConfirmation.$touch()"
                         type="password"
                         placeholder="Password Confirmation"
                         autocomplete="off"
                         v-model="form.passwordConfirmation">
                </div>
                <div class="form-error" v-if="$v.form.passwordConfirmation.$error">
                  <!-- <span v-if="$v.form.email.$error" class="help is-danger">Error message</span> -->
                  <span v-if="!$v.form.passwordConfirmation.required" class="help is-danger">Passwordconfirmation is required</span>                  
                  <span v-if="!$v.form.passwordConfirmation.sameAsPassword" class="help is-danger">Passwordconfirmation must be same as password</span>                  
                </div>
              </div>
              <button type="submit" 
                  class="button is-block is-info is-large is-fullwidth" 
                  v-on:click="register"
                  :disabled="isFormInvalid">Register</button>
            </form>
          </div>
          <p class="has-text-grey">
            <router-link :to="{name:'PageLogin'}">Login</router-link> &nbsp;·&nbsp;
            <a>Sign Up With Google</a> &nbsp;·&nbsp;
            <a href="../">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {required,email, minLength, url, sameAs} from 'vuelidate/lib/validators'
  import {supportedFileType} from '@/helpers/validators'
  export default {
    data(){
      return{
        form:{
          userName:null,
          name:null,
          email:null,
          avatar: null,
          password:null,
          passwordConfirmation:null
        }
      }
    },
    validations:{
        form:{
          userName:{
            required
          },
          name:{
            required
          },               
          email:{
            required,
            email
          },
          avatar:{
            required,
            url,
            supportedFileType
          },
          password:{
            required,
            minLength: minLength(6)
          },
          passwordConfirmation:{
            required,
            sameAsPAssword: sameAs('password')
          }
        }
      },
      computed:{
        isFormInvalid(){
          return this.$v.form.$invalid
        }
      },
    methods:{
      register(){
        this.$v.form.$touch()
        console.log(this.form);
      }
    }
  }
</script>

<style scoped>
  .hero.is-success {
    background: #F2F6FA;
  }
  .hero .nav, .hero.is-success .nav {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .box {
    margin-top: 5rem;
  }
  .avatar {
    margin-top: -70px;
    padding-bottom: 20px;
  }
  .avatar img {
    padding: 5px;
    background: #fff;
    border-radius: 50%;
    -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
    box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  }
  input {
    font-weight: 300;
  }
  p {
    font-weight: 700;
  }
  p.subtitle {
    padding-top: 1rem;
  }
</style>