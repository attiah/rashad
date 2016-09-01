using System;
using System.Data;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using System.Data.SqlClient;


/// <summary>
/// Summary description for DBCnn
/// </summary>
public class DBCnn
{
    private SqlConnection Cnn = new SqlConnection();
    
	public DBCnn()
	{
        try
        {
            Cnn.ConnectionString = "Data Source=65.182.103.51;Initial Catalog=hajway;Persist Security Info=True;User ID=sa;Password=jicc309";
            Cnn.Open();
        }
        catch(Exception ex) { }
	}
    public bool Execute(string SQL)
    {
        try
        {
            SqlCommand command = new SqlCommand(SQL,Cnn);
            command.ExecuteNonQuery();
            return true;
        }
        catch(Exception ex) { return false; }
    }
    public bool Execute(SqlCommand command)
    {
        try
        {
            command.Connection = Cnn;
            command.ExecuteNonQuery();
            return true;
        }
        catch(Exception ex) { return false; }
    }
    public bool Run(string sql, byte[] pic)
    {
        try
        {
            SqlCommand cmd = new SqlCommand();
            SqlParameter par = new SqlParameter("@pic", SqlDbType.Image);
            par.Value = pic;
            if (pic != null) cmd.Parameters.Add(par);
            cmd.CommandText = sql;
            cmd.Connection = Cnn;
            cmd.ExecuteNonQuery();

            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }
    public  DataTable GetTable(string SQL)
    {
        try
        {
            SqlDataAdapter da = new SqlDataAdapter(SQL, Cnn);
            DataSet ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
        catch(Exception ex) { return null; }
    }
    public DataSet GetSet(string SQL)
    {
        try
        {
            SqlDataAdapter da = new SqlDataAdapter(SQL, Cnn);
            DataSet ds = new DataSet();
            da.Fill(ds);
            return ds;
        }
        catch (Exception ex) { return null; }
    }
    public DataTable GetTable(SqlCommand command)
    {
        try
        {
            command.Connection = Cnn;
            SqlDataAdapter da = new SqlDataAdapter();
            da.SelectCommand = command;
            DataSet ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
        catch(Exception ex) { return null; }
    }
    public DataSet GetSet(SqlCommand command)
    {
        try
        {
            command.Connection = Cnn;
            SqlDataAdapter da = new SqlDataAdapter();
            da.SelectCommand = command;
            DataSet ds = new DataSet();
            da.Fill(ds);
            return ds;
        }
        catch (Exception ex) { return null; }
    }
    public DataRow GetRow(string SQL)
    {
        try
        {
            SqlDataAdapter da = new SqlDataAdapter(SQL, Cnn);
            DataSet ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0].Rows[0];
        }
        catch (Exception ex){ return null; }
    }
    public DataRow GetRow(SqlCommand command)
    {
        try
        {
            command.Connection = Cnn;
            SqlDataAdapter da = new SqlDataAdapter();
            da.SelectCommand = command;
            DataSet ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0].Rows[0];
        }
        catch(Exception ex) { return null; }
    }
    public int FindValue(SqlCommand command)
    {
        try
        {
            command.Connection = Cnn;
            SqlDataAdapter da = new SqlDataAdapter();
            da.SelectCommand = command;
            DataSet ds = new DataSet();
            da.Fill(ds);
            return Int32.Parse (ds.Tables[0].Rows[0][0].ToString());
        }
        catch (Exception ex) { return 0; }
    }
    public void AddAction(string OPName,string UserNo,string UserName,string Note)
    {
        try
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "HUserActionAdd";
            cmd.Parameters.AddWithValue("@OpName", OPName );
            cmd.Parameters.AddWithValue("@OPDate", DateTime.Now.Date.ToString("MM/dd/yyyy"));
            cmd.Parameters.AddWithValue("@OPTime", DateTime.Now.TimeOfDay.Hours.ToString()+":"+DateTime.Now.TimeOfDay.Minutes.ToString()+":"+DateTime.Now.TimeOfDay.Seconds.ToString());
            cmd.Parameters.AddWithValue("@UserNo",UserNo );
            cmd.Parameters.AddWithValue("@UserName", UserName );
            cmd.Parameters.AddWithValue("@Note", Note );
            Execute(cmd);
        }
        catch { }
    }
}
