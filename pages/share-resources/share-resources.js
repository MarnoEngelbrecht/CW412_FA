  function addResource() {
    const resourceName = document.getElementById('resourceName').value;
    const fileInput = document.getElementById('resourceFile');
    const filePath = fileInput.value;
    const lastSlashIndex = filePath.lastIndexOf('\\');
    const fileName = filePath.substring(lastSlashIndex + 1);
    const file = fileInput.files[0];
  
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = function(e) {
        const resourcesContainer = document.getElementById('resources');
        const resourceLink = document.createElement('a');
        const resourceEntry = document.createElement('div');
  
        resourceLink.href = e.target.result;
        resourceLink.textContent = resourceName + ' | ' + fileName || 'Unnamed PDF';
        resourceLink.download = resourceName + ' | ' + fileName || 'Download.pdf';
        resourceLink.style.color = 'white';
        
        // style as needed
        resourceEntry.appendChild(resourceLink);
        resourcesContainer.appendChild(resourceEntry);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a PDF file.');
      // Gives an alert message if user doesn't load a PDF file
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    initDB().then(displayResources);
  });
