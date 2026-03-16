const centralBanks = [
  {
    name: "Federal Reserve",
    country: "United States",
    region: "North America",
    rate: 4.50,
    displayRate: "4.50%",
    rateType: "Federal Funds Rate",
    stance: "Tight",
    note: "Federal Reserve policy is one of the most important drivers of Treasury yields and global financial conditions."
  },
  {
    name: "European Central Bank",
    country: "Euro Area",
    region: "Europe",
    rate: 2.50,
    displayRate: "2.50%",
    rateType: "Deposit Facility Rate",
    stance: "Neutral",
    note: "ECB policy directly influences euro area sovereign bond yields and broader financial conditions."
  },
  {
    name: "Bank of England",
    country: "United Kingdom",
    region: "Europe",
    rate: 4.50,
    displayRate: "4.50%",
    rateType: "Bank Rate",
    stance: "Tight",
    note: "The Bank of England strongly influences gilt yields and UK interest rate expectations."
  },
  {
    name: "Bank of Japan",
    country: "Japan",
    region: "Asia",
    rate: 0.50,
    displayRate: "0.50%",
    rateType: "Policy Rate",
    stance: "Loose",
    note: "Bank of Japan policy remains important for global macro investors because of Japan’s long period of ultra-low rates."
  },
  {
    name: "People's Bank of China",
    country: "China",
    region: "Asia",
    rate: 3.10,
    displayRate: "3.10%",
    rateType: "1Y Policy Benchmark",
    stance: "Loose",
    note: "Chinese monetary policy influences domestic funding conditions and Chinese government bond yields."
  },
  {
    name: "Swiss National Bank",
    country: "Switzerland",
    region: "Europe",
    rate: 0.50,
    displayRate: "0.50%",
    rateType: "SNB Policy Rate",
    stance: "Loose",
    note: "Swiss policy rates matter for safe-haven flows and Swiss sovereign bond markets."
  },
  {
    name: "Bank of Canada",
    country: "Canada",
    region: "North America",
    rate: 3.00,
    displayRate: "3.00%",
    rateType: "Overnight Rate",
    stance: "Neutral",
    note: "The Bank of Canada affects Canadian government bond yields and macro-financial conditions."
  },
  {
    name: "Reserve Bank of Australia",
    country: "Australia",
    region: "Oceania",
    rate: 4.10,
    displayRate: "4.10%",
    rateType: "Cash Rate",
    stance: "Tight",
    note: "The RBA cash rate is a key benchmark for Australian money markets and sovereign yields."
  },
  {
    name: "Reserve Bank of India",
    country: "India",
    region: "Asia",
    rate: 6.50,
    displayRate: "6.50%",
    rateType: "Repo Rate",
    stance: "Tight",
    note: "The RBI repo rate is closely watched in emerging market bond analysis."
  },
  {
    name: "Norges Bank",
    country: "Norway",
    region: "Europe",
    rate: 4.50,
    displayRate: "4.50%",
    rateType: "Policy Rate",
    stance: "Tight",
    note: "Norwegian policy settings are important for Nordic yield comparisons."
  },
  {
    name: "Sveriges Riksbank",
    country: "Sweden",
    region: "Europe",
    rate: 2.25,
    displayRate: "2.25%",
    rateType: "Policy Rate",
    stance: "Neutral",
    note: "The Riksbank provides useful signals for European policy-cycle comparisons."
  },
  {
    name: "Central Bank of Brazil",
    country: "Brazil",
    region: "South America",
    rate: 14.25,
    displayRate: "14.25%",
    rateType: "Selic Rate",
    stance: "Tight",
    note: "Brazil’s Selic rate is one of the most important policy rates in emerging market macro analysis."
  },
  {
    name: "Bank of Mexico",
    country: "Mexico",
    region: "North America",
    rate: 9.50,
    displayRate: "9.50%",
    rateType: "Target Rate",
    stance: "Tight",
    note: "Mexican rates matter for Latin American bond markets and inflation-sensitive macro positioning."
  },
  {
    name: "South African Reserve Bank",
    country: "South Africa",
    region: "Africa",
    rate: 7.50,
    displayRate: "7.50%",
    rateType: "Repo Rate",
    stance: "Tight",
    note: "South Africa’s policy rate is an important benchmark in African sovereign bond analysis."
  },
  {
    name: "Bank Negara Malaysia",
    country: "Malaysia",
    region: "Asia",
    rate: 3.00,
    displayRate: "3.00%",
    rateType: "Overnight Policy Rate",
    stance: "Neutral",
    note: "Malaysia’s policy rate is relevant for regional bond comparisons across Asia."
  },
  {
    name: "Bank Indonesia",
    country: "Indonesia",
    region: "Asia",
    rate: 5.75,
    displayRate: "5.75%",
    rateType: "BI Rate",
    stance: "Tight",
    note: "Bank Indonesia policy influences domestic bond yields and broader EM Asia rate comparisons."
  }
];

