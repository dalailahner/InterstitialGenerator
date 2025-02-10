const imgInterstitial = {
  getCode(formData) {
    console.log("--- output IMG module ---");
    const outputTxt = `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>interstitial</title>
    <style>
      @property --accentColor {
        syntax: "<color>";
        inherits: true;
        initial-value: magenta;
      }
      *,
      *::before,
      *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        overflow-wrap: break-word;
        border: none;
        @supports (transition-behavior: allow-discrete) {
          transition-behavior: allow-discrete;
        }
        @supports (interpolate-size: allow-keywords) {
          interpolate-size: allow-keywords;
        }

        &:focus-visible {
          outline: 2px solid var(--accentColor);
          outline-offset: 2px;
        }

        &::selection,
        &::target-text {
          background-color: var(--accentColor);
        }

        &[contenteditable] {
          caret-color: var(--accentColor);
        }
      }
      html {
        scroll-behavior: smooth;
        color-scheme: light dark;
        accent-color: var(--accentColor);
        font-size: 100%;
        line-height: 1.5;
        -webkit-text-size-adjust: 100%;
        -moz-tab-size: 4;
        tab-size: 4;
        -webkit-font-smoothing: antialiased;
      }
      body {
        margin: 0;
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      span {
        overflow-wrap: break-word;
      }
      hr {
        height: 0;
        color: inherit;
      }
      abbr[title] {
        text-decoration: underline dotted;
      }
      b,
      strong {
        font-weight: bolder;
      }
      code,
      kbd,
      pre,
      samp {
        font-family: Hack, ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
        font-size: 1em;
      }
      small {
        font-size: 80%;
      }
      sub,
      sup {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
      }
      sub {
        bottom: -0.25em;
      }
      sup {
        top: -0.5em;
      }
      table {
        text-indent: 0;
        border-color: inherit;
      }
      [type="button"],
      [type="reset"],
      [type="submit"],
      button,
      input,
      textarea,
      select,
      optgroup,
      option {
        margin: 0;
        font: inherit;
        letter-spacing: inherit;
        word-spacing: inherit;
        @supports (field-sizing: content) {
          field-sizing: content;
        }
      }
      input,
      textarea {
        min-width: 0;
        caret-color: var(--accentColor);
      }
      [type="text"],
      [type="search"],
      textarea {
        &::spelling-error {
          text-decoration: from-font red wavy underline;
        }
        &::grammar-error {
          text-decoration: from-font blue wavy underline;
        }
      }
      button,
      select {
        text-transform: none;
      }
      [type="button"],
      [type="reset"],
      [type="submit"],
      button {
        -webkit-appearance: button;
      }
      ::-moz-focus-inner {
        border-style: none;
        padding: 0;
      }
      :-moz-focusring {
        outline: 1px dotted ButtonText;
      }
      :-moz-ui-invalid {
        box-shadow: none;
      }
      legend {
        padding: 0;
      }
      progress {
        vertical-align: baseline;
      }
      ::-webkit-inner-spin-button,
      ::-webkit-outer-spin-button {
        height: auto;
      }
      [type="search"] {
        -webkit-appearance: textfield;
        outline-offset: -2px;
      }
      ::-webkit-search-decoration {
        -webkit-appearance: none;
      }
      ::-webkit-file-upload-button {
        -webkit-appearance: button;
        font: inherit;
      }
      summary {
        display: list-item;
      }
      dialog {
        max-width: 100%;
        max-height: 100%;
      }
      img,
      picture,
      video,
      canvas,
      svg {
        width: auto;
        height: auto;
        user-select: none;
      }
    </style>
    <style>
      :root {
        --fontFamily: Lato, Avenir, "Helvetica Neue", Arial, sans-serif;
        --accentColor: ${formData.accentColor};
        --fontColor: ${formData.textColor};
        --bgColor: ${formData.bgColor};
      }

      body {
        width: 100%;
        background-color: var(--bgColor);
      }

      .mainCont {
        width: 100%;
        height: 100svh;
        display: grid;
        grid-template-rows: 2rem 4fr 1fr;
        grid-template-columns: 1fr 1rem 1fr;
        grid-template-areas:
          "label label label"
          "img img img"
          "text text text";
        place-items: center;
        overflow: hidden;

        @media (orientation: landscape) {
          grid-template-columns: 2fr 1rem 1fr;
          grid-template-areas:
            "img . label "
            "img . text"
            "img . text";
        }
      }

      .label {
        padding: 0 0.75em;
        width: 100%;
        height: 100%;
        grid-area: label;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--bgColor);
        font-family: var(--fontFamily);
        font-size: 1rem;
        font-weight: 400;
        text-align: center;
        background-color: var(--fontColor);

        @media (orientation: landscape) {
          width: fit-content;
          place-self: end;
        }
      }

      .imageCont {
        width: 100%;
        height: 100%;
        grid-area: img;
        overflow: hidden;
        perspective: 1000px;

        & .image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          &.threeDimensional {
            transform: scale(0.75) rotateX(12deg) rotateY(18deg) rotateZ(-6deg);
            filter: drop-shadow(-3px 6px 6px rgba(0, 0, 0, 0.33)) drop-shadow(-6px 12px 12px rgba(0, 0, 0, 0.33));
          }
        }
      }

      .textCont {
        width: 100%;
        height: 100%;
        grid-area: text;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        color: var(--fontColor);
        font-family: var(--fontFamily);

        @media (orientation: landscape) {
          align-items: start;
          gap: 0.75rem;
          line-height: 1.2;
        }

        & .btn {
          padding: 0.5em 1em;
          color: var(--bgColor);
          font-weight: 900;
          font-size: clamp(1.1rem, 4vw, 1.6rem);
          letter-spacing: 0.5px;
          line-height: 1;
          text-align: center;
          text-decoration: none;
          border: 1px solid var(--accentColor);
          border-radius: 3px;
          background-color: var(--accentColor);
          transition: all 0.2s ease;

          &:is(:hover, :focus-visible) {
            color: var(--accentColor);
            background-color: var(--bgColor);
          }
        }
      }
    </style>
  </head>
  <body>
    <div class="mainCont">
      <p class="label">Anzeige</p>
      <div class="imageCont">
        <img class="image${formData?.threeDimensional ? " threeDimensional" : ""}" src="${formData?.imgUpload.name.length > 0 ? "formData.imgUpload.name" : "image.jpg"}" alt="" />
      </div>
      <div class="textCont">
        <a class="btn" href="%clickurl:u%" target="_blank">${formData?.ctaText.length > 0 ? formData.ctaText : "mehr Infos"}</a>
      </div>
    </div>
    ${formData?.truecount ? '<img src="%truecount%" style="width: 1px; height: 1px; position: fixed; top: 0" />' : ""}
  </body>
</html>
`;
    return outputTxt;
  },
};

export default imgInterstitial;
