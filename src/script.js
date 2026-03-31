import css from "highlight.js/lib/languages/css";
import "highlight.js/styles/base16/gruvbox-dark-hard.css";
import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
import htmlInterstitial from "./modules/htmlInterstitial";
import imgInterstitial from "./modules/imgInterstitial";

//---------
// GLOBALS
const form = document.querySelector("form");
let notificationTimeout;
let unescapedCode = "";
let clickedCopyTimeout;

//-------
// SETUP
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("css", css);

//--------
// EVENTS

// input events
for (const el of form.querySelectorAll("input")) {
  // on input
  if (el?.dataset.maxlength) {
    const maxlength = Number.parseInt(el.dataset.maxlength, 10);
    if (Number.isInteger(maxlength)) {
      el.addEventListener("input", () => {
        const graphemes = new Intl.Segmenter("de", { granularity: "grapheme" }).segment(el.value);
        const graphemesArr = Array.from(graphemes);
        if (graphemesArr.length > maxlength) {
          el.value = graphemesArr
            .slice(0, maxlength)
            .map((entry) => entry.segment)
            .join("");
        }
      });
    } else {
      console.warn("DANGER! data-maxlength can't be parsed as an integer at element: ", el);
    }
  }

  // on change
  el.addEventListener("change", (ev) => formSubmit(ev));
}

// advanced tab
document.querySelector(".advancedBtn").addEventListener("click", () => {
  document.querySelector(".advancedCont").classList.toggle("open");
});

// custom form submit
form.addEventListener("submit", (ev) => formSubmit(ev));

// copy btn
const copyOutputBtn = document.querySelector(".copyOutputBtn");
if (copyOutputBtn) {
  copyOutputBtn.addEventListener("click", () => {
    // copy to clipboard
    writeTextToClipboard(unescapedCode);
    // show checkmark
    copyOutputBtn.classList.add("clicked");
    clearTimeout(clickedCopyTimeout);
    clickedCopyTimeout = setTimeout(() => {
      copyOutputBtn.classList.remove("clicked");
    }, 1200);
  });
}

//-----------
// FUNCTIONS

function formSubmit(event) {
  event.preventDefault();
  const formDataRaw = new FormData(form);
  const formData = Object.fromEntries(formDataRaw.entries());
  let previewCode = "";

  // img vs. html toggle
  switch (formData.adVariant) {
    case "adVariantHTML":
      for (const el of document.querySelectorAll(".htmlOnly")) {
        el.style.display = "";
      }
      for (const el of document.querySelectorAll(".imgOnly")) {
        el.style.display = "none";
      }

      unescapedCode = htmlInterstitial.getCode(formData, "output");

      previewCode = htmlInterstitial.getCode(formData, "preview");

      break;

    case "adVariantImg":
      for (const el of document.querySelectorAll(".imgOnly")) {
        el.style.display = "";
      }
      for (const el of document.querySelectorAll(".htmlOnly")) {
        el.style.display = "none";
      }

      unescapedCode = imgInterstitial.getCode(formData, "output");

      previewCode = imgInterstitial.getCode(formData, "preview");

      break;

    default:
      break;
  }

  // img upload
  if (formData.imgUpload) {
    const colorPickerImg = document.querySelector(".colorPickerImg");
    if (colorPickerImg && formData.imgUpload.size > 0) {
      colorPickerImg.src = URL.createObjectURL(formData.imgUpload);
    }
  }

  // output syntax + highlighting
  const outputEl = document.querySelector(".output code");
  const escapedCode = document.createTextNode(unescapedCode).wholeText;
  const highlightedCode = hljs.highlight(escapedCode, { language: "xml" }).value;
  outputEl.innerHTML = highlightedCode;

  // ad preview
  const previewIframe = document.querySelector(".preview");
  if (previewIframe) {
    previewIframe.srcdoc = previewCode;
  }

  // "updated" notification
  const updateNotification = document.querySelector(".updateNotification");
  if (updateNotification) {
    updateNotification.classList.add("visible");
    clearTimeout(notificationTimeout);
    notificationTimeout = setTimeout(() => {
      updateNotification.classList.remove("visible");
    }, 1200);
  }

  // log form data:
  console.log("Form Data: \n", formData);
}

async function writeTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.warn("couldn't write text to clipboard");
    console.error(error.message);
  }
}
