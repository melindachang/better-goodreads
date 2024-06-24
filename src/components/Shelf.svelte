<script lang="ts">
  export let href: string, name: string | null;
</script>

<a class="shelf" {href}> {name} </a>

<style lang="sass">
  @use '../sass/variables' as variables

  .shelf
    background-image: url(variables.$sprites-url)
    background-position: right -810px
    background-repeat: no-repeat
    background-size: 800px 1020px
    border-bottom-left-radius: 2px
    border-top-left-radius: 2px
    box-sizing: border-box
    color: variables.$color-text-default
    display: inline-block
    height: 2.1rem
    max-width: 12rem
    overflow: hidden
    line-height: 1
    text-transform: lowercase
    padding: .25em 12px 0 5px
    text-decoration: none
    text-overflow: ellipsis
    white-space: nowrap
    margin: 0 4px 6px 0
    font-size: 1.3rem
    &:hover
      background-position: right -840px
      color: variables.$color-tag-gray

</style>
