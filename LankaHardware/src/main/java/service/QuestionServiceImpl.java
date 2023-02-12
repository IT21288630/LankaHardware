package service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

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

	public static void main(String[] args) {
		IQuestionService iQuestionService = new QuestionServiceImpl();
		
		System.out.println(iQuestionService.answerQuestion("test answer", "adimn", "q3003"));
	}
}
