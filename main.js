const canvas = document.getElementById("stampCanvas");
const ctx = canvas.getContext("2d");

const DEFAULT_STATE = Object.freeze({
  text: "承知\nしました",
  fontId: "mplusRounded",
  fontSize: 100,
  bold: true,
  letterSpacing: 0,
  lineGap: 0,
  fitWidth: true,
  fitHeight: true,
  textFillMode: "solid",
  solidColor: "#1f2937",
  textGradientStart: "#ff4d8d",
  textGradientEnd: "#ffbf1f",
  textGradientDirection: "left-right",
  transparentBg: true,
  backgroundFillMode: "solid",
  backgroundColor: "#ffffff",
  backgroundGradientStart: "#ffffff",
  backgroundGradientEnd: "#dbeafe",
  backgroundGradientDirection: "left-right",
  backgroundShape: "rounded",
  cornerRadius: 18,
  stroke: false,
  strokeColor: "#ffffff",
  strokeWidth: 5,
  frameOutline: false,
  frameOutlineColor: "#4f46e5",
  frameOutlineWidth: 6,
  shadow: true,
  shadowBlur: 10,
  iconPreset: "none",
  iconLayout: "corner",
  outputSize: 256,
  animationEnabled: false,
  animateTextGradient: true,
  animateBackgroundGradient: true,
  frameEffect: "none",
  textEffect: "none",
  gifFrames: 10,
  gifFps: 8,
});

const fonts = [
  { id: "mplusRounded", label: "M PLUS Rounded 1c", sample: "承知", featured: true, family: '"M PLUS Rounded 1c", system-ui, sans-serif', cssName: '"M PLUS Rounded 1c"', googleParam: "M+PLUS+Rounded+1c:wght@400;700;900" },
  { id: "shippori", label: "Shippori Mincho", sample: "御礼", featured: true, family: '"Shippori Mincho", serif', cssName: '"Shippori Mincho"', googleParam: "Shippori+Mincho:wght@400;700;800" },
  { id: "mochiy", label: "Mochiy Pop One", sample: "了解", featured: true, family: '"Mochiy Pop One", system-ui, sans-serif', cssName: '"Mochiy Pop One"', googleParam: "Mochiy+Pop+One" },
  { id: "zenMaru", label: "Zen Maru Gothic", sample: "確認", featured: true, family: '"Zen Maru Gothic", system-ui, sans-serif', cssName: '"Zen Maru Gothic"', googleParam: "Zen+Maru+Gothic:wght@400;700;900" },
  { id: "yusei", label: "Yusei Magic", sample: "感謝", featured: true, family: '"Yusei Magic", system-ui, sans-serif', cssName: '"Yusei Magic"', googleParam: "Yusei+Magic" },
  { id: "kaiseiDecol", label: "Kaisei Decol", sample: "祝", featured: true, family: '"Kaisei Decol", serif', cssName: '"Kaisei Decol"', googleParam: "Kaisei+Decol:wght@400;700" },
  { id: "rocknroll", label: "RocknRoll One", sample: "最高", featured: false, family: '"RocknRoll One", system-ui, sans-serif', cssName: '"RocknRoll One"', googleParam: "RocknRoll+One" },
  { id: "rampart", label: "Rampart One", sample: "注意", featured: false, family: '"Rampart One", system-ui, sans-serif', cssName: '"Rampart One"', googleParam: "Rampart+One" },
  { id: "reggae", label: "Reggae One", sample: "確認", featured: false, family: '"Reggae One", system-ui, sans-serif', cssName: '"Reggae One"', googleParam: "Reggae+One" },
  { id: "hachi", label: "Hachi Maru Pop", sample: "おつ", featured: false, family: '"Hachi Maru Pop", system-ui, sans-serif', cssName: '"Hachi Maru Pop"', googleParam: "Hachi+Maru+Pop" },
  { id: "dotgothic", label: "DotGothic16", sample: "完了", featured: false, family: '"DotGothic16", monospace', cssName: '"DotGothic16"', googleParam: "DotGothic16" },
  { id: "zenKurenaido", label: "Zen Kurenaido", sample: "手書き", featured: false, family: '"Zen Kurenaido", system-ui, sans-serif', cssName: '"Zen Kurenaido"', googleParam: "Zen+Kurenaido" },
  { id: "kiwi", label: "Kiwi Maru", sample: "お願い", featured: false, family: '"Kiwi Maru", system-ui, sans-serif', cssName: '"Kiwi Maru"', googleParam: "Kiwi+Maru:wght@400;500" },
  { id: "hina", label: "Hina Mincho", sample: "和風", featured: false, family: '"Hina Mincho", serif', cssName: '"Hina Mincho"', googleParam: "Hina+Mincho" },
  { id: "kosugiMaru", label: "Kosugi Maru", sample: "連絡", featured: false, family: '"Kosugi Maru", system-ui, sans-serif', cssName: '"Kosugi Maru"', googleParam: "Kosugi+Maru" },
  { id: "sawarabiGothic", label: "Sawarabi Gothic", sample: "予定", featured: false, family: '"Sawarabi Gothic", system-ui, sans-serif', cssName: '"Sawarabi Gothic"', googleParam: "Sawarabi+Gothic" },
  { id: "stick", label: "Stick", sample: "対応", featured: false, family: '"Stick", system-ui, sans-serif', cssName: '"Stick"', googleParam: "Stick" },
  { id: "dela", label: "Dela Gothic One", sample: "重要", featured: false, family: '"Dela Gothic One", system-ui, sans-serif', cssName: '"Dela Gothic One"', googleParam: "Dela+Gothic+One" },
  { id: "potta", label: "Potta One", sample: "OK", featured: false, family: '"Potta One", system-ui, sans-serif', cssName: '"Potta One"', googleParam: "Potta+One" },
  { id: "yomogi", label: "Yomogi", sample: "ゆるい", featured: false, family: '"Yomogi", system-ui, sans-serif', cssName: '"Yomogi"', googleParam: "Yomogi" },
  { id: "notoSans", label: "Noto Sans JP", sample: "共有", featured: false, family: '"Noto Sans JP", system-ui, sans-serif', cssName: '"Noto Sans JP"', googleParam: "Noto+Sans+JP:wght@400;700;900" },
];

const gradientPresets = [
  ["#ff4d8d", "#ffbf1f"],
  ["#6366f1", "#22d3ee"],
  ["#06b6d4", "#84cc16"],
  ["#f97316", "#ef4444"],
  ["#8b5cf6", "#ec4899"],
];
const backgroundGradientPresets = [
  ["#ffffff", "#f8fafc"],
  ["#fef3c7", "#ffedd5"],
  ["#fee2e2", "#fce7f3"],
  ["#ede9fe", "#dbeafe"],
  ["#cffafe", "#dcfce7"],
  ["#f3f4f6", "#e5e7eb"],
];
const solidPresets = ["#111827", "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#6366f1", "#8b5cf6", "#ec4899", "#ffffff", "#000000"];
const backgroundPresets = ["#ffffff", "#f8fafc", "#fef3c7", "#ffedd5", "#fee2e2", "#fce7f3", "#ede9fe", "#dbeafe", "#cffafe", "#dcfce7", "#f3f4f6", "#111827"];
const outlinePresets = ["#ffffff", "#111827", "#f8fafc", "#fde047", "#fb7185", "#f97316", "#22c55e", "#38bdf8", "#6366f1", "#c084fc", "#ec4899", "#000000"];

