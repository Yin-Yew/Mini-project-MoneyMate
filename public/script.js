let transactionsData = [];

let dashboardTransactions = [];

let analyticsTransactions = [];

let currentEditId = null;

let demoMode = false;

let dashboardExpenseChart = null;

let dashboardYearChart = null;

let analyticsCategoryChart = null;

let analyticsTrendChart = null;

let calendarDate = new Date();

let selectedCalendarDate = null;

let modalTransactionType = "expense";

let goals =
JSON.parse(
    localStorage.getItem("goals")
) || [];


const themes = {

    cloud: {

        bg:
        "linear-gradient(135deg,#dbeafe 0%,#f8fafc 45%,#ede9fe 100%)",

        glass:
        "rgba(255,255,255,.58)",

        glassStrong:
        "rgba(255,255,255,.78)",

        border:
        "rgba(255,255,255,.86)",

        text:
        "#172033",

        subtext:
        "#64748b",

        primary:
        "#6366f1",

        surface:
        "rgba(255,255,255,.45)",

        surfaceHover:
        "rgba(255,255,255,.72)",

        input:
        "rgba(255,255,255,.68)",

        optionBg:
        "#ffffff",

        optionText:
        "#172033",

        shadow:
        "rgba(71,85,105,.18)",

        grid:
        "rgba(71,85,105,.12)"

    },


    midnight: {

        bg:
        "linear-gradient(135deg,#020617 0%,#071426 48%,#10244c 100%)",

        glass:
        "rgba(10,22,45,.48)",

        glassStrong:
        "rgba(14,30,58,.74)",

        border:
        "rgba(148,163,184,.18)",

        text:
        "#f8fafc",

        subtext:
        "#94a3b8",

        primary:
        "#60a5fa",

        surface:
        "rgba(255,255,255,.07)",

        surfaceHover:
        "rgba(96,165,250,.14)",

        input:
        "rgba(15,23,42,.50)",

        optionBg:
        "#0f172a",

        optionText:
        "#f8fafc",

        shadow:
        "rgba(0,0,0,.42)",

        grid:
        "rgba(148,163,184,.10)"

    },


    forest: {

        bg:
        "linear-gradient(135deg,#001a13 0%,#063126 48%,#0a4632 100%)",

        glass:
        "rgba(8,36,29,.50)",

        glassStrong:
        "rgba(7,45,35,.78)",

        border:
        "rgba(209,250,229,.22)",

        text:
        "#F7FFF9",

        subtext:
        "#D1FAE5",

        primary:
        "#5EE7A1",

        surface:
        "rgba(0,0,0,.12)",

        surfaceHover:
        "rgba(94,231,161,.13)",

        input:
        "rgba(2,24,20,.58)",

        optionBg:
        "#032c22",

        optionText:
        "#F7FFF9",

        shadow:
        "rgba(0,0,0,.46)",

        grid:
        "rgba(209,250,229,.12)"

    },


    lavender: {

        bg:
        "linear-gradient(135deg,#28113f 0%,#56265f 46%,#9d416d 100%)",

        glass:
        "rgba(70,32,82,.42)",

        glassStrong:
        "rgba(91,42,101,.74)",

        border:
        "rgba(251,207,232,.20)",

        text:
        "#fff7fc",

        subtext:
        "#f5d0fe",

        primary:
        "#f0abfc",

        surface:
        "rgba(255,255,255,.08)",

        surfaceHover:
        "rgba(240,171,252,.15)",

        input:
        "rgba(66,29,78,.48)",

        optionBg:
        "#3b1746",

        optionText:
        "#fff7fc",

        shadow:
        "rgba(31,8,37,.42)",

        grid:
        "rgba(251,207,232,.10)"

    }

};


const demoTransactions = [

    {
        id: 1,
        title: "Salary",
        amount: 30000,
        category: "Salary",
        type: "income",
        date: "2026-01-01"
    },

    {
        id: 2,
        title: "Groceries",
        amount: 2800,
        category: "Food",
        type: "expense",
        date: "2026-01-10"
    },

    {
        id: 3,
        title: "Salary",
        amount: 32000,
        category: "Salary",
        type: "income",
        date: "2026-02-01"
    },

    {
        id: 4,
        title: "Shopping",
        amount: 4200,
        category: "Shopping",
        type: "expense",
        date: "2026-02-18"
    },

    {
        id: 5,
        title: "Salary",
        amount: 33000,
        category: "Salary",
        type: "income",
        date: "2026-03-01"
    },

    {
        id: 6,
        title: "Internet",
        amount: 699,
        category: "Bills",
        type: "expense",
        date: "2026-03-10"
    },

    {
        id: 7,
        title: "Salary",
        amount: 35000,
        category: "Salary",
        type: "income",
        date: "2026-04-01"
    },

    {
        id: 8,
        title: "Concert",
        amount: 3500,
        category: "Entertainment",
        type: "expense",
        date: "2026-04-22"
    },

    {
        id: 9,
        title: "Salary",
        amount: 35000,
        category: "Salary",
        type: "income",
        date: "2026-09-01"
    },

    {
        id: 10,
        title: "Internet",
        amount: 699,
        category: "Bills",
        type: "expense",
        date: "2026-09-10"
    },

    {
        id: 11,
        title: "Shopping",
        amount: 1250,
        category: "Shopping",
        type: "expense",
        date: "2026-09-15"
    },

    {
        id: 12,
        title: "Taxi",
        amount: 240,
        category: "Transport",
        type: "expense",
        date: "2026-09-20"
    },

    {
        id: 13,
        title: "Coffee",
        amount: 80,
        category: "Food",
        type: "expense",
        date: "2026-09-24"
    },

    {
        id: 14,
        title: "Dinner",
        amount: 720,
        category: "Food",
        type: "expense",
        date: "2026-09-24"
    }

];


