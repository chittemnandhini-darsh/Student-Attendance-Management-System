```javascript
// ==========================================
// STUDENT ATTENDANCE MANAGEMENT SYSTEM
// JavaScript - Frontend Only
// ==========================================


// ------------------------------------------
// 1. SET TODAY'S DATE
// ------------------------------------------

const attendanceDate = document.getElementById("attendanceDate");

if (attendanceDate) {
    const today = new Date().toISOString().split("T")[0];
    attendanceDate.value = today;
}


// ------------------------------------------
// 2. ADD STUDENT
// ------------------------------------------

const studentForm = document.getElementById("studentForm");

if (studentForm) {

    studentForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const roll = document.getElementById("roll").value.trim();
        const department =
            document.getElementById("department").value;
        const year =
            document.getElementById("year").value;

        if (name === "" || roll === "") {
            alert("Please enter all student details.");
            return;
        }

        const tableBody =
            document.querySelector("#studentTable tbody");

        const row = tableBody.insertRow();

        const serialNumber = tableBody.rows.length;

        row.innerHTML = `
            <td>${serialNumber}</td>
            <td>${name}</td>
            <td>${roll}</td>
            <td>${department}</td>
            <td>${year}</td>
            <td>
                <button class="delete"
                        onclick="deleteStudent(this)">
                    Delete
                </button>
            </td>
        `;

        studentForm.reset();

        alert("Student added successfully! ✅");
    });
}


// ------------------------------------------
// 3. DELETE STUDENT
// ------------------------------------------

function deleteStudent(button) {

    const confirmation =
        confirm("Are you sure you want to delete this student?");

    if (confirmation) {

        const row = button.closest("tr");

        row.remove();

        updateSerialNumbers();

        alert("Student deleted successfully.");
    }
}


// ------------------------------------------
// 4. UPDATE SERIAL NUMBERS
// ------------------------------------------

function updateSerialNumbers() {

    const rows =
        document.querySelectorAll("#studentTable tbody tr");

    rows.forEach(function (row, index) {

        row.cells[0].textContent = index + 1;

    });
}


// ------------------------------------------
// 5. SEARCH STUDENTS
// ------------------------------------------

const searchInput = document.getElementById("search");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const searchText =
            searchInput.value.toLowerCase();

        const rows =
            document.querySelectorAll("#studentTable tbody tr");

        rows.forEach(function (row) {

            const studentName =
                row.cells[1].textContent.toLowerCase();

            const rollNumber =
                row.cells[2].textContent.toLowerCase();

            const department =
                row.cells[3].textContent.toLowerCase();

            if (
                studentName.includes(searchText) ||
                rollNumber.includes(searchText) ||
                department.includes(searchText)
            ) {

                row.style.display = "";

            } else {

                row.style.display = "none";

            }

        });

    });
}


// ------------------------------------------
// 6. MARK INDIVIDUAL ATTENDANCE
// ------------------------------------------

function setStatus(button) {

    const parent =
        button.parentElement;

    const buttons =
        parent.querySelectorAll(".status");

    buttons.forEach(function (btn) {

        btn.classList.remove("selected");

    });

    button.classList.add("selected");
}


// ------------------------------------------
// 7. MARK ALL STUDENTS
// ------------------------------------------

function markAll(status) {

    const rows =
        document.querySelectorAll(
            "table tbody tr"
        );

    rows.forEach(function (row) {

        const buttons =
            row.querySelectorAll(".status");

        buttons.forEach(function (button) {

            button.classList.remove("selected");

        });

        if (status === "Present") {

            const presentButton =
                row.querySelector(".present");

            if (presentButton) {
                presentButton.classList.add("selected");
            }

        }

        if (status === "Absent") {

            const absentButton =
                row.querySelector(".absent");

            if (absentButton) {
                absentButton.classList.add("selected");
            }

        }

    });
}


// ------------------------------------------
// 8. SAVE ATTENDANCE
// ------------------------------------------

function saveAttendance() {

    const rows =
        document.querySelectorAll(
            "table tbody tr"
        );

    let presentCount = 0;
    let absentCount = 0;
    let unmarkedCount = 0;

    rows.forEach(function (row) {

        const selected =
            row.querySelector(".status.selected");

        if (!selected) {

            unmarkedCount++;

        } else if (
            selected.classList.contains("present")
        ) {

            presentCount++;

        } else if (
            selected.classList.contains("absent")
        ) {

            absentCount++;

        }

    });


    if (unmarkedCount > 0) {

        alert(
            "Please mark attendance for all students."
        );

        return;
    }


    alert(
        "Attendance saved successfully! ✅\n\n" +
        "Present: " + presentCount + "\n" +
        "Absent: " + absentCount
    );

}


// ------------------------------------------
// 9. DOWNLOAD ATTENDANCE REPORT
// ------------------------------------------

function downloadReport() {

    alert(
        "Report generation is available in the frontend demo. " +
        "A backend can be connected later for real PDF/Excel reports."
    );

}


// ------------------------------------------
// 10. PAGE LOAD MESSAGE
// ------------------------------------------

document.addEventListener("DOMContentLoaded", function () {

    console.log(
        "AttendEase Student Attendance System loaded successfully."
    );

});
```
