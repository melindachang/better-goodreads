<script lang="ts">
  import Shelf from "./Shelf.svelte";
  export let currentUrl: string;
</script>

<body>
  {currentUrl}
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi architecto
    earum sint voluptatum, necessitatibus ipsam deserunt ea eum laborum repellat
    laboriosam temporibus, voluptates est at. Quasi, sequi. Inventore rem sed
    totam, temporibus similique atque quod cumque, et, quaerat ad est.
  </p>
</body>

<style lang="sass">
  @use "../sass/fonts"
  @use "../sass/variables" as variables

  :global(html)
    font-size: 62.5%
  
  body
    font-family: variables.$font-sans-serif
    font-size: 1.6rem
</style>
