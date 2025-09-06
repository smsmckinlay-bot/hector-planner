const weeklyPlan = [
    { day: "Sunday", academic: { title: "Lessons & Home Study", details: ["None scheduled for today."] }, exercise: { title: "Exercise", details: ["<strong>Activity:</strong> Rugby Match"] }, nutrition: { title: "Nutrition", details: ["<strong>Breakfast:</strong> Eggs", "<strong>Lunch/Dinner:</strong> Choice of chicken wrap, chicken & rice, sushi, stir fry, etc.", "Sunday is a cheat day, but no potatoes/sweets and only one piece of fruit per day."] } },
    { day: "Monday", academic: { title: "Lessons & Home Study", details: ["<strong>8:30 AM:</strong> Leave for College", "<strong>9:00 AM - 2:25 PM:</strong> Lessons at college", "<strong>6:30 PM - 8:10 PM:</strong> Home studies"] }, exercise: { title: "Exercise", details: ["<strong>Activity:</strong> Rest Day"] }, nutrition: { title: "Nutrition", details: ["<strong>Breakfast:</strong> Protein porridge", "<strong>Lunch:</strong> Protein snack at college", "<strong>Dinner:</strong> Mindful Chef"] } },
    { day: "Tuesday", academic: { title: "Lessons & Home Study", details: ["<strong>10:50 AM:</strong> Leave for College", "<strong>11:20 AM - 4:45 PM:</strong> Lessons at college", "<strong>1:20 PM - 2:20 PM:</strong> 1 hour of home study at college"] }, exercise: { title: "Exercise", details: ["<strong>Activity:</strong> 5km Run", "Complete before or after college."] }, nutrition: { title: "Nutrition", details: ["<strong>Breakfast:</strong> Overnight oats", "<strong>Lunch:</strong> Protein snack + 6-inch sub", "<strong>Dinner:</strong> Mindful Chef"] } },
    { day: "Wednesday", academic: { title: "Lessons & Home Study", details: ["<strong>10:50 AM:</strong> Leave for College", "<strong>11:20 AM - 3:35 PM:</strong> Lessons at college", "<strong>4:20 PM - 5:20 PM:</strong> Home studies"] }, exercise: { title: "Exercise", details: ["<strong>Activity:</strong> Rugby Training", "<strong>6:00 PM:</strong> Session starts."] }, nutrition: { title: "Nutrition", details: ["<strong>Breakfast:</strong> Overnight oats", "<strong>Lunch:</strong> Protein snack + sandwich or wrap", "<strong>Dinner:</strong> Mindful Chef"] } },
    { day: "Thursday", academic: { title: "Lessons & Home Study", details: ["<strong>8:30 AM:</strong> Leave for College", "<strong>9:00 AM - 2:25 PM:</strong> Lessons at college", "<strong>6:30 PM - 7:30 PM:</strong> Home studies"] }, exercise: { title: "Exercise", details: ["<strong>Activity:</strong> Hard Gym Session", "<strong>8:00 PM:</strong> Session starts."] }, nutrition: { title: "Nutrition", details: ["<strong>Breakfast:</strong> Protein porridge", "<strong>Lunch:</strong> Protein snack at college", "<strong>Dinner:</strong> Late lunch at home (steak and veg)"] } },
    { day: "Friday", academic: { title: "Lessons & Self-Study", details: ["<strong>8:30 AM:</strong> Leave for College", "<strong>9:00 AM - 4:45 PM:</strong> Lessons at college", "<strong>11:15 AM - 12:20 PM & 1:20 PM - 2:25 PM:</strong> Self-study at college"] }, exercise: { title: "Exercise", details: ["<strong>Activity:</strong> Weights/Cardio", "Conditioning session after college."] }, nutrition: { title: "Nutrition", details: ["<strong>Breakfast:</strong> Protein porridge", "<strong>Lunch:</strong> Protein snack + 6-inch sub", "<strong>Dinner:</strong> Choice of steak and veg, stuffed pepper, etc."] } },
    { day: "Saturday", academic: { title: "Lessons & Home Study", details: ["None scheduled for today."] }, exercise: { title: "Exercise", details: ["<strong>Activity:</strong> Deload + Run", "Focus on mobility and a light run."] }, nutrition: { title: "Nutrition", details: ["<strong>Breakfast:</strong> Eggs", "<strong>Lunch/Dinner:</strong> Choice of chicken wrap, chicken & rice, sushi, stir fry, etc."] } }
];

let currentDate = new Date('2025-09-06T19:22:38');
let heatmapDate = new Date('2025-09-06T19:22:38');
let trackingData = {};

const dailyPlanView = document.getElementById('daily-plan-view');
const heatmapView = document.getElementById('heatmap-view');
const navPlan = document.getElementById('nav-plan');
const navHeatmap = document.getElementById('nav-heatmap');
const planContainer = document.getElementById('plan-container');
const dateDisplay = document.getElementById('current-date-display');
const prevDayBtn = document.getElementById('prev-day-btn');
const nextDayBtn = document.getElementById('next-day-btn');
const heatmapGrid = document.getElementById('heatmap-grid');
const heatmapMonthDisplay = document.getElementById('heatmap-month-display');
const prevMonthBtn = document.getElementById('prev-month-btn');
const nextMonthBtn = document.getElementById('next-month-btn');