let state = { ...DEFAULT_STATE };
let renderDirty = true;
let estimateDirty = true;
let previewLoopStarted = false;
let loadedFontPromises = new Map();
let loadedFontIds = new Set();
let fontsStylesheetPromise = null;
let gifWorkerBlobUrl = null;
let gifWorkerBlobPromise = null;
let fontSelectionToken = 0;
let fontApplyToken = 0;
let isGifRendering = false;
const segmenter = typeof Intl !== "undefined" && Intl.Segmenter ? new Intl.Segmenter("ja", { granularity: "grapheme" }) : null;

const elements = {
  text: document.getElementById("stampText"),
  charCount: document.getElementById("charCount"),
  featuredFontGrid: document.getElementById("featuredFontGrid"),
  extraFontGrid: document.getElementById("extraFontGrid"),
  moreFonts: document.getElementById("moreFonts"),
  toggleMoreFonts: document.getElementById("toggleMoreFonts"),
  fontSize: document.getElementById("fontSize"),
  fontSizeValue: document.getElementById("fontSizeValue"),
  bold: document.getElementById("boldToggle"),
  letterSpacing: document.getElementById("letterSpacing"),
  letterSpacingValue: document.getElementById("letterSpacingValue"),
  lineGap: document.getElementById("lineGap"),
  lineGapValue: document.getElementById("lineGapValue"),
  fitWidth: document.getElementById("fitWidth"),
  fitHeight: document.getElementById("fitHeight"),
  textFillModeRadios: document.querySelectorAll('input[name="textFillMode"]'),
  solidColorControls: document.getElementById("solidColorControls"),
  textGradientControls: document.getElementById("textGradientControls"),
  solidColor: document.getElementById("solidColor"),
  solidColorHex: document.getElementById("solidColorHex"),
  solidColorChip: document.getElementById("solidColorChip"),
  solidPresets: document.getElementById("solidPresets"),
  textGradientStart: document.getElementById("textGradientStart"),
  textGradientStartHex: document.getElementById("textGradientStartHex"),
  textGradientStartChip: document.getElementById("textGradientStartChip"),
  textGradientStartPresets: document.getElementById("textGradientStartPresets"),
  textGradientEnd: document.getElementById("textGradientEnd"),
  textGradientEndHex: document.getElementById("textGradientEndHex"),
  textGradientEndChip: document.getElementById("textGradientEndChip"),
  textGradientEndPresets: document.getElementById("textGradientEndPresets"),
  textGradientDirection: document.getElementById("textGradientDirection"),
  textGradientPreview: document.getElementById("textGradientPreview"),
  textGradientPresets: document.getElementById("textGradientPresets"),
  swapTextGradient: document.getElementById("swapTextGradient"),
  transparentBg: document.getElementById("transparentBg"),
  backgroundFillModeRadios: document.querySelectorAll('input[name="backgroundFillMode"]'),
  backgroundSolidControls: document.getElementById("backgroundSolidControls"),
  backgroundGradientControls: document.getElementById("backgroundGradientControls"),
  backgroundColor: document.getElementById("backgroundColor"),
  backgroundColorHex: document.getElementById("backgroundColorHex"),
  backgroundColorChip: document.getElementById("backgroundColorChip"),
  backgroundPresets: document.getElementById("backgroundPresets"),
  backgroundGradientStart: document.getElementById("backgroundGradientStart"),
  backgroundGradientStartHex: document.getElementById("backgroundGradientStartHex"),
  backgroundGradientStartChip: document.getElementById("backgroundGradientStartChip"),
  backgroundGradientStartPresets: document.getElementById("backgroundGradientStartPresets"),
  backgroundGradientEnd: document.getElementById("backgroundGradientEnd"),
  backgroundGradientEndHex: document.getElementById("backgroundGradientEndHex"),
  backgroundGradientEndChip: document.getElementById("backgroundGradientEndChip"),
  backgroundGradientEndPresets: document.getElementById("backgroundGradientEndPresets"),
  backgroundGradientDirection: document.getElementById("backgroundGradientDirection"),
  backgroundGradientPreview: document.getElementById("backgroundGradientPreview"),
  backgroundGradientPresets: document.getElementById("backgroundGradientPresets"),
  swapBackgroundGradient: document.getElementById("swapBackgroundGradient"),
  backgroundShape: document.getElementById("backgroundShape"),
  cornerRadius: document.getElementById("cornerRadius"),
  cornerRadiusValue: document.getElementById("cornerRadiusValue"),
  strokeToggle: document.getElementById("strokeToggle"),
  strokeColor: document.getElementById("strokeColor"),
  strokeColorHex: document.getElementById("strokeColorHex"),
  strokeColorChip: document.getElementById("strokeColorChip"),
  strokePresets: document.getElementById("strokePresets"),
  strokeWidth: document.getElementById("strokeWidth"),
  strokeWidthValue: document.getElementById("strokeWidthValue"),
  frameOutlineToggle: document.getElementById("frameOutlineToggle"),
  frameOutlineColor: document.getElementById("frameOutlineColor"),
  frameOutlineColorHex: document.getElementById("frameOutlineColorHex"),
  frameOutlineColorChip: document.getElementById("frameOutlineColorChip"),
  frameOutlinePresets: document.getElementById("frameOutlinePresets"),
  frameOutlineWidth: document.getElementById("frameOutlineWidth"),
  frameOutlineWidthValue: document.getElementById("frameOutlineWidthValue"),
  shadowToggle: document.getElementById("shadowToggle"),
  shadowBlur: document.getElementById("shadowBlur"),
  shadowBlurValue: document.getElementById("shadowBlurValue"),
  iconPreset: document.getElementById("iconPreset"),
  iconLayout: document.getElementById("iconLayout"),
  outputSize: document.getElementById("outputSize"),
  animationEnabled: document.getElementById("animationEnabled"),
  animateTextGradient: document.getElementById("animateTextGradient"),
  animateBackgroundGradient: document.getElementById("animateBackgroundGradient"),
  frameEffect: document.getElementById("frameEffect"),
  textEffect: document.getElementById("textEffect"),
  gifFrames: document.getElementById("gifFrames"),
  gifFps: document.getElementById("gifFps"),
  downloadButton: document.getElementById("downloadButton"),
  downloadGifButton: document.getElementById("downloadGifButton"),
  resetButton: document.getElementById("resetButton"),
  selectedFontName: document.getElementById("selectedFontName"),
  previewMeta: document.getElementById("previewMeta"),
  fileEstimate: document.getElementById("fileEstimate"),
};

function getFontById(id) {
  return fonts.find((font) => font.id === id) || fonts[0];
}

function ensureFontsStylesheet() {
  if (fontsStylesheetPromise) return fontsStylesheetPromise;
  fontsStylesheetPromise = new Promise((resolve) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    const query = fonts.map((font) => `family=${font.googleParam}`).join("&");
    link.href = `https://fonts.googleapis.com/css2?${query}&display=swap`;
    link.onload = () => resolve();
    link.onerror = () => resolve();
    document.head.appendChild(link);
  });
  return fontsStylesheetPromise;
}

