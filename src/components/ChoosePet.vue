<template>
    <div
        class="main w-full h-[100vh] flex justify-center items-center bg-slate-50 font-sans transition-all selection:bg-rose-200">

        <div v-if="popup"
            class="fixed top-0 fade left-0 z-[100] w-full h-[100vh] backdrop-blur-xl bg-slate-950/40 flex justify-center items-center px-4">
            <div
                class="alertBox slideup relative w-full max-w-md p-1 bg-gradient-to-br from-indigo-500/20 via-white/10 to-rose-500/20 rounded-[2.5rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.5)] border border-white/20">
                <div
                    class="bg-slate-900/80 backdrop-blur-2xl rounded-[2.3rem] p-10 flex flex-col items-center gap-8 text-center">
                    <div
                        class="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-rose-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <i class="fa-solid fa-heart text-white text-2xl"></i>
                    </div>
                    <div class="space-y-3">
                        <h1 class="text-3xl font-extrabold text-white tracking-tight leading-tight">
                            Ready to meet your <br /> <span
                                class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-rose-300">New
                                Best Friend?</span>
                        </h1>
                        <p class="text-slate-400 font-medium">Choose a pet to begin your journey in the online
                            simulator.</p>
                    </div>
                    <button
                        class="active:scale-95 hover:scale-105 transition-all duration-300 bg-white text-slate-900 w-full py-4 font-black rounded-2xl shadow-lg"
                        @click="Close">
                        Choose
                    </button>
                </div>
            </div>
        </div>

        <div v-if="loading"
            class="fixed top-0 left-0 z-[110] w-full h-[100vh] flex flex-col justify-center items-center bg-slate-900 overflow-hidden">

            <div class="loader absolute top-0 left-0 h-full bg-slate-100 loadingBar z-10"></div>

            <video src="../videos/butterfly_transparent.webm" autoplay loop
                class="z-50 w-64 h-64 lg:-translate-y-12 lg:translate-x-0 sm:translate-x-28 md:translate-y-0 translate-y-4 blurFade mix-blend-difference opacity-90"></video>
            <h1
                class="z-50 absolute text-white font-black text-6xl mix-blend-difference blurFade tracking-tighter text-center px-6">
                Loading your <span class="underline underline-offset-8 decoration-rose-500">{{ pet }}</span> environment
            </h1>
        </div>

        <div
            class="box bg-white shadow-[0_30px_100px_-20px_rgba(0,0,0,0.15)] w-[95%] max-w-5xl h-[85%] md:h-[75%] rounded-[2.5rem] flex flex-col md:flex-row overflow-hidden border border-white">
            <div
                class="top flex-1 flex flex-col justify-center items-start p-12 bg-gradient-to-br from-slate-900 via-indigo-950 to-indigo-900 text-white relative overflow-hidden">
                <div class="absolute -top-10 -left-10 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl"></div>
                <span
                    class="bg-rose-500/20 text-rose-200 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-rose-500/30">Pet
                    Adoption</span>
                <h1 class="text-5xl font-extrabold tracking-tight mb-6 leading-[1.1]">Choose Your <br /> New Friend</h1>
                <p class="text-indigo-100/70 font-normal text-lg max-w-xs leading-relaxed">Every pet deserves a loving
                    home. Find the perfect companion to start your journey.</p>
            </div>

            <div class="bottom flex-[1.8] grid grid-cols-1 md:grid-cols-2 gap-8 p-10 bg-slate-50/50">
                <div @click="KittyPlayGround"
                    class="cursor-pointer group relative overflow-hidden rounded-[2rem] border border-white hover:border-indigo-200 transition-all duration-500 bg-white shadow-sm hover:shadow-2xl hover:-translate-y-2">
                    <div
                        class="aspect-square flex items-center justify-center bg-slate-50 group-hover:bg-indigo-50 transition-colors duration-500">
                        <img src="../images/kitten.png" alt="Kitten"
                            class="w-40 h-auto object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-xl">
                    </div>
                    <div class="p-8 flex flex-col items-center">
                        <h3 class="text-2xl font-bold text-slate-800">The Kitten</h3>
                        <p class="text-slate-400 text-sm mb-6 font-medium italic">Playful & Curious</p>
                        <div
                            class="w-full py-4 bg-indigo-600 text-white text-center font-bold rounded-2xl group-hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200/50">
                            Adopt Me</div>
                    </div>
                </div>

                <div @click="PuppyPlayGround"
                    class="cursor-pointer group relative overflow-hidden rounded-[2rem] border border-white hover:border-rose-200 transition-all duration-500 bg-white shadow-sm hover:shadow-2xl hover:-translate-y-2">
                    <div
                        class="aspect-square flex items-center justify-center bg-slate-50 group-hover:bg-rose-50 transition-colors duration-500">
                        <img src="../images/puppy.png" alt="Puppy"
                            class="w-40 h-auto object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-xl">
                    </div>
                    <div class="p-8 flex flex-col items-center">
                        <h3 class="text-2xl font-bold text-slate-800">The Puppy</h3>
                        <p class="text-slate-400 text-sm mb-6 font-medium italic">Loyal & Energetic</p>
                        <div
                            class="w-full py-4 bg-rose-500 text-white text-center font-bold rounded-2xl group-hover:bg-rose-600 transition-all shadow-lg shadow-rose-200/50">
                            Adopt Me</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            popup: false,
            loading: false,
            pet: "",
            petType: ""
        };
    },
    methods: {
        Close() { this.popup = false; },
        KittyPlayGround() { this.petType = "cat"; this.startLoadingAndRedirect("Kitten"); },
        PuppyPlayGround() { this.petType = "dog"; this.startLoadingAndRedirect("Puppy"); },
        startLoadingAndRedirect(petName) {
            this.loading = true;
            this.pet = petName;
            setTimeout(() => {
                this.loading = false;
                this.$router.push({ name: "PlayGround", query: { pet: this.petType } });
            }, 9000);
        }
    },
    mounted() {
        setTimeout(() => { this.popup = true; }, 1000);
    }
};
</script>

<style scoped>
@keyframes fade {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes up {
    from {
        opacity: 0;
        transform: translateY(40px) scale(0.85);
    }

    to {
        opacity: 1;
        transform: translateY(0px) scale(1);
    }
}

@keyframes loadingFill {
    from {
        width: 0%;
    }

    to {
        width: 100%;
    }
}

@keyframes blurFade {
    from {
        opacity: 0;
        filter: blur(10px);
    }

    to {
        opacity: 1;
        filter: blur(0px);
    }
}

.slideup {
    animation: up 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fade {
    animation: fade 0.4s ease;
}

.loadingBar {
    animation: loadingFill 9s ease-in-out forwards;
}

.blurFade {
    animation: blurFade 1.5s ease-out;
}

.mix-blend-difference {
    mix-blend-mode: difference;
}
</style>