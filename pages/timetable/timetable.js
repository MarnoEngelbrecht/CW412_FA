function applyClassBasedOnValue() {
    var table = document.getElementById("time-table");
    var rows = table.getElementsByTagName("tr");

    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        for (var j = 0; j < cells.length; j++) {
            var cellValue = cells[j].innerHTML.trim();
            switch (cellValue) {
                case "RD412":
                    cells[j].classList.add("class-RD412");
                    break;
                case "ENA412":
                    cells[j].classList.add("class-ENA412");
                    break;
                case "CF412":
                    cells[j].classList.add("class-CF412");
                    break;
                case "CW412":
                    cells[j].classList.add("class-CW412");
                    break;
                case "ITS":
                    cells[j].classList.add("class-ITS");
                    break;
                case "Lunch":
                    cells[j].classList.add("class-Lunch");
                    break;
                case "Group/Research":
                    cells[j].classList.add("class-GR");
                    break;
                case "Weekend Start":
                    cells[j].classList.add("class-weekend");
                    break;
                default:
                    break;
            }
        }
    }
  }

  window.onload = applyClassBasedOnValue;