function loadGoogleFont(font) {
  if (loadedFontIds.has(font.id)) return Promise.resolve();
  if (loadedFontPromises.has(font.id)) return loadedFontPromises.get(font.id);
  const promise = (async () => {
    await ensureFontsStylesheet();
    if (document.fonts?.load) {
      await Promise.allSettled([
        document.fonts.load(`400 64px ${font.cssName}`, font.sample),
        document.fonts.load(`700 64px ${font.cssName}`, font.sample),
        document.fonts.load(`900 64px ${font.cssName}`, font.sample),
      ]);
      await document.fonts.ready.catch(() => undefined);
    } else {
      await new Promise((r) => setTimeout(r, 600));
    }
    loadedFontIds.add(font.id);
  })();
  loadedFontPromises.set(font.id, promise);
  return promise;
}

function nextAnimationFrame() {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

function normalizeFontLoadText(text, fallback = "") {
  const normalized = String(text || "").replace(/\s+/g, "").trim();
  return normalized || fallback || "承知しましたありがとう確認";
}

async function ensureFontApplied(font, textSample = state.text) {
  await loadGoogleFont(font);
  const sampleText = normalizeFontLoadText(textSample, font.sample);
  if (document.fonts?.load) {
    const sampleSize = Math.max(64, state.fontSize);
    await Promise.allSettled([
      document.fonts.load(`400 ${sampleSize}px ${font.cssName}`, sampleText),
      document.fonts.load(`700 ${sampleSize}px ${font.cssName}`, sampleText),
      document.fonts.load(`900 ${sampleSize}px ${font.cssName}`, sampleText),
    ]);
    await document.fonts.ready.catch(() => undefined);
  }
  await nextAnimationFrame();
  await new Promise((resolve) => setTimeout(resolve, 40));
  await nextAnimationFrame();
}

function scheduleFontRefresh() {
  const token = ++fontApplyToken;
  const font = getFontById(state.fontId);
  const sampleText = state.text;
  ensureFontApplied(font, sampleText)
    .then(async () => {
      if (token !== fontApplyToken) return;
      markDirty();
      await new Promise((resolve) => setTimeout(resolve, 80));
      if (token !== fontApplyToken) return;
      markDirty();
    })
    .catch(() => {
      if (token !== fontApplyToken) return;
      markDirty();
    });
}

async function preloadAllFonts() {
  await ensureFontsStylesheet();
  await Promise.allSettled(fonts.map((font) => loadGoogleFont(font)));
}

function createFontTile(font) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "font-tile";
  button.dataset.fontId = font.id;
  button.innerHTML = `<span class="font-sample">${font.sample}</span><span class="font-name">${font.label}</span>`;
  button.style.fontFamily = font.family;
  button.addEventListener("click", () => {
    fontSelectionToken += 1;
    state.fontId = font.id;
    updateFontTiles();
    scheduleFontRefresh();
    markDirty();
  });
  return button;
}

function renderFontTiles() {
  elements.featuredFontGrid.innerHTML = "";
  elements.extraFontGrid.innerHTML = "";
  fonts.filter((font) => font.featured).forEach((font) => elements.featuredFontGrid.appendChild(createFontTile(font)));
  fonts.filter((font) => !font.featured).forEach((font) => elements.extraFontGrid.appendChild(createFontTile(font)));
  updateFontTiles();
}

function updateFontTiles() {
  document.querySelectorAll(".font-tile").forEach((tile) => {
    tile.classList.toggle("active", tile.dataset.fontId === state.fontId);
  });
  elements.selectedFontName.textContent = getFontById(state.fontId).label;
}

function renderColorPresets(container, colors, handler) {
  container.innerHTML = "";
  colors.forEach((color) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "solid-preset";
    button.style.background = color;
    button.title = color;
    button.addEventListener("click", () => handler(color));
    container.appendChild(button);
  });
}

function renderGradientPresets(container, presets, handler) {
  container.innerHTML = "";
  presets.forEach(([start, end]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "gradient-preset";
    button.style.background = `linear-gradient(90deg, ${start}, ${end})`;
    button.title = `${start} → ${end}`;
    button.addEventListener("click", () => handler(start, end));
    container.appendChild(button);
  });
}

