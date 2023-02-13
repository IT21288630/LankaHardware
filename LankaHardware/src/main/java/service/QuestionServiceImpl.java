package service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

import model.Admin;
import model.Customer;
import model.Item;
import model.Question;
import util.CommonConstants;
import util.CommonUtil;
import util.DBConnectionUtil;

public class QuestionServiceImpl implements IQuestionService {
	private static Connection con;

	private static Statement st;

	private static PreparedStatement pst;

	private static ResultSet rs;

	/** Initialize logger */
	public static final Logger log = Logger.getLogger(CartServiceImpl.class.getName());

	@Override
	public String askQuestion(String email, String question, String itemID) {
		// TODO Auto-generated method stub

		Question questionObj = new Question();
		ArrayList<String> ids = new ArrayList<>();
		String status = "There was a problem";
		con = DBConnectionUtil.getDBConnection();

		try {
			st = con.createStatement();
			rs = st.executeQuery(CommonConstants.QUERY_ID_SELECT_QUESTION_IDS);

			while (rs.next()) {
				ids.add(rs.getString(CommonConstants.COLUMN_INDEX_ONE));
			}

			questionObj.setQuestionID(CommonUtil.generateIDs(ids, "question"));

			pst = con.prepareStatement(CommonConstants.QUERY_ID_CREATE_QUESTION);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, questionObj.getQuestionID());
			pst.setString(CommonConstants.COLUMN_INDEX_TWO, question);
			pst.setString(CommonConstants.COLUMN_INDEX_THREE, itemID);
			pst.setString(CommonConstants.COLUMN_INDEX_FOUR, email);
			pst.executeUpdate();

			status = "Question submitted";

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			/*
			 * Close prepared statement and database connectivity at the end of transaction
			 */

			try {
				if (pst != null) {
					pst.close();
				}
				if (st != null) {
					st.close();
				}
				if (rs != null) {
					rs.close();
				}
			} catch (SQLException e) {
				log.log(Level.SEVERE, e.getMessage());
			}
		}