function changeTheme(themeName) {

    const theme =
    themes[themeName];


    if (!theme) {
        return;
    }


    const root =
    document.documentElement;


    root.style.setProperty(
        "--bg",
        theme.bg
    );


    root.style.setProperty(
        "--glass",
        theme.glass
    );


    root.style.setProperty(
        "--glass-strong",
        theme.glassStrong
    );


    root.style.setProperty(
        "--glass-border",
        theme.border
    );


    root.style.setProperty(
        "--text",
        theme.text
    );


    root.style.setProperty(
        "--subtext",
        theme.subtext
    );


    root.style.setProperty(
        "--primary",
        theme.primary
    );


    root.style.setProperty(
        "--surface",
        theme.surface
    );


    root.style.setProperty(
        "--surface-hover",
        theme.surfaceHover
    );


    root.style.setProperty(
        "--input-bg",
        theme.input
    );


    root.style.setProperty(
        "--option-bg",
        theme.optionBg
    );


    root.style.setProperty(
        "--option-text",
        theme.optionText
    );


    root.style.setProperty(
        "--shadow",
        theme.shadow
    );


    root.style.setProperty(
        "--chart-grid",
        theme.grid
    );


    document.body.dataset.theme =
    themeName;


    localStorage.setItem(
        "theme",
        themeName
    );


    if (
        typeof Chart !== "undefined"
    ) {

        setTimeout(
            () => {

                if (
                    document.getElementById(
                        "expenseChart"
                    )
                ) {

                    createDashboardCharts(
                        dashboardTransactions
                    );

                }


                if (
                    document.getElementById(
                        "categoryChart"
                    )
                ) {

                    createAnalyticsCharts(
                        analyticsTransactions
                    );

                }

            },
            50
        );

    }

}


function escapeHTML(value) {

    return String(value)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

}


function formatMoney(value) {

    return Number(value)
    .toLocaleString(
        "en-US",
        {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }
    );

}


