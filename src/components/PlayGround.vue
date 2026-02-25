<template>
    <div class="main h-[100vh] w-full overflow-hidden bg-cover bg-center flex flex-col font-sans select-none text-white"
        :style="{ backgroundImage: `url(${petBG})` }">

        <div class="absolute inset-0 bg-slate-900/30 pointer-events-none"></div>
        <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(15,23,42,0.6)_100%)] pointer-events-none">
        </div>
        <header
            class="relative z-50 w-full h-20 bg-slate-900/40 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-8 shadow-2xl">
            <div class="flex items-center gap-4">
                <div
                    class="relative w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg border border-white/20">
                    {{ petType === 'cat' ? '🐱' : '🐶' }}
                    <div
                        class="absolute -bottom-2 -right-2 bg-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full border border-white/20 text-indigo-300">
                        LVL {{ level }}
                    </div>
                </div>
                <div class="flex flex-col">
                    <span class="text-[10px] uppercase tracking-widest text-white/50 font-black">Companion</span>
                    <span class="text-lg font-bold leading-none tracking-wide text-white/90">
                        {{ petType === 'cat' ? 'Sparky' : 'Buddy' }}
                    </span>
                </div>
            </div>
            <div class="flex flex-col gap-1.5 w-1/3">
                <div class="flex justify-between items-end px-1">
                    <span class="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-200/60">Experience</span>
                    <span class="text-[9px] font-bold text-indigo-300">{{ xp }} / 100 XP</span>
                </div>
                <div class="h-1.5 w-full bg-slate-900/50 rounded-full overflow-hidden border border-white/5">
                    <div class="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400 transition-all duration-500 ease-out shadow-[0_0_12px_rgba(99,102,241,0.6)]"
                        :style="{ width: `${xp}%` }"></div>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <div class="flex flex-col items-end opacity-60">
                    <span class="text-[8px] uppercase tracking-widest font-black">Passive Income</span>
                    <div class="flex items-center gap-1.5">
                        <span class="text-xs font-bold text-emerald-400">+₹7 / 10s</span>
                        <div class="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                            <div class="h-full bg-emerald-500 transition-all duration-100 ease-linear"
                                :style="{ width: `${earnProgress}%` }"></div>
                        </div>
                    </div>
                </div>
                <div
                    class="bg-gradient-to-r from-amber-500/20 to-yellow-500/10 border border-amber-500/30 px-5 py-2 rounded-xl flex items-center gap-3 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                    <span class="text-2xl drop-shadow-md">💰</span>
                    <div class="flex flex-col items-end">
                        <span class="text-[9px] uppercase font-black text-amber-200 tracking-wider">Balance</span>
                        <span class="text-xl font-black text-white leading-none">₹{{ money }}</span>
                    </div>
                </div>
            </div>

            <Transition name="slide-down">
                <div v-if="showNoMoney"
                    class="fixed top-24 left-1/2 -translate-x-1/2 z-[200] bg-rose-500 text-white px-6 py-2 rounded-full text-xs font-bold shadow-xl border border-rose-400 animate-pulse flex items-center gap-2">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    ⚠️ Not Enough Funds!
                </div>
            </Transition>
        </header>
        <main class="flex-1 relative w-full flex overflow-hidden">
            <aside class="w-72 h-full flex flex-col justify-center px-8 z-40">
                <div class="flex flex-col gap-5">
                    <div v-for="(val, stat) in stats" :key="stat" class="flex flex-col gap-1.5 group">
                        <div class="flex justify-between items-end px-1">
                            <div class="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
                                <span class="text-lg filter drop-shadow">{{ statEmoji(stat) }}</span>
                                <span class="text-[10px] font-black uppercase tracking-[0.15em] opacity-70">{{ stat
                                    }}</span>
                            </div>
                            <span class="text-xs font-bold font-mono">{{ Math.round(val) }}%</span>
                        </div>
                        <div class="h-2 w-full bg-slate-900/60 rounded-full p-[2px] border border-white/5 shadow-inner">
                            <div class="h-full rounded-full relative overflow-hidden transition-all duration-700 ease-out group-hover:brightness-110"
                                :class="getBarColor(stat)" :style="{ width: `${val}%` }">
                                <div
                                    class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
            <section class="flex-1 flex flex-col items-center justify-center relative">
                <TransitionGroup name="float-up">
                    <div v-if="showHealText" key="heal"
                        class="fixed top-28 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center pointer-events-none">
                        <div
                            class="bg-indigo-600/90 text-white px-4 py-1.5 rounded-full shadow-lg border border-indigo-400 font-bold backdrop-blur-md flex gap-2 items-center">
                            <span>✨ +{{ lastPoints }} Energy</span>
                            <span class="w-[1px] h-3 bg-white/30"></span>
                            <span class="text-indigo-200 text-xs">+{{ lastXP }} XP</span>
                        </div>
                    </div>
                    <div v-if="showEarnText" key="earn"
                        class="fixed top-28 left-1/2 -translate-x-1/2 z-[200] flex items-center pointer-events-none">
                        <div
                            class="bg-amber-500/90 text-white px-5 py-1.5 rounded-full shadow-lg border border-amber-300 font-bold backdrop-blur-md">
                            💰 +₹{{ lastEarned }}
                        </div>
                    </div>
                    <div v-if="showLevelUp" key="levelup"
                        class="fixed top-32 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center pointer-events-none">
                        <div
                            class="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-3xl shadow-[0_0_60px_rgba(245,158,11,0.6)] border-4 border-white transform scale-125 flex flex-col items-center text-center animate-bounce">
                            <div class="text-5xl mb-2">🏆</div>
                            <div class="text-3xl font-black text-white uppercase leading-none drop-shadow-md">Level Up!
                            </div>
                            <div class="text-sm font-bold text-white/90 mt-1 uppercase tracking-widest">New Level: {{
                                level }}</div>
                        </div>
                    </div>
                </TransitionGroup>
                <div class="relative z-10 transition-all duration-500"
                    :class="{ 'scale-110 -translate-y-4': isEating, 'hover:scale-[1.02]': !isEating }">
                    <div
                        class="absolute bottom-2 left-1/2 -translate-x-1/2 w-80 h-12 bg-black/50 blur-[40px] rounded-full scale-150">
                    </div>
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 -z-10"
                        :class="petType === 'cat' ? 'bg-indigo-500' : 'bg-rose-500'"></div>

                    <template v-if="petType === 'cat'"">
                        <video :key="currentVideo" :src="currentVideo" autoplay loop muted playsinline
                        class="max-h-[55vh] h-auto w-auto drop-shadow-2xl mask-video"></video>
                    </template>
                    <template v-else>
                        <div class="relative">
                            <img :src="puppyImg" alt="Your Puppy" class="max-h-[50vh] h-auto w-auto drop-shadow-2xl">
                            <div
                                class="absolute -top-6 -right-6 bg-white text-3xl p-3 rounded-full shadow-xl animate-bounce border-4 border-slate-900/10">
                                {{ dogMoodEmoji }}
                            </div>
                        </div>
                    </template>
                </div>
            </section>
            <aside class="w-72 h-full"></aside>
        </main>

        <footer
            class="relative z-50 w-full bg-slate-900/60 backdrop-blur-2xl border-t border-white/10 px-10 py-4 flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">

            <div class="flex items-center gap-3 text-white/40">
                <i class="fa-solid fa-gamepad text-xl"></i>
                <span class="text-xs font-black uppercase tracking-[0.2em]">Control Center</span>
            </div>
            <div class="flex items-center gap-3">
                <button v-for="food in currentFoodItems" :key="food.label" @click="feedPet(food)" :disabled="isEating"
                    class="group relative w-14 h-14 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 hover:-translate-y-1 transition-all duration-200 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                    <span class="text-2xl drop-shadow-sm group-hover:scale-110 transition-transform">{{ food.icon
                        }}</span>
                    <div
                        class="absolute -top-2 -right-2 bg-slate-900 text-[10px] font-black text-amber-400 px-1.5 rounded border border-white/10 shadow-lg">
                        ₹{{ food.cost }}</div>
                    <div
                        class="absolute bottom-full mb-3 opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg border border-white/10 font-bold shadow-xl">
                        {{ food.label }} <span class="text-emerald-400 ml-1">+{{ food.points }} En</span>
                    </div>
                </button>

                <div class="w-[1px] h-10 bg-white/10 mx-2"></div>
                <button @click="playWithPet" :disabled="isEating"
                    class="group relative w-14 h-14 rounded-xl bg-indigo-500/10 border border-indigo-500/30 hover:bg-indigo-500/20 hover:border-indigo-400 hover:-translate-y-1 transition-all duration-200 flex items-center justify-center">
                    <span class="text-2xl drop-shadow-sm group-hover:scale-110 transition-transform">🎾</span>
                    <div
                        class="absolute bottom-full mb-3 opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap bg-indigo-900 text-white text-xs px-3 py-1.5 rounded-lg border border-indigo-400 font-bold shadow-xl">
                        Play <span class="text-indigo-300 ml-1">+XP</span>
                    </div>
                </button>

                <button @click="workPet" :disabled="isEating"
                    class="group relative w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 hover:border-amber-400 hover:-translate-y-1 transition-all duration-200 flex items-center justify-center">
                    <span class="text-2xl drop-shadow-sm group-hover:scale-110 transition-transform">💼</span>
                    <div
                        class="absolute bottom-full mb-3 opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap bg-amber-900 text-white text-xs px-3 py-1.5 rounded-lg border border-amber-400 font-bold shadow-xl">
                        Work <span class="text-amber-300 ml-1">+$$$</span>
                    </div>
                </button>
            </div>
            <div class="text-white/20 text-[10px] font-mono">
                v1.0.0 • PET SIM ADVENTURE by vamsi.koatri@adaps.com
            </div>
        </footer>

    </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import CatHappy from '../videos/cat/CatHappy-transparent.webm'
