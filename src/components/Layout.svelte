<script lang="ts">
  import SiteHeader from './SiteHeader.svelte';
  // PAGES
  import Home from './pages/Home.svelte';
  import Profile from './pages/Profile.svelte';

  export let currentUrl: string, userId: number, document: Document;
  // const urlToLayout = new Map<string, string>([
  //   ['/user/show', 'profile'],
  //   ['/review/list', 'bookshelf'],
  //   ['/genres', 'genre'],
  //   ['/book/show/', 'book'],
  //   ['/author/show', 'author'],
  //   ['/friend', 'friend'],
  // ]);
</script>

<body>
  <SiteHeader {userId} />
  <div id="content" class="site-body">
    <div class="content-wrapper">
      {#if currentUrl === '/'}
        <Home />
      {:else if currentUrl.includes('/user/show')}
        <Profile {document} {userId} {currentUrl} />
      {/if}
    </div>
  </div>
</body>

<style lang="sass">
  @use "../sass/fonts"
  @use "../sass/variables" as variables

  :global(html)
    font-size: 62.5%
  
  :global(*, *::before, *::after)
    box-sizing: border-box
  
  :global(h1)
    font-size: 2.4rem
    color: white
    margin: 0 0 1.2rem

  :global(a)
    color: variables.$color-link-default
    text-decoration: none
    &:hover
      text-decoration: none
      color: variables.$color-link-default-hover
  
  :global(a.button)
    font-size: 1.1rem
    letter-spacing: .075em
    text-transform: uppercase
    text-decoration: none
    font-weight: 600
    border-radius: .3rem
    user-select: none
    padding: .7rem 1rem .8rem
    line-height: 1.2rem
    display: inline-block
    white-space: nowrap
    box-shadow: variables.$shadow-btn-gray
    color: variables.$color-btn-gray
    background: variables.$bg-btn-gray
    &:hover
      background: variables.$bg-btn-gray-hover
      color: variables.$color-link-default
      text-decoration: none

  body
    font-family: variables.$font-sans-serif
    color: variables.$color-text-default
    background-color: #2c3440
    background-image: linear-gradient(to bottom,#14181c calc(variables.$layout-flex-leaderboard-height),#14181c calc(250px + variables.$layout-flex-leaderboard-height),#2c3440 calc(251px + variables.$layout-flex-leaderboard-height))
    font-size: 1.6rem
    margin: 0

  #content
    background: #14181c url(https://s.ltrbxd.com/static/img/content-bg.2f106e08.png) 0 -1px repeat-x
    padding: 3rem 0

  .content
    &-wrapper
      margin: 0 auto
      width: 95rem

</style>
