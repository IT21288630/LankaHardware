package service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Logger;

import model.Orderreal;
import util.CommonConstants;
import util.CommonUtil;
import util.DBConnectionUtil;

public class CheckoutServiceImpl implements ICheckoutService {
	private static Connection con;

	private static Statement st;

	private static PreparedStatement pst, pst2;

	private static ResultSet rs;
	/** Initialize logger */
	public static final Logger log = Logger.getLogger(CartServiceImpl.class.getName());

	@Override
	public void checkout(Orderreal orderreal) {
		// TODO Auto-generated method stub

		ArrayList<String> orderIds = new ArrayList<String>();

		con = DBConnectionUtil.getDBConnection();

		try {
			st = con.createStatement();
			rs = st.executeQuery(CommonConstants.QUERY_ID_GETCHECKOUTIDS);

			while (rs.next()) {
				orderIds.add(rs.getString(CommonConstants.COLUMN_INDEX_ONE));
			}

			pst = con.prepareStatement(CommonConstants.QUERY_ID_CHECKOUTREAL);
			pst.setString(1, CommonUtil.generateIDs(orderIds, "order"));
			pst.setString(2, orderreal.getName());
			pst.setString(3, orderreal.getPhone());
			pst.setString(4, orderreal.getAddress());
			pst.setString(5, orderreal.getEmail());
			pst.setString(6, orderreal.getP_method());
			pst.executeUpdate();

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