function formatTransactionDate(value) {

    if (!value) {
        return "";
    }


    const date =
    new Date(
        `${value}T00:00:00`
    );


    return date.toLocaleDateString(
        "en-US",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


function getCategoryIcon(category) {

    const icons = {

        Food:
        "ph-duotone ph-fork-knife",

        Transport:
        "ph-duotone ph-car",

        Shopping:
        "ph-duotone ph-shopping-bag",

        Bills:
        "ph-duotone ph-receipt",

        Entertainment:
        "ph-duotone ph-game-controller",

        Salary:
        "ph-duotone ph-briefcase",

        Other:
        "ph-duotone ph-wallet"

    };


    return (
        icons[category] ||
        "ph-duotone ph-wallet"
    );

}


function getDemoTransactions() {

    const saved =
    localStorage.getItem(
        "moneyMateDemoTransactions"
    );


    if (saved) {

        try {

            return JSON.parse(saved);

        } catch (error) {

            console.log(
                "Unable to read demo transactions"
            );

        }

    }


    localStorage.setItem(
        "moneyMateDemoTransactions",
        JSON.stringify(
            demoTransactions
        )
    );


    return [
        ...demoTransactions
    ];

}


function saveDemoTransactions() {

    localStorage.setItem(
        "moneyMateDemoTransactions",
        JSON.stringify(
            transactionsData
        )
    );

}


async function fetchTransactions() {

    try {

        const response =
        await fetch(
            "/api/transactions"
        );


        if (!response.ok) {

            throw new Error(
                "API unavailable"
            );

        }


        const data =
        await response.json();


        return {
            data,
            demo: false
        };


    } catch (error) {

        return {

            data:
            getDemoTransactions(),

            demo: true

        };

    }

}


function calculateSummary(data) {

    const income =
    data
    .filter(
        item =>
        item.type === "income"
    )
    .reduce(
        (sum,item) =>
        sum + Number(item.amount),
        0
    );


    const expense =
    data
    .filter(
        item =>
        item.type === "expense"
    )
    .reduce(
        (sum,item) =>
        sum + Number(item.amount),
        0
    );


    const balance =
    income - expense;


    const savingRate =
    income > 0
    ? Math.max(
        0,
        Math.round(
            (
                balance /
                income
            ) * 100
        )
    )
    : 0;


    return {
        income,
        expense,
        balance,
        savingRate
    };

}


async function loadDashboard() {

    const balanceElement =
    document.getElementById(
        "dashboardBalance"
    );


    if (!balanceElement) {
        return;
    }


    const result =
    await fetchTransactions();


    dashboardTransactions =
    result.data;


    const summary =
    calculateSummary(
        dashboardTransactions
    );


    document.getElementById(
        "dashboardBalance"
    ).textContent =
    `฿${formatMoney(summary.balance)}`;


    document.getElementById(
        "dashboardIncome"
    ).textContent =
    `฿${formatMoney(summary.income)}`;


    document.getElementById(
        "dashboardExpense"
    ).textContent =
    `฿${formatMoney(summary.expense)}`;


    document.getElementById(
        "dashboardSavingRate"
    ).textContent =
    `${summary.savingRate}%`;


    renderDashboardRecent(
        dashboardTransactions
    );


    createDashboardCharts(
        dashboardTransactions
    );

}


function renderDashboardRecent(data) {

    const container =
    document.getElementById(
        "dashboardRecentTransactions"
    );


    if (!container) {
        return;
    }


    const sorted =
    [...data]
    .sort(
        (a,b) =>
        new Date(b.date) -
        new Date(a.date)
    )
    .slice(0,5);


    if (!sorted.length) {

        container.innerHTML = `

        <div class="empty-state">

            <i class="ph-duotone ph-receipt"></i>

            <p>No transactions yet</p>

        </div>

        `;

        return;

    }


    container.innerHTML =
    sorted.map(
        item => {

            const sign =
            item.type === "income"
            ? "+"
            : "-";


            return `

            <div class="transaction-item">

                <div class="transaction-icon">

                    <i class="${getCategoryIcon(item.category)}"></i>

                </div>


                <div class="transaction-info">

                    <b>
                        ${escapeHTML(item.title)}
                    </b>

                    <p>
                        ${escapeHTML(item.category)}
                        <span>•</span>
                        ${formatTransactionDate(item.date)}
                    </p>

                </div>


                <strong class="${item.type}">

                    ${sign}฿${formatMoney(item.amount)}

                </strong>

            </div>

            `;

        }
    ).join("");

}


function getChartTheme() {

    const styles =
    getComputedStyle(
        document.documentElement
    );


    return {

        text:
        styles
        .getPropertyValue(
            "--text"
        )
        .trim(),

        subtext:
        styles
        .getPropertyValue(
            "--subtext"
        )
        .trim(),

        primary:
        styles
        .getPropertyValue(
            "--primary"
        )
        .trim(),

        grid:
        styles
        .getPropertyValue(
            "--chart-grid"
        )
        .trim()

    };

}


const donutCenterPlugin = {

    id: "donutCenter",


    afterDraw(chart) {

        if (
            chart.config.type !==
            "doughnut"
        ) {

            return;

        }


        const meta =
        chart.getDatasetMeta(0);


        if (!meta.data.length) {
            return;
        }


        const theme =
        getChartTheme();


        const total =
        chart.data.datasets[0].data
        .reduce(
            (sum,value) =>
            sum + Number(value),
            0
        );


        const centerX =
        meta.data[0].x;


        const centerY =
        meta.data[0].y;


        const ctx =
        chart.ctx;


        ctx.save();


        ctx.textAlign =
        "center";


        ctx.textBaseline =
        "middle";


        ctx.fillStyle =
        theme.subtext;


        ctx.font =
        "600 11px Inter, sans-serif";


        ctx.fillText(
            "TOTAL",
            centerX,
            centerY - 16
        );


        ctx.fillStyle =
        theme.text;


        ctx.font =
        "700 21px Inter, sans-serif";


        ctx.fillText(
            `฿${formatMoney(total)}`,
            centerX,
            centerY + 8
        );


        ctx.restore();

    }

};


function getExpenseCategories(data) {

    const totals = {};


    data
    .filter(
        item =>
        item.type === "expense"
    )
    .forEach(
        item => {

            totals[item.category] =
            (
                totals[item.category] ||
                0
            ) +
            Number(item.amount);

        }
    );


    return totals;

}


function createDashboardCharts(data = []) {

    if (
        typeof Chart ===
        "undefined"
    ) {

        return;

    }


    const expenseCanvas =
    document.getElementById(
        "expenseChart"
    );


    const yearCanvas =
    document.getElementById(
        "yearChart"
    );


    const theme =
    getChartTheme();


    const currentTheme =
    document.body.dataset.theme;


    let incomeChartColor =
    "#34D399";


    let expenseChartColor =
    theme.primary;


    if (
        currentTheme ===
        "forest"
    ) {

        incomeChartColor =
        "#86EFAC";

        expenseChartColor =
        "#FDA4AF";

    }


    if (
        currentTheme ===
        "cloud"
    ) {

        incomeChartColor =
        "#10B981";

        expenseChartColor =
        "#6366F1";

    }


    if (
        currentTheme ===
        "midnight"
    ) {

        incomeChartColor =
        "#34D399";

        expenseChartColor =
        "#60A5FA";

    }


    if (
        currentTheme ===
        "lavender"
    ) {

        incomeChartColor =
        "#6EE7B7";

        expenseChartColor =
        "#F9A8D4";

    }


    const categoryTotals =
    getExpenseCategories(
        data
    );


    const labels =
    Object.keys(
        categoryTotals
    );


    const values =
    Object.values(
        categoryTotals
    );


    const chartColors = [

        "#8B5CF6",
        "#F472B6",
        "#38BDF8",
        "#34D399",
        "#FBBF24",
        "#FB7185",
        "#A3E635"

    ];


    if (expenseCanvas) {

        if (dashboardExpenseChart) {

            dashboardExpenseChart.destroy();

        }


        dashboardExpenseChart =
        new Chart(
            expenseCanvas,
            {

                type:
                "doughnut",

                plugins: [
                    donutCenterPlugin
                ],

                data: {

                    labels,

                    datasets: [
                        {

                            data:
                            values,

                            backgroundColor:
                            chartColors,

                            borderWidth:
                            0,

                            hoverOffset:
                            7,

                            spacing:
                            3,

                            borderRadius:
                            8

                        }
                    ]

                },


                options: {

                    responsive:
                    true,

                    maintainAspectRatio:
                    false,

                    cutout:
                    "73%",

                    plugins: {

                        legend: {
                            display: false
                        },

                        tooltip: {

                            padding:
                            13,

                            cornerRadius:
                            12,

                            backgroundColor:
                            "rgba(15,23,42,.92)",

                            titleColor:
                            "#fff",

                            bodyColor:
                            "#e2e8f0",

                            callbacks: {

                                label(context) {

                                    return (
                                        " " +
                                        context.label +
                                        ": ฿" +
                                        formatMoney(
                                            context.raw
                                        )
                                    );

                                }

                            }

                        }

                    }

                }

            }
        );


        renderExpenseLegend(
            labels,
            values,
            chartColors
        );

    }


    if (yearCanvas) {

        if (dashboardYearChart) {

            dashboardYearChart.destroy();

        }


        const incomeMonthly =
        new Array(12).fill(0);


        const expenseMonthly =
        new Array(12).fill(0);


        data.forEach(
            item => {

                const date =
                new Date(
                    `${item.date}T00:00:00`
                );


                const month =
                date.getMonth();


                if (
                    item.type ===
                    "income"
                ) {

                    incomeMonthly[month] +=
                    Number(item.amount);

                } else {

                    expenseMonthly[month] +=
                    Number(item.amount);

                }

            }
        );


        dashboardYearChart =
        new Chart(
            yearCanvas,
            {

                type:
                "bar",

                data: {

                    labels: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec"
                    ],

                    datasets: [

                        {

                            label:
                            "Income",

                            data:
                            incomeMonthly,

                            backgroundColor:
                            incomeChartColor,

                            borderRadius:
                            9,

                            borderSkipped:
                            false

                        },

                        {

                            label:
                            "Expense",

                            data:
                            expenseMonthly,

                            backgroundColor:
                            expenseChartColor,

                            borderRadius:
                            9,

                            borderSkipped:
                            false

                        }

                    ]

                },


                options: {

                    responsive:
                    true,

                    maintainAspectRatio:
                    false,

                    interaction: {
                        mode: "index",
                        intersect: false
                    },

                    plugins: {

                        legend: {

                            position:
                            "top",

                            align:
                            "end",

                            labels: {

                                color:
                                theme.text,

                                usePointStyle:
                                true,

                                pointStyle:
                                "circle",

                                padding:
                                18,

                                boxWidth:
                                9,

                                boxHeight:
                                9,

                                font: {

                                    size:
                                    13,

                                    weight:
                                    "600"

                                }

                            }

                        }

                    },


                    scales: {

                        x: {

                            border: {
                                display: false
                            },

                            grid: {
                                display: false
                            },

                            ticks: {

                                color:
                                theme.text,

                                font: {
                                    weight:
                                    "500"
                                }

                            }

                        },


                        y: {

                            beginAtZero:
                            true,

                            border: {
                                display: false
                            },

                            grid: {
                                color:
                                theme.grid
                            },

                            ticks: {

                                color:
                                theme.text,

                                font: {
                                    weight:
                                    "500"
                                },

                                callback(value) {

                                    if (
                                        value >=
                                        1000
                                    ) {

                                        return (
                                            "฿" +
                                            value /
                                            1000 +
                                            "k"
                                        );

                                    }


                                    return value;

                                }

                            }

                        }

                    }

                }

            }
        );

    }

}


function renderExpenseLegend(
    labels,
    values,
    colors
) {

    const canvas =
    document.getElementById(
        "expenseChart"
    );


    if (!canvas) {
        return;
    }


    const card =
    canvas.closest(
        ".chart"
    );


    let legend =
    card.querySelector(
        ".expense-legend"
    );


    if (!legend) {

        legend =
        document.createElement(
            "div"
        );


        legend.className =
        "expense-legend";


        card.appendChild(
            legend
        );

    }


    legend.innerHTML =
    labels.map(
        (label,index) => `

        <div class="expense-legend-item">

            <div class="expense-legend-name">

                <span
                class="legend-dot"
                style="background:${colors[index % colors.length]}">
                </span>

                ${escapeHTML(label)}

            </div>

            <strong>
                ฿${formatMoney(values[index])}
            </strong>

        </div>

        `
    ).join("");

}


async function loadTransactions() {

    const list =
    document.getElementById(
        "transaction-list"
    );


    if (!list) {
        return;
    }


    const result =
    await fetchTransactions();


    transactionsData =
    result.data;


    demoMode =
    result.demo;


    renderTransactions(
        transactionsData
    );


    updateTransactionSummary();

}


function renderTransactions(data) {

    const list =
    document.getElementById(
        "transaction-list"
    );


    if (!list) {
        return;
    }


    if (!data.length) {

        list.innerHTML = `

        <div class="empty-state">

            <i class="ph-duotone ph-receipt"></i>

            <h3>No transactions found</h3>

            <p>
            Try another search or add a new transaction.
            </p>

        </div>

        `;

        return;

    }


    const sorted =
    [...data]
    .sort(
        (a,b) =>
        new Date(b.date) -
        new Date(a.date)
    );


    list.innerHTML =
    sorted.map(
        item => {

            const amountClass =
            item.type ===
            "income"
            ? "income"
            : "expense";


            const sign =
            item.type ===
            "income"
            ? "+"
            : "-";


            return `

            <div class="transaction-row">

                <div class="category-icon">

                    <i class="${getCategoryIcon(item.category)}"></i>

                </div>


                <div class="transaction-main">

                    <b>
                        ${escapeHTML(item.title)}
                    </b>

                    <p>

                        ${escapeHTML(item.category)}

                        <span>•</span>

                        ${formatTransactionDate(item.date)}

                    </p>

                </div>


                <strong
                class="transaction-amount ${amountClass}">

                    ${sign}฿${formatMoney(item.amount)}

                </strong>


                <div class="transaction-actions">

                    <button
                    class="edit-action"
                    onclick="openEdit(${item.id})"
                    aria-label="Edit transaction">

                        <i class="ph-duotone ph-pencil-simple"></i>

                    </button>


                    <button
                    class="delete-action"
                    onclick="deleteTransaction(${item.id})"
                    aria-label="Delete transaction">

                        <i class="ph-duotone ph-trash"></i>

                    </button>

                </div>

            </div>

            `;

        }
    ).join("");

}


function updateTransactionSummary() {

    const incomeElement =
    document.getElementById(
        "transactionIncome"
    );


    if (!incomeElement) {
        return;
    }


    const summary =
    calculateSummary(
        transactionsData
    );


    incomeElement.textContent =
    `฿${formatMoney(summary.income)}`;


    document.getElementById(
        "transactionExpense"
    ).textContent =
    `฿${formatMoney(summary.expense)}`;


    document.getElementById(
        "transactionBalance"
    ).textContent =
    `฿${formatMoney(summary.balance)}`;

}


function filterLocal() {

    const search =
    document.getElementById(
        "searchInput"
    );


    const typeSelect =
    document.getElementById(
        "filterType"
    );


    if (
        !search ||
        !typeSelect
    ) {

        return;

    }


    const keyword =
    search.value
    .trim()
    .toLowerCase();


    const type =
    typeSelect.value;


    const filtered =
    transactionsData.filter(
        item => {

            const searchable =
            `${item.title} ${item.category}`
            .toLowerCase();


            return (
                searchable.includes(
                    keyword
                ) &&
                (
                    !type ||
                    item.type === type
                )
            );

        }
    );


    renderTransactions(
        filtered
    );

}


async function addTransaction() {

    const transaction = {

        title:
        document
        .getElementById(
            "title"
        )
        .value
        .trim(),

        amount:
        Number(
            document
            .getElementById(
                "amount"
            )
            .value
        ),

        category:
        document
        .getElementById(
            "category"
        )
        .value,

        type:
        document
        .getElementById(
            "type"
        )
        .value,

        date:
        document
        .getElementById(
            "date"
        )
        .value

    };


    if (
        !transaction.title ||
        transaction.amount <= 0 ||
        !transaction.date
    ) {

        showToast(
            "Please complete all fields",
            false
        );

        return;

    }


    if (demoMode) {

        transaction.id =
        Date.now();


        transactionsData.unshift(
            transaction
        );


        saveDemoTransactions();


        renderTransactions(
            transactionsData
        );


        updateTransactionSummary();


        resetTransactionForm();


        showToast(
            "Transaction added"
        );


        return;

    }


    try {

        const response =
        await fetch(
            "/api/transactions",
            {

                method:
                "POST",

                headers: {

                    "Content-Type":
                    "application/json"

                },

                body:
                JSON.stringify(
                    transaction
                )

            }
        );


        if (!response.ok) {

            throw new Error();

        }


        resetTransactionForm();


        await loadTransactions();


        showToast(
            "Transaction added"
        );


    } catch (error) {

        showToast(
            "Unable to add transaction",
            false
        );

    }

}


function resetTransactionForm() {

    document.getElementById(
        "title"
    ).value = "";


    document.getElementById(
        "amount"
    ).value = "";


    document.getElementById(
        "category"
    ).value =
    "Food";


    document.getElementById(
        "type"
    ).value =
    "expense";


    document.getElementById(
        "date"
    ).value =
    getTodayString();

}


async function deleteTransaction(id) {

    const item =
    transactionsData.find(
        transaction =>
        Number(transaction.id) ===
        Number(id)
    );


    if (!item) {
        return;
    }


    if (
        !window.confirm(
            `Delete "${item.title}"?`
        )
    ) {

        return;

    }


    if (demoMode) {

        transactionsData =
        transactionsData.filter(
            transaction =>
            Number(transaction.id) !==
            Number(id)
        );


        saveDemoTransactions();


        renderTransactions(
            transactionsData
        );


        updateTransactionSummary();


        showToast(
            "Transaction deleted"
        );


        return;

    }


    try {

        const response =
        await fetch(
            `/api/transactions/${id}`,
            {
                method:
                "DELETE"
            }
        );


        if (!response.ok) {
            throw new Error();
        }


        await loadTransactions();


        showToast(
            "Transaction deleted"
        );


    } catch (error) {

        showToast(
            "Unable to delete transaction",
            false
        );

    }

}


function openEdit(id) {

    const item =
    transactionsData.find(
        transaction =>
        Number(transaction.id) ===
        Number(id)
    );


    if (!item) {
        return;
    }


    currentEditId =
    item.id;


    document.getElementById(
        "editTitle"
    ).value =
    item.title;


    document.getElementById(
        "editAmount"
    ).value =
    item.amount;


    document.getElementById(
        "editCategory"
    ).value =
    item.category;


    document.getElementById(
        "editType"
    ).value =
    item.type;


    document.getElementById(
        "editDate"
    ).value =
    item.date;


    document.getElementById(
        "editModal"
    ).style.display =
    "flex";

}


function closeEdit() {

    const modal =
    document.getElementById(
        "editModal"
    );


    if (modal) {

        modal.style.display =
        "none";

    }

}


async function updateTransaction() {

    if (
        currentEditId === null
    ) {

        return;

    }


    const updated = {

        title:
        document
        .getElementById(
            "editTitle"
        )
        .value
        .trim(),

        amount:
        Number(
            document
            .getElementById(
                "editAmount"
            )
            .value
        ),

        category:
        document
        .getElementById(
            "editCategory"
        )
        .value,

        type:
        document
        .getElementById(
            "editType"
        )
        .value,

        date:
        document
        .getElementById(
            "editDate"
        )
        .value

    };


    if (
        !updated.title ||
        updated.amount <= 0 ||
        !updated.date
    ) {

        showToast(
            "Please complete all fields",
            false
        );

        return;

    }


    if (demoMode) {

        const index =
        transactionsData.findIndex(
            item =>
            Number(item.id) ===
            Number(currentEditId)
        );


        if (index !== -1) {

            transactionsData[index] = {

                ...transactionsData[index],

                ...updated

            };

        }


        saveDemoTransactions();


        closeEdit();


        renderTransactions(
            transactionsData
        );


        updateTransactionSummary();


        showToast(
            "Transaction updated"
        );


        return;

    }


    try {

        const response =
        await fetch(
            `/api/transactions/${currentEditId}`,
            {

                method:
                "PATCH",

                headers: {

                    "Content-Type":
                    "application/json"

                },

                body:
                JSON.stringify(
                    updated
                )

            }
        );


        if (!response.ok) {
            throw new Error();
        }


        closeEdit();


        await loadTransactions();


        showToast(
            "Transaction updated"
        );


    } catch (error) {

        showToast(
            "Unable to update transaction",
            false
        );

    }

}


function scrollToAddTransaction() {

    const section =
    document.getElementById(
        "addTransactionSection"
    );


    if (!section) {
        return;
    }


    section.scrollIntoView({
        behavior:
        "smooth",

        block:
        "center"
    });


    setTimeout(
        () => {

            const title =
            document.getElementById(
                "title"
            );


            if (title) {
                title.focus();
            }

        },
        450
    );

}


function openAddModal() {

    const modal =
    document.getElementById(
        "addModal"
    );


    if (!modal) {
        return;
    }


    modal.style.display =
    "flex";


    const dateInput =
    document.getElementById(
        "modalDate"
    );


    if (
        dateInput &&
        !dateInput.value
    ) {

        dateInput.value =
        getTodayString();

    }

}


function closeAddModal() {

    const modal =
    document.getElementById(
        "addModal"
    );


    if (modal) {

        modal.style.display =
        "none";

    }

}


function setTransactionType(type) {

    modalTransactionType =
    type;


    const expenseButton =
    document.getElementById(
        "expenseTypeButton"
    );


    const incomeButton =
    document.getElementById(
        "incomeTypeButton"
    );


    if (
        !expenseButton ||
        !incomeButton
    ) {

        return;

    }


    expenseButton.classList.toggle(
        "active",
        type === "expense"
    );


    incomeButton.classList.toggle(
        "active",
        type === "income"
    );

}


async function saveModalTransaction() {

    const transaction = {

        title:
        document
        .getElementById(
            "modalTitle"
        )
        .value
        .trim(),

        amount:
        Number(
            document
            .getElementById(
                "modalAmount"
            )
            .value
        ),

        category:
        document
        .getElementById(
            "modalCategory"
        )
        .value,

        type:
        modalTransactionType,

        date:
        document
        .getElementById(
            "modalDate"
        )
        .value

    };


    if (
        !transaction.title ||
        transaction.amount <= 0 ||
        !transaction.date
    ) {

        showToast(
            "Please complete all fields",
            false
        );

        return;

    }


    try {

        const response =
        await fetch(
            "/api/transactions",
            {

                method:
                "POST",

                headers: {

                    "Content-Type":
                    "application/json"

                },

                body:
                JSON.stringify(
                    transaction
                )

            }
        );


        if (!response.ok) {
            throw new Error();
        }


    } catch (error) {

        const demo =
        getDemoTransactions();


        demo.unshift({
            ...transaction,
            id: Date.now()
        });


        localStorage.setItem(
            "moneyMateDemoTransactions",
            JSON.stringify(
                demo
            )
        );

    }


    closeAddModal();


    clearAddModal();


    showToast(
        "Transaction added"
    );


    await loadDashboard();

}


function clearAddModal() {

    const title =
    document.getElementById(
        "modalTitle"
    );


    if (!title) {
        return;
    }


    title.value = "";


    document.getElementById(
        "modalAmount"
    ).value = "";


    document.getElementById(
        "modalCategory"
    ).value =
    "Food";


    document.getElementById(
        "modalDate"
    ).value =
    getTodayString();


    setTransactionType(
        "expense"
    );

}


async function loadAnalytics() {

    const canvas =
    document.getElementById(
        "categoryChart"
    );


    if (!canvas) {
        return;
    }


    const result =
    await fetchTransactions();


    analyticsTransactions =
    result.data;


    const summary =
    calculateSummary(
        analyticsTransactions
    );


    document.getElementById(
        "analyticsExpense"
    ).textContent =
    `฿${formatMoney(summary.expense)}`;


    document.getElementById(
        "analyticsSaving"
    ).textContent =
    `${summary.savingRate}%`;


    const expenseItems =
    analyticsTransactions.filter(
        item =>
        item.type === "expense"
    );


    const average =
    expenseItems.length
    ? summary.expense /
      expenseItems.length
    : 0;


    document.getElementById(
        "analyticsAverage"
    ).textContent =
    `฿${formatMoney(average)}`;


    const categoryTotals =
    getExpenseCategories(
        analyticsTransactions
    );


    const highestCategory =
    Object.entries(
        categoryTotals
    )
    .sort(
        (a,b) =>
        b[1] - a[1]
    )[0];


    document.getElementById(
        "analyticsInsight"
    ).textContent =
    highestCategory
    ? `${highestCategory[0]} is currently your highest spending category at ฿${formatMoney(highestCategory[1])}.`
    : "Add expense transactions to see your spending insight.";


    createAnalyticsCharts(
        analyticsTransactions
    );

}


function createAnalyticsCharts(
    data = []
) {

    if (
        typeof Chart ===
        "undefined"
    ) {

        return;

    }


    const categoryCanvas =
    document.getElementById(
        "categoryChart"
    );


    const trendCanvas =
    document.getElementById(
        "trendChart"
    );


    if (
        !categoryCanvas &&
        !trendCanvas
    ) {

        return;

    }


    const theme =
    getChartTheme();


    const categories =
    getExpenseCategories(
        data
    );


    const labels =
    Object.keys(
        categories
    );


    const values =
    Object.values(
        categories
    );


    const colors = [

        "#8B5CF6",
        "#F472B6",
        "#38BDF8",
        "#34D399",
        "#FBBF24",
        "#FB7185",
        "#A3E635"

    ];


    if (categoryCanvas) {

        if (
            analyticsCategoryChart
        ) {

            analyticsCategoryChart.destroy();

        }


        analyticsCategoryChart =
        new Chart(
            categoryCanvas,
            {

                type:
                "doughnut",

                plugins: [
                    donutCenterPlugin
                ],

                data: {

                    labels,

                    datasets: [
                        {

                            data:
                            values,

                            backgroundColor:
                            colors,

                            borderWidth:
                            0,

                            spacing:
                            3,

                            borderRadius:
                            8

                        }
                    ]

                },


                options: {

                    maintainAspectRatio:
                    false,

                    cutout:
                    "72%",

                    plugins: {

                        legend: {

                            position:
                            "bottom",

                            labels: {

                                color:
                                theme.text,

                                usePointStyle:
                                true,

                                padding:
                                15,

                                font: {
                                    weight:
                                    "600"
                                }

                            }

                        }

                    }

                }

            }
        );

    }


    if (trendCanvas) {

        if (
            analyticsTrendChart
        ) {

            analyticsTrendChart.destroy();

        }


        const monthly =
        new Array(12).fill(0);


        data
        .filter(
            item =>
            item.type === "expense"
        )
        .forEach(
            item => {

                const date =
                new Date(
                    `${item.date}T00:00:00`
                );


                monthly[
                    date.getMonth()
                ] +=
                Number(item.amount);

            }
        );


        analyticsTrendChart =
        new Chart(
            trendCanvas,
            {

                type:
                "line",

                data: {

                    labels: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec"
                    ],

                    datasets: [
                        {

                            label:
                            "Expense",

                            data:
                            monthly,

                            borderColor:
                            theme.primary,

                            backgroundColor:
                            colorToRGBA(
                                theme.primary,
                                .15
                            ),

                            fill:
                            true,

                            tension:
                            .38,

                            borderWidth:
                            3,

                            pointRadius:
                            3,

                            pointHoverRadius:
                            6

                        }
                    ]

                },


                options: {

                    maintainAspectRatio:
                    false,

                    plugins: {

                        legend: {

                            labels: {
                                color:
                                theme.text
                            }

                        }

                    },


                    scales: {

                        x: {

                            border: {
                                display: false
                            },

                            grid: {
                                display: false
                            },

                            ticks: {
                                color:
                                theme.text
                            }

                        },


                        y: {

                            beginAtZero:
                            true,

                            border: {
                                display: false
                            },

                            grid: {
                                color:
                                theme.grid
                            },

                            ticks: {
                                color:
                                theme.text
                            }

                        }

                    }

                }

            }
        );

    }

}


