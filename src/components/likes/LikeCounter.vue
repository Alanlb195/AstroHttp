<template>

    <div v-if="isLoading">
        Loading...
    </div>


    <button v-else-if="likeCount === 0" @click="likePost">
        Like this post
    </button>

    <button v-else @click="likePost">
        Likes
        <span>{{ likeCount }}</span>
    </button>

</template>


<script lang="ts" setup>
import { actions } from 'astro:actions';
import confetti from 'canvas-confetti';
import debounce from 'lodash.debounce';
import { ref, watch } from 'vue';


interface Props {
    postId: string
}

const props = defineProps<Props>();

const likeCount = ref(0);
const likeClicks = ref(0);
const isLoading = ref(true);


watch(likeCount, debounce(() => {
    // console.log('New likes', likeCount.value);

    fetch(`/api/posts/likes/${props.postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ likes: likeClicks.value })
    });

    likeClicks.value = 0;

}, 500))

const likePost = async () => {
    likeCount.value++;
    likeClicks.value++;


    const { data, error } = await actions.getGreeting({
        name: "Alan",
        age: 39,
        isActive: true,
    });

    if (error) {
        return alert('Something went wrong');
    }

    console.log(data);


    confetti({
        particleCount: 100,
        spread: 70,
        origin: {
            x: Math.random(),
            y: Math.random() - 0.2,
        }
    })
}

const getCurrentLikes = async () => {
    const resp = await fetch(`/api/posts/likes/${props.postId}`);
    if (!resp.ok) return;

    const data = await resp.json();
    // console.log({currentLikes: data});
    likeCount.value = data.likes;
    isLoading.value = false;
}

getCurrentLikes();


</script>



<style scoped>
button {
    background-color: #5e51bc;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
}

button:hover {
    background-color: #4a3f9a;
}
</style>