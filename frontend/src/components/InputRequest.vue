<template>
  <input :class="requestClass" type="text" name="requestMessage">
</template>

<script>
export default {
  name: 'InputRequest',
  props: ['value', 'requestClass'],
}
</script>