<script>
// use normal <script> to declare options
export default {
  inheritAttrs: false,
};
</script>

<script setup>
// import sourceData from "@/data.json";
import { ref } from "@vue/reactivity";
import ExperienceCard from "@/components/ExperienceCard.vue";
import { watch } from "vue";
import GoBack from "@/components/GoBack.vue";
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});
const destination = ref(null);
const initData = async () => {
  const response = await fetch(
    `https://travel-dummy-api.netlify.app/${props.slug}`
  );
  destination.value = await response.json();
};
watch(
  () => props.slug,
  () => initData()
);

initData();
</script>
<template>
<div>
  <section class="destination" v-if="destination">
    <h1>{{ destination.name }}</h1>
    <GoBack />
    <div class="destination-details">
      <img :src="`/images/${destination.image}`" :alt="destination.name" />
      <p>{{ destination.description }}</p>
    </div>
  </section>
  <section class="experiences" v-if="destination">
    <h2>Top Experiences in {{ destination.name }}</h2>
    <div class="cards">
      <router-link
        v-for="experience in destination.experiences"
        :key="experience.slug"
        :to="{
          name: 'experience.show',
          params: { experienceSlug: experience.slug },
        }"
      >
        <ExperienceCard :experience="experience" />
      </router-link>
    </div>
    <router-view />
  </section>
</div>
</template>
