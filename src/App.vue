<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link :to="{ name: 'References' }">References</router-link> |
    <router-link :to="{ name: 'ModalWindow' }">Modal</router-link> |
    <router-link :to="{ name: 'Auto' }">Auto</router-link> |
    <router-link :to="{ name: 'CheckJQuery' }">CheckJQuery</router-link> |
    <router-link :to="{ name: 'Schedule' }">Schedule</router-link> |
  </div>
  <router-view />
</template>

<style></style>