function formatDateForId(date) { const d = new Date(date); let month = '' + (d.getMonth() + 1), day = '' + d.getDate(); const year = d.getFullYear(); if (month.length < 2) month = '0' + month; if (day.length < 2) day = '0' + day; return [year, month, day].join('-'); }
function loadDataFromStorage() { const d = localStorage.getItem('hectorTrackingData'); if (d) trackingData = JSON.parse(d); }
function saveData() { localStorage.setItem('hectorTrackingData', JSON.stringify(trackingData)); }

function renderPlan(date) {
    const dateKey = formatDateForId(date);
    dateDisplay.textContent = date.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const dayPlan = weeklyPlan[date.getDay()];
    planContainer.innerHTML = `${createPlanCard('academic', dayPlan.academic, dateKey)}${createPlanCard('exercise', dayPlan.exercise, dateKey)}${createPlanCard('nutrition', dayPlan.nutrition, dateKey)}`;
}

function createPlanCard(category, data, dateKey) {
    if (!data) return '';
    const currentStatus = trackingData[dateKey]?.[category];
    const detailsHtml = data.details.map(d => `<p class="text-gray-700">${d}</p>`).join('');
    return `<div class="plan-card ${category}"><div class="p-4"><p class="font-bold text-lg text-gray-800">${data.title}</p><div class="mt-2 space-y-1">${detailsHtml}</div><div class="mt-4 pt-4 border-t border-gray-200 flex justify-around"><button data-category="${category}" data-status="met" class="tracking-btn met w-2/5 font-semibold py-2 px-4 rounded-lg bg-gray-200 ${currentStatus === 'met' ? 'selected' : ''}">✓ Met Goal</button><button data-category="${category}" data-status="missed" class="tracking-btn missed w-2/5 font-semibold py-2 px-4 rounded-lg bg-gray-200 ${currentStatus === 'missed' ? 'selected' : ''}">✗ Missed Goal</button></div></div></div>`;
}

function renderHeatmap(date) {
    heatmapMonthDisplay.textContent = date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long' });
    heatmapGrid.innerHTML = '';
    const year = date.getFullYear(), month = date.getMonth();
    const firstDay = new Date(year, month, 1), daysInMonth = new Date(year, month + 1, 0).getDate();
    let startingDay = firstDay.getDay(); if (startingDay === 0) startingDay = 7;
    for (let i = 1; i < startingDay; i++) { heatmapGrid.insertAdjacentHTML('beforeend', '<div></div>'); }
    for (let i = 1; i <= daysInMonth; i++) {
        const dayDate = new Date(year, month, i), dateKey = formatDateForId(dayDate), dayData = trackingData[dateKey];
        let level = 'heatmap-level-0';
        if (dayData) {
            const metCount = Object.values(dayData).filter(s => s === 'met').length;
            const missedCount = Object.values(dayData).filter(s => s === 'missed').length;
            if (missedCount > 0 && metCount === 0) { level = 'heatmap-missed'; }
            else if (metCount > 0) { level = `heatmap-level-${metCount}`; }
        }
        heatmapGrid.insertAdjacentHTML('beforeend', `<div class="heatmap-day ${level}">${i}</div>`);
    }
}

planContainer.addEventListener('click', e => {
    const btn = e.target.closest('.tracking-btn'); if (!btn) return;
    const { category, status } = btn.dataset, dateKey = formatDateForId(currentDate);
    if (!trackingData[dateKey]) trackingData[dateKey] = {};
    trackingData[dateKey][category] = status;
    renderPlan(currentDate);
    saveData();
});

prevDayBtn.addEventListener('click', () => { currentDate.setDate(currentDate.getDate() - 1); renderPlan(currentDate); });
nextDayBtn.addEventListener('click', () => { currentDate.setDate(currentDate.getDate() + 1); renderPlan(currentDate); });
prevMonthBtn.addEventListener('click', () => { heatmapDate.setMonth(heatmapDate.getMonth() - 1); renderHeatmap(heatmapDate); });
nextMonthBtn.addEventListener('click', () => { heatmapDate.setMonth(heatmapDate.getMonth() + 1); renderHeatmap(heatmapDate); });

navPlan.addEventListener('click', () => {
    dailyPlanView.classList.add('active'); heatmapView.classList.remove('active');
    navPlan.classList.add('text-blue-600', 'border-blue-600'); navPlan.classList.remove('text-gray-500', 'border-transparent');
    navHeatmap.classList.add('text-gray-500', 'border-transparent'); navHeatmap.classList.remove('text-blue-600', 'border-blue-600');
});
navHeatmap.addEventListener('click', () => {
    heatmapView.classList.add('active'); dailyPlanView.classList.remove('active');
    navHeatmap.classList.add('text-blue-600', 'border-blue-600'); navHeatmap.classList.remove('text-gray-500', 'border-transparent');
    navPlan.classList.add('text-gray-500', 'border-transparent'); navPlan.classList.remove('text-blue-600', 'border-blue-600');
    heatmapDate = new Date(currentDate);
    renderHeatmap(heatmapDate);
});

function initializeApp() { loadDataFromStorage(); renderPlan(currentDate); }
initializeApp();