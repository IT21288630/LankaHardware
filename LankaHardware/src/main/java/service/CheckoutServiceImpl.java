package service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Logger;

import model.Item;
import model.Orderreal;
import util.CommonConstants;
import util.CommonUtil;
import util.DBConnectionUtil;

public class CheckoutServiceImpl implements ICheckoutService {
	private static Connection con;

	private static Statement st;

	private static PreparedStatement pst, pst2, pst3;

	private static ResultSet rs, rs2, rs3;
	/** Initialize logger */
	public static final Logger log = Logger.getLogger(CartServiceImpl.class.getName());

	@Override
	public void checkout(Orderreal orderreal) {
		// TODO Auto-generated method stub

		ArrayList<String> orderIds = new ArrayList<String>();
		ArrayList<String> itemIds = new ArrayList<String>();
		String cartID = null;
		con = DBConnectionUtil.getDBConnection();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_GETCHECKOUTCARTTOTAL);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, orderreal.getEmail());
			rs2 = pst.executeQuery();
			rs2.next();
			
			orderreal.setTotal(rs2.getDouble(CommonConstants.COLUMN_INDEX_ONE));
			cartID = rs2.getString(CommonConstants.COLUMN_INDEX_TWO);
			
			st = con.createStatement();
			rs = st.executeQuery(CommonConstants.QUERY_ID_GETCHECKOUTIDS);

			while (rs.next()) {
				orderIds.add(rs.getString(CommonConstants.COLUMN_INDEX_ONE));
			}

			orderreal.setoID(CommonUtil.generateIDs(orderIds, "order"));
			
			pst = con.prepareStatement(CommonConstants.QUERY_ID_CHECKOUTREAL);
			pst.setString(1, orderreal.getoID());
			pst.setString(2, orderreal.getName());
			pst.setString(3, orderreal.getPhone());
			pst.setString(4, orderreal.getAddress());
			pst.setDouble(5, orderreal.getTotal());
			pst.setString(6, orderreal.getEmail());
			pst.setString(7, "Processing");
			pst.setString(8, "COD");
			pst.executeUpdate();
			
			pst2 = con.prepareStatement(CommonConstants.QUERY_ID_CHECKOUT_GET_ITEMS_FROM_CART);
			pst2.setString(CommonConstants.COLUMN_INDEX_ONE, cartID);
			rs3 = pst2.executeQuery();
			
			while (rs3.next()) {
				itemIds.add(rs3.getString(CommonConstants.COLUMN_INDEX_ONE));
			}
			
			pst = con.prepareStatement(CommonConstants.QUERY_ID_CHECKOUT_ITEM_REAL);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, orderreal.getoID());
			
			for (String id : itemIds) {
				pst.setString(CommonConstants.COLUMN_INDEX_TWO, id);
				pst.executeUpdate();
			}
			
			ICartService iCartService = new CartServiceImpl();
			
			iCartService.clearCart(orderreal.getEmail());
			
			

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	@Override
	public ArrayList<Orderreal> getCompletedOrders(String email) {
		// TODO Auto-generated method stub
		ArrayList<Orderreal> orderreals = new ArrayList<>();
		
		con = DBConnectionUtil.getDBConnection();
		
		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_CHECKOUT_GET_COMPLETED_ORDERS);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, email);
			rs = pst.executeQuery();
			
			while (rs.next()) {
				Orderreal orderreal = new Orderreal();
				
				orderreal.setoID(rs.getString(CommonConstants.COLUMN_INDEX_ONE));
				orderreal.setName(rs.getString(CommonConstants.COLUMN_INDEX_TWO));
				orderreal.setDate_time(rs.getString(CommonConstants.COLUMN_INDEX_THREE));
				orderreal.setPhone(rs.getString(CommonConstants.COLUMN_INDEX_FOUR));
				orderreal.setAddress(rs.getString(CommonConstants.COLUMN_INDEX_FIVE));
				orderreal.setTotal(rs.getDouble(CommonConstants.COLUMN_INDEX_SIX));
				orderreal.setEmail(rs.getString(CommonConstants.COLUMN_INDEX_SEVEN));
				orderreal.setStatus(rs.getString(CommonConstants.COLUMN_INDEX_EIGHT));
				orderreal.setP_method(rs.getString(CommonConstants.COLUMN_INDEX_NINE));
				
				orderreals.add(orderreal);
			}
			
			for (Orderreal orderreal : orderreals) {
				ArrayList<Item> items = new ArrayList<>();
				
				pst2 = con.prepareStatement(CommonConstants.QUERY_ID_CHECKOUT_GET_COMPLETED_ORDER_ITEM);
				pst2.setString(CommonConstants.COLUMN_INDEX_ONE, orderreal.getoID());
				rs2 = pst2.executeQuery();
				
				while (rs2.next()) {
					Item item = new Item();
					
					item.setItemID(rs2.getString(CommonConstants.COLUMN_INDEX_TWO));
					
					pst3 = con.prepareStatement(CommonConstants.QUERY_ID_CHECKOUT_GET_COMPLETED_ORDER_ITEM_DETAILS);
					pst3.setString(CommonConstants.COLUMN_INDEX_ONE, item.getItemID());
					pst3.setString(CommonConstants.COLUMN_INDEX_TWO, item.getItemID());
					rs3 = pst3.executeQuery();
					rs3.next();
					
					item.setName(rs3.getString(CommonConstants.COLUMN_INDEX_ONE));
					item.setMainImg(rs3.getString(CommonConstants.COLUMN_INDEX_TWO));
					
					items.add(item);
				}
				
				orderreal.setItems(items);
			}
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return orderreals;
	}

}
