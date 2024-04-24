export default function createTitle(titleText) {
    const titleEl = document.getElementsByClassName("showingOnScreen")[0];
    titleEl.innerHTML = titleText;
}