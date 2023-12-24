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
      "Device Not Supported. :(";
  }

  function updateBatteryInfo(battery) {
    let batteryBody = document.querySelector(".battery-precentage");
    let batteryHead = document.querySelector(".battery-head");
    let status = document.querySelector(".battery-status");

    if (battery.level <= 0.2) {
      batteryBody.classList.toggle("bg-red-500");
      batteryHead.classList.toggle("bg-red-500");
      status.innerText = battery.charging ? "⚡Charging" : "🪫Battery Low";
    } else if (battery.level == 1) {
      status.innerText = "🔋Battery Full";
    } else {
      status.innerText = battery.charging ? "⚡Charging" : "🔌On Battery";
    }
    status.innerText += ` ${Math.floor(battery.level * 100)}%`;
    batteryBody.setAttribute("style", `width:${battery.level * 200}px`);
  }
});
