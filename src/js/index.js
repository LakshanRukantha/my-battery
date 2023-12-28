document.addEventListener("DOMContentLoaded", function () {
  // Check if the Battery Status API is supported
  if ("getBattery" in navigator) {
    navigator.getBattery().then(function (battery) {
      // Display battery information
      updateBatteryInfo(battery);

      // Listen for changes in battery status
      battery.addEventListener("levelchange", function () {
        updateBatteryInfo(battery);
      });

      battery.addEventListener("chargingchange", function () {
        updateBatteryInfo(battery);
      });
    });
  } else {
    // API not supported
    document.querySelector(".battery-status").innerText =
      "Uh-oh! Your device not supported :(";
  }

  function updateBatteryInfo(battery) {
    let batteryBody = document.querySelector(".battery-precentage");
    let batteryHead = document.querySelector(".battery-head");
    let status = document.querySelector(".battery-status");

    // Display battery status ane level
    if (battery.level <= 0.2) {
      status.innerText = battery.charging ? "⚡Charging" : "🪫Battery Low";
    } else if (battery.level == 1) {
      status.innerText = "🔋Battery Full";
    } else {
      status.innerText = battery.charging ? "⚡Charging" : "🔌On Battery";
    }

    // Don't show battery precentage when batter is full
    if (!(battery.level == 1)) {
      status.innerText += ` ${Math.floor(battery.level * 100)}%`;
    }

    // Change battery color when battery level change
    if (battery.level <= 0.1) {
      batteryBody.classList.remove("bg-orange-500", "bg-green-500");
      batteryHead.classList.remove("bg-orange-500", "bg-green-500");
      batteryBody.classList.add("bg-red-500");
      batteryHead.classList.add("bg-red-500");
    } else if (battery.level > 0.1 && battery.level <= 0.2) {
      batteryBody.classList.remove("bg-red-500", "bg-green-500");
      batteryHead.classList.remove("bg-red-500", "bg-green-500");
      batteryBody.classList.add("bg-orange-500");
      batteryHead.classList.add("bg-orange-500");
    } else {
      batteryBody.classList.remove("bg-red-500", "bg-orange-500");
      batteryHead.classList.remove("bg-red-500", "bg-orange-500");
      batteryBody.classList.add("bg-green-500");
      batteryHead.classList.add("bg-green-500");
    }

    // Change battery level width inside battery body
    batteryBody.setAttribute("style", `width:${battery.level * 200}px`);
  }
});