import CatNormal from '../videos/cat/CatNormal-transparent.webm'
import CatEating from '../videos/cat/CatEating-transparent.webm'
import CatSad from '../videos/cat/CatSad-transparent.webm'
import petBG from '@/images/petBG.png'
import puppyImg from '@/images/puppy.png'

const router = useRouter()
const route = useRoute()


const petType = ref(route.query.pet || 'cat')
const showHealText = ref(false)
const showEarnText = ref(false)
const showLevelUp = ref(false)
const isEating = ref(false)
const lastPoints = ref(0)
const lastXP = ref(0)
const lastEarned = ref(0)
const showNoMoney = ref(false)
const money = ref(20)
const level = ref(1)
const xp = ref(0)

const stats = reactive({
    energy: 80,
    health: 90,
    happiness: 60,
    weakness: 0
})
const catFoodItems = [
    { label: 'Fish', icon: '🐟', points: 15, cost: 10 },
    { label: 'Milk', icon: '🥛', points: 10, cost: 7 },
    { label: 'Tuna', icon: '🥫', points: 30, cost: 25 },
    { label: 'Treat', icon: '🍬', points: 8, cost: 5 },
    { label: 'Donut', icon: '🍩', points: 5, cost: 3 },
]

const dogFoodItems = [
    { label: 'Bone', icon: '🦴', points: 15, cost: 10 },
    { label: 'Chicken', icon: '🍗', points: 20, cost: 18 },
    { label: 'Biscuit', icon: '🍪', points: 10, cost: 7 },
    { label: 'Meat', icon: '🥩', points: 25, cost: 22 },
    { label: 'Bread', icon: '🍞', points: 5, cost: 3 },
]

