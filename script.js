// Mock Database for My Bookings
const bookingsData = [
  {
    ticketId: "XGA9EC908A",
    bookingCode: "R28954",
    bookingDate: "11 Sep 2026, 10:31",
    srcStation: "SECUNDERABAD JN.",
    destStation: "BILASPUR JN.",
    distance: "897 km",
    viaRoute: "Via KZJ-BPQ-NAB-R",
    passengers: "1 Adult, 0 Child",
    bookedOn: "11/09/2026 10:31",
    validTill: "11/09/2026 23:59",
    fareInfo: "SECOND | SUPERFAST | JOURNEY | ₹295.00",
    irNum: "IR:36AAAGM0289C1ZK"
  },
  {
    ticketId: "YHB8FD102B",
    bookingCode: "R10482",
    bookingDate: "10 Sep 2026, 08:15",
    srcStation: "MUMBAI CENTRAL",
    destStation: "SURAT",
    distance: "263 km",
    viaRoute: "Via BVI-VAPI",
    passengers: "2 Adult, 0 Child",
    bookedOn: "10/09/2026 08:15",
    validTill: "10/09/2026 23:59",
    fareInfo: "SECOND | EXPRESS | JOURNEY | ₹140.00",
    irNum: "IR:27BBAGM0192A8ZK"
  }
];

// Live Countdown Timer
let totalSeconds = 4 * 60 + 22; // Initial 04:22 timer
let timerInterval = null;

function startTimer() {
  const timerElement = document.getElementById('timer');
  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (totalSeconds <= 0) {
      totalSeconds = 5 * 60; // Reset loop when timer ends
    } else {
      totalSeconds--;
    }

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (timerElement) {
      timerElement.textContent = formattedTime;
    }
  }, 1000);
}

// Render Bookings List
function renderBookingsList() {
  const container = document.getElementById('bookings-container');
  container.innerHTML = bookingsData.map(item => `
    <div class="booking-item-card" onclick="openTicketDetails('${item.ticketId}')">
      <div class="item-top">
        <span>Booked: ${item.bookingDate}</span>
        <span class="item-badge">Active</span>
      </div>
      <div class="item-route">
        <span>${item.srcStation}</span>
        <i class="fa-solid fa-arrow-right"></i>
        <span>${item.destStation}</span>
      </div>
      <div class="item-bottom">
        <span>ID: ${item.ticketId}</span>
        <span>${item.fareInfo.split('|')[3]}</span>
      </div>
    </div>
  `).join('');
}

// View Switches
function hideAllViews() {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
}

function showHome() {
  hideAllViews();
  document.getElementById('home-view').classList.add('active');
  document.getElementById('nav-home').classList.add('active');
}

function showBookingsList() {
  hideAllViews();
  renderBookingsList();
  document.getElementById('bookings-list-view').classList.add('active');
  document.getElementById('nav-bookings').classList.add('active');
}

function openTicketDetails(ticketId) {
  const ticket = bookingsData.find(t => t.ticketId === ticketId) || bookingsData[0];

  // Populate dynamic ticket details
  document.getElementById('detail-id').textContent = ticket.ticketId;
  document.getElementById('detail-code').textContent = ticket.bookingCode;
  document.getElementById('detail-booking-date').textContent = ticket.bookingDate;
  document.getElementById('detail-src').textContent = ticket.srcStation;
  document.getElementById('detail-dest').textContent = ticket.destStation;
  document.getElementById('detail-dist').textContent = ticket.distance;
  document.getElementById('detail-via').textContent = ticket.viaRoute;
  document.getElementById('detail-passengers').textContent = ticket.passengers;
  document.getElementById('detail-booked-on').textContent = ticket.bookedOn;
  document.getElementById('detail-valid-till').textContent = ticket.validTill;
  document.getElementById('detail-fare-info').textContent = ticket.fareInfo;
  document.getElementById('detail-ir-num').textContent = ticket.irNum;

  hideAllViews();
  document.getElementById('ticket-detail-view').classList.add('active');
  document.getElementById('nav-bookings').classList.add('active');
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
  startTimer();
});
