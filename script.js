const toggleDarkMode = document.getElementById("toggleDarkMode");
const body = document.body;
const logMood = document.getElementById("logMood");
const resetData = document.getElementById("resetData");
const exportCSV = document.getElementById("exportCSV");
const thoughts = document.getElementById("thoughts");
const affirmationText = document.getElementById("affirmationText");
const generateChallenge = document.getElementById("generateChallenge");
const challengeText = document.getElementById("challengeText");

let moodData = JSON.parse(localStorage.getItem("moodData")) || [];

// Load dark mode preference
if (localStorage.getItem("darkMode") === "enabled") {
  body.classList.add("dark-mode");
}

// Toggle dark mode
toggleDarkMode.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  localStorage.setItem(
    "darkMode",
    body.classList.contains("dark-mode") ? "enabled" : "disabled"
  );
});

// Log mood
logMood.addEventListener("click", () => {
  const selectedMood = document.querySelector("input[name='mood']:checked");
  if (!selectedMood) {
    alert("Please select a mood!");
    return;
  }
  const mood = selectedMood.value;
  const thought = thoughts.value.trim();
  moodData.push({ mood, thought, date: new Date().toLocaleString() });
  localStorage.setItem("moodData", JSON.stringify(moodData));

  affirmationText.textContent =
    "Great! Your mood has been logged. Keep reflecting!";
  thoughts.value = "";
  selectedMood.checked = false;
});

// Reset data
resetData.addEventListener("click", () => {
  if (confirm("Are you sure you want to reset all data?")) {
    moodData = [];
    localStorage.removeItem("moodData");
    alert("All data has been reset!");
  }
});

// Export to CSV
exportCSV.addEventListener("click", () => {
  if (moodData.length === 0) {
    alert("No data to export!");
    return;
  }

  const headers = ["Mood", "Thoughts", "Date"];
  const rows = moodData.map(({ mood, thought, date }) => [mood, thought, date]);

  let csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "mood_diary_data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// Mood Challenges
const challenges = [
  "Write down 3 things you're grateful for.",
  "Take a 10-minute walk outdoors.",
  "Message a friend you haven’t spoken to in a while.",
  "Listen to your favorite song.",
  "Do a 5-minute meditation or breathing exercise.",
  "Drink a glass of water and stretch.",
  "Spend 10 minutes on a hobby you love.",
  "Read a page of a book or an inspiring article.",
  "Write a letter to your future self."
];

generateChallenge.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * challenges.length);
  challengeText.textContent = challenges[randomIndex];
});