function normalizeHexColor(value) {
  const raw = String(value || "").trim();
  const short = raw.match(/^#?([0-9a-fA-F]{3})$/);
  if (short) return `#${short[1].split("").map((ch) => ch + ch).join("")}`.toLowerCase();
  const full = raw.match(/^#?([0-9a-fA-F]{6})$/);
  return full ? `#${full[1]}`.toLowerCase() : null;
}

function bindColorTool(stateKey, colorInput, hexInput, chip, onUpdate = null) {
  const apply = (color) => {
    if (!color) return;
    state[stateKey] = color;
    chip.style.background = color;
    colorInput.value = color;
    hexInput.value = color;
    if (onUpdate) onUpdate();
    markDirty();
  };
  colorInput.addEventListener("input", () => apply(normalizeHexColor(colorInput.value)));
  hexInput.addEventListener("input", () => {
    const color = normalizeHexColor(hexInput.value);
    if (color) apply(color);
  });
  hexInput.addEventListener("blur", () => {
    hexInput.value = state[stateKey];
  });
}

function syncColorTool(stateKey, colorInput, hexInput, chip) {
  const color = normalizeHexColor(state[stateKey]) || "#000000";
  colorInput.value = color;
  hexInput.value = color;
  chip.style.background = color;
}

function bindControls() {
  elements.toggleMoreFonts.addEventListener("click", () => {
    const opening = elements.moreFonts.hidden;
    elements.moreFonts.hidden = !opening;
    elements.toggleMoreFonts.setAttribute("aria-expanded", String(opening));
    elements.toggleMoreFonts.textContent = opening ? "閉じる" : "その他のフォントを表示";
  });

  elements.text.addEventListener("input", () => {
    state.text = elements.text.value;
    updateCharCount();
    scheduleFontRefresh();
    markDirty();
  });
  elements.fontSize.addEventListener("input", () => { state.fontSize = Number(elements.fontSize.value); elements.fontSizeValue.textContent = state.fontSize; scheduleFontRefresh(); markDirty(); });
  elements.bold.addEventListener("change", () => { state.bold = elements.bold.checked; scheduleFontRefresh(); markDirty(); });
  elements.letterSpacing.addEventListener("input", () => { state.letterSpacing = Number(elements.letterSpacing.value); elements.letterSpacingValue.textContent = state.letterSpacing; markDirty(); });
  elements.lineGap.addEventListener("input", () => { state.lineGap = Number(elements.lineGap.value); elements.lineGapValue.textContent = state.lineGap; markDirty(); });
  elements.fitWidth.addEventListener("change", () => { state.fitWidth = elements.fitWidth.checked; markDirty(); });
  elements.fitHeight.addEventListener("change", () => { state.fitHeight = elements.fitHeight.checked; markDirty(); });

  elements.textFillModeRadios.forEach((radio) => radio.addEventListener("change", () => {
    if (!radio.checked) return;
    state.textFillMode = radio.value;
    syncFillModeUI();
    markDirty();
  }));

  bindColorTool("solidColor", elements.solidColor, elements.solidColorHex, elements.solidColorChip);
  bindColorTool("textGradientStart", elements.textGradientStart, elements.textGradientStartHex, elements.textGradientStartChip, updateGradientPreviews);
  bindColorTool("textGradientEnd", elements.textGradientEnd, elements.textGradientEndHex, elements.textGradientEndChip, updateGradientPreviews);
  elements.textGradientDirection.addEventListener("change", () => { state.textGradientDirection = elements.textGradientDirection.value; updateGradientPreviews(); markDirty(); });
  elements.swapTextGradient.addEventListener("click", () => {
    [state.textGradientStart, state.textGradientEnd] = [state.textGradientEnd, state.textGradientStart];
    syncControlsFromState();
    markDirty();
  });

  elements.transparentBg.addEventListener("change", () => { state.transparentBg = elements.transparentBg.checked; markDirty(); });
  elements.backgroundFillModeRadios.forEach((radio) => radio.addEventListener("change", () => {
    if (!radio.checked) return;
    state.backgroundFillMode = radio.value;
    syncFillModeUI();
    updateGradientPreviews();
    markDirty();
  }));
  bindColorTool("backgroundColor", elements.backgroundColor, elements.backgroundColorHex, elements.backgroundColorChip);
  bindColorTool("backgroundGradientStart", elements.backgroundGradientStart, elements.backgroundGradientStartHex, elements.backgroundGradientStartChip, updateGradientPreviews);
  bindColorTool("backgroundGradientEnd", elements.backgroundGradientEnd, elements.backgroundGradientEndHex, elements.backgroundGradientEndChip, updateGradientPreviews);
  elements.backgroundGradientDirection.addEventListener("change", () => { state.backgroundGradientDirection = elements.backgroundGradientDirection.value; updateGradientPreviews(); markDirty(); });
  elements.swapBackgroundGradient.addEventListener("click", () => {
    [state.backgroundGradientStart, state.backgroundGradientEnd] = [state.backgroundGradientEnd, state.backgroundGradientStart];
    syncControlsFromState();
    markDirty();
  });
  elements.backgroundShape.addEventListener("change", () => { state.backgroundShape = elements.backgroundShape.value; markDirty(); });
  elements.cornerRadius.addEventListener("input", () => { state.cornerRadius = Number(elements.cornerRadius.value); elements.cornerRadiusValue.textContent = state.cornerRadius; markDirty(); });

  elements.strokeToggle.addEventListener("change", () => { state.stroke = elements.strokeToggle.checked; markDirty(); });
  bindColorTool("strokeColor", elements.strokeColor, elements.strokeColorHex, elements.strokeColorChip);
  elements.strokeWidth.addEventListener("input", () => { state.strokeWidth = Number(elements.strokeWidth.value); elements.strokeWidthValue.textContent = state.strokeWidth; markDirty(); });

  elements.frameOutlineToggle.addEventListener("change", () => { state.frameOutline = elements.frameOutlineToggle.checked; markDirty(); });
  bindColorTool("frameOutlineColor", elements.frameOutlineColor, elements.frameOutlineColorHex, elements.frameOutlineColorChip);
  elements.frameOutlineWidth.addEventListener("input", () => { state.frameOutlineWidth = Number(elements.frameOutlineWidth.value); elements.frameOutlineWidthValue.textContent = state.frameOutlineWidth; markDirty(); });

  elements.shadowToggle.addEventListener("change", () => { state.shadow = elements.shadowToggle.checked; markDirty(); });
  elements.shadowBlur.addEventListener("input", () => { state.shadowBlur = Number(elements.shadowBlur.value); elements.shadowBlurValue.textContent = state.shadowBlur; markDirty(); });
  elements.iconPreset.addEventListener("change", () => { state.iconPreset = elements.iconPreset.value; markDirty(); });
  elements.iconLayout.addEventListener("change", () => { state.iconLayout = elements.iconLayout.value; markDirty(); });
  elements.outputSize.addEventListener("change", () => { state.outputSize = Number(elements.outputSize.value); markDirty(); });

  elements.animationEnabled.addEventListener("change", () => { state.animationEnabled = elements.animationEnabled.checked; syncAnimationUI(); markDirty(); });
  elements.animateTextGradient.addEventListener("change", () => { state.animateTextGradient = elements.animateTextGradient.checked; markDirty(); });
  elements.animateBackgroundGradient.addEventListener("change", () => { state.animateBackgroundGradient = elements.animateBackgroundGradient.checked; markDirty(); });
  elements.frameEffect.addEventListener("change", () => { state.frameEffect = elements.frameEffect.value; markDirty(); });
  elements.textEffect.addEventListener("change", () => { state.textEffect = elements.textEffect.value; markDirty(); });
  elements.gifFrames.addEventListener("change", () => { state.gifFrames = Number(elements.gifFrames.value); });
  elements.gifFps.addEventListener("change", () => { state.gifFps = Number(elements.gifFps.value); });

  elements.downloadButton.addEventListener("click", downloadPng);
  elements.downloadGifButton.addEventListener("click", downloadGif);
  elements.resetButton.addEventListener("click", resetAll);
}

function updateCharCount() {
  elements.charCount.textContent = `${elements.text.value.length} / 28`;
}

function syncFillModeUI() {
  elements.solidColorControls.hidden = state.textFillMode !== "solid";
  elements.textGradientControls.hidden = state.textFillMode !== "gradient";
  elements.textFillModeRadios.forEach((radio) => { radio.checked = radio.value === state.textFillMode; });
  elements.backgroundSolidControls.hidden = state.backgroundFillMode !== "solid";
  elements.backgroundGradientControls.hidden = state.backgroundFillMode !== "gradient";
  elements.backgroundFillModeRadios.forEach((radio) => { radio.checked = radio.value === state.backgroundFillMode; });
}

function syncAnimationUI() {
  elements.downloadGifButton.disabled = !state.animationEnabled || isGifRendering || typeof GIF === "undefined";
}

function updateGradientPreviews() {
  elements.textGradientPreview.style.background = gradientCss(state.textGradientStart, state.textGradientEnd, state.textGradientDirection);
  elements.backgroundGradientPreview.style.background = gradientCss(state.backgroundGradientStart, state.backgroundGradientEnd, state.backgroundGradientDirection);
}

function syncControlsFromState() {
  elements.text.value = state.text;
  elements.fontSize.value = state.fontSize;
  elements.fontSizeValue.textContent = state.fontSize;
  elements.bold.checked = state.bold;
  elements.letterSpacing.value = state.letterSpacing;
  elements.letterSpacingValue.textContent = state.letterSpacing;
  elements.lineGap.value = state.lineGap;
  elements.lineGapValue.textContent = state.lineGap;
  elements.fitWidth.checked = state.fitWidth;
  elements.fitHeight.checked = state.fitHeight;

  syncColorTool("solidColor", elements.solidColor, elements.solidColorHex, elements.solidColorChip);
  syncColorTool("textGradientStart", elements.textGradientStart, elements.textGradientStartHex, elements.textGradientStartChip);
  syncColorTool("textGradientEnd", elements.textGradientEnd, elements.textGradientEndHex, elements.textGradientEndChip);
  elements.textGradientDirection.value = state.textGradientDirection;

  elements.transparentBg.checked = state.transparentBg;
  syncColorTool("backgroundColor", elements.backgroundColor, elements.backgroundColorHex, elements.backgroundColorChip);
  syncColorTool("backgroundGradientStart", elements.backgroundGradientStart, elements.backgroundGradientStartHex, elements.backgroundGradientStartChip);
  syncColorTool("backgroundGradientEnd", elements.backgroundGradientEnd, elements.backgroundGradientEndHex, elements.backgroundGradientEndChip);
  elements.backgroundGradientDirection.value = state.backgroundGradientDirection;
  elements.backgroundShape.value = state.backgroundShape;
  elements.cornerRadius.value = state.cornerRadius;
  elements.cornerRadiusValue.textContent = state.cornerRadius;

  elements.strokeToggle.checked = state.stroke;
  syncColorTool("strokeColor", elements.strokeColor, elements.strokeColorHex, elements.strokeColorChip);
  elements.strokeWidth.value = state.strokeWidth;
  elements.strokeWidthValue.textContent = state.strokeWidth;
  elements.frameOutlineToggle.checked = state.frameOutline;
  syncColorTool("frameOutlineColor", elements.frameOutlineColor, elements.frameOutlineColorHex, elements.frameOutlineColorChip);
  elements.frameOutlineWidth.value = state.frameOutlineWidth;
  elements.frameOutlineWidthValue.textContent = state.frameOutlineWidth;

  elements.shadowToggle.checked = state.shadow;
  elements.shadowBlur.value = state.shadowBlur;
  elements.shadowBlurValue.textContent = state.shadowBlur;
  elements.iconPreset.value = state.iconPreset;
  elements.iconLayout.value = state.iconLayout;
  elements.outputSize.value = String(state.outputSize);

  elements.animationEnabled.checked = state.animationEnabled;
  elements.animateTextGradient.checked = state.animateTextGradient;
  elements.animateBackgroundGradient.checked = state.animateBackgroundGradient;
  elements.frameEffect.value = state.frameEffect;
  elements.textEffect.value = state.textEffect;
  elements.gifFrames.value = String(state.gifFrames);
  elements.gifFps.value = String(state.gifFps);

  updateCharCount();
  updateGradientPreviews();
  syncFillModeUI();
  syncAnimationUI();
  updateFontTiles();
}

function resetAll() {
  state = { ...DEFAULT_STATE };
  syncControlsFromState();
  updateCharCount();
  scheduleFontRefresh();
  markDirty();
}

function markDirty() {
  renderDirty = true;
  estimateDirty = true;
}

function splitGraphemes(text) {
  if (!text) return [];
  if (segmenter) return Array.from(segmenter.segment(text), (part) => part.segment);
  return Array.from(text);
}

function measureLineWidth(context, line, letterSpacingPx) {
  const chars = splitGraphemes(line);
  if (!chars.length) return 0;
  let width = 0;
  chars.forEach((char, index) => {
    width += context.measureText(char).width;
    if (index < chars.length - 1) width += letterSpacingPx;
  });
  return width;
}

function measureTextBlockHeight(lineCount, fontSize, lineGapPx) {
  if (lineCount <= 0) return 0;
  return lineCount * fontSize + Math.max(0, lineCount - 1) * lineGapPx;
}

function drawSpacedText(context, line, centerX, y, letterSpacingPx, mode) {
  if (Math.abs(letterSpacingPx) < 0.1) {
    context.textAlign = "center";
    if (mode === "stroke") context.strokeText(line, centerX, y);
    else context.fillText(line, centerX, y);
    return;
  }
  const chars = splitGraphemes(line);
  if (!chars.length) return;
  const widths = chars.map((char) => context.measureText(char).width);
  const totalWidth = widths.reduce((sum, w) => sum + w, 0) + Math.max(0, chars.length - 1) * letterSpacingPx;
  let x = centerX - totalWidth / 2;
  context.textAlign = "left";
  chars.forEach((char, index) => {
    if (mode === "stroke") context.strokeText(char, x, y);
    else context.fillText(char, x, y);
    x += widths[index] + letterSpacingPx;
  });
}

function gradientCss(start, end, direction) {
  const dirMap = { "left-right": "90deg", "top-bottom": "180deg", "diagonal-down": "135deg", "diagonal-up": "45deg" };
  return `linear-gradient(${dirMap[direction]}, ${start}, ${end})`;
}

function hexToRgb(hex) {
  const normalized = normalizeHexColor(hex) || "#000000";
  const value = normalized.slice(1);
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function mixHexColors(colorA, colorB, ratio) {
  const a = hexToRgb(colorA);
  const b = hexToRgb(colorB);
  const mix = (x, y) => Math.round(x + (y - x) * ratio);
  return `rgb(${mix(a.r, b.r)}, ${mix(a.g, b.g)}, ${mix(a.b, b.b)})`;
}

function createGradient(context, size, direction, startColor, endColor, progress = 0, animate = false) {
  let x0 = 0, y0 = 0, x1 = size, y1 = 0;
  if (direction === "top-bottom") {
    x1 = 0; y1 = size;
  } else if (direction === "diagonal-down") {
    x1 = size; y1 = size;
  } else if (direction === "diagonal-up") {
    x0 = 0; y0 = size; x1 = size; y1 = 0;
  }
  const gradient = context.createLinearGradient(x0, y0, x1, y1);
  if (animate) {
    const eased = (1 - Math.cos(progress * Math.PI * 2)) / 2;
    gradient.addColorStop(0, mixHexColors(startColor, endColor, eased));
    gradient.addColorStop(0.5, mixHexColors(startColor, endColor, 0.5));
    gradient.addColorStop(1, mixHexColors(endColor, startColor, eased));
  } else {
    gradient.addColorStop(0, startColor);
    gradient.addColorStop(1, endColor);
  }
  return gradient;
}

function roundedRect(context, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + r, y);
  context.arcTo(x + width, y, x + width, y + height, r);
  context.arcTo(x + width, y + height, x, y + height, r);
  context.arcTo(x, y + height, x, y, r);
  context.arcTo(x, y, x + width, y, r);
  context.closePath();
}

function getOutlineShape(currentState, size) {
  const pad = Math.max(2, currentState.frameOutlineWidth * (size / 256) * 0.75);
  const x = pad;
  const y = pad;
  const w = size - pad * 2;
  const h = size - pad * 2;
  const shape = currentState.backgroundShape === "none" ? "rounded" : currentState.backgroundShape;
  const radius = shape === "square" ? 0 : shape === "pill" ? size * 0.28 : shape === "circle" ? w / 2 : size * (currentState.cornerRadius / 100);
  return { x, y, w, h, shape, radius };
}

class StampRenderer {
  static renderFrame(context, currentState, frame) {
    const size = currentState.outputSize;
    const targetCanvas = context.canvas;
    if (targetCanvas.width !== size) targetCanvas.width = size;
    if (targetCanvas.height !== size) targetCanvas.height = size;
    context.clearRect(0, 0, size, size);
    this.drawBackground(context, currentState, size, frame);
    this.drawIcon(context, currentState, size, frame);
    this.drawText(context, currentState, size, frame);
    this.drawOuterOutline(context, currentState, size, frame);
  }

  static drawBackground(context, currentState, size, frame) {
    if (currentState.transparentBg || currentState.backgroundShape === "none") return;
    const pad = Math.max(1, Math.round(size * 0.004));
    const x = pad;
    const y = pad;
    const w = size - pad * 2;
    const h = size - pad * 2;
    const animateBackground = currentState.animationEnabled && currentState.animateBackgroundGradient;
    context.save();
    if (currentState.backgroundFillMode === "gradient") {
      context.fillStyle = createGradient(context, size, currentState.backgroundGradientDirection, currentState.backgroundGradientStart, currentState.backgroundGradientEnd, frame.progress, animateBackground);
    } else {
      context.fillStyle = currentState.backgroundColor;
    }
    if (currentState.backgroundShape === "circle") {
      context.beginPath();
      context.arc(size / 2, size / 2, w / 2, 0, Math.PI * 2);
      context.fill();
    } else {
      const radius = currentState.backgroundShape === "square" ? 0 : currentState.backgroundShape === "pill" ? size * 0.28 : size * (currentState.cornerRadius / 100);
      roundedRect(context, x, y, w, h, radius);
      context.fill();
    }
    context.restore();
  }

  static drawIcon(context, currentState, size) {
    if (currentState.iconPreset === "none") return;
    const layout = getIconLayout(currentState.iconLayout, size);
    context.save();
    context.globalAlpha = currentState.iconLayout === "behind" ? 0.18 : 0.92;
    context.translate(layout.x, layout.y);
    context.scale(layout.scale, layout.scale);
    drawPresetIcon(context, currentState.iconPreset, size);
    context.restore();
  }

  static drawText(context, currentState, size, frame) {
    const text = currentState.text.trim();
    if (!text) return;
    const font = getFontById(currentState.fontId);
    const lines = text.split(/\n/).map((line) => line.trim()).filter((line) => line.length > 0);
    if (!lines.length) return;
    const weight = currentState.bold ? 900 : 400;
    const family = font.family;
    const baseSize = currentState.fontSize * (size / 256);
    const lineGapPx = currentState.lineGap * (size / 256);
    const letterSpacingPx = currentState.letterSpacing * (size / 256);
    context.save();
    context.font = `${weight} ${baseSize}px ${family}`;
    context.textBaseline = "middle";
    context.lineJoin = "round";
    context.miterLimit = 2;

    const measuredWidths = lines.map((line) => measureLineWidth(context, line, letterSpacingPx));
    const totalHeight = measureTextBlockHeight(lines.length, baseSize, lineGapPx);
    const extraPad = Math.max(
      currentState.stroke ? currentState.strokeWidth * (size / 256) : 0,
      currentState.shadow ? currentState.shadowBlur * (size / 256) * 0.4 : 0,
    );
    const textPadding = size * 0.03 + extraPad;
    const maxWidth = Math.max(1, size - textPadding * 2);
    const maxHeight = Math.max(1, size - textPadding * 2);

    const lineScaleXs = measuredWidths.map((width) => currentState.fitWidth && width > maxWidth ? (maxWidth / Math.max(width, 1)) * 0.985 : 1);
    const scaleY = currentState.fitHeight && totalHeight > maxHeight ? (maxHeight / Math.max(totalHeight, 1)) * 0.985 : 1;

    let wobbleRotation = 0;
    let blinkAlpha = 1;
    let effectScale = 1;
    let effectOffsetX = 0;
    let effectOffsetY = 0;
    if (currentState.animationEnabled) {
      const phase = frame.progress * Math.PI * 2;
      if (currentState.textEffect === "wobble") wobbleRotation = Math.sin(phase) * 0.08;
      if (currentState.textEffect === "blink") blinkAlpha = Math.sin(phase) > 0 ? 1 : 0.18;
      if (currentState.textEffect === "pulse") effectScale = 0.88 + (Math.sin(phase) + 1) * 0.10;
      if (currentState.textEffect === "float") effectOffsetY = Math.sin(phase) * size * 0.03;
      if (currentState.textEffect === "shake") effectOffsetX = Math.sin(phase * 4) * size * 0.02;
    }

    context.translate(size / 2 + effectOffsetX, size / 2 + effectOffsetY);
    context.rotate(wobbleRotation);
    context.scale(effectScale, effectScale * scaleY);
    context.globalAlpha *= blinkAlpha;

    const startY = -totalHeight / 2 + baseSize / 2;

    const drawLines = (mode) => {
      lines.forEach((line, index) => {
        const y = startY + index * (baseSize + lineGapPx);
        const waveOffsetY = currentState.animationEnabled && currentState.textEffect === "wave" ? Math.sin(frame.progress * Math.PI * 2 + index * 0.9) * size * 0.026 : 0;
        const waveOffsetX = currentState.animationEnabled && currentState.textEffect === "wave" ? Math.cos(frame.progress * Math.PI * 2 + index * 0.7) * size * 0.012 : 0;
        context.save();
        context.translate(waveOffsetX, y + waveOffsetY);
        context.scale(lineScaleXs[index], 1);
        drawSpacedText(context, line, 0, 0, letterSpacingPx, mode);
        context.restore();
      });
    };

    if (currentState.stroke) {
      context.shadowColor = "transparent";
      context.strokeStyle = currentState.strokeColor;
      context.lineWidth = Math.max(1, currentState.strokeWidth * (size / 256));
      drawLines("stroke");
    }

    if (currentState.shadow) {
      context.shadowColor = "rgba(15, 23, 42, 0.22)";
      context.shadowBlur = currentState.shadowBlur * (size / 256);
      context.shadowOffsetX = size * 0.012;
      context.shadowOffsetY = size * 0.016;
    } else {
      context.shadowColor = "transparent";
    }

    if (currentState.textFillMode === "gradient") {
      context.fillStyle = createGradient(context, size, currentState.textGradientDirection, currentState.textGradientStart, currentState.textGradientEnd, frame.progress, currentState.animationEnabled && currentState.animateTextGradient);
    } else {
      context.fillStyle = currentState.solidColor;
    }
    drawLines("fill");
    context.restore();
  }

  static drawOuterOutline(context, currentState, size, frame) {
    const shouldAnimateOutline = currentState.animationEnabled && currentState.frameEffect !== "none";
    if (!currentState.frameOutline && !shouldAnimateOutline) return;
    const shape = getOutlineShape(currentState, size);
    context.save();
    context.lineWidth = Math.max(1, currentState.frameOutlineWidth * (size / 256));
    if (shouldAnimateOutline) {
      if (currentState.frameEffect === "gold-sparkle") {
        context.strokeStyle = "#f59e0b";
        context.shadowColor = "rgba(245,158,11,0.45)";
        context.shadowBlur = 10 * (size / 256);
        traceOutline(context, shape);
        context.stroke();
        drawGoldSparkles(context, shape, frame.progress, size);
      } else if (["marquee-red", "marquee-blue", "marquee-green"].includes(currentState.frameEffect)) {
        const colors = {
          "marquee-red": "#ef4444",
          "marquee-blue": "#3b82f6",
          "marquee-green": "#22c55e",
        };
        context.strokeStyle = colors[currentState.frameEffect];
        context.setLineDash([size * 0.06, size * 0.04]);
        context.lineDashOffset = -frame.progress * size * 0.7;
        traceOutline(context, shape);
        context.stroke();
      }
    } else {
      context.strokeStyle = currentState.frameOutlineColor;
      traceOutline(context, shape);
      context.stroke();
    }
    context.restore();
  }
}

function traceOutline(context, shape) {
  if (shape.shape === "circle") {
    context.beginPath();
    context.arc(shape.x + shape.w / 2, shape.y + shape.h / 2, shape.w / 2, 0, Math.PI * 2);
  } else {
    roundedRect(context, shape.x, shape.y, shape.w, shape.h, shape.radius);
  }
}

function drawGoldSparkles(context, shape, progress, size) {
  const pts = outlineMotionPoints(shape, progress);
  pts.forEach((p, index) => {
    context.fillStyle = index % 2 === 0 ? "#fde68a" : "#fff7cc";
    drawSparkle(context, p.x, p.y, size * (0.02 + (index % 3) * 0.006));
  });
}

function outlineMotionPoints(shape, progress) {
  const perimeter = shape.shape === "circle" ? Math.PI * shape.w : 2 * (shape.w + shape.h);
  const offsets = [0, 0.18, 0.39, 0.62, 0.82].map((o) => (progress + o) % 1);
  return offsets.map((o) => pointOnShape(shape, o * perimeter));
}

function pointOnShape(shape, distance) {
  if (shape.shape === "circle") {
    const angle = distance / (Math.PI * shape.w) * Math.PI * 2 - Math.PI / 2;
    return {
      x: shape.x + shape.w / 2 + Math.cos(angle) * (shape.w / 2),
      y: shape.y + shape.h / 2 + Math.sin(angle) * (shape.h / 2),
    };
  }
  const p = 2 * (shape.w + shape.h);
  let d = ((distance % p) + p) % p;
  if (d < shape.w) return { x: shape.x + d, y: shape.y };
  d -= shape.w;
  if (d < shape.h) return { x: shape.x + shape.w, y: shape.y + d };
  d -= shape.h;
  if (d < shape.w) return { x: shape.x + shape.w - d, y: shape.y + shape.h };
  d -= shape.w;
  return { x: shape.x, y: shape.y + shape.h - d };
}

function getIconLayout(layout, size) {
  if (layout === "behind") return { x: size / 2, y: size / 2, scale: 1.15 };
  if (layout === "center") return { x: size / 2, y: size / 2, scale: 0.78 };
  return { x: size * 0.77, y: size * 0.24, scale: 0.34 };
}

function drawPresetIcon(context, preset, size) {
  const unit = size / 2;
  context.lineCap = "round";
  context.lineJoin = "round";
  if (preset === "smile") {
    context.fillStyle = "#fde047";
    context.strokeStyle = "#1f2937";
    context.lineWidth = unit * 0.055;
    context.beginPath();
    context.arc(0, 0, unit * 0.48, 0, Math.PI * 2);
    context.fill();
    context.stroke();
    context.fillStyle = "#1f2937";
    context.beginPath();
    context.arc(-unit * 0.16, -unit * 0.1, unit * 0.045, 0, Math.PI * 2);
    context.arc(unit * 0.16, -unit * 0.1, unit * 0.045, 0, Math.PI * 2);
    context.fill();
    context.beginPath();
    context.arc(0, unit * 0.04, unit * 0.22, 0.12 * Math.PI, 0.88 * Math.PI);
    context.stroke();
    return;
  }
  if (preset === "sparkle") {
    context.fillStyle = "#facc15";
    drawSparkle(context, 0, 0, unit * 0.42);
    context.fillStyle = "#f0abfc";
    drawSparkle(context, unit * 0.34, -unit * 0.3, unit * 0.18);
    context.fillStyle = "#93c5fd";
    drawSparkle(context, -unit * 0.36, unit * 0.28, unit * 0.14);
    return;
  }
  if (preset === "star") {
    context.fillStyle = "#facc15";
    drawStar(context, 0, 0, unit * 0.48, unit * 0.2, 5);
    return;
  }
  if (preset === "heart") {
    context.fillStyle = "#ef4444";
    context.beginPath();
    context.moveTo(0, unit * 0.33);
    context.bezierCurveTo(-unit * 0.56, 0, -unit * 0.48, -unit * 0.42, -unit * 0.16, -unit * 0.42);
    context.bezierCurveTo(0, -unit * 0.42, unit * 0.03, -unit * 0.28, 0, -unit * 0.2);
    context.bezierCurveTo(unit * 0.08, -unit * 0.32, unit * 0.2, -unit * 0.42, unit * 0.36, -unit * 0.42);
    context.bezierCurveTo(unit * 0.68, -unit * 0.42, unit * 0.74, 0, 0, unit * 0.33);
    context.fill();
    return;
  }
  if (preset === "check") {
    context.strokeStyle = "#22c55e";
    context.lineWidth = unit * 0.13;
    context.beginPath();
    context.moveTo(-unit * 0.42, 0);
    context.lineTo(-unit * 0.12, unit * 0.3);
    context.lineTo(unit * 0.46, -unit * 0.34);
    context.stroke();
    return;
  }
  if (preset === "bang") {
    context.fillStyle = "#ef4444";
    roundedRect(context, -unit * 0.1, -unit * 0.46, unit * 0.2, unit * 0.62, unit * 0.08);
    context.fill();
    context.beginPath();
    context.arc(0, unit * 0.34, unit * 0.1, 0, Math.PI * 2);
    context.fill();
    return;
  }
  if (preset === "bubble") {
    context.fillStyle = "#38bdf8";
    roundedRect(context, -unit * 0.48, -unit * 0.32, unit * 0.96, unit * 0.62, unit * 0.18);
    context.fill();
    context.beginPath();
    context.moveTo(-unit * 0.12, unit * 0.26);
    context.lineTo(-unit * 0.28, unit * 0.48);
    context.lineTo(unit * 0.08, unit * 0.28);
    context.fill();
  }
}

function drawSparkle(context, x, y, radius) {
  context.beginPath();
  context.moveTo(x, y - radius);
  context.quadraticCurveTo(x + radius * 0.16, y - radius * 0.16, x + radius, y);
  context.quadraticCurveTo(x + radius * 0.16, y + radius * 0.16, x, y + radius);
  context.quadraticCurveTo(x - radius * 0.16, y + radius * 0.16, x - radius, y);
  context.quadraticCurveTo(x - radius * 0.16, y - radius * 0.16, x, y - radius);
  context.closePath();
  context.fill();
}

function drawStar(context, x, y, outerRadius, innerRadius, points) {
  context.beginPath();
  for (let i = 0; i < points * 2; i += 1) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = -Math.PI / 2 + (i * Math.PI) / points;
    const px = x + Math.cos(angle) * radius;
    const py = y + Math.sin(angle) * radius;
    if (i === 0) context.moveTo(px, py); else context.lineTo(px, py);
  }
  context.closePath();
  context.fill();
}

function buildFileName(ext = "png", size = state.outputSize) {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rawText = (state.text || "stamp").replace(/\s+/g, "-").trim();
  const sanitized = rawText
    .normalize("NFKC")
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, "")
    .replace(/[^\p{L}\p{N}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}_-]+/gu, "-")
    .replace(/-+/g, "-")
    .replace(/^[-_.]+|[-_.]+$/g, "")
    .slice(0, 40) || "stamp";
  return `stamp-${size}-${y}${m}${d}-${sanitized}.${ext}`;
}

