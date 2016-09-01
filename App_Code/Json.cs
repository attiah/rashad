using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Text;
using System.Text.RegularExpressions;

/// <summary>
/// Summary description for Json
/// </summary>
public class Json
{
   
    public Json()
    {

    }
    public static string json(string[,] data,DataTable dt)
    {

        StringBuilder JsonString = new StringBuilder();
        JsonString.Append("{");
        for (int x = 0; x < data.Length/2; x++)
        {
            JsonString.Append("\""+data[x,0]+"\":\"" + data[x,1] + "\"");
            if (x < data.Length / 2 - 1) JsonString.Append(",");
        }
        
        //Exception Handling
        if (dt != null && dt.Rows.Count > 0)
        {
           
            JsonString.Append(",\"rows\":[");

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                JsonString.Append("{ ");
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    if (j < dt.Columns.Count - 1)
                    {
                        JsonString.Append("\"" + dt.Columns[j].ColumnName.ToString() +
                              "\":" + "\"" +
                              dt.Rows[i][j].ToString() + "\",");
                    }
                    else if (j == dt.Columns.Count - 1)
                    {
                        JsonString.Append("\"" +
                           dt.Columns[j].ColumnName.ToString() + "\":" +
                           "\"" + dt.Rows[i][j].ToString() + "\"");
                    }
                }

                /*end Of String*/
                if (i == dt.Rows.Count - 1)
                {
                    JsonString.Append("} ");
                }
                else
                {
                    JsonString.Append("},");
                }
            }

            JsonString.Append("]}");
            return JsonString.ToString();
        }
        else
        {
            JsonString.Append("}");
            return JsonString.ToString();
        }
    }
    public static string json(DataTable dt, string total)
    {

        StringBuilder JsonString = new StringBuilder();

        //Exception Handling
        if (dt != null && dt.Rows.Count > 0)
        {
            JsonString.Append("{\"total\":\"" + total + "\",");
            JsonString.Append("\"rows\":[");

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                JsonString.Append("{ ");
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    if (j < dt.Columns.Count - 1)
                    {
                        JsonString.Append("\"" + dt.Columns[j].ColumnName.ToString() +
                              "\":" + "\"" +
                              dt.Rows[i][j].ToString() + "\",");
                    }
                    else if (j == dt.Columns.Count - 1)
                    {
                        JsonString.Append("\"" +
                           dt.Columns[j].ColumnName.ToString() + "\":" +
                           "\"" + dt.Rows[i][j].ToString() + "\"");
                    }
                }

                /*end Of String*/
                if (i == dt.Rows.Count - 1)
                {
                    JsonString.Append("} ");
                }
                else
                {
                    JsonString.Append("},");
                }
            }

            JsonString.Append("]}");
            return JsonString.ToString();
        }
        else
        {
            return null;
        }
    }
    public static string json(string sql)
    {
        DBCnn db = new DBCnn();
        DataTable dt = db.GetTable(sql);
        StringBuilder JsonString = new StringBuilder();

        //Exception Handling
        if (dt != null && dt.Rows.Count > 0)
        {
           
            JsonString.Append("{\"rows\":[");

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                JsonString.Append("{ ");
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    if (j < dt.Columns.Count - 1)
                    {
                        JsonString.Append("\"" + dt.Columns[j].ColumnName.ToString() +
                              "\":" + "\"" +
                              dt.Rows[i][j].ToString() + "\",");
                    }
                    else if (j == dt.Columns.Count - 1)
                    {
                        JsonString.Append("\"" +
                           dt.Columns[j].ColumnName.ToString() + "\":" +
                           "\"" + dt.Rows[i][j].ToString() + "\"");
                    }
                }

                /*end Of String*/
                if (i == dt.Rows.Count - 1)
                {
                    JsonString.Append("} ");
                }
                else
                {
                    JsonString.Append("},");
                }
            }

            JsonString.Append("]}");
            return JsonString.ToString();
        }
        else
        {
            return null;
        }
    }
    public static string json(DataTable dt)
    {

      
        StringBuilder JsonString = new StringBuilder();

        //Exception Handling
        if (dt != null && dt.Rows.Count > 0)
        {

            JsonString.Append("[");

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                JsonString.Append("{ ");
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    if (j < dt.Columns.Count - 1)
                    {
                        JsonString.Append("\"" + dt.Columns[j].ColumnName.ToString() +
                              "\":" + "\"" +
                              dt.Rows[i][j].ToString() + "\",");
                    }
                    else if (j == dt.Columns.Count - 1)
                    {
                        JsonString.Append("\"" +
                           dt.Columns[j].ColumnName.ToString() + "\":" +
                           "\"" + dt.Rows[i][j].ToString() + "\"");
                    }
                }

                /*end Of String*/
                if (i == dt.Rows.Count - 1)
                {
                    JsonString.Append("} ");
                }
                else
                {
                    JsonString.Append("},");
                }
            }

            JsonString.Append("]");
            return JsonString.ToString();
        }
        else
        {
            return null;
        }
    }

  
}