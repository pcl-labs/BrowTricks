<template>
  <div
    class="flex flex-col items-center w-full text-left min-h-vh100--without-header"
  >
    <div v-if="!invalidPage" class="max-w-md px-4 py-10">
      <p class="tg-body-mobile text-opacity-high mb-2">
        Reset your password to log in to BrowTricks as {{ $route.query.email }}.
      </p>
      <p class="tg-body-mobile text-opacity-high">
        Your new password must be different from a previously used password.
      </p>
    </div>
    <div
      class="flex flex-col items-center flex-grow w-full px-4 py-8 bg-surface rounded-t-xl"
    >
      <form
        v-if="!invalidPage"
        @submit.prevent="submit"
        novalidate
        class="flex flex-col justify-between flex-grow w-full max-w-sm"
      >
        <div class="">
          <!-- hidden, just for saving forms in browser -->
          <input class="hidden" type="email" name="email" :value="email" />

          <PasswordInput
            label="New Password"
            :isNew="true"
            :validatorModel="$v.password"
          >
            <p v-if="!$v.password.required">
              Password is required
            </p>
          </PasswordInput>

          <PasswordInput
            label="Repeat Password"
            :isNew="true"
            :validatorModel="$v.confirmPassword"
          >
            <p v-if="!$v.confirmPassword.required">
              Repeat password is required
            </p>
            <p v-else-if="!$v.confirmPassword.sameAs">
              Repeat password should be equal to password
            </p>
          </PasswordInput>

          <p v-if="errorMessage" class="mb-4 text-error tg-body-mobile">
            {{ errorMessage }}
          </p>
        </div>

        <div>
          <Button
            class="mb-6"
            type="submit"
            title="Submit"
            :loading="loading"
          />
          <p class="mt-4 text-center tg-body-mobile">
            <router-link :to="{ name: 'AuthLogin' }" class="underline">
              Back to login
            </router-link>
          </p>
        </div>
      </form>

      <div v-else>
        <p class="mb-4 text-error tg-body-mobile">
          Sorry, This page is not valid. Please check the link and try again.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import PasswordInput from '@/components/inputs/PasswordInput.vue';
import formGeneralUtils from '@/mixins/formGeneralUtils.js';
import { mapActions } from 'vuex';
import { required, sameAs } from 'vuelidate/lib/validators';
import { showOverlayAndRedirect } from '@/helpers';
// todo: use validationPassword

export default {
  name: 'AuthResetPassword',
  // NOTE: we use a mixin
  mixins: [formGeneralUtils],
  components: {
    PasswordInput
  },
  props: {
    userid: {
      type: [String, Number]
    }
  },
  data() {
    return {
      loading: false,
      invalidPage: false,
      password: '',
      confirmPassword: ''
    };
  },
  validations: {
    password: {
      required
    },
    confirmPassword: {
      sameAsPassword: sameAs('password'),
      required
    }
  },
  created() {
    if (!(this.userid || this.email) || !this.token) {
      this.invalidPage = true;
    }
  },
  computed: {
    token() {
      return this.$route.query.forgot_password_token;
    },
    email() {
      return this.$route.query.email;
    }
  },
  methods: {
    ...mapActions('auth', ['resetPassword', 'logout']),
    submit() {
      if (!this.beforeSubmit()) {
        return;
      }

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.loading = true;
      const payload = {
        params: {
          body: {
            token: this.token,
            password: this.password,
            confirmPassword: this.confirmPassword
          }
        }
      };

      if (this.userid) payload.params.body.userid = this.userid;
      else if (this.email) payload.params.body.email = this.email;
      else return;

      this.resetPassword(payload)
        .then(this.onSuccess)
        .catch(this.onSubmitCatch)
        .finally(() => {
          this.loading = false;
        });
    },
    onSuccess() {
      this.logout();
      showOverlayAndRedirect({
        title: 'Success!',
        route: { name: 'AuthLogin' }
      });
    }
  }
};
</script>
