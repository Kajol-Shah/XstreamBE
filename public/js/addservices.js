document.addEventListener("DOMContentLoaded", function () {

  // const spanish = document.getElementById('spanishbtn');
  const sports = document.getElementById('sportsbtn');
  const hbo = document.getElementById('hbobtn')
  const button1 = document.getElementById('preferredplan');
  const expanded = document.getElementById('expandedplan');
  const featuresElement = document.querySelector('#subplans');
  if(sports.innerHTML==="Remove Sports" || hbo.innerHTML==="Remove HBO" || expanded.innerHTML==="Remove Expanded"){
    featuresElement.style.display = 'block';
  }
  if(button1.innerHTML==="Remove Plan"){
    featuresElement.style.display = 'block';
  }
  const radioButtons = document.querySelector(
    'input[name="internet"]:checked');
 
  
    if (radioButtons === null) {
      document.querySelector('input[name="internet"]').checked=true;
      const button = document.getElementById('internetbtn');

      // Programmatically trigger a click
      button.click();
    }
    const btn1 = document.getElementById('servicebtn');
    const btn2 = document.getElementById('servicebtn2');
    const btn3 = document.getElementById('preferredplan');

    // Check if any button has innerHTML as "Remove Plan"
    [btn1, btn2, btn3].forEach(x => {
        if (x.innerHTML.trim() === "Remove Plan") {
            // Add 'disabled' class to other buttons
            [btn1, btn2, btn3].forEach(btn => {
                if (btn !== x) {
                    btn.classList.add('disabled');
                }
            });
        }
    });
});

