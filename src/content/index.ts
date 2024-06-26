import { storage } from "../storage";

// Content scripts
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/

// Some global styles on the page
import "../sass/index.sass";
import Shelf from "../components/Shelf.svelte";
import Rating from "../components/Rating.svelte";

if (window.location.href.includes("/user/show")) {
  let span = document.createElement("span");
  let prof = document.querySelector("#profileNameTopHeading");
  let textNode = prof!.childNodes[0];
  span.textContent = textNode.nodeValue!.trim();
  prof!.prepend(span);
  prof!.removeChild(textNode);

  let btn = document.querySelector("#profileNameTopHeading a.smallText");
  if (btn) btn!.textContent = "EDIT PROFILE";

  document.querySelectorAll(".clearFloats.bigBox").forEach((el) => {
    if (
      el
        .querySelector("h2.brownBackground a")
        ?.textContent?.includes("Year In Books")
    )
      el.remove();
  });

  document
    .querySelectorAll("#currentlyReadingReviews .secondcol-top .whos-review")
    .forEach((el) => {
      let author = el!.querySelector(".authorName");
      let anchor = document.createElement("a");
      let small = document.createElement("small");
      small.textContent = "by ";
      anchor.textContent = author!.textContent;
      anchor.href = (author as HTMLAnchorElement).href;
      anchor.classList.add("author-metadata");
      small.append(anchor);
      el.querySelector(".bookTitle")!.after(small);
      el.querySelector(".bookTitle")?.parentElement?.classList.add("titleCard");
      author?.parentElement?.remove();
    });

  document
    .querySelectorAll("#currentlyReadingReviews .Updates")
    .forEach((el) => {
      let shelfWrapper = document.createElement("div");
      shelfWrapper.classList.add("shelf-wrapper");
      el.querySelector(".secondcol")?.appendChild(shelfWrapper);

      if (el.querySelector(".graphContainer")) {
        let progressWrapper =
          el.querySelector(".graphContainer")?.parentElement;
        progressWrapper?.classList.add("progress-wrapper");
        let pageProgress = progressWrapper?.querySelector(".smallText");
        let str = pageProgress?.textContent?.substring(
          1,
          pageProgress.textContent.length - 1
        );
        if (str)
          pageProgress!.textContent =
            str.substring(0, 1).toUpperCase() + str.substring(1);
      }

      let parent = el.querySelector(".whos-review")!.children[2];
      [...parent.querySelectorAll("a")]
        .map((x) => ({
          name: x.textContent,
          href: x.href,
        }))
        .forEach((item) => {
          new Shelf({
            target: el.querySelector(".shelf-wrapper") as Element,
            props: { name: item.name, href: item.href },
          });
        });
      parent.childNodes.forEach((node) => {
        if (node.nodeType === 3) node.remove();
      });
      for (let i of parent.children) {
        !i.classList.contains("shelf")
          ? ((i as HTMLElement).style.display = "none")
          : i;
      }
      el.querySelectorAll("br").forEach((x) => x.remove());

      let ratingBox = el.querySelector(".rating");
      (ratingBox as HTMLElement).style.display = "none";
      (el.querySelector(".whos-review") as HTMLElement).style.width = "auto";

      let startedWrapper = document.createElement("div");
      startedWrapper.classList.add("started-wrapper");
      let started = document.createElement("span");
      started.classList.add("started-metadata");
      started.textContent =
        (el
          .querySelector(".whos-review > div:last-child .greyText")!
          .textContent!.trim().length
          ? "Restarted "
          : "Started ") + el.querySelector(".updatedTimestamp")?.textContent;

      let readable = el.querySelector("span.readable");
      if (readable) {
        let str = readable?.textContent
          ?.trim()
          .substring(1, readable.textContent.trim().length - 1);
        let readableStr = str === undefined ? null : str;
        let status = document.createElement("span");
        status.classList.add("status");
        status.textContent = readableStr;
        el.querySelector(".secondcol")!.insertBefore(
          status,
          el.querySelector("table")!
        );
      }

      el.querySelector(".secondcol-top")?.appendChild(startedWrapper);
      if (btn) {
        if (
          ratingBox?.querySelector(".myRating")!.textContent !==
          "Rate this book"
        ) {
          let rating = Number(
            (ratingBox?.querySelector(".stars") as HTMLElement).dataset.rating
          );

          new Rating({
            target: el.querySelector(".started-wrapper") as Element,
            props: { rating },
          });
        }
      }
      startedWrapper.appendChild(started);
    });

  // let heading = document
  //   .querySelector("#currentlyReadingReviews")
  //   ?.parentElement?.previousElementSibling?.querySelector("h2 a");
  // let action = document
  //   .querySelector("#currentlyReadingReviews .actionLink")
  //   ?.textContent?.trim()
  //   .split(" ")[2];
  // heading!.textContent += ` (${action})`;
}

// Some JS on the page
// storage.get().then(console.log);
console.log("active!");

// Some svelte component on the page
