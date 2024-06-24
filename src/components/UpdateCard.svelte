<script lang="ts">
  import { readable } from 'svelte/store';
  import Shelf from './Shelf.svelte';

  // your script goes here
  export let ast, last: boolean;

  let coverSrc = ast.querySelector('.firstcol img').src;
  let bookTitle = ast.querySelector('.secondcol a.bookTitle');
  let author = ast.querySelector('.secondcol a.authorName');

  // let hasRating =
  //   ast.querySelector('.rating .myRating').textContent.trim().toLowerCase() === 'my rating';
  let rating = ast.querySelector('.rating .stars')?.dataset.rating;
  let starStr = '';
  for (let i = 0; i < rating; i++) starStr += '★';
  starStr = ' ' + starStr + ' ';

  let started = ast.querySelector('.secondcol .updatedTimestamp');
  let progressBar = ast.querySelector('.secondcol .progressGraph .graphBar');
  let statusStr: string | null, status: HTMLAnchorElement;
  if (progressBar) {
    status = ast.querySelector('.secondcol .smallText[onclick*="if"]');
    statusStr = status.textContent;
    if (statusStr)
      statusStr = statusStr.charAt(1).toUpperCase() + statusStr.substring(2, statusStr.length - 1);
  }

  let text = ast.querySelector('.secondcol .readable');
  let shelves = ast.querySelectorAll('.whos-review .actionLinkLite');
</script>

<div class="update {last ? 'update-last' : ''}">
  <div class="cover-container">
    <img src={coverSrc} alt="" class="cover" />
  </div>
  <div class="book-details">
    <h2 class="book-title">
      <a href={bookTitle.href}>{bookTitle.textContent}</a><span class="author"
        >by <a href={author.href}>{author.textContent}</a></span
      >
    </h2>
    <div class="attribution">
      {#if rating && rating > 0}
        <span class="rating rating-{rating}">{starStr}</span>
      {/if}
      <div class="started">Started {started.textContent}</div>
    </div>
    {#if progressBar}
      <div class="progress-wrapper">
        <div class="progress-bar">
          <div class="inner-bar" style={'width:' + progressBar.style.width}></div>
        </div>
        <a href={status.href} class="subtext">{statusStr}</a>
      </div>
    {/if}
    {#if text}
      <p class="readable">{text.textContent.trim().substring(1, text.textContent.length - 1)}</p>
    {/if}
    <div class="shelf-wrapper">
      {#each shelves as shelf}
        <Shelf href={shelf.href} name={shelf.textContent} />
      {/each}
    </div>
  </div>
</div>

<style lang="sass">
  @use '../sass/variables' as variables

  .update
    padding: 1.5rem 0 1.8rem
    border-bottom: variables.$section-border
    display: flex
    column-gap: 2rem
    &-last
      border: none
    .cover-container
      .cover
        border-radius: 3px
        border: variables.$section-border
        max-width: 7rem
    .book-details
      .book-title
        font-family: variables.$font-serif
        font-weight: 600
        color: variables.$color-link-default
        margin: 0 0 1rem
        font-size: 2.2rem
        .author
          font-weight: 300
          font-family: variables.$font-sans-serif
          font-size: 1.8rem
          color: variables.$color-text-dark
          margin-left: .4em
          a
            color: inherit
            &:hover
              color: variables.$color-link-default-hover
      .attribution
        display: flex
        align-items: center
        margin-bottom: 1rem
        .rating
          height: 1.6rem
          overflow: hidden
          text-indent: 110%
          white-space: nowrap
          background: url(variables.$sprites-url)
          background-position: -450px -50px
          display: inline-block
          line-height: 2.4rem
          margin-right: .7rem
          position: relative
          top: 1px
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
        .started
          font-size: 1.3rem
          color: variables.$color-text-darker
      .progress-wrapper
        display: flex
        align-items: center
        // margin-bottom: 1rem
        overflow: hidden
        .subtext
          color: #fff
          line-height: 1.5
          font-size: 1.5
          font-size: 1.3rem
          &:hover
            color: variables.$color-link-default-hover
        .progress-bar
          background: variables.$bg-progress-dark
          border-radius: .2rem
          margin-right: 1rem
          position: relative
          top: 1px
          width: 13rem
        .inner-bar
            background: variables.$accent-blue
            border-radius: .2rem 0 0 .2rem
            height: .5rem
      .readable  
        font-size: 1.5rem
        margin: 1rem 0 0 0
        font-family: variables.$font-serif
    .shelf-wrapper
      margin-top: 2rem


</style>