function colorToRGBA(
    color,
    alpha
) {

    if (
        !color.startsWith("#")
    ) {

        return color;

    }


    let hex =
    color.slice(1);


    if (
        hex.length === 3
    ) {

        hex =
        hex
        .split("")
        .map(
            char =>
            char + char
        )
        .join("");

    }


    const number =
    parseInt(
        hex,
        16
    );


    const red =
    (number >> 16) & 255;


    const green =
    (number >> 8) & 255;


    const blue =
    number & 255;


    return (
        `rgba(${red},${green},${blue},${alpha})`
    );

}


function saveGoals() {

    localStorage.setItem(
        "goals",
        JSON.stringify(
            goals
        )
    );

}


function addGoal() {

    const nameInput =
    document.getElementById(
        "goalName"
    );


    const amountInput =
    document.getElementById(
        "goalAmount"
    );


    const currentInput =
    document.getElementById(
        "goalCurrent"
    );


    if (
        !nameInput ||
        !amountInput ||
        !currentInput
    ) {

        return;

    }


    const goal = {

        id:
        Date.now(),

        name:
        nameInput.value.trim(),

        amount:
        Number(
            amountInput.value
        ),

        current:
        Number(
            currentInput.value
        )

    };


    if (
        !goal.name ||
        goal.amount <= 0 ||
        goal.current < 0
    ) {

        showToast(
            "Please enter valid goal information",
            false
        );

        return;

    }


    goals.unshift(
        goal
    );


    saveGoals();


    renderGoals();


    nameInput.value = "";

    amountInput.value = "";

    currentInput.value = "";


    showToast(
        "Goal created"
    );

}


