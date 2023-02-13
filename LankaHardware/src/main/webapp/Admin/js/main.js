/**
 * 
 */
//call GetNewQuestionsServlet
var newQuestions = []
var newQuestionsListElement

function callGetNewQuestionsServlet(newQuestionsList) {
	$.get("http://localhost:8080/LankaHardware/GetNewQuestionsServlet", function(response) {

		newQuestions = response
		newQuestionsListElement = newQuestionsList
		buildNewQuestions(newQuestionsList)
	})
}

//Build New Questions
function buildNewQuestions(newQuestionsList) {
	newQuestionsList.innerHTML = ''

	for (var i = 0; i < newQuestions.length; i++) {
		var question = `<tr>
	                        <td>
	                          <i class="fab fa-bootstrap fa-lg text-primary me-3"></i> <strong>${newQuestions[i].questionID}</strong>
	                        </td>
	                        <td>
	                            <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
	                                <li
	                                data-bs-toggle="tooltip"
	                                data-popup="tooltip-custom"
	                                data-bs-placement="top"
	                                class="avatar avatar-xs pull-up"
	                                title="${newQuestions[i].customer.email}"
	                                >
	                                    <img src="../assets/img/avatars/5.png" alt="Avatar" class="rounded-circle" />
	                                    ${newQuestions[i].customer.email}
	                                </li>
	                            </ul>
	                        </td>
	                        
	                        <td><span class="badge bg-label-success me-1">${newQuestions[i].item.itemID}</span></td>
	
							<td><span>${newQuestions[i].questionDate}</span></td>
	
	                        <td>
	                            <span class="cutoff-text">${newQuestions[i].question}</span>
	                        </td>
	                        
	                        
	                        <td>
	                          <div class="dropdown">
	                            <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
	                              <i class="bx bx-dots-vertical-rounded"></i>
	                            </button>
	                            <div class="dropdown-menu">
	                              <a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#modalCenter" id="openAnswerModal"
	                                onclick="createAnswerModal('${newQuestions[i].question}', '${newQuestions[i].questionID}');"><i class="bx bx-edit-alt me-2"></i> Answer</a
	                              >
	                              <a class="dropdown-item" href="javascript:void(0);"
	                                ><i class="bx bx-trash me-2"></i> Delete</a
	                              >
	                            </div>
	                          </div>
	                        </td>
                      </tr>`

		newQuestionsList.innerHTML += question
	}
}

//call GetAnsweredQuestionsServlet
var answeredQuestions = []
var answeredQuestionsListElement

function callGetAnsweredQuestionsServlet(answeredQuestionsList) {
	$.get("http://localhost:8080/LankaHardware/GetAnsweredQuestionsServlet", function(response) {

		answeredQuestions = response
		answeredQuestionsListElement = answeredQuestionsList
		
		buildAnsweredQuestions(answeredQuestionsList)
	})
}

function buildAnsweredQuestions(answeredQuestionsList) {
	answeredQuestionsList.innerHTML = ''

	for (var i = 0; i < answeredQuestions.length; i++) {
		var answer = `<tr>
                          <td>
                            <i class="fab fa-bootstrap fa-lg text-primary me-3"></i> <strong>${answeredQuestions[i].questionID}</strong>
                          </td>
                          <td>
                              <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                  <li
                                  data-bs-toggle="tooltip"
                                  data-popup="tooltip-custom"
                                  data-bs-placement="top"
                                  class="avatar avatar-xs pull-up"
                                  title="Ted"
                                  >
                                      <img src="../assets/img/avatars/5.png" alt="Avatar" class="rounded-circle" />
                                      <span>${answeredQuestions[i].customer.email}</span>
                                  </li>
                              </ul>
                          </td>
                          
                          <td><span class="badge bg-label-success me-1">${answeredQuestions[i].item.itemID}</span></td>
                          
                          <td><span>${answeredQuestions[i].answerDate}</span></td>
                          
                          <td>
                              <span class="cutoff-text">${answeredQuestions[i].question}</span>
                          </td>
                          
                          <td>
                              <span class="cutoff-text">${answeredQuestions[i].answer}</span>
                          </td>
                          
                          <td>
                            <div class="dropdown">
                              <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                <i class="bx bx-dots-vertical-rounded"></i>
                              </button>
                              <div class="dropdown-menu">
                                <a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#modalCenter2"
                                  onclick="createViewAnswerModal('${answeredQuestions[i].question}', '${answeredQuestions[i].answer}', '${answeredQuestions[i].questionID}')"><i class="bx bx-edit-alt me-2"></i> View</a
                                >
                                <a class="dropdown-item" href="javascript:void(0);"
                                  ><i class="bx bx-trash me-2"></i> Delete</a
                                >
                              </div>
                            </div>
                          </td>
                    </tr>`

		answeredQuestionsList.innerHTML += answer
	}
}

