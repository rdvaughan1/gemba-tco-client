const apiBase = "/.netlify/functions";


const form = document.getElementById('vehicleForm');
const groupFilter = document.getElementById('groupFilter');


form.addEventListener('submit', async (e) => {
e.preventDefault();
const body = {
acquisitionCost: parseFloat(document.getElementById('acquisitionCost').value),
upfittingCost: parseFloat(document.getElementById('upfittingCost').value),
annualFuelCost: parseFloat(document.getElementById('annualFuelCost').value),
annualInsuranceCost: parseFloat(document.getElementById('annualInsuranceCost').value),
annualMaintenanceCost: parseFloat(document.getElementById('annualMaintenanceCost').value),
ageInYears: parseFloat(document.getElementById('ageInYears').value),
mileage: parseFloat(document.getElementById('mileage').value),
estimatedResaleValue: parseFloat(document.getElementById('estimatedResaleValue').value),
group: document.getElementById('group').value || 'Ungrouped'
};
await fetch(`${apiBase}/vehiclesCreate`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(body)
});
form.reset();
loadGroupsAndDashboard();
});


async function loadGroupsAndDashboard() {
const res = await fetch(`${apiBase}/analyticsByGroup`);
const data = await res.json();
groupFilter.innerHTML = '<option value="All">All Groups</option>';
data.forEach(g => {
const opt = document.createElement('option');
opt.value = g._id;
opt.textContent = g._id;
groupFilter.appendChild(opt);
});
renderDashboard('All');
}


groupFilter.addEventListener('change', () => renderDashboard(groupFilter.value));


async function renderDashboard(group) {
const url = group === 'All' ? `${apiBase}/analyticsByGroup` : `${apiBase}/analyticsByGroup?group=${group}`;
const res = await fetch(url);
const data = await res.json();
const stats = data[0] || {};
document.getElementById('kpiTotalCostPerYear').textContent = stats.avgCostPerYear ? `$${stats.avgCostPerYear.toFixed(2)}` : '--';
document.getElementById('kpiAvgCostPerMile').textContent = '--';
if (window.groupChart) window.groupChart.destroy();
const ctx = document.getElementById('chartGroupTrend').getContext('2d');
window.groupChart = new Chart(ctx, {
type: 'bar',
data: {
labels: ['Acquisition', 'Upfitting', 'Fuel', 'Insurance', 'Maintenance'],
datasets: [{
label: 'Cost Breakdown',
data: [
stats.totalAcquisition || 0,
stats.totalUpfitting || 0,
stats.totalFuel || 0,
stats.totalInsurance || 0,
stats.totalMaintenance || 0
],
backgroundColor: ['#1778e1', '#31b438', '#ffc107', '#17a2b8', '#dc3545']
}]
}
});
}


loadGroupsAndDashboard();
