<script lang="ts">
  import { onMount } from 'svelte';

  export let userId;

  onMount(() => {
    console.log(userId);
  });
</script>

<div class="site-header">
  <section>
    <h1 class="site-logo"><a href="/">Goodreads</a></h1>
    <nav>
      <ul class="nav-items">
        <li><a href="/">Browse</a></li>
        <li><a href="/">Community</a></li>
        <li class="toggle-menu">
          <a href="/user/show/{userId}">Profile</a>
          <ul></ul>
        </li>
      </ul>
    </nav>
  </section>
</div>

<style lang="sass">
  @use '../sass/variables' as variables

  .site-header
    position: relative
    height: 7.2rem
    z-index: 1100
    section
      height: 7.2rem
      display: flex
      justify-content: space-between
      align-items: center
      width: 95rem
      margin: 0 auto
      & > .site-logo
        margin: 0
        position: relative
      nav
        .nav-items
          padding: 0
          margin: 0
          li
            display: inline-block
            &:not(:first-child)
              margin-left: 1.5rem
            & > a
              text-transform: uppercase
              color: variables.$color-text-default
              text-decoration: none
              font-weight: 600
              font-size: 1.3rem
              &:hover
                color: variables.$color-link-default


</style>
