<template>
    <div
        class="main w-full min-h-screen flex flex-col bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black justify-center items-center px-4 overflow-hidden">

        <h1
            class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-slate-100 font-extrabold tracking-tight text-center leading-tight">
            Welcome to Online
            <br class="block sm:hidden" />
            <div class="inline-block text-rose-400">
                <span v-for="(char, index) in 'PetSimulator'.split('')" :key="index" :class="[
                    'hover:text-white hover:scale-125 hover:z-10 hover:-translate-y-3 transition-all inline-block duration-500 cursor-pointer drop-shadow-[0_0_15px_rgba(251,113,133,0.3)]',
                    char === 'S' ? 'ms-2 sm:ms-4 lg:ms-6' : ''
                ]">
                    {{ char }}
                </span>
            </div>
        </h1>

        <router-link to="/ChoosePet" class="mt-10 sm:mt-16">
            <p
                class="relative bg-rose-500 text-white font-semibold px-8 py-3 sm:px-10 sm:py-4 rounded-full group overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:shadow-[0_0_30px_rgba(244,63,94,0.6)] hover:bg-rose-400">
                <span class="relative z-10 flex items-center text-base sm:text-lg">
                    Get Started
                    <i
                        class="fa-solid fa-arrow-right-long ms-3 group-hover:translate-x-2 transition-transform duration-300"></i>
                </span>
            </p>
        </router-link>
    </div>
</template>