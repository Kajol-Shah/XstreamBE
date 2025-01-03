
  document.getElementById('internetbtn').addEventListener('click', function () {
    const radioButtons = document.querySelector(
      'input[name="internet"]:checked');
   
    
      if (radioButtons != null) {
        const button = document.querySelector('#internetbtn');
        if (button.innerHTML== 'Add Internet') {
          // console.log(radioButtons.getAttribute("id"));
          fetch('/cart/add', {
            method: 'POST', // Or GET, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json' // Adjust if necessary
            },
            body: JSON.stringify({itemId: radioButtons.getAttribute("id")}) // If sending data
          })
          .then(response => {
            // Handle the response
            if (response.ok) {
              button.innerHTML  = 'Remove Internet';
            } else {
              throw new Error('Network response was not ok');
            }
          })
          .then(data => {
            // Do something with the data
            console.log(data);
          })
          .catch(error => {
            // Handle errors
            // console.log('Error:', error);
            Swal.fire({
                  icon: 'error',
                  title: 'Already Purchased or Please Login!',
                  confirmButtonText: 'OK'
          });
        });
          
         
        } else {
          fetch('/cart/remove', {
            method: 'POST', // Or GET, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json' // Adjust if necessary
            },
            body: JSON.stringify({itemId: radioButtons.getAttribute("id")}) // If sending data
          })
          .then(response => {
            // Handle the response
            if (response.ok) {
              button.innerHTML  = 'Add Internet';
              radioButtons.checked = false;
            } else {
              throw new Error('Network response was not ok');
            }
          })
          .then(data => {
            // Do something with the data
            console.log(data);
          })
          .catch(error => {
            // Handle errors
            // console.log('Error:', error);
            Swal.fire({
                  icon: 'error',
                  title: 'Cannot remove from cart!',
                  confirmButtonText: 'OK'
          });
        });
          
        }
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Need to select any one internet plan!',
          confirmButtonText: 'OK'
      });
      }
    
    
    
  });
  document.getElementById('phonebtn').addEventListener('click', function () {
    const radioButtons = document.querySelector(
      'input[name="phone"]:checked');
   
    
      if (radioButtons != null) {
        const button = document.querySelector('#phonebtn');
        if (button.innerHTML== 'Add Phone') {
          // console.log(radioButtons.getAttribute("id"));
          fetch('/cart/add', {
            method: 'POST', // Or GET, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json' // Adjust if necessary
            },
            body: JSON.stringify({itemId: radioButtons.getAttribute("id")}) // If sending data
          })
          .then(response => {
            // Handle the response
            if (response.ok) {
              button.innerHTML  = 'Remove Phone';
            } else {
              throw new Error('Network response was not ok');
            }
          })
          .then(data => {
            // Do something with the data
            console.log(data);
          })
          .catch(error => {
            // Handle errors
            // console.log('Error:', error);
            Swal.fire({
                  icon: 'error',
                  title: 'Already Purchased or Please Login',
                  confirmButtonText: 'OK'
          });
        });
          
         
        } else {
          fetch('/cart/remove', {
            method: 'POST', // Or GET, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json' // Adjust if necessary
            },
            body: JSON.stringify({itemId: radioButtons.getAttribute("id")}) // If sending data
          })
          .then(response => {
            // Handle the response
            if (response.ok) {
              button.innerHTML  = 'Add Phone';
              radioButtons.checked = false;
            } else {
              throw new Error('Network response was not ok');
            }
          })
          .then(data => {
            // Do something with the data
            console.log(data);
          })
          .catch(error => {
            // Handle errors
            // console.log('Error:', error);
            Swal.fire({
                  icon: 'error',
                  title: 'Cannot remove from cart!',
                  confirmButtonText: 'OK'
          });
        });
          
        }
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Need to select any one phone plan!',
          confirmButtonText: 'OK'
      });
      }
    
  });
  
 