async function renderStaticFrameForExport() {
  await loadGoogleFont(getFontById(state.fontId));
  StampRenderer.renderFrame(ctx, state, { progress: 0, frameIndex: 0, frameCount: 1 });
}

async function downloadPng() {
  await renderStaticFrameForExport();
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = buildFileName("png", state.outputSize);
    anchor.click();
    URL.revokeObjectURL(url);
  }, "image/png");
}

async function getGifWorkerScriptUrl() {
  if (gifWorkerBlobUrl) return gifWorkerBlobUrl;
  if (gifWorkerBlobPromise) return gifWorkerBlobPromise;
  gifWorkerBlobPromise = (async () => {
    const response = await fetch("https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.worker.js", { mode: "cors" });
    if (!response.ok) throw new Error(`worker fetch failed: ${response.status}`);
    const workerText = await response.text();
    gifWorkerBlobUrl = URL.createObjectURL(new Blob([workerText], { type: "application/javascript" }));
    return gifWorkerBlobUrl;
  })();
  return gifWorkerBlobPromise;
}

async function downloadGif() {
  if (!state.animationEnabled || isGifRendering) return;
  if (typeof GIF === "undefined") {
    elements.fileEstimate.textContent = "GIF: ライブラリ読込失敗";
    alert("GIF生成ライブラリの読み込みに失敗しました。ページを再読み込みしてもう一度お試しください。");
    return;
  }
  isGifRendering = true;
  syncAnimationUI();
  elements.fileEstimate.textContent = "GIF: 生成中...";
  try {
    await loadGoogleFont(getFontById(state.fontId));
    const gifSize = Math.min(state.outputSize, 256);
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = gifSize;
    tempCanvas.height = gifSize;
    const tempCtx = tempCanvas.getContext("2d");
    const gif = new GIF({
      workers: 2,
      quality: 12,
      repeat: 0,
      workerScript: await getGifWorkerScriptUrl(),
      width: gifSize,
      height: gifSize,
      transparent: null,
    });

    const workingState = { ...state, outputSize: gifSize };
    const delay = Math.round(1000 / Math.max(1, state.gifFps));
    for (let i = 0; i < state.gifFrames; i += 1) {
      const progress = i / state.gifFrames;
      StampRenderer.renderFrame(tempCtx, workingState, { progress, frameIndex: i, frameCount: state.gifFrames });
      gif.addFrame(tempCanvas, { copy: true, delay });
    }

    await new Promise((resolve, reject) => {
      gif.on("finished", (blob) => {
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = buildFileName("gif", gifSize);
        anchor.click();
        URL.revokeObjectURL(url);
        elements.fileEstimate.textContent = `GIF: ${(blob.size / 1024).toFixed(1)} KB`;
        resolve();
      });
      gif.on("abort", () => reject(new Error("GIF generation aborted")));
      gif.render();
    });
  } catch (error) {
    console.error(error);
    elements.fileEstimate.textContent = "GIF: 作成失敗";
    alert("GIF出力に失敗しました。ネットワーク環境やブラウザ制限の可能性があります。詳細はコンソールを確認してください。");
  } finally {
    isGifRendering = false;
    syncAnimationUI();
    markDirty();
  }
}