		return status;
	}

	@Override
	public String answerQuestion(String answer, String email, String questionID) {
		// TODO Auto-generated method stub

		String status = "There was a problem";
		con = DBConnectionUtil.getDBConnection();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_ANSWER_QUESTION);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, answer);
			pst.setString(CommonConstants.COLUMN_INDEX_TWO, email);
			pst.setString(CommonConstants.COLUMN_INDEX_THREE, questionID);
			pst.executeUpdate();

			status = "Answered";

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			/*
			 * Close prepared statement and database connectivity at the end of transaction
			 */

			try {
				if (pst != null) {
					pst.close();
				}
				if (st != null) {
					st.close();
				}
				if (rs != null) {
					rs.close();
				}
			} catch (SQLException e) {
				log.log(Level.SEVERE, e.getMessage());
			}
		}

		return status;
	}

	@Override
	public ArrayList<Question> getAllQuestionsAndAnswersByItemID(String itemID) {
		// TODO Auto-generated method stub

		ArrayList<Question> questions = new ArrayList<>();
		con = DBConnectionUtil.getDBConnection();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_GET_QST_AND_ANS_BY_ITEMID);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, itemID);
			rs = pst.executeQuery();

			while (rs.next()) {
				Question question = new Question();
				Customer customer = new Customer();
				Admin admin = new Admin();

				question.setQuestionID(rs.getString(CommonConstants.COLUMN_INDEX_ONE));
				question.setQuestion(rs.getString(CommonConstants.COLUMN_INDEX_TWO));
				question.setAnswer(rs.getString(CommonConstants.COLUMN_INDEX_THREE));
				question.setQuestionDate(rs.getString(CommonConstants.COLUMN_INDEX_FOUR));
				question.setAnswerDate(rs.getString(CommonConstants.COLUMN_INDEX_FIVE));
				customer.setEmail(rs.getString(CommonConstants.COLUMN_INDEX_SEVEN));
				admin.setEmail(rs.getString(CommonConstants.COLUMN_INDEX_EIGHT));
				question.setCustomer(customer);
				question.setAdmin(admin);

				questions.add(question);
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			/*
			 * Close prepared statement and database connectivity at the end of transaction
			 */

			try {
				if (pst != null) {
					pst.close();
				}
				if (st != null) {
					st.close();
				}
				if (rs != null) {
					rs.close();
				}
			} catch (SQLException e) {
				log.log(Level.SEVERE, e.getMessage());
			}
		}

		return questions;
	}

	@Override
	public ArrayList<Question> getNewQuestions() {
		// TODO Auto-generated method stub

		ArrayList<Question> questions = new ArrayList<>();
		con = DBConnectionUtil.getDBConnection();

		try {
			st = con.createStatement();
			rs = st.executeQuery(CommonConstants.QUERY_ID_GET_NEW_QUESTIONS);

			while (rs.next()) {
				Question question = new Question();
				Item item = new Item();
				Customer customer = new Customer();

				question.setQuestionID(rs.getString(CommonConstants.COLUMN_INDEX_ONE));
				question.setQuestion(rs.getString(CommonConstants.COLUMN_INDEX_TWO));
				question.setQuestionDate(rs.getString(CommonConstants.COLUMN_INDEX_THREE));
				item.setItemID(rs.getString(CommonConstants.COLUMN_INDEX_FOUR));
				question.setItem(item);
				customer.setEmail(rs.getString(CommonConstants.COLUMN_INDEX_FIVE));
				question.setCustomer(customer);

				questions.add(question);
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			/*
			 * Close prepared statement and database connectivity at the end of transaction
			 */

			try {
				if (pst != null) {
					pst.close();
				}
				if (st != null) {
					st.close();
				}
				if (rs != null) {
					rs.close();
				}
			} catch (SQLException e) {
				log.log(Level.SEVERE, e.getMessage());
			}
		}

		return questions;
	}

	@Override
	public ArrayList<Question> getAnsweredQuestions() {
		// TODO Auto-generated method stub

		ArrayList<Question> questions = new ArrayList<>();
		con = DBConnectionUtil.getDBConnection();

		try {
			st = con.createStatement();
			rs = st.executeQuery(CommonConstants.QUERY_ID_GET_ANSWERED_QUESTIONS);

			while (rs.next()) {
				Question question = new Question();
				Item item = new Item();
				Customer customer = new Customer();

				question.setQuestionID(rs.getString(CommonConstants.COLUMN_INDEX_ONE));
				question.setQuestion(rs.getString(CommonConstants.COLUMN_INDEX_TWO));
				question.setAnswer(rs.getString(CommonConstants.COLUMN_INDEX_THREE));
				question.setQuestionDate(rs.getString(CommonConstants.COLUMN_INDEX_FOUR));
				question.setAnswerDate(rs.getString(CommonConstants.COLUMN_INDEX_FIVE));
				item.setItemID(rs.getString(CommonConstants.COLUMN_INDEX_SIX));
				question.setItem(item);
				customer.setEmail(rs.getString(CommonConstants.COLUMN_INDEX_SEVEN));
				question.setCustomer(customer);

				questions.add(question);
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			/*
			 * Close prepared statement and database connectivity at the end of transaction
			 */

			try {
				if (pst != null) {
					pst.close();
				}
				if (st != null) {
					st.close();
				}
				if (rs != null) {
					rs.close();
				}
			} catch (SQLException e) {
				log.log(Level.SEVERE, e.getMessage());
			}
		}

		return questions;
	}

	@Override
	public String editAnsweredQuestions(String questionID, String answer) {
		// TODO Auto-generated method stub

		String status = "There was a problem";
		con = DBConnectionUtil.getDBConnection();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_EDIT_ANSWERED_QUESTIONS);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, answer);
			pst.setString(CommonConstants.COLUMN_INDEX_TWO, questionID);
			pst.executeUpdate();
			
			status = "Answer Updated";
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			/*
			 * Close prepared statement and database connectivity at the end of transaction
			 */

			try {
				if (pst != null) {
					pst.close();
				}
				if (st != null) {
					st.close();
				}
				if (rs != null) {
					rs.close();
				}
			} catch (SQLException e) {
				log.log(Level.SEVERE, e.getMessage());
			}
		}

		return status;
	}

	public static void main(String[] args) {
		IQuestionService iQuestionService = new QuestionServiceImpl();

		System.out.println(iQuestionService.getAnsweredQuestions());
	}
}