document.getElementById('expandedplan').addEventListener('click', function (event) {
  
  const button = document.querySelector('#expandedplan');

  if (button.innerHTML== 'Add Expanded') {
    
    fetch('/cart/add', {
              method: 'POST', // Or GET, PUT, DELETE, etc.
              headers: {
                'Content-Type': 'application/json' // Adjust if necessary
              },
              body: JSON.stringify({itemId: button.getAttribute("value")}) // If sending data
            })
            .then(response => {
              // Handle the response
              if (response.ok) {
                button.innerHTML  = 'Remove Expanded';
                
              } else {
                throw new Error('Network response was not ok');
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
                    title: 'Already Purchased or Cannot add to cart!',
                    confirmButtonText: 'OK'
            });
    });
   
  } else {
    
    fetch('/cart/remove', {
      method: 'POST', // Or GET, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json' // Adjust if necessary
      },
      body: JSON.stringify({itemId: button.getAttribute("value")}) // If sending data
    })
    .then(response => {
      // Handle the response
      if (response.ok) {
        button.innerHTML  = 'Add Expanded';
       
      } else {
        throw new Error('Network response was not ok');
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
            title: 'Cannot remove from cart!',
            confirmButtonText: 'OK'
    });
});
   
  }
  
});
document.getElementById('preferredplan').addEventListener('click', function (event) {
  if (this.disabled) {
    event.preventDefault(); // Prevent default behavior
    return; // Exit early
}
const featuresElement = document.querySelector('#subplans');
const button = document.querySelector('#preferredplan');
if (button.innerHTML== 'Add Plan') {
 
    featuresElement.style.display = 'block';
  
  
  fetch('/cart/add', {
    method: 'POST', // Or GET, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json' // Adjust if necessary
    },
    body: JSON.stringify({itemId: button.getAttribute("value")}) // If sending data
  })
  .then(response => {
    // Handle the response
    if (response.ok) {
      button.innerHTML  = 'Remove Plan';
      document.getElementById('servicebtn').disabled = true; 
      document.getElementById('servicebtn').classList.add('disabled');
      document.getElementById('servicebtn2').disabled = true; 
      document.getElementById('servicebtn2').classList.add('disabled');
    } else {
      throw new Error('Network response was not ok');
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
          title: 'Already Purchased or Cannot add to cart!',
          confirmButtonText: 'OK'
  });
});
} else {
  
 
    featuresElement.style.display = 'none';
  
 
  fetch('/cart/remove', {
    method: 'POST', // Or GET, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json' // Adjust if necessary
    },
    body: JSON.stringify({itemId: button.getAttribute("value")}) // If sending data
  })
  .then(response => {
    // Handle the response
    if (response.ok) {
      button.innerHTML  = 'Add Plan';
      document.getElementById('servicebtn').disabled = false; 
      document.getElementById('servicebtn').classList.remove('disabled');
      document.getElementById('servicebtn2').disabled = false; 
      document.getElementById('servicebtn2').classList.remove('disabled');
    } else {
      throw new Error('Network response was not ok');
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
          title: 'Cannot remove from cart!',
          confirmButtonText: 'OK'
  });
});
}

});
document.getElementById('servicebtn').addEventListener('click', function (event) {
  if (this.disabled) {
    event.preventDefault(); // Prevent default behavior
    return; // Exit early
}
  const button = document.querySelector('#servicebtn');
  if (button.innerHTML== 'Add Plan') {
    
    
    fetch('/cart/add', {
      method: 'POST', // Or GET, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json' // Adjust if necessary
      },
      body: JSON.stringify({itemId: button.getAttribute("value")}) // If sending data
    })
    .then(response => {
      // Handle the response
      if (response.ok) {
        button.innerHTML  = 'Remove Plan';
     document.getElementById('preferredplan').disabled = true; 
     document.getElementById('preferredplan').classList.add('disabled');
     document.getElementById('servicebtn2').disabled = true; 
     document.getElementById('servicebtn2').classList.add('disabled');
      } else {
        throw new Error('Network response was not ok');
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
            title: 'Already Purchased or Cannot add to cart!',
            confirmButtonText: 'OK'
    });
});
  } else {
   
    fetch('/cart/remove', {
      method: 'POST', // Or GET, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json' // Adjust if necessary
      },
      body: JSON.stringify({itemId: button.getAttribute("value")}) // If sending data
    })
    .then(response => {
      // Handle the response
      if (response.ok) {
        button.innerHTML  = 'Add Plan';
        document.getElementById('preferredplan').disabled = false; 
        document.getElementById('preferredplan').classList.remove('disabled');
        document.getElementById('servicebtn2').disabled = false; 
        document.getElementById('servicebtn2').classList.remove('disabled');
      } else {
        throw new Error('Network response was not ok');
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
            title: 'Cannot remove from cart!',
            confirmButtonText: 'OK'
    });
});
  }
  
});
document.getElementById('servicebtn2').addEventListener('click', function (event) {
  if (this.disabled) {
    event.preventDefault(); // Prevent default behavior
    return; // Exit early
}
const button = document.querySelector('#servicebtn2');
if (button.innerHTML== 'Add Plan') {
  
  
  fetch('/cart/add', {
    method: 'POST', // Or GET, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json' // Adjust if necessary
    },
    body: JSON.stringify({itemId: button.getAttribute("value")}) // If sending data
  })
  .then(response => {
    // Handle the response
    if (response.ok) {
      button.innerHTML  = 'Remove Plan';
      
    } else {
      throw new Error('Network response was not ok');
    }
  })
  .then(data => {
    // Do something with the data
    // console.log(data);
      document.getElementById('preferredplan').disabled = true; 
      document.getElementById('preferredplan').classList.add('disabled');
      document.getElementById('servicebtn').disabled = true; 
      document.getElementById('servicebtn').classList.add('disabled');
  })
  .catch(error => {
    // Handle errors
    // console.log('Error:', error);
    Swal.fire({
          icon: 'error',
          title: 'Already Purchased or Cannot add to cart!',
          confirmButtonText: 'OK'
  });
});
} else {
 
  fetch('/cart/remove', {
    method: 'POST', // Or GET, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json' // Adjust if necessary
    },
    body: JSON.stringify({itemId: button.getAttribute("value")}) // If sending data
  })
  .then(response => {
    // Handle the response
    if (response.ok) {
      button.innerHTML  = 'Add Plan';
      
    } else {
      throw new Error('Network response was not ok');
    }
  })
  .then(data => {
    // Do something with the data
    // console.log(data);

      document.getElementById('preferredplan').disabled = false; 
      document.getElementById('preferredplan').classList.remove('disabled');
      document.getElementById('servicebtn').disabled = false; 
      document.getElementById('servicebtn').classList.remove('disabled');
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

});
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
                title: 'Already Purchased or Cannot add to cart!',
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
                title: 'Already Purchased or Cannot add to cart!',
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

document.getElementById('hbobtn').addEventListener('click', function () {
  const button = document.getElementById('hbobtn');
  if (button.innerHTML== 'Add HBO') {
    
    
    fetch('/cart/add', {
      method: 'POST', // Or GET, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json' // Adjust if necessary
      },
      body: JSON.stringify({itemId: button.getAttribute("value")}) // If sending data
    })
    .then(response => {
      // Handle the response
      if (response.ok) {
        button.innerHTML  = 'Remove HBO';
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
            title: 'Already Purchased or Cannot add to cart!',
            confirmButtonText: 'OK'
    });
  });
  } else {
   
    fetch('/cart/remove', {
      method: 'POST', // Or GET, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json' // Adjust if necessary
      },
      body: JSON.stringify({itemId: button.getAttribute("value")}) // If sending data
    })
    .then(response => {
      // Handle the response
      if (response.ok) {
        button.innerHTML  = 'Add HBO';
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
  
});
document.getElementById('sportsbtn').addEventListener('click', function () {
  const button = document.getElementById('sportsbtn');
  if (button.innerHTML== 'Add Sports') {
    
    
    fetch('/cart/add', {
      method: 'POST', // Or GET, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json' // Adjust if necessary
      },
      body: JSON.stringify({itemId: button.getAttribute("value")}) // If sending data
    })
    .then(response => {
      // Handle the response
      if (response.ok) {
        button.innerHTML  = 'Remove Sports';
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
            title: 'Already Purchased or Cannot add to cart!',
            confirmButtonText: 'OK'
    });
  });
  } else {
   
    fetch('/cart/remove', {
      method: 'POST', // Or GET, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json' // Adjust if necessary
      },
      body: JSON.stringify({itemId: button.getAttribute("value")}) // If sending data
    })
    .then(response => {
      // Handle the response
      if (response.ok) {
        button.innerHTML  = 'Add Sports';
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
  
});
// document.getElementById('spanishbtn').addEventListener('click', function () {
//   const button = document.getElementById('spanishbtn');
//   if (button.innerHTML== 'Add Spanish') {
    
    
//     fetch('/cart/add', {
//       method: 'POST', // Or GET, PUT, DELETE, etc.
//       headers: {
//         'Content-Type': 'application/json' // Adjust if necessary
//       },
//       body: JSON.stringify({itemId: button.getAttribute("value")}) // If sending data
//     })
//     .then(response => {
//       // Handle the response
//       if (response.ok) {
//         button.innerHTML  = 'Remove Spanish';
//       } else {
//         throw new Error('Network response was not ok');
//       }
//     })
//     .then(data => {
//       // Do something with the data
//       console.log(data);
//     })
//     .catch(error => {
//       // Handle errors
//       // console.log('Error:', error);
//       Swal.fire({
//             icon: 'error',
//             title: 'Already Purchased or Cannot add to cart!',
//             confirmButtonText: 'OK'
//     });
//   });
//   } else {
   
//     fetch('/cart/remove', {
//       method: 'POST', // Or GET, PUT, DELETE, etc.
//       headers: {
//         'Content-Type': 'application/json' // Adjust if necessary
//       },
//       body: JSON.stringify({itemId: button.getAttribute("value")}) // If sending data
//     })
//     .then(response => {
//       // Handle the response
//       if (response.ok) {
//         button.innerHTML  = 'Add Spanish';
//       } else {
//         throw new Error('Network response was not ok');
//       }
//     })
//     .then(data => {
//       // Do something with the data
//       console.log(data);
//     })
//     .catch(error => {
//       // Handle errors
//       // console.log('Error:', error);
//       Swal.fire({
//             icon: 'error',
//             title: 'Cannot remove from cart!',
//             confirmButtonText: 'OK'
//     });
// });
//   }
  
// });
