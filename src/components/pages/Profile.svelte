<script lang="ts">
  import ProfileHeader from '../ProfileHeader.svelte';
  import Section from '../Section.svelte';
  import UpdateCard from '../UpdateCard.svelte';

  export let userId: number, currentUrl: string, document: Document;

  let currentlyReadingUpdates = document.querySelectorAll('.Updates');
</script>

<ProfileHeader {userId} {currentUrl} {document} />
<Section
  sectionHeading="Currently Reading"
  allLink
  allLinkHref="https://www.goodreads.com/review/list/{userId}?shelf=currently-reading"
>
  {#each currentlyReadingUpdates as update, i}
    <UpdateCard ast={update} last={i === currentlyReadingUpdates.length - 1} />
  {/each}
</Section>

<style lang="sass">
  // @use '../../sass/variables' as variables

</style>
