// --- DATA ---
const weeklyPlan = [
    // Sunday
    { day: "Sunday", academic: { title: "Academics", details: ["<strong>17:00–18:00:</strong> Home study"] }, exercise: { title: "Exercise", details: ["<strong>Activity:</strong> Rugby Match"] }, nutrition: { title: "Nutrition", details: ["<strong>Breakfast:</strong> Eggs", "<strong>Lunch:</strong> Wrap / chicken & rice / sushi / stir fry / jacket potato + cheese (tortellini pre-match ok)", "<strong>Dinner:</strong> Family meal (Cheat day)"] } },
    // Monday
    { day: "Monday", academic: { title: "Academics", details: ["<strong>08:30:</strong> Leave for College", "<strong>09:00–14:25:</strong> Classes", "<strong>18:30–20:10:</strong> Home study"] }, exercise: { title: "Exercise", details: ["<strong>Activity:</strong> Rest Day"] }, nutrition: { title: "Nutrition", details: ["<strong>Breakfast:</strong> Protein porridge", "<strong>Lunch:</strong> Late steak + veg at home + protein snack", "<strong>Dinner:</strong> Mindful Chef"] } },
    // Tuesday
    { day: "Tuesday", academic: { title: "Academics", details: ["<strong>10:50:</strong> Leave for College", "<strong>11:20–16:45:</strong> Classes", "<strong>13:20–14:20:</strong> Study at college"] }, exercise: { title: "Exercise", details: ["<strong>Activity:</strong> 5km Run", "Before or after college"] }, nutrition: { title: "Nutrition", details: ["<strong>Breakfast:</strong> Overnight oats", "<strong>Lunch:</strong> Protein snack + 6-inch Subway", "<strong>Dinner:</strong> Mindful Chef"] } },
    // Wednesday
    { day: "Wednesday", academic: { title: "Academics", details: ["<strong>10:50:</strong> Leave for College", "<strong>11:20–15:35:</strong> Classes", "<strong>16:20–17:20:</strong> Home study"] }, exercise: { title: "Exercise", details: ["<strong>Activity:</strong> Rugby Training", "Starts at 18:00"] }, nutrition: { title: "Nutrition", details: ["<strong>Breakfast:</strong> Overnight oats", "<strong>Lunch:</strong> Sandwich or wrap + protein snack", "<strong>Dinner:</strong> Mindful Chef"] } },
    // Thursday
    { day: "Thursday", academic: { title: "Academics", details: ["<strong>08:30:</strong> Leave for College", "<strong>09:00–14:25:</strong> Classes", "<strong>18:30–19:30:</strong> Home study"] }, exercise: { title: "Exercise", details: ["<strong>Activity:</strong> Hard Gym", "Starts at 20:00"] }, nutrition: { title: "Nutrition", details: ["<strong>Breakfast:</strong> Protein porridge", "<strong>Lunch:</strong> Late steak + veg at home + protein snack", "<strong>Dinner:</strong> Choice of: steak & veg; taco lettuce wraps; stuffed pepper/aubergine; stir fry"] } },
    // Friday
    { day: "Friday", academic: { title: "Academics", details: ["<strong>08:30:</strong> Leave for College", "<strong>09:00–16:45:</strong> Classes", "<strong>11:15–12:20 & 13:20–14:25:</strong> Study at college"] }, exercise: { title: "Exercise", details: ["<strong>Activity:</strong> Conditioning", "Weights / cardio after college"] }, nutrition: { title: "Nutrition", details: ["<strong>Breakfast:</strong> Protein porridge", "<strong>Lunch:</strong> Protein snack + 6-inch Subway", "<strong>Dinner:</strong> Choice of: steak & veg; taco lettuce wraps; stuffed pepper/aubergine; stir fry"] } },
    // Saturday
    { day: "Saturday", academic: { title: "No College", details: [] }, exercise: { title: "Exercise", details: ["<strong>Activity:</strong> Deload", "Mobility + Run"] }, nutrition: { title: "Nutrition", details: ["<strong>Breakfast:</strong> Eggs", "<strong>Lunch:</strong> Wrap / chicken & rice / sushi / stir fry / jacket potato + cheese", "<strong>Dinner:</strong> Choice of: steak wrap; spag bol; baked chicken thighs + veg"] } }
];

const initialMealIdeas = ["Mindful Chef (Mon–Wed)", "Steak & veg (+ sweet potato)", "Steak wrap", "Stuffed pepper or aubergine with spicy mince", "Lettuce-wrap tacos with mince & veg", "Chicken stir fry", "Baked chicken thighs with veg", "Spaghetti bolognese", "Family meal (Sun)"];

let currentDate = new Date('2025-09-07T11:02:07');
let heatmapDate = new Date('2025-09-07T11:02:07');
let trackingData = {};
let mealIdeas = [];

document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    loadDataFromStorage();
    renderPlan(currentDate);
    setupEventListeners();
}

function setupEventListeners() {
    document.getElementById('prev-day-btn').addEventListener('click', () => { currentDate.setDate(currentDate.getDate() - 1); renderPlan(currentDate); });
    document.getElementById('next-day-btn').addEventListener('click', () => { currentDate.setDate(currentDate.getDate() + 1); renderPlan(currentDate); });
    document.getElementById('plan-container').addEventListener('click', handleTrackingClick);
    document.getElementById('prev-month-btn').
