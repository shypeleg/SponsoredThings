
function outputUpdate(opacity) {
    console.log("here here heree");
	document.querySelector('#opacity').value = opacity;
}

// Saves options to chrome.storage
function save_options() {
  var color = document.getElementById('color').value;

  chrome.storage.sync.set({color: color}, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  // Use default value color = 'red' 
  chrome.storage.sync.get({
    favoriteColor: 'ea0000'
  }, function(items) {
    document.getElementById('color').value = items.color;  
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('fader').addEventListener('oninput', outputUpdate);
document.getElementById('fader').addEventListener('onchange', outputUpdate);