function renderGoals() {

    const list =
    document.getElementById(
        "goalList"
    );


    if (!list) {
        return;
    }


    if (!goals.length) {

        list.innerHTML = `

        <div class="empty-state">

            <i class="ph-duotone ph-target"></i>

            <h3>No goals yet</h3>

            <p>Create your first saving goal.</p>

        </div>

        `;

        return;

    }


    list.innerHTML =
    goals.map(
        goal => {

            let percent =
            (
                Number(goal.current) /
                Number(goal.amount)
            ) * 100;


            if (
                !Number.isFinite(
                    percent
                )
            ) {

                percent = 0;

            }


            percent =
            Math.min(
                100,
                Math.max(
                    0,
                    percent
                )
            );


            return `

            <div class="goal-card">

                <div class="goal-header">

                    <h3>
                        ${escapeHTML(goal.name)}
                    </h3>

                    <b>
                        ${Math.round(percent)}%
                    </b>

                </div>


                <p>

                    ฿${formatMoney(goal.current)}

                    /

                    ฿${formatMoney(goal.amount)}

                </p>


                <div class="progress">

                    <div
                    class="progress-bar"
                    style="width:${percent}%">
                    </div>

                </div>


                <div class="goal-actions">

                    <button
                    onclick="deleteGoal(${goal.id})">

                        <i class="ph-duotone ph-trash"></i>

                        Delete

                    </button>

                </div>

            </div>

            `;

        }
    ).join("");

}


