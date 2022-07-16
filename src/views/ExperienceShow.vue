<script setup>
import { computed, ref } from "@vue/reactivity";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  experienceSlug: {
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

const experience = computed(() => {
  if (destination.value) {
    return destination.value.experiences.find(
      (experience) => experience.slug === props.experienceSlug
    );
  }
  return null;
});

initData();
</script>
<template>
  <section v-if="experience">
    <h1>{{ experience.name }}</h1>
    <img :src="`/images/${experience.image}`" :alt="experience.name" />
    <p>{{ experience.description }}</p>
  </section>
</template>
