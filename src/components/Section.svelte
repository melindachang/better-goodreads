<script lang="ts">
  export let sectionHeading: string, allLink: boolean, allLinkHref: string;
</script>

<section>
  <h2 class="section-heading">
    <span>{sectionHeading}</span>
    {#if allLink}
      <a class="all-link" href={allLinkHref}>More</a>
    {/if}
  </h2>
  <slot />
</section>

<style lang="sass">
  @use "../sass/variables" as variables

  h2
    display: flex
    justify-content: space-between
    align-items: center
    text-transform: uppercase
    padding-bottom: .5rem
    margin-bottom: 1rem
    border-bottom: variables.$section-border
    color: variables.$color-text-default
    font-weight: 400
    font-size: 1.3rem
    a.all-link
      color: variables.$color-text-darker
      text-decoration: none
      font-size: 1.1rem
      &:hover
        color: variables.$color-link-default-hover
        

</style>
