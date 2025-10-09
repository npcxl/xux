<template>
  <table class="api-table">
    <thead>
      <tr>
        <th>插槽名</th>
        <th>说明</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="slot in data" :key="slot.name">
        <td><code>{{ slot.name }}</code></td>
        <td>{{ slot.description }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
interface Slot {
  name: string
  description: string
}

defineProps<{
  data: Slot[]
}>()
</script>

<style scoped>
.api-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.api-table th,
.api-table td {
  padding: 12px;
  text-align: left;
  border: 1px solid var(--vp-c-divider);
}

.api-table th {
  background-color: var(--vp-c-bg-soft);
  font-weight: 600;
}

.api-table code {
  padding: 2px 6px;
  background-color: var(--vp-code-bg);
  border-radius: 4px;
  font-size: 0.875em;
}
</style>