//create viewAnswerModal
var viewAnswerModalHeader = document.getElementById('viewAnswerModalHeader')
var viewAnswerModalBody = document.getElementById('viewAnswerModalBody')
var viewAnswerModalFooter = document.getElementById('viewAnswerModalFooter')
var currentAnswer

function createViewAnswerModal(question, answer, questionID) {
	currentAnswer = answer
	
	viewAnswerModalHeader.innerHTML = `<h5 class="modal-title" id="modalCenterTitle">View the Answer</h5>
					              <button
					                type="button"
					                class="btn-close"
					                data-bs-dismiss="modal"
					                aria-label="Close"
					              ></button>`
	viewAnswerModalBody.innerHTML = `<span>${question}</span>
					              <div class="row mt-3">
					                <div class="mb-3">
					                    <label class="form-label" for="answerTextArea">Your Answer</label>
					                    <textarea id="editAnswerTextArea" class="form-control" placeholder="">${answer}</textarea>
					                </div>
					              </div>`
	viewAnswerModalFooter.innerHTML = `<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
					                Close
					              </button>
					              <button type="button" class="btn btn-primary" onclick="toEditAnswerServlet('${questionID}')">Submit</button>`
}

//call AnswerQuestionServlet
var openAnswerModal = document.getElementById('openAnswerModal')
var answerModalHeader = document.getElementById('answerModalHeader')
var answerModalBody = document.getElementById('answerModalBody')
var answerModalFooter = document.getElementById('answerModalFooter')

function createAnswerModal(question, questionID) {
	answerModalHeader.innerHTML = `<h5 class="modal-title" id="modalCenterTitle">Type the Answer</h5>
					              <button
					                type="button"
					                class="btn-close"
					                data-bs-dismiss="modal"
					                aria-label="Close"
					              ></button>`
	answerModalBody.innerHTML = `<span>${question}</span>
					              <div class="row mt-3">
					                <div class="mb-3">
					                    <label class="form-label" for="answerTextArea">Answer</label>
					                    <textarea id="answerTextArea" class="form-control" placeholder=""></textarea>
					                </div>
					              </div>`
	answerModalFooter.innerHTML = `<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
					                Close
					              </button>
					              <button type="button" class="btn btn-primary" onclick="toAnswerServlet('${questionID}');">Submit</button>`
}

function toAnswerServlet(questionID) {
	var answer = document.getElementById('answerTextArea').value
	answer = answer.trim()

	if (answer.length > 0) callAnswerQuestionServlet(answer, questionID)
}

function callAnswerQuestionServlet(answer, questionID) {
	$.post("http://localhost:8080/LankaHardware/AnswerQuestionServlet", { answer: answer, questionID: questionID }, function(response) {

		answerModalHeader.style = "display: none;"
		answerModalBody.style = "padding: 1rem;"
		answerModalBody.innerHTML = `<div style="display: flex; justify-content: center; align-items: center; column-gap: 10px;">
									        <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_q7hiluze.json"  background="transparent"  speed="1"  style="width: 50px; height: 50px;" autoplay></lottie-player>
									        <span style="font-size: x-large;">${response}</span>
									    </div>`
		answerModalFooter.style = "display: none;"
		callGetNewQuestionsServlet(newQuestionsListElement)

		setTimeout(function() {
			$('#modalCenter').modal('hide')
		}, 2500);
	})
}

//call EditAnsweredQuestionsServlet
function toEditAnswerServlet(questionID){
	var newAnswer = document.getElementById('editAnswerTextArea').value
	newAnswer = newAnswer.trim()
	
	if(newAnswer != currentAnswer) callEditAnsweredQuestionsServlet(newAnswer, questionID)
}

function callEditAnsweredQuestionsServlet(answer, questionID) {
	$.post("http://localhost:8080/LankaHardware/EditAnsweredQuestionsServlet", { answer: answer, questionID: questionID }, function(response) {

		viewAnswerModalHeader.style = "display: none;"
		viewAnswerModalBody.style = "padding: 1rem;"
		viewAnswerModalBody.innerHTML = `<div style="display: flex; justify-content: center; align-items: center; column-gap: 10px;">
									        <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_q7hiluze.json"  background="transparent"  speed="1"  style="width: 50px; height: 50px;" autoplay></lottie-player>
									        <span style="font-size: x-large;">${response}</span>
									    </div>`
		viewAnswerModalFooter.style = "display: none;"
		
		callGetAnsweredQuestionsServlet(answeredQuestionsListElement)

		setTimeout(function() {
			$('#modalCenter2').modal('hide')
		}, 2500);
	})
}