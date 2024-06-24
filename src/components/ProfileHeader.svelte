<script lang="ts">
  import { onMount } from 'svelte';

  export let userId: number, currentUrl: string, document: Document;
  let isOurProfile: boolean;

  let avatarSrc = (document.querySelector('.profilePictureIcon') as HTMLImageElement).src;
  let profileName = document
    .querySelector('#profileNameTopHeading')
    ?.childNodes[0].textContent?.trim();

  let profileLocation = [...document.querySelectorAll('.infoBoxRowTitle')]
    .find((x) => x.textContent === 'Details')
    ?.nextElementSibling?.textContent?.split(',')
    .slice(1);

  let bio = [...document.querySelectorAll('.infoBoxRowTitle')].find(
    (x) => x.textContent === 'About Me'
  )?.nextElementSibling?.children[0].textContent;

  // POPULATING PROFILE STATISTICS

  let ratingStat = Number(
    document.querySelector('.profilePageUserStatsInfo')?.children[0].textContent?.split(' ')[0]
  );
  let bookStat = 0;
  [...document.querySelectorAll('.shelfContainer .actionLinkLite')]
    .slice(0, 3)
    .forEach((el) => (bookStat += Number(el.textContent?.replace(/\D/g, ''))));

  let reviewStat = Number(
    document
      .querySelector('.profilePageUserStatsInfo')
      ?.children[4].textContent?.trim()
      .split(' ')[0]
  );
  let friendStat = Number(
    document
      .querySelector('.h2Container a[href*="/friend"]:not([href*="mutual"])')
      ?.textContent?.replace(/\D/g, '')
  );

  onMount(() => {
    isOurProfile = userId === Number(currentUrl.replace(/\D/g, ''));
  });
</script>

<div class="profile-header">
  <div class="profile-summary">
    <div class="avatar">
      <img class="avatar-icon" src={avatarSrc} alt="" />
    </div>
    <div class="profile-info">
      <div class="profile-name">
        <span class="display-name">{profileName}</span>
        {#if isOurProfile}
          <a class="button button-small edit-profile" href="/user/edit">Edit Profile</a>
        {/if}
      </div>
      <div class="bio-action-wrapper">
        <div class="bio">
          <p>{bio}</p>
          <ul class="bio-metadata">
            <li>
              <svg
                class="glyph"
                aria-hidden="true"
                role="presentation"
                width="8"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                  d="M4.25 2.735a.749.749 0 111.5 0 .749.749 0 11-1.5 0zM8 4.75c0-2.21-1.79-4-4-4s-4 1.79-4 4a4 4 0 003.5 3.97v6.53h1V8.72A4 4 0 008 4.75z"
                  fill="#000"
                  fill-rule="evenodd"
                ></path></svg
              >
              {profileLocation}
            </li>
          </ul>
        </div>
        <div class="actions">
          <h4 class="profile-action">
            <a href="/review/list/{userId}">
              <span class="value">{bookStat.toLocaleString()}</span>
              <span class="definition">Books</span></a
            >
          </h4>
          <h4 class="profile-action">
            <a href="/review/list/{userId}?sort=rating&view=reviews">
              <span class="value">{ratingStat.toLocaleString()}</span>
              <span class="definition">Ratings</span></a
            >
          </h4>
          <h4 class="profile-action">
            <a
              href="https://www.goodreads.com/review/list/{userId}?order=d&sort=review&view=reviews"
            >
              <span class="value">{reviewStat.toLocaleString()}</span>
              <span class="definition">Reviews</span></a
            >
          </h4>
          <h4 class="profile-action">
            <a href="/friend">
              <span class="value">{friendStat.toLocaleString()}</span>
              <span class="definition">Friends</span></a
            >
          </h4>
        </div>
      </div>
    </div>
  </div>
  <div class="profile-nav">
    <ul>
      <li class="nav-item"><a href="/review/list/{userId}?sort=rating&view=reviews">Ratings</a></li>
      <li class="nav-item">
        <a href="https://www.goodreads.com/review/list/{userId}?order=d&sort=review&view=reviews"
          >Reviews</a
        >
      </li>
      <li class="nav-item"><a href="/review/list/{userId}">Library</a></li>
      <li class="nav-item"><a href="/group/list/{userId}">Groups</a></li>
      <li class="nav-item"><a href="/quotes/list/{userId}">Quotes</a></li>
      <li class="nav-item"><a href="/user/{userId}/followers">Followers</a></li>
      <li class="nav-item"><a href="/user/{userId}/following">Following</a></li>
    </ul>
  </div>
</div>

<style lang="sass">
  @use '../sass/variables' as variables
  .profile-header
    margin: 0 -.5rem 4rem
    .profile-summary
      display: flex
      column-gap: 2rem
      margin-bottom: 2.5rem
      justify-content: space-between
      .avatar
        max-width: 11rem
        &-icon
          width: 100%
          object-fit: cover
          border-radius: 100%
          border: variables.$section-border
      .profile-info
        flex: 1
        .profile-name
          display: inline-flex
          align-items: center
          .display-name
            font-size: 2.2rem
            font-weight: 600
            color: variables.$color-link-default
            padding-bottom: .2em
            line-height: 1.25
          .edit-profile
            margin-left: 2.4rem
        .bio-action-wrapper
          display: flex
          justify-content: space-between
          .bio
            margin-top: .75rem
            p
              font-size: 1.3rem
              margin: 0
            .bio-metadata
              margin: .75rem 0 0 0
              list-style: none
              padding: .5rem 0
              li
                display: inline-flex
                align-items: center
                color: variables.$color-text-darker
                font-size: 1.3rem
                svg
                  margin-right: .5em
                  path
                    fill: variables.$color-text-darker
          .actions
            .profile-action
              display: inline-flex
              font-weight: 400
              margin: 0
              &:not(:last-child)
                padding: 0 1rem
                border-right: variables.$section-border-dark
              &:last-child
                padding: 0 0 0 1rem 
                border: none
              a
                display: flex
                justify-content: center
                text-align: center
                flex-direction: column
                line-height: 1
                &:hover 
                  > .definition
                    color: variables.$color-link-default-hover
                  
                .value
                  font-family: variables.$font-serif
                  font-weight: 600
                  color: variables.$color-text-lighter
                  font-size: 2.1rem
                .definition
                  color: variables.$color-text-darker
                  margin-top: .75rem
                  letter-spacing: .075em
                  text-transform: uppercase
                  font-size: 1rem
  .profile-nav
    border: variables.$section-border-dark
    // margin: 0 .5rem
    border-radius: .3rem
    ul
      display: flex
      flex-wrap: nowrap
      list-style: none
      overflow-x: auto
      margin: 0
      padding: 0
      overflow-y: hidden
      white-space: nowrap
      justify-content: center
      .nav-item
        padding: 1.2rem
        line-height: 1.333
        a
          color: variables.$color-text-default
          &:hover
            color: variables.$color-link-default-hover



</style>
