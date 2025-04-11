// we form element in variable studentForm using js 
const studentForm = document.getElementById('studentForm');
// we access student table body 
const studentTableBody = document.getElementById('studentTableBody');
// we access input field containing index 
const studentIndex = document.getElementById('studentIndex');

// will fetch data from local storage stored under key "students" 
let students = JSON.parse(localStorage.getItem('students')) || [];

// funtion to render table 
function renderTable() {
  // This line will set content inside table body empty 
      studentTableBody.innerHTML = "";
    // here we used forEach lop on array students to reflect data on table row 
      students.forEach((student, index) => {
        // row is dynamically added to table body 
        const row = `<tr>
          <td>${student.name}</td>
          <td>${student.class}</td>
          <td>${student.address}</td>
          <td>${student.contact}</td>
          <td>
            <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
            <button class="delete-btn delete-btn" onclick="deleteStudent(${index})">Delete</button>
          </td>
        </tr>`;
        studentTableBody.innerHTML += row;
      });
    }

    // thsi eventListner takes input from form and stores to studenData object in local storage so that it does not disapper on refresh 
    studentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const studentClass = document.getElementById('class').value;
      const address = document.getElementById('address').value;
      const contact = document.getElementById('contact').value;

      const studentData = { name, class: studentClass, address, contact };

      if (studentIndex.value === "") {
        students.push(studentData);
      } else {
        students[studentIndex.value] = studentData;
        studentIndex.value = "";
      }

      localStorage.setItem('students', JSON.stringify(students));
      studentForm.reset();
      renderTable();
    });

    // This function edit the students details 

    function editStudent(index) {
      const student = students[index];
      document.getElementById('name').value = student.name;
      document.getElementById('class').value = student.class;
      document.getElementById('address').value = student.address;
      document.getElementById('contact').value = student.contact;
      studentIndex.value = index;
    }

    // This funtion is to delete student entry 
    function deleteStudent(index) {
      if (confirm("Are you sure you want to delete this record?")) {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderTable();
      }
    }

    
    renderTable();