const currentFoodItems = computed(() => petType.value === 'dog' ? dogFoodItems : catFoodItems)

const currentVideo = computed(() => {
    if (isEating.value) return CatEating
    if (stats.weakness > 70) return CatSad
    if (stats.energy < 40) return CatNormal
    return CatHappy
})

const dogMoodEmoji = computed(() => {
    if (isEating.value) return '😋'
    if (stats.weakness > 70) return '😢'
    if (stats.energy < 40) return '😐'
    return '😄'
})

const statEmoji = (stat) => {
    const emojis = { energy: '⚡', health: '❤️', happiness: '✨', weakness: '💀' }
    return emojis[stat] || ''
}

watch([() => stats.energy, () => stats.health], ([newEnergy, newHealth]) => {
    stats.happiness = Math.max(0, (newEnergy + newHealth) / 2)
    stats.weakness = 100 - stats.happiness
    if (newHealth <= 0 && newEnergy <= 0) {
        setTimeout(() => router.push({ path: '/PetDied', query: { pet: petType.value } }), 1500)
    }
}, { immediate: true })

const earnProgress = ref(0)

onMounted(() => {
    setInterval(() => {
        if (stats.energy > 0) stats.energy = Math.max(0, stats.energy - 2)
        if (stats.energy < 20 && stats.health > 0) stats.health = Math.max(0, stats.health - 3)
    }, 2000)
    setInterval(() => {
        if (earnProgress.value < 100) {
            earnProgress.value += 1
        } else {
            money.value += 7
            earnProgress.value = 0
            lastEarned.value = 7
            showEarnText.value = true
            setTimeout(() => showEarnText.value = false, 1500)
        }
    }, 100)
})
const gainXP = (amount) => {
    xp.value += amount
    lastXP.value = amount
    if (xp.value >= 100) {
        level.value++
        xp.value = 0
        showLevelUp.value = true
        setTimeout(() => showLevelUp.value = false, 3000)
    }
}