function deleteGoal(id) {

    goals =
    goals.filter(
        goal =>
        Number(goal.id) !==
        Number(id)
    );


    saveGoals();


    renderGoals();


    showToast(
        "Goal deleted"
    );

}


function formatLocalDate(
    year,
    month,
    day
) {

    const m =
    String(
        month + 1
    )
    .padStart(
        2,
        "0"
    );


    const d =
    String(day)
    .padStart(
        2,
        "0"
    );


    return (
        `${year}-${m}-${d}`
    );

}


async function loadCalendarTransactions() {

    const grid =
    document.getElementById(
        "calendarGrid"
    );


    if (!grid) {
        return;
    }


    const result =
    await fetchTransactions();


    transactionsData =
    result.data;


    renderCalendar();

}


function renderCalendar() {

    const grid =
    document.getElementById(
        "calendarGrid"
    );


    const title =
    document.getElementById(
        "calendarMonth"
    );


    if (
        !grid ||
        !title
    ) {

        return;

    }


    grid.innerHTML = "";


    const year =
    calendarDate.getFullYear();


    const month =
    calendarDate.getMonth();


    title.textContent =
    calendarDate.toLocaleDateString(
        "en-US",
        {
            month:
            "long",

            year:
            "numeric"
        }
    );


    const firstDay =
    new Date(
        year,
        month,
        1
    ).getDay();


    const totalDays =
    new Date(
        year,
        month + 1,
        0
    ).getDate();


    for (
        let i = 0;
        i < firstDay;
        i++
    ) {

        const empty =
        document.createElement(
            "div"
        );


        empty.className =
        "calendar-day empty";


        grid.appendChild(
            empty
        );

    }


    const today =
    new Date();


    const todayString =
    formatLocalDate(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );


    for (
        let day = 1;
        day <= totalDays;
        day++
    ) {

        const dateString =
        formatLocalDate(
            year,
            month,
            day
        );


        const button =
        document.createElement(
            "button"
        );


        button.className =
        "calendar-day";


        button.textContent =
        day;


        if (
            dateString ===
            todayString
        ) {

            button.classList.add(
                "today"
            );

        }


        if (
            dateString ===
            selectedCalendarDate
        ) {

            button.classList.add(
                "selected"
            );

        }


        const hasTransaction =
        transactionsData.some(
            item =>
            item.date ===
            dateString
        );


        if (hasTransaction) {

            button.classList.add(
                "has-transaction"
            );

        }


        button.onclick =
        () => {

            selectedCalendarDate =
            dateString;


            renderCalendar();


            showCalendarTransactions(
                dateString
            );

        };


        grid.appendChild(
            button
        );

    }


    updateCalendarSummary();

}


