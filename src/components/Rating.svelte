<script lang="ts">
  import { onMount } from "svelte";

  export let rating: number;
  let starStr: string = "";

  onMount(() => {
    for (let i = 0; i < rating; i++) starStr += "★";
    starStr = " " + starStr + " ";
  });
</script>

<span class="stars stars-{rating}">{starStr}</span>

<style lang="sass">
  .stars
    font-size: 1.3rem
    background: url(https://s.ltrbxd.com/static/img/sprite.6c5e9c43.svg) no-repeat -450px -50px
    display: inline-block
    height: 1.6rem
    overflow: hidden
    text-indent: 110%
    position: relative
    white-space: nowrap
    &-1
      width: 1.2rem
    &-2
      width: 2.5rem
    &-3
      width: 3.8rem
    &-4
      width: 5.1rem
    &-5
      width: 6.4rem
</style>
