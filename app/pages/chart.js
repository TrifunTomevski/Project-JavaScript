import { items } from "../../data/data.js";
import { getCurrentArtist } from "../globals.js";
import { formatDate, generateDateLabels } from "../utils/dates.js";

let myChart;

export function initChart() {
    const artistLogged = getCurrentArtist();
    const artistItems = items.filter((item) => item.artist === artistLogged);

    const soldItems = artistItems.filter((item) => Boolean(item.priceSold));
    const itemsValue = document.querySelector(".itemsValue");
    itemsValue.innerHTML = `${soldItems.length}/${artistItems.length}`;

    const totalIncome = soldItems.reduce(
        (total, item) => total + item.priceSold,
        0
    );
    const incomeValue = document.querySelector(".incomeValue");
    incomeValue.innerHTML = `$${totalIncome}`;

    const auctionItems = items.filter((item) => item.isAuctioning);
    const auctionValue = document.querySelector(".auctionValue");
    const auctionWidget = document.querySelector(".auctioningItem");

    if (auctionItems.length > 0) {
        const currentBid = auctionItems[0].price;
        auctionValue.innerHTML = `$${currentBid}`;
    } else {
        auctionValue.innerHTML = "Currently not available";
        auctionValue.classList.add("auctionValue--unavailable");
    }

    auctionWidget.addEventListener("click", () => {
        location.hash = "#auctionPage";
    });

    const ctx = document.querySelector("#myChart");

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: [
                "19.04.2023",
                "20.04.2023",
                "21.04.2023",
                "22.04.2023",
                "23.04.2023",
                "24.04.2023",
            ],
            datasets: [
                {
                    label: "Amount",
                    data: [2200, 1000, 3, 5, 2, 3],
                    fill: false,
                    backgroundColor: ["#A16A5E"],
                    hoverBackgroundColor: ["#D44C2E"],
                    barThickness: 8,
                    borderWidth: 1,
                },
            ],
        },
        options: {
            indexAxis: "y",
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        color: "transparent",
                    },
                },
                y: {
                    grid: {
                        color: "transparent",
                    },
                    ticks: {
                        stepSize: 10,
                    },
                },
            },
        },
    });

    const daysBtn = document.querySelectorAll(".daysBtns button");

    const last7 = document.querySelector("#last7");
    const last14 = document.querySelector("#last14");
    const last30 = document.querySelector("#last30");

    daysBtn.forEach((button) => {
        button.addEventListener("click", () => {
            daysBtn.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
        });
    });

    last7.addEventListener("click", function () {
        const labels = generateDateLabels(7);

        myChart.data.labels = labels;

        const chartData = labels.map((label) => {
            console.log(label);

            let sum = 0;

            soldItems.forEach((item) => {
                console.log(formatDate(item.dateSold));

                if (label === formatDate(item.dateSold)) {
                    sum += item.priceSold;
                }
            });

            return sum;
        });

        myChart.data.datasets[0].data = chartData;
        myChart.update();
        console.log(labels);
    });

    last14.addEventListener("click", function () {
        const labels = generateDateLabels(14);

        myChart.data.labels = labels;

        const chartData = labels.map((label) =>
            soldItems.reduce((acc, item) => {
                if (label === formatDate(item.dateSold)) {
                    return (acc += item.priceSold);
                }
                return acc;
            }, 0)
        );

        myChart.data.datasets[0].data = chartData;
        myChart.update();
        console.log(labels);
    });

    last30.addEventListener("click", function () {
        const labels = generateDateLabels(30);

        myChart.data.labels = labels;

        const chartData = labels.map((label) =>
            soldItems.reduce((acc, item) => {
                if (label === formatDate(item.dateSold)) {
                    return (acc += item.priceSold);
                }
                return acc;
            }, 0)
        );

        myChart.data.datasets[0].data = chartData;
        myChart.update();
        console.log(labels);
    });
}
