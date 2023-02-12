package service;

import java.util.logging.Logger;

public interface IQuestionService {
	/** Initialize logger */
	public static final Logger log = Logger.getLogger(IQuestionService.class.getName());
	
	/**
	 * ask a question
	 * @param email
	 * @param question
	 * @param itemID
	 * 
	 */
	public String askQuestion(String email, String question, String itemID);
	
	/**
	 * answer a question
	 * @param answer
	 * @param email
	 * @param questionID
	 * 
	 */
	public String answerQuestion(String answer, String email, String questionID);
}
