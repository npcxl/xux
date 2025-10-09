<template>
  <div class="api-table">
    <table>
      <thead>
        <tr>
          <th>属性名</th>
          <th>说明</th>
          <th>类型</th>
          <th>默认值</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prop in props.data" :key="prop.name">
          <td><code>{{ prop.name }}</code></td>
          <td>{{ prop.description || '-' }}</td>
          <td><code>{{ prop.type }}</code></td>
          <td><code>{{ prop.default || '-' }}</code></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
interface PropItem {
  name: string
  description?: string
  type: string
  default?: string
}

const props = defineProps<{
  data: PropItem[]
}>()
</script>

<style scoped>
.api-table {
  margin: 20px 0;
}

.api-table table {
  width: 100%;
  border-collapse: collapse;
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