const searchInput = document.getElementById("searchInput");
const regionFilter = document.getElementById("regionFilter");
const stanceFilter = document.getElementById("stanceFilter");
const sortSelect = document.getElementById("sortSelect");
const bankGrid = document.getElementById("bankGrid");
const resultsInfo = document.getElementById("resultsInfo");
const emptyState = document.getElementById("emptyState");

const kpiCount = document.getElementById("kpiCount");
const kpiAverage = document.getElementById("kpiAverage");
const kpiHighest = document.getElementById("kpiHighest");
const kpiLowest = document.getElementById("kpiLowest");

function formatPercent(value) {
  return `${value.toFixed(2)}%`;
}

function getUniqueRegions(data) {
  return [...new Set(data.map(item => item.region))].sort((a, b) => a.localeCompare(b));
}

function populateRegionFilter() {
  const regions = getUniqueRegions(centralBanks);
  regions.forEach(region => {
    const option = document.createElement("option");
    option.value = region;
    option.textContent = region;
    regionFilter.appendChild(option);
  });
}

function getStanceClass(stance) {
  if (stance === "Tight") return "stance-tight";
  if (stance === "Neutral") return "stance-neutral";
  if (stance === "Loose") return "stance-loose";
  return "";
}

function updateKPIs(data) {
  if (!data.length) {
    kpiCount.textContent = "0";
    kpiAverage.textContent = "--";
    kpiHighest.textContent = "--";
    kpiLowest.textContent = "--";
    return;
  }

  const rates = data.map(item => item.rate);
  const average = rates.reduce((sum, value) => sum + value, 0) / rates.length;
  const highestItem = [...data].sort((a, b) => b.rate - a.rate)[0];
  const lowestItem = [...data].sort((a, b) => a.rate - b.rate)[0];

  kpiCount.textContent = data.length;
  kpiAverage.textContent = formatPercent(average);
  kpiHighest.textContent = `${highestItem.country} (${formatPercent(highestItem.rate)})`;
  kpiLowest.textContent = `${lowestItem.country} (${formatPercent(lowestItem.rate)})`;
}

function renderBanks(data) {
  bankGrid.innerHTML = "";

  if (!data.length) {
    emptyState.classList.remove("hidden");
    resultsInfo.textContent = "Showing 0 central banks";
    return;
  }

  emptyState.classList.add("hidden");
  resultsInfo.textContent = `Showing ${data.length} central banks`;

  data.forEach(bank => {
    const card = document.createElement("article");
    card.className = "bank-card";

    card.innerHTML = `
      <div class="bank-top">
        <div>
          <h3 class="bank-name">${bank.name}</h3>
          <p class="bank-country">${bank.country} · ${bank.region}</p>
        </div>
        <div class="rate-pill">${bank.displayRate}</div>
      </div>

      <div class="bank-meta">
        <div class="meta-box">
          <span class="meta-label">Rate Type</span>
          <span class="meta-value">${bank.rateType}</span>
        </div>

        <div class="meta-box">
          <span class="meta-label">Policy Stance</span>
          <span class="meta-value">
            <span class="stance-badge ${getStanceClass(bank.stance)}">${bank.stance}</span>
          </span>
        </div>

        <div class="meta-box">
          <span class="meta-label">Region</span>
          <span class="meta-value">${bank.region}</span>
        </div>

        <div class="meta-box">
          <span class="meta-label">Country</span>
          <span class="meta-value">${bank.country}</span>
        </div>
      </div>

      <p class="bank-note">${bank.note}</p>
    `;

    bankGrid.appendChild(card);
  });
}

function applyFiltersAndSort() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedRegion = regionFilter.value;
  const selectedStance = stanceFilter.value;
  const selectedSort = sortSelect.value;

  let filtered = [...centralBanks].filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.country.toLowerCase().includes(query);

    const matchesRegion =
      selectedRegion === "all" || item.region === selectedRegion;

    const matchesStance =
      selectedStance === "all" || item.stance === selectedStance;

    return matchesSearch && matchesRegion && matchesStance;
  });

  switch (selectedSort) {
    case "rate_desc":
      filtered.sort((a, b) => b.rate - a.rate);
      break;
    case "rate_asc":
      filtered.sort((a, b) => a.rate - b.rate);
      break;
    case "name_asc":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "country_asc":
      filtered.sort((a, b) => a.country.localeCompare(b.country));
      break;
    case "region_asc":
      filtered.sort((a, b) => a.region.localeCompare(b.region));
      break;
  }

  updateKPIs(filtered);
  renderBanks(filtered);
}

function init() {
  populateRegionFilter();
  applyFiltersAndSort();

  searchInput.addEventListener("input", applyFiltersAndSort);
  regionFilter.addEventListener("change", applyFiltersAndSort);
  stanceFilter.addEventListener("change", applyFiltersAndSort);
  sortSelect.addEventListener("change", applyFiltersAndSort);
}

document.addEventListener("DOMContentLoaded", init);
