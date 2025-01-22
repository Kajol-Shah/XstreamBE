
 // Open/Close Modals
 function openEditProfileModal() {
    document.getElementById('editProfileModal').style.display = 'flex';
}
function closeEditProfileModal() {
    document.getElementById('editProfileModal').style.display = 'none';
}
function openServiceModal() {
    document.getElementById('serviceModal').style.display = 'flex';
}
function closeServiceModal() {
    document.getElementById('serviceModal').style.display = 'none';
}

// End Service Confirmation
function endService(service) {
    Swal.fire({
        title: 'End Service?',
        text: `Are you sure you want to end the ${service}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, end it!',
        cancelButtonText: 'No, keep it active!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Service Ended!', '', 'success');
        }
    });
}




function openScheduler() {
    Swal.fire({
        title: 'Select a Date',
        html: `
            <input type="date" id="date" style="padding: 10px; font-size: 16px; width: 100%;">
        `,
        showCancelButton: true,
        confirmButtonText: 'Next',
        preConfirm: () => {
            const selectedDate = document.getElementById('date').value;
            if (!selectedDate) {
                Swal.showValidationMessage('Please select a date');
            }
            return selectedDate;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const selectedDate = result.value;
            openTimeSelector(selectedDate);
        }
    });
}

function openTimeSelector(selectedDate) {
    Swal.fire({
         
        html: `
            <div id="time-slots">
                <h2>Available Time Slots for ${selectedDate}</h2>
                <div class="time-slot" data-time="09:00 AM">09:00 AM</div>
                <div class="time-slot" data-time="10:00 AM">10:00 AM</div>
                <div class="time-slot" data-time="11:00 AM">11:00 AM</div>
                <div class="time-slot" data-time="01:00 PM">01:00 PM</div>
                <div class="time-slot" data-time="03:00 PM">03:00 PM</div>
            </div>
        `,
        showCancelButton: true,
        showConfirmButton: false,
        didOpen: () => {
            const timeSlots = document.querySelectorAll('.time-slot');
            timeSlots.forEach(slot => {
                slot.addEventListener('click', () => {
                    const selectedTime = slot.getAttribute('data-time');
                    confirmAppointment(selectedDate, selectedTime);
                });
            });
        }
    });
}

function confirmAppointment(date, time) {
    Swal.fire({
        icon: 'success',
        title: 'Appointment Scheduled!',
        html: `<p>Your meeting is scheduled for:</p>
               <p><strong>${date} at ${time}</strong></p>`,
        confirmButtonText: 'OK'
    });
}

document.getElementById('schedule-btn').addEventListener('click', openScheduler);

const editProfileModal = document.getElementById("editProfileModal");

editProfileModal.addEventListener("submit", (e) => {
  e.preventDefault();

  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let email = document.getElementById("email").value;
  let address = document.getElementById("address").value;
//   console.log(firstName);
  fetch('/profileEdit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Adjust if necessary
    },
    body: JSON.stringify({FirstName: firstName,LastName:lastName,Email:email,Address:address}) // If sending data
  })
  .then(response => {
    // Handle the response
    if (response.ok) {
        Swal.fire({
            icon: 'success',
            title: 'Profile Updated successfully!',
            confirmButtonText: 'OK'
    });
    setTimeout(() => {
        location.reload();
      }, 1000);
    
    } else {
      throw new Error(response);
    }
  })
  .then(data => {
    // Do something with the data
    // console.log(data);
  })
  .catch(error => {
    // Handle errors
    // console.log('Error:', error);
    Swal.fire({
          icon: 'error',
          title: 'Cannot edit profile!',
          confirmButtonText: 'OK'
          
  });
});
});