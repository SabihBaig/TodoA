var firebaseConfig = {
	apiKey: "AIzaSyDbC31IBZjDwoMcsWWqadFrNZk6JIljPhI",
	authDomain: "apptodo-12897.firebaseapp.com",
	databaseURL: "https://apptodo-12897-default-rtdb.firebaseio.com",
	projectId: "apptodo-12897",
	storageBucket: "apptodo-12897.appspot.com",
	messagingSenderId: "450748205992",
	appId: "1:450748205992:web:4483e6d963d3d798e86b9d"
  };

// Initialize Firebase
var firebaseApp = firebase.initializeApp(firebaseConfig);
var database = firebaseApp.database();

console.log(firebaseApp);
console.log(database);


  window.addEventListener("load", () => {
	var form = document.querySelector("#new-task-form");
	var input = document.querySelector("#new-task-input");
	var list_el = document.querySelector("#tasks");
	var deleteAllButton = document.querySelector("#delete-all-tasks");
  
	form.addEventListener("submit", (e) => {
	  e.preventDefault();
  
	  var task = input.value;
  
	  
	  database.ref('tasks').push({
		task: task,
	  });
  
	  input.value = "";
	});
  

	database.ref('tasks').on('child_added', (snapshot) => {
	  var taskData = snapshot.val();
	  var taskKey = snapshot.key;
  
	  var task_el = document.createElement("div");
	  task_el.classList.add("task");
  
	  var task_content_el = document.createElement("div");
	  task_content_el.classList.add("content");
  
	  task_el.appendChild(task_content_el);
  
	  var task_input_el = document.createElement("input");
	  task_input_el.classList.add("text");
	  task_input_el.type = "text";
	  task_input_el.value = taskData.task;
	  task_input_el.setAttribute("readonly", "readonly");
  
	  task_content_el.appendChild(task_input_el);
  
	  var task_actions_el = document.createElement("div");
	  task_actions_el.classList.add("actions");
  
	  var task_edit_el = document.createElement("button");
	  task_edit_el.classList.add("edit");
	  task_edit_el.innerText = "Edit";
  
	  var task_delete_el = document.createElement("button");
	  task_delete_el.classList.add("delete");
	  task_delete_el.innerText = "Delete";
  
	  task_actions_el.appendChild(task_edit_el);
	  task_actions_el.appendChild(task_delete_el);
  
	  task_el.appendChild(task_actions_el);
  
	  list_el.appendChild(task_el);
  
	  task_edit_el.addEventListener("click", (e) => {
		if (task_edit_el.innerText.toLowerCase() == "edit") {
		  task_edit_el.innerText = "Save";
		  task_input_el.removeAttribute("readonly");
		  task_input_el.focus();
		} else {
		  task_edit_el.innerText = "Edit";
		  task_input_el.setAttribute("readonly", "readonly");
		}
	  });
  
	  task_delete_el.addEventListener("click", (e) => {
		
		database.ref('tasks').child(taskKey).remove();
  
		list_el.removeChild(task_el);
	  });
	});
  
	deleteAllButton.addEventListener("click", () => {
	
	  database.ref('tasks').remove();
  
	  list_el.innerHTML = "";
	});
  });