<template>
    <div class="main w-[100%] h-[100vh] flex flex-col justify-center items-center bg-slate-900 gap-8 px-8">
        <h1 class="text-6xl md:text-8xl font-extrabold text-center text-white leading-tight">
            Sorry, Your <span class="text-rose-400">{{ petName }}</span> Died
            <br>
            due to lack of food and happiness
        </h1>
        <div class="text-8xl">{{ petEmoji }}</div>
        <router-link to="/ChoosePet"
            class="mt-6 bg-rose-500 text-white font-bold px-8 py-4 rounded-2xl hover:bg-rose-400 transition-all active:scale-95">
            Try Again
        </router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            petName: '',
            petEmoji: ''
        }
    },
    mounted() {
        let pet = this.$route.query.pet

        if (pet === 'dog') {
            this.petName = 'Dog'
            this.petEmoji = '🐶'
        } else {
            this.petName = 'Cat'
            this.petEmoji = '🐱'
        }
    }
}
</script>