const feedPet = (food) => {
    if (isEating.value) return
    if (money.value < food.cost) {
        showNoMoney.value = true
        setTimeout(() => showNoMoney.value = false, 2000)
        return
    }
    money.value -= food.cost
    lastPoints.value = food.points
    stats.energy = Math.min(100, stats.energy + food.points)
    stats.health = Math.min(100, stats.health + (food.points * 0.3))
    gainXP(Math.floor(food.cost * 1.5))
    isEating.value = true
    showHealText.value = true
    setTimeout(() => { showHealText.value = false; isEating.value = false }, 2500)
}

const playWithPet = () => {
    if (isEating.value || stats.energy < 15) {
        if (stats.energy < 15) alert("Pet is too tired to play!")
        return
    }
    stats.energy -= 15
    stats.health = Math.min(100, stats.health + 5)
    lastPoints.value = -15
    gainXP(20)
    isEating.value = true
    showHealText.value = true
    setTimeout(() => { showHealText.value = false; isEating.value = false }, 2000)
}

const workPet = () => {
    if (isEating.value || stats.energy < 30) {
        if (stats.energy < 30) alert("Pet is too tired to work!")
        return
    }
    const earnings = Math.floor(Math.random() * 11) + 10
    stats.energy -= 30
    money.value += earnings
    lastEarned.value = earnings
    gainXP(30)
    isEating.value = true
    showEarnText.value = true
    setTimeout(() => { showEarnText.value = false; isEating.value = false }, 2000)
}

const getStatColor = (stat) => {
    if (stat === 'weakness') return stats.weakness > 70 ? 'text-rose-400' : 'text-slate-400'
    if (stat === 'energy') return stats.energy < 30 ? 'text-amber-400' : 'text-white'
    return 'text-white'
}

const getBarColor = (stat) => {
    const colors = {
        energy: 'bg-gradient-to-r from-blue-400 to-cyan-400',
        health: 'bg-gradient-to-r from-emerald-400 to-teal-400',
        happiness: 'bg-gradient-to-r from-purple-400 to-fuchsia-400',
        weakness: 'bg-gradient-to-r from-slate-500 to-gray-500'
    }
    return colors[stat]
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700;900&display=swap');

.main {
    font-family: 'Outfit', sans-serif;
}

@keyframes shimmer {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(100%);
    }
}

.float-up-enter-active,
.float-up-leave-active {
    transition: all 0.5s ease;
}

.float-up-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.float-up-leave-to {
    opacity: 0;
    transform: translateY(-40px);
}

.slide-down-enter-active,
.slide-down-leave-active {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-down-enter-from,
.slide-down-leave-to {
    opacity: 0;
    transform: translateY(-10px) translateX(-50%);
}
</style>