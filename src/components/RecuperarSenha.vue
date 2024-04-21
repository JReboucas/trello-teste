<template>
    <div class="flex items-center justify-center h-screen w-full bg-cover bg-center bg-blue-950">
      <!--container-->
      <div class="max-w-sm mx-auto rounded-lg shadow-lg bg-blue-900 p-6">
        <!-- Inputs -->
        <div class="w-full md:w-full mx-auto">
          <div class="flex flex-col items-start mb-4">
            <span class="text-left mb-1 text-white">Endereço de E-mail</span>
            <span class="p-2 bg-white bg-opacity-20 rounded-xl w-full">
              <input v-model="form.email" class="w-full rounded-lg p-2 bg-transparent text-white" placeholder="Digite seu email" />
            </span>
          </div>
          <div class="flex flex-col items-start">
            <span class="text-left mb-1 text-white">Nova Senha</span>
            <div class="relative p-2 bg-white bg-opacity-20 rounded-xl w-full">
              <input v-model="form.password" :type="passwordVisible ? 'text' : 'password'"
                class="w-full rounded-lg p-2 bg-transparent border-transparent text-white" placeholder="Digite sua nova senha" />
              <img src="/images/Eye (1).png" class="absolute right-3 top-4 h-6 w-6 cursor-pointer"
                @click="togglePasswordVisibility" :alt="'Mostrar/Ocultar senha'">
            </div>
          </div>
          <!-- Botão de recuperação -->
          <div class="w-full mx-auto flex flex-col justify-between h-full mt-8">
            <button @click="submitForm" type="submit"
              class="text-black font-bold rounded-3xl py-2 w-full text-sm flex items-center justify-center bg-green-500">
              <span class="text-lg font-bold text-white">Redefinir Senha</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>


<script setup>
import { ref } from 'vue';

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
  if (form.value.email && form.value.password) {
    localStorage.setItem('email', form.value.email);
    localStorage.setItem('newPassword', form.value.password); 
    alert('Sua senha foi redefinida com sucesso!');
    this.$router.push('/login');
  } else {
    alert('Por favor, preencha todos os campos.');
  }
}
</script>
