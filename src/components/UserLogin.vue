<template>
  <div
    class="flex items-center justify-center h-screen w-full bg-cover bg-center bg-gradient-to-r from-blue-950 to-blue-800">
    <!--container-->
    <div class="max-w-sm mx-auto bg-gradient-to-t from-blue-900 to-blue-800 p-6 shadow-lg rounded-lg">

      <!-- Inputs -->
      <div class="w-full mx-auto">
        <div class="flex-col justify-center items-center text-center">
          <img src="/images/logo.png" class="h-auto w-auto" />
        </div>
        <div class="flex flex-col items-start mb-4">
          <span class="text-left mb-1 text-white">Endereço de E-mail</span>
          <span class="p-2 bg-white bg-opacity-20 rounded-xl w-full">
            <input v-model="form.email" type="text"
              class="w-full rounded-lg p-2 bg-transparent border-transparent text-white" />
          </span>
        </div>

        <div class="flex flex-col items-start">
          <span class="text-left mb-1 text-white">Senha</span>
          <div class="relative p-2 bg-white bg-opacity-20 rounded-xl w-full">
            <input v-model="form.password" type="password"
              class="w-full rounded-lg p-2 bg-transparent border-transparent text-white" />
            <img src="/images/Eye (1).png" class="absolute right-3 top-4 h-6 w-6 cursor-pointer"
              @click="togglePasswordVisibility" :alt="'Mostrar/Ocultar senha'">
          </div>
        </div>
      </div>
      <!-- Esqueceu a senha -->
      <div class="text-left mt-4">
        <a @click.prevent="$router.push('/recuperar-senha')" href="#" class="text-white text-sm font-bold">Esqueceu sua
          senha? Clique Aqui</a>
      </div>
      <!-- botão entrar-->
      <div class="w-full mx-auto flex flex-col justify-between h-full mt-8">
        <button @click="submitForm" type="submit"
          class="text-black font-bold rounded-3xl py-2 w-full text-sm flex items-center justify-center bg-gradient-to-r from-green-500 to-green-300">
          <span class="text-lg font-bold text-white">Entrar</span>
        </button>
      </div>
      <!-- Divisória "ou" -->
      <div class="flex items-center justify-between my-6">
        <hr class="w-full"> <span class="p-2 text-gray-400">ou</span>
        <hr class="w-full">
      </div>
      <!-- Botões -->
      <div class="flex justify-between space-x-4">
        <button class="flex-1 inline-flex items-center justify-center px-5 py-3 bg-gradient-to-r from-green-500 to-green-300 text-white rounded-xl">
          <img src="/images/Facebook.png" alt="Logo" class="w-auto h-5 mr-2">
          <span>Facebook</span>
        </button>
        <button @click="signInWithGoogle"
          class="flex-1 inline-flex items-center justify-center px-5 py-3 bg-gradient-to-r from-green-500 to-green-300 text-white rounded-xl">
          <img src="/images/Google.png" alt="Logo" class="w-auto h-5 mr-2">
          <span>Google</span>
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>
/* eslint-disable */
import { ref } from 'vue';
import { signInWithGoogle } from '@/API/Firebase.js';
import { useRouter } from 'vue-router';

const router = useRouter();


const form = ref({
  email: '',
  password: '',
});
const passwordVisible = ref(false);

function togglePasswordVisibility() {
  passwordVisible.value = !passwordVisible.value;
  let passwordInput = document.querySelector('input[type="password"]');
  passwordInput.type = passwordVisible.value ? 'text' : 'password';
}

function submitForm() {
  console.log('Salvando no LocalStorage:', form.value.email, form.value.password);
  localStorage.setItem('email', form.value.email);
  localStorage.setItem('password', form.value.password);
  router.push('/dashboard');
}

async function handleSignInWithGoogle() {
  try {
    await signInWithGoogle();
    router.push('/dashboard');
  } catch (error) {
    console.error('Authentication failed:', error);
  }
}
</script>