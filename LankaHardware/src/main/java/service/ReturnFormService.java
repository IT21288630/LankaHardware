package service;

import java.sql.Connection;

import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import model.Return;

public class ReturnFormService {
	
	 public int registerEmployee(Return employee) throws ClassNotFoundException {
	        String INSERT_REFUND_SQL = "INSERT INTO return_refund" +
	            "  (oID, name, reason, comment, amount, email) VALUES " +
	            " (?, ?, ?, ?, ?, ?);";

	        int result = 0;

	        Class.forName("com.mysql.jdbc.Driver");

	        try (Connection connection = DriverManager
	            .getConnection("jdbc:mysql://localhost:3306/lankahardware?useSSL=false", "root", "leomord123");

	            // Step 2:Create a statement using connection object
	            PreparedStatement preparedStatement = connection.prepareStatement(INSERT_REFUND_SQL)) {
	            preparedStatement.setInt(1, employee.getoID());
				preparedStatement.setString(2, employee.getName());
				preparedStatement.setString(3, employee.getReason());
				preparedStatement.setString(4, employee.getComment());
				preparedStatement.setDouble(5, employee.getAmount());
				preparedStatement.setString(6, employee.getEmail());

	            System.out.println(preparedStatement);
	            // Step 3: Execute the query or update query
	            result = preparedStatement.executeUpdate();

	        } catch (SQLException e) {
	            // process sql exception
	            printSQLException(e);
	        }
	        return result;
	    }

	    private void printSQLException(SQLException ex) {
	        for (Throwable e: ex) {
	            if (e instanceof SQLException) {
	                e.printStackTrace(System.err);
	                System.err.println("SQLState: " + ((SQLException) e).getSQLState());
	                System.err.println("Error Code: " + ((SQLException) e).getErrorCode());
	                System.err.println("Message: " + e.getMessage());
	                Throwable t = ex.getCause();
	                while (t != null) {
	                    System.out.println("Cause: " + t);
	                    t = t.getCause();
	                }
	            }
	        }
	    }


}

	
	