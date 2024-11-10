<template>
  <div class="switch-container" v-b-tooltip.hover title="Display all parsed times, even the unavailable ones.">
    <label class="switch-label">
      <div class="switch">
        <input type="checkbox" v-model="isAllShown" @change="toggleSwitch" />
        <span class="slider"></span>
        <font-awesome-icon :icon="isAllShown ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'"></font-awesome-icon>
      </div>
    </label>
  </div>

</template>

<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      isAllShown: false, // Default state
    };
  },
  methods: {
    toggleSwitch() {
      this.$emit("toggle", this.isAllShown); // Emit event when toggling
    },
  },
};
</script>

<style scoped>
.switch-container {
  display: flex;
  align-items: center;
}

.switch-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.2rem;
}

.switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.icon {
  font-size: 1.2rem;
  color: #333;
  transition: color 0.4s;
}

input:checked ~ .icon {
  color: #2196F3;
}

.slider {
  position: relative;
  width: 60px;
  height: 34px;
  background-color: #ccc;
  border-radius: 34px;
  cursor: pointer;
  transition: background-color 0.4s;
}

.slider::before {
  content: '';
  position: absolute;
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:checked + .slider::before {
  transform: translateX(26px);
}
</style>
