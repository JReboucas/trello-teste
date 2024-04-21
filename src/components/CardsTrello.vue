<template>
  <div class="flex flex-wrap justify-between p-4">
    <!-- Cards de Kanban -->
    <div v-for="lista in listas" :key="lista.id" :data-id="lista.id" class="bg-white rounded-lg shadow-lg p-4 m-2 w-80">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-bold">{{ lista.titulo }}</h3>
        <button @click="abrirModalConfigurarCard(lista.id)">
          <img src="/images/FadersHorizontal.png" alt="Configurações" class="h-4 w-4">
        </button>
      </div>
      <!-- Área para Adicionar Nova Tarefa, apenas no card 'A fazer' e se não há tarefas -->
      <div v-if="lista.tarefas.length === 0 && lista.titulo === 'A fazer'" class="text-center my-4">
        <button @click="abrirModalCriarCartao(lista.id)"
          class="bg-gradient-to-r from-green-500 to-green-300 text-white p-2 rounded">
          Criar Cartão
        </button>
      </div>
      <!-- Área de Tarefas com Vue Draggable -->
      <VueDraggableNext class="space-y-2" :list="lista.tarefas" group="tarefas" @end="onEndDrag">
        <div v-for="tarefa in lista.tarefas" :key="tarefa.id" @click="abrirModalVerTarefa(tarefa)"
          class="bg-gray-400 shadow-lg rounded-lg p-2 cursor-pointer">
          <h4 class="text-black">{{ tarefa.titulo }}</h4>
        </div>
      </VueDraggableNext>
    </div>
  </div>

  <transition name="fade" mode="out-in">
  <div v-if="mostrarModalCriarCartao"
    class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div class="bg-white shadow-2xl rounded-2xl flex flex-col p-4 w-[400px] md:w-[520px]">
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-bold">Criar Novo Cartão</h2>
        <button @click="fecharModal">X</button>
      </div>
      <div class="grid grid-cols-2 my-4 gap-3">
        <input type="text" placeholder="Título" v-model="tarefaAtual.titulo" class="bg-gray-100 border-gray w-full h-14 rounded-lg p-2">
        <textarea placeholder="Descrição" v-model="tarefaAtual.descricao" class="bg-gray-100 border-gray w-full h-14 rounded-lg p-2"></textarea>
        <input type="date" v-model="tarefaAtual.data" class="bg-gray-100 border-gray w-full h-14 rounded-lg p-2">
        <select v-model="tarefaAtual.prioridade" class="bg-gray-100 border-gray w-full h-14 rounded-lg p-2">
          <option value="Baixa">Baixa</option>
          <option value="Média">Média</option>
          <option value="Alta">Alta</option>
        </select>
        <button @click="adicionarEditarTarefa" class="mt-4 bg-gradient-to-r from-green-500 to-green-300 text-white p-2 rounded w-full">Salvar</button>
      </div>
    </div>
  </div>
</transition>


  <transition name="fade" mode="out-in">
    <div v-if="mostrarModalConfigurarCard"
      class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div class="bg-white shadow-2xl rounded-2xl flex flex-col p-4 w-[300px]">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-bold">Configurações do Card</h2>
          <button @click="fecharModal">X</button>
        </div>
        <div class="mt-4">
          <button @click="adicionarTarefaALista(idListaAtual)"
            class="bg-gradient-to-r from-green-500 to-green-300 text-white p-2 rounded w-full">Adicionar Tarefa</button>
        </div>
      </div>
    </div>
  </transition>


  <transition name="fade" mode="out-in">
  <div v-if="mostrarModalVerTarefa" class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div class="bg-white shadow-2xl rounded-2xl flex flex-col p-4 h-auto w-[400px] md:w-[520px]">
      <div class="flex justify-between items-center">
        <img src="/images/CalendarBlank.png" alt="Tarefa" class="h-5 w-5">
        <h2 class="text-lg font-bold">{{ tarefaAtual.titulo }}</h2>
        <button @click="fecharModalVerTarefa" class="text-xl">X</button>
      </div>
      <hr class="bg-gray-100 my-2">
      <div class="flex flex-col gap-4">
        <div>
          <strong class="text-sm">Descrição:</strong>
          <span class="block mt-1">{{ tarefaAtual.descricao }}</span>
        </div>
        <div>
          <strong class="text-sm">Data:</strong>
          <span class="block mt-1">{{ tarefaAtual.data }}</span>
        </div>
        <div>
          <strong class="text-sm">Prioridade:</strong>
          <span class="block mt-1">{{ tarefaAtual.prioridade }}</span>
        </div>
      </div>
      <hr class="bg-gray-100 my-4">
      <div class="flex justify-between items-center">
        <button @click="abrirModalCriarCartao(tarefaAtual.id)" class="bg-gradient-to-r from-green-500 to-green-300 text-white h-12 rounded px-4 py-2">Editar</button>
        <select v-model="tarefaAtual.idLista" @change="moverTarefa(tarefaAtual)" class="bg-gray-100 border-gray h-12 rounded-lg px-4 py-2">
          <option v-for="lista in listas" :key="lista.id" :value="lista.id">{{ lista.titulo }}</option>
        </select>
        <button @click="fecharModalVerTarefa" class="bg-gradient-to-r from-red-500 to-red-300 text-white h-12 rounded px-4 py-2">Fechar</button>
      </div>
    </div>
  </div>