function updateCalendarSummary() {

    const incomeElement =
    document.getElementById(
        "calendarIncome"
    );


    if (!incomeElement) {
        return;
    }


    const year =
    calendarDate.getFullYear();


    const month =
    calendarDate.getMonth();


    const monthlyTransactions =
    transactionsData.filter(
        item => {

            const date =
            new Date(
                `${item.date}T00:00:00`
            );


            return (
                date.getFullYear() ===
                year &&
                date.getMonth() ===
                month
            );

        }
    );


    const summary =
    calculateSummary(
        monthlyTransactions
    );


    document.getElementById(
        "calendarIncome"
    ).textContent =
    `฿${formatMoney(summary.income)}`;


    document.getElementById(
        "calendarExpense"
    ).textContent =
    `฿${formatMoney(summary.expense)}`;


    document.getElementById(
        "calendarBalance"
    ).textContent =
    `฿${formatMoney(summary.balance)}`;

}


function changeMonth(direction) {

    calendarDate.setMonth(
        calendarDate.getMonth() +
        direction
    );


    selectedCalendarDate =
    null;


    renderCalendar();


    const title =
    document.getElementById(
        "selectedDateTitle"
    );


    const list =
    document.getElementById(
        "calendarTransactionList"
    );


    if (title) {

        title.textContent =
        "Select a date";

    }


    if (list) {

        list.innerHTML = `

        <div class="calendar-empty">

            <i class="ph-duotone ph-calendar-blank"></i>

            <h3>No date selected</h3>

            <p>
            Choose a date on the calendar to view transactions.
            </p>

        </div>

        `;

    }

}


