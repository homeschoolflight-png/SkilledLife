// ---- Feedback block (appears at the bottom of every task) ----
// Expects a <div id="feedback-root"></div> in the page.
function renderFeedbackBlock() {
  const root = document.getElementById("feedback-root");
  if (!root) return;
  root.innerHTML = `
    <div class="feedback-block">
      <h4>Before you send this...</h4>
      <div class="field-row">
        <label for="fb-hard">What did you find hard or confusing?</label>
        <textarea id="fb-hard" placeholder="Type here, or leave blank"></textarea>
      </div>
      <div class="field-row">
        <label for="fb-questions">What questions do you have about this task?</label>
        <textarea id="fb-questions" placeholder="Type here, or leave blank"></textarea>
      </div>
      <div class="checkbox-row">
        <input type="checkbox" id="fb-understood" />
        <label for="fb-understood">I understand this and have no questions</label>
      </div>
    </div>
  `;
}

function getFeedbackData() {
  return {
    foundHardOrConfusing: document.getElementById("fb-hard")?.value || "",
    questions: document.getElementById("fb-questions")?.value || "",
    understoodNoQuestions: document.getElementById("fb-understood")?.checked || false
  };
}

// ---- Send to Parent (generic file version) ----
// file: a File object (JSON, audio, whatever). taskName: used for the share title/text.
async function sendFileToParent(taskName, file) {
  const statusEl = document.getElementById("send-status");
  try {
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: taskName,
        text: `${taskName} — completed task`
      });
      if (statusEl) { statusEl.textContent = "Sent!"; statusEl.className = "status-msg ok"; }
      return;
    }
  } catch (err) {
    // User cancelling the share sheet also lands here — not a real error.
    if (err && err.name === "AbortError") return;
  }

  // Fallback: trigger a plain download if the share sheet isn't available.
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  if (statusEl) {
    statusEl.textContent = "Downloaded — please text or AirDrop the file to your parent.";
    statusEl.className = "status-msg ok";
  }
}

// ---- Send to Parent (JSON convenience wrapper) ----
// dataObj: plain object with the task's answers; feedback is merged in automatically.
// taskName: short label used in the filename and share text.
// extra: optional additional fields to merge into the payload (e.g. attempts used).
async function sendToParent(taskName, dataObj, extra) {
  const payload = {
    task: taskName,
    submittedAt: new Date().toISOString(),
    answers: dataObj,
    feedback: getFeedbackData()
  };
  if (extra) Object.assign(payload, extra);
  const json = JSON.stringify(payload, null, 2);
  const filename = `${taskName.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.json`;
  const file = new File([json], filename, { type: "application/json" });
  return sendFileToParent(taskName, file);
}

// ---- Simple drag-and-drop wiring for chip -> field-row targets ----
// chips: NodeList/array of .chip elements with a data-value attribute
// targets: NodeList/array of .drop-target elements, each containing one input,
//          and each with a data-accepts attribute matching the chip's data-key
function wireDragAndDrop() {
  document.querySelectorAll(".chip").forEach((chip) => {
    chip.setAttribute("draggable", "true");
    chip.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/key", chip.dataset.key);
      e.dataTransfer.setData("text/value", chip.dataset.value);
    });
  });

  document.querySelectorAll(".drop-target").forEach((target) => {
    target.addEventListener("dragover", (e) => {
      e.preventDefault();
      target.classList.add("over");
    });
    target.addEventListener("dragleave", () => target.classList.remove("over"));
    target.addEventListener("drop", (e) => {
      e.preventDefault();
      target.classList.remove("over");
      const key = e.dataTransfer.getData("text/key");
      const value = e.dataTransfer.getData("text/value");
      if (key !== target.dataset.accepts) return; // wrong box, no-op
      const input = target.querySelector("input");
      if (input) input.value = value;
      target.classList.add("filled");
      const chip = document.querySelector(`.chip[data-key="${key}"]`);
      if (chip) chip.classList.add("placed");
      checkAllFilled();
    });
  });
}

function checkAllFilled() {
  const targets = document.querySelectorAll(".drop-target");
  const allFilled = Array.from(targets).every((t) => t.classList.contains("filled"));
  const sendBtn = document.getElementById("send-btn");
  if (sendBtn) sendBtn.disabled = targets.length > 0 && !allFilled;
}

document.addEventListener("DOMContentLoaded", renderFeedbackBlock);