</transition>





</template>



<script setup>
import { ref } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';

const listas = ref([
  { id: 1, titulo: 'A fazer', tarefas: [] },
  { id: 2, titulo: 'Fazendo', tarefas: [] },
  { id: 3, titulo: 'Em teste', tarefas: [] },
  { id: 4, titulo: 'Concluído', tarefas: [] }
]);

function onEndDrag(event) {
  if (event.moved) {
    const { oldIndex, newIndex, from, to } = event;
    const fromListId = from.parentElement.getAttribute('data-id');
    const toListId = to.parentElement.getAttribute('data-id');
    
    if (fromListId && toListId && fromListId !== toListId) {
      const fromList = listas.value.find(lista => lista.id === parseInt(fromListId));
      const toList = listas.value.find(lista => lista.id === parseInt(toListId));
      const [movedItem] = fromList.tarefas.splice(oldIndex, 1);
      toList.tarefas.splice(newIndex, 0, movedItem);
    }
  }
}

const mostrarModalCriarCartao = ref(false);
const mostrarModalConfigurarCard = ref(false);
const mostrarModalVerTarefa = ref(false);

const idListaAtual = ref(null);
const tarefaAtual = ref({});


function fecharTodosModais() {
  mostrarModalCriarCartao.value = false;
  mostrarModalConfigurarCard.value = false;
  mostrarModalVerTarefa.value = false;
}

function abrirModalCriarCartao(idLista) {
  fecharTodosModais();
  idListaAtual.value = idLista;
  tarefaAtual.value = { titulo: '', descricao: '', data: '', prioridade: 'Média' };
  mostrarModalCriarCartao.value = true;
}

function abrirModalConfigurarCard(idLista) {
  fecharTodosModais();
  idListaAtual.value = idLista;
  mostrarModalConfigurarCard.value = true;
}

function abrirModalVerTarefa(tarefa) {
  fecharTodosModais();
  tarefaAtual.value = { ...tarefa };
  mostrarModalVerTarefa.value = true;
}

function fecharModalVerTarefa() {
  fecharTodosModais();
}

function adicionarEditarTarefa() {
  const lista = listas.value.find(l => l.id === idListaAtual.value);
  if (!tarefaAtual.value.id) {
    tarefaAtual.value.id = Date.now();
    lista.tarefas.push({ ...tarefaAtual.value });
  } else {
    const index = lista.tarefas.findIndex(t => t.id === tarefaAtual.value.id);
    lista.tarefas[index] = { ...tarefaAtual.value };
  }
  fecharTodosModais();
}

function adicionarTarefaALista(idLista) {
  abrirModalCriarCartao(idLista);
}

function moverTarefa(tarefa) {
  const origem = listas.value.find(lista => lista.id === tarefa.idListaAnterior);
  const destino = listas.value.find(lista => lista.id === tarefa.idLista);
  if (origem && destino && origem !== destino) {
    origem.tarefas = origem.tarefas.filter(t => t.id !== tarefa.id);
    destino.tarefas.push({ ...tarefa });
  }
}
</script>









<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
  {
  opacity: 0;
}
</style>