function goToToday() {

    calendarDate =
    new Date();


    selectedCalendarDate =
    getTodayString();


    renderCalendar();


    showCalendarTransactions(
        selectedCalendarDate
    );

}


function showCalendarTransactions(date) {

    const title =
    document.getElementById(
        "selectedDateTitle"
    );


    const list =
    document.getElementById(
        "calendarTransactionList"
    );


    if (
        !title ||
        !list
    ) {

        return;

    }


    const selected =
    new Date(
        `${date}T00:00:00`
    );


    title.textContent =
    selected.toLocaleDateString(
        "en-US",
        {
            day:
            "numeric",

            month:
            "long",

            year:
            "numeric"
        }
    );


    const items =
    transactionsData.filter(
        item =>
        item.date ===
        date
    );


    if (!items.length) {

        list.innerHTML = `

        <div class="calendar-empty">

            <i class="ph-duotone ph-receipt"></i>

            <h3>No transactions</h3>

            <p>
                No transactions on this date.
            </p>

        </div>

        `;

        return;

    }


    list.innerHTML =
    items.map(
        item => `

        <div class="calendar-transaction">

            <div class="category-icon">

                <i class="${getCategoryIcon(item.category)}"></i>

            </div>


            <div class="calendar-transaction-info">

                <b>
                    ${escapeHTML(item.title)}
                </b>

                <p>
                    ${escapeHTML(item.category)}
                </p>

            </div>


            <strong class="${item.type}">

                ${item.type === "income" ? "+" : "-"}

                ฿${formatMoney(item.amount)}

            </strong>

        </div>

        `
    ).join("");

}


function getTodayString() {

    const now =
    new Date();


    return formatLocalDate(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );

}


function savePreferences() {

    const animation =
    document.getElementById(
        "animationPreference"
    );


    const notification =
    document.getElementById(
        "notificationPreference"
    );


    if (!animation) {
        return;
    }


    localStorage.setItem(
        "moneyMateAnimation",
        animation.checked
    );


    localStorage.setItem(
        "moneyMateNotifications",
        notification
        ? notification.checked
        : false
    );


    applyAnimationPreference();

}


function loadPreferences() {

    const animation =
    document.getElementById(
        "animationPreference"
    );


    const notification =
    document.getElementById(
        "notificationPreference"
    );


    const savedAnimation =
    localStorage.getItem(
        "moneyMateAnimation"
    );


    const savedNotification =
    localStorage.getItem(
        "moneyMateNotifications"
    );


    if (animation) {

        animation.checked =
        savedAnimation === null
        ? true
        : savedAnimation === "true";

    }


    if (notification) {

        notification.checked =
        savedNotification ===
        "true";

    }


    applyAnimationPreference();

}


function applyAnimationPreference() {

    const saved =
    localStorage.getItem(
        "moneyMateAnimation"
    );


    const enabled =
    saved === null
    ? true
    : saved === "true";


    document.body.classList.toggle(
        "no-animation",
        !enabled
    );

}


function showToast(
    message,
    success = true
) {

    let toast =
    document.getElementById(
        "moneyMateToast"
    );


    if (!toast) {

        toast =
        document.createElement(
            "div"
        );


        toast.id =
        "moneyMateToast";


        toast.className =
        "toast";


        toast.innerHTML = `

        <i
        id="moneyMateToastIcon"
        class="ph-duotone ph-check-circle">
        </i>

        <span
        id="moneyMateToastText">
        </span>

        `;


        document.body.appendChild(
            toast
        );

    }


    const icon =
    document.getElementById(
        "moneyMateToastIcon"
    );


    const text =
    document.getElementById(
        "moneyMateToastText"
    );


    text.textContent =
    message;


    icon.className =
    success
    ? "ph-duotone ph-check-circle"
    : "ph-duotone ph-warning-circle";


    icon.style.color =
    success
    ? "#34d399"
    : "#fb7185";


    toast.classList.add(
        "show"
    );


    clearTimeout(
        window.moneyMateToastTimer
    );


    window.moneyMateToastTimer =
    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },
        2400
    );

}


window.addEventListener(
    "click",
    event => {

        const addModal =
        document.getElementById(
            "addModal"
        );


        const editModal =
        document.getElementById(
            "editModal"
        );


        if (
            addModal &&
            event.target ===
            addModal
        ) {

            closeAddModal();

        }


        if (
            editModal &&
            event.target ===
            editModal
        ) {

            closeEdit();

        }

    }
);


window.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            closeAddModal();

            closeEdit();

        }

    }
);


document.addEventListener(
    "DOMContentLoaded",
    async () => {


        const savedTheme =
        localStorage.getItem(
            "theme"
        ) ||
        "midnight";


        changeTheme(
            savedTheme
        );


        loadPreferences();


        if (
            document.getElementById(
                "dashboardBalance"
            )
        ) {

            await loadDashboard();

        }


        if (
            document.getElementById(
                "transaction-list"
            )
        ) {

            const dateInput =
            document.getElementById(
                "date"
            );


            if (
                dateInput &&
                !dateInput.value
            ) {

                dateInput.value =
                getTodayString();

            }


            await loadTransactions();

        }


        if (
            document.getElementById(
                "categoryChart"
            )
        ) {

            await loadAnalytics();

        }


        if (
            document.getElementById(
                "goalList"
            )
        ) {

            renderGoals();

        }


        if (
            document.getElementById(
                "calendarGrid"
            )
        ) {

            await loadCalendarTransactions();

        }


        const modalDate =
        document.getElementById(
            "modalDate"
        );


        if (
            modalDate &&
            !modalDate.value
        ) {

            modalDate.value =
            getTodayString();

        }

    }
);

