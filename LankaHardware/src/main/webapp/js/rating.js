/**
 * 
 */

/** Variables */
let files = []

/** CLICK LISTENER */

function setInputClick() {
	let input = document.getElementById('inputFile')
	input.click()
}

//select.addEventListener('click', () => input.click());

/* INPUT CHANGE EVENT */
function setImages() {
	let input = document.getElementById('inputFile')

	let file = input.files;

	// if user select no image
	if (file.length == 0) return;

	for (let i = 0; i < file.length; i++) {
		if (file[i].type.split("/")[0] != 'image') continue;
		if (!files.some(e => e.name == file[i].name)) files.push(file[i])
	}

	showImages();
}

/** SHOW IMAGES */
function showImages() {
	let container = document.getElementById('imageContainer')
	container.innerHTML = files.reduce((prev, curr, index) => {
		return `${prev}
                        <div class="image">
                            <span onclick="deleteImage(${index})">&times;</span>
                            <img src="${URL.createObjectURL(curr)}" />
                        </div>`
	}, '');
}

/* DELETE IMAGE */
function deleteImage(index) {
	files.splice(index, 1);
	showImages();
}

function dragOverFun(e) {
	let dragArea = document.getElementById('drag-area')
	dragArea.classList.add('dragover')
}

/* DRAG LEAVE */

function dragLeaveFun(e) {
	let dragArea = document.getElementById('drag-area')
	dragArea.classList.remove('dragover')
}

/* DROP EVENT */
function dragDropFun(e) {
	let dragArea = document.getElementById('drag-area')
	dragArea.classList.remove('dragover');

	let file = e.dataTransfer.files;
	for (let i = 0; i < file.length; i++) {
		/** Check selected file is image */
		if (file[i].type.split("/")[0] != 'image') continue;

		if (!files.some(e => e.name == file[i].name)) files.push(file[i])
	}
	showImages();
}