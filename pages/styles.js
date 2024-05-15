function onMenuClick() {
    const dropdown = document.getElementById('drop-down');
    if(dropdown.style.display == 'none') {
        dropdown.style.display = 'flex';
    } else {
        dropdown.style.display = 'none';
    }
}
