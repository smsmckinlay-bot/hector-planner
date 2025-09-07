// --- DATA ---
const weeklyPlan = [
    // Sunday
    { day: "Sunday", academic: { title: "No College", details: [] }, exercise: { title: "Exercise", details: ["<strong>Activity:</strong> Rugby Match"] }, nutrition: { title: "Nutrition", details: ["<strong>Breakfast:</strong> Eggs", "<strong>Lunch:</strong> Wrap / chicken & rice / sushi / stir fry / jacket potato + cheese (tortellini pre-match ok)", "<strong>Dinner:</strong> Family meal (Cheat day)"] } },
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

let currentDate = new Date('2025-09-07T10:49:59');
let heatmapDate = new Date('2025-09-07T10:49:59');
let trackingData = {};
let mealIdeas = [];

document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    loadDataFromStorage();
    renderPlan(currentDate);
    setupEventListeners();
}

function setupEventListeners() {
    // Daily Plan Nav
    document.getElementById('prev-day-btn').addEventListener('click', () => { currentDate.setDate(currentDate.getDate() - 1); renderPlan(currentDate); });
    document.getElementById('next-day-btn').addEventListener('click', () => { currentDate.setDate(currentDate.getDate() + 1); renderPlan(currentDate); });
    document.getElementById('plan-container').addEventListener('click', handleTrackingClick);

    // Heatmap Nav
    document.getElementById('prev-month-btn').addEventListener('click', () => { heatmapDate.setMonth(heatmapDate.getMonth() - 1); renderHeatmap(heatmapDate); });
    document.getElementById('next-month-btn').addEventListener('click', () => { heatmapDate.setMonth(heatmapDate.getMonth() + 1); renderHeatmap(heatmapDate); });

    // Bottom Nav
    document.getElementById('nav-plan').addEventListener('click', () => switchView('daily-plan-view'));
    document.getElementById('nav-heatmap').addEventListener('click', () => switchView('heatmap-view'));
    document.getElementById('nav-meals').addEventListener('click', () => switchView('meal-ideas-view'));
    
    // Meal Ideas Form
    document.getElementById('add-meal-form').addEventListener('submit', handleAddMeal);
}

function loadDataFromStorage() {
    const savedTrackingData = localStorage.getItem('hectorTrackingData');
    if (savedTrackingData) trackingData = JSON.parse(savedTrackingData);

    const savedMealIdeas = localStorage.getItem('hectorMealIdeas');
    mealIdeas = savedMealIdeas ? JSON.parse(savedMealIdeas) : [...initialMealIdeas];
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function handleTrackingClick(e) {
    const btn = e.target.closest('.tracking-btn');
    if (!btn) return;
    const { category, status } = btn.dataset;
    const dateKey = formatDateForId(currentDate);
    if (!trackingData[dateKey]) trackingData[dateKey] = {};
    trackingData[dateKey][category] = status;
    renderPlan(currentDate);
    saveData('hectorTrackingData', trackingData);
}

function handleAddMeal(e) {
    e.preventDefault();
    const input = document.getElementById('new-meal-input');
    const newMeal = input.value.trim();
    if (newMeal) {
        mealIdeas.push(newMeal);
        saveData('hectorMealIdeas', mealIdeas);
        renderMealIdeas();
        input.value = '';
    }
}

function switchView(viewId) {
    document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');

    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtnId = viewId.replace('-view', '').replace('daily-', '');
    document.getElementById(`nav-${activeBtnId}`).classList.add('active');

    if (viewId === 'heatmap-view') renderHeatmap(heatmapDate);
    if (viewId === 'meal-ideas-view') renderMealIdeas();
}

function renderPlan(date) {
    const dateKey = formatDateForId(date);
    document.getElementById('current-date-display').textContent = date.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const dayPlan = weeklyPlan[date.getDay()];
    document.getElementById('plan-container').innerHTML = `${createPlanCard('academic',dayPlan.academic,dateKey)}${createPlanCard('exercise',dayPlan.exercise,dateKey)}${createPlanCard('nutrition',dayPlan.nutrition,dateKey)}`;
}

function createPlanCard(category, data, dateKey) {
    const currentStatus = trackingData[dateKey]?.[category] || 'none';
    const detailsHtml = data.details.map(d => `<p class="text-gray-700">${d}</p>`).join('');
    return `<div class="plan-card ${category}"><div class="p-4"><p class="font-bold text-lg text-gray-800">${data.title}</p><div class="mt-2 space-y-1">${detailsHtml}</div><div class="mt-4 pt-4 border-t border-gray-200 flex justify-around"><button data-category="${category}" data-status="met" class="tracking-btn met w-2/5 font-semibold py-2 px-4 rounded-lg bg-gray-200 ${currentStatus==='met'?'selected':''}">✓ Met Goal</button><button data-category="${category}" data-status="missed" class="tracking-btn missed w-2/5 font-semibold py-2 px-4 rounded-lg bg-gray-200 ${currentStatus==='missed'?'selected':''}">✗ Missed Goal</button></div></div></div>`;
}

function renderHeatmap(date) {
    document.getElementById('heatmap-month-display').textContent = date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long' });
    const grid = document.getElementById('heatmap-grid');
    grid.innerHTML = '';
    const year = date.getFullYear(), month = date.getMonth();
    const firstDay = new Date(year, month, 1), daysInMonth = new Date(year, month + 1, 0).getDate();
    let startingDay = firstDay.getDay(); if (startingDay === 0) startingDay = 7;
    for (let i = 1; i < startingDay; i++) { grid.insertAdjacentHTML('beforeend', '<div></div>'); }
    for (let i = 1; i <= daysInMonth; i++) {
        const dateKey = formatDateForId(new Date(year, month, i)), dayData = trackingData[dateKey];
        let level = 'heatmap-level-0';
        if (dayData) {
            const metCount = Object.values(dayData).filter(s => s === 'met').length;
            const missedCount = Object.values(dayData).filter(s => s === 'missed').length;
            if (missedCount > 0 && metCount === 0) { level = 'heatmap-missed'; }
            else if (metCount > 0) { level = `heatmap-level-${metCount}`; }
        }
        grid.insertAdjacentHTML('beforeend', `<div class="heatmap-day ${level}">${i}</div>`);
    }
}

function renderMealIdeas() {
    const list = document.getElementById('meal-list');
    list.innerHTML = '';
    mealIdeas.forEach(meal => {
        const li = document.createElement('li');
        li.textContent = meal;
        list.appendChild(li);
    });
}

function formatDateForId(date) {
    return date.toISOString().split('T')[0];
}
