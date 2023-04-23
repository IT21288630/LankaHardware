package service;

import java.sql.Connection;

import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import model.Checkout;

public class CheckoutService {
	
	 public int registerCheckout(Checkout checkout) throws ClassNotFoundException {
	        String INSERT_CHECKOUT_SQL = "INSERT INTO ship_details" +
	            "  (Name, email, state, address, phone, city, postcode ) VALUES " +
	            " (?, ?, ?, ?, ?, ?, ?);";

	        int result = 0;

	        Class.forName("com.mysql.jdbc.Driver");

	        try (Connection connection = DriverManager
	            .getConnection("jdbc:mysql://localhost:3306/lankahardware?useSSL=false", "root", "leomord123");

	            // Step 2:Create a statement using connection object
	            PreparedStatement preparedStatement = connection.prepareStatement(INSERT_CHECKOUT_SQL)) {
	            preparedStatement.setString(1, checkout.getName());
				preparedStatement.setString(2, checkout.getEmail());
				preparedStatement.setString(3, checkout.getState());
				preparedStatement.setString(4, checkout.getAddress());
				preparedStatement.setString(5, checkout.getPhone());
				preparedStatement.setString(6, checkout.getCity());
				preparedStatement.setString(7, checkout.getPostcode());

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