function updateEstimate() {
  renderStaticFrameForExport().then(() => {
    canvas.toBlob((blob) => {
      if (!blob) return;
      elements.fileEstimate.textContent = `PNG: ${(blob.size / 1024).toFixed(1)} KB`;
    }, "image/png");
  });
}

function previewTick(timestamp) {
  if (!previewLoopStarted) return;
  const progress = state.animationEnabled ? ((timestamp / 1000) % 1) : 0;
  const fontLoaded = loadedFontIds.has(state.fontId);
  if (fontLoaded && (renderDirty || state.animationEnabled)) {
    StampRenderer.renderFrame(ctx, state, { progress, frameIndex: 0, frameCount: 1 });
    elements.previewMeta.textContent = `${state.outputSize} × ${state.outputSize} ${state.animationEnabled ? "PNG / GIF" : "PNG"}`;
    renderDirty = false;
  }
  if (estimateDirty && fontLoaded) {
    estimateDirty = false;
    updateEstimate();
  }
  requestAnimationFrame(previewTick);
}

async function init() {
  await ensureFontsStylesheet();
  renderFontTiles();
  renderColorPresets(elements.solidPresets, solidPresets, (color) => { state.solidColor = color; syncColorTool("solidColor", elements.solidColor, elements.solidColorHex, elements.solidColorChip); markDirty(); });
  renderColorPresets(elements.textGradientStartPresets, solidPresets, (color) => { state.textGradientStart = color; syncColorTool("textGradientStart", elements.textGradientStart, elements.textGradientStartHex, elements.textGradientStartChip); updateGradientPreviews(); markDirty(); });
  renderColorPresets(elements.textGradientEndPresets, solidPresets, (color) => { state.textGradientEnd = color; syncColorTool("textGradientEnd", elements.textGradientEnd, elements.textGradientEndHex, elements.textGradientEndChip); updateGradientPreviews(); markDirty(); });
  renderGradientPresets(elements.textGradientPresets, gradientPresets, (start, end) => { state.textGradientStart = start; state.textGradientEnd = end; syncControlsFromState(); markDirty(); });

  renderColorPresets(elements.backgroundPresets, backgroundPresets, (color) => { state.backgroundColor = color; syncColorTool("backgroundColor", elements.backgroundColor, elements.backgroundColorHex, elements.backgroundColorChip); markDirty(); });
  renderColorPresets(elements.backgroundGradientStartPresets, backgroundPresets, (color) => { state.backgroundGradientStart = color; syncColorTool("backgroundGradientStart", elements.backgroundGradientStart, elements.backgroundGradientStartHex, elements.backgroundGradientStartChip); updateGradientPreviews(); markDirty(); });
  renderColorPresets(elements.backgroundGradientEndPresets, backgroundPresets, (color) => { state.backgroundGradientEnd = color; syncColorTool("backgroundGradientEnd", elements.backgroundGradientEnd, elements.backgroundGradientEndHex, elements.backgroundGradientEndChip); updateGradientPreviews(); markDirty(); });
  renderGradientPresets(elements.backgroundGradientPresets, backgroundGradientPresets, (start, end) => { state.backgroundGradientStart = start; state.backgroundGradientEnd = end; syncControlsFromState(); updateGradientPreviews(); markDirty(); });

  renderColorPresets(elements.strokePresets, outlinePresets, (color) => { state.strokeColor = color; syncColorTool("strokeColor", elements.strokeColor, elements.strokeColorHex, elements.strokeColorChip); markDirty(); });
  renderColorPresets(elements.frameOutlinePresets, outlinePresets, (color) => { state.frameOutlineColor = color; syncColorTool("frameOutlineColor", elements.frameOutlineColor, elements.frameOutlineColorHex, elements.frameOutlineColorChip); markDirty(); });

  bindControls();
  syncControlsFromState();
  await preloadAllFonts();
  await ensureFontApplied(getFontById(state.fontId), state.text);
  previewLoopStarted = true;
  requestAnimationFrame(previewTick);
  markDirty();
}

init();
