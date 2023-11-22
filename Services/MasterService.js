const { query } = require("express");
const { sql, pool, poolPG } = require("./Config.js");
AddHandShek = async (dictionobj,proc_name, result) => {
    let stmt = `INSERT INTO chargerhandshek(handshek,host,httpversion,lastactivetime,locationendpoint,method,orig
        in,chargerid,remoteendpoint,secwebsocketprotocol,secwebsocketversion,sessionid,starttime,upgrade) 
        values ('${dictionobj.ToList()[0].Value?.ToString()}','${dictionobj.ToList()[1].Value?.ToString()}','${dictionobj.ToList()[2].Value?.ToString() }','${dictionobj.ToList()[3].Value?.ToString() }','${dictionobj.ToList()[4].Value?.ToString() }','${dictionobj.ToList()[5].Value?.ToString() }','${dictionobj.ToList()[6].Value?.ToString() }','${dictionobj.ToList()[7].Value?.ToString() }','${dictionobj.ToList()[8].Value?.ToString() }','${dictionobj.ToList()[9].Value?.ToString() }','${dictionobj.ToList()[10].Value?.ToString() }','${dictionobj.ToList()[11].Value?.ToString() }','${dictionobj.ToList()[12].Value?.ToString() }','${dictionobj.ToList()[13].Value?.ToString() }')`;
        let final_res;
        let resp;
        try {
          resp = await pool.query(stmt);
          final_res = {
            status: true,
            message: 'SUCCESS',
            data: [{
              id: resp
            }]
          }
        } catch (err) {
          final_res = {
            status: false,
            message: `ERROR : ${err.code}`,
            data: []
          }
        } finally {
          result(null, final_res);
        }
    return result;

};

GetChargerBySerialNo=async(chargerSerialNo,result)=>{
  query = " select name,client_name,station_name,cpo_name,charger_srno,chargerid,client_id,station_id,cpo_id,is_dual_gun,status,charger_model_name, is_OCPP_enabled, is_GSM_enabled,source_ocpp_enabled,source_gsm_enabled from summary_chargers where name='"+chargerSerialNo+"'";
  try {
    resp = await pool.query(query);
    final_res = {
      status: true,
      message: 'SUCCESS',
      data: resp
    }
  } catch (err) {
    final_res = {
      status: false,
      message: `ERROR : ${err.code}`
    }
  } finally {
    result(null, final_res);
  }
return result;
};

InsertRemoteStart_UserHistory=async(doclog,result)=>{
  query = "call Proc_insert_User_Charging_log('"+doclog[0]+"','"+doclog[1]+"','"+doclog[2]+"','"+doclog[3]+"','"+doclog[4]+"','"+doclog[5]+"','"+doclog[6]+"','"+doclog[7]+"','"+doclog[8]+"','"+doclog[9]+"','"+doclog[10]+"','"+doclog[11]+"','"+doclog[12]+"','"+doclog[13]+"','"+doclog[14]+"','"+doclog[15]+"','"+doclog[16]+"')";
  try {
    resp = await pool.query(query);
    final_res = {
      status: true,
      message: 'SUCCESS',
      data: resp
    }
  } catch (err) {
    final_res = {
      status: false,
      message: `ERROR : ${err.code}`
    }
  } finally {
    result(null, final_res);
  }
return result;
}

InsertRemoteStart_Log = async(doclog,result)=>{
  let date = DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss");
  query = "INSERT INTO public.chargerrequest_log (message_code,message_id,action,connectorid, idtag,charger_id,chargerrequest,station_id,station_name,cpo_id,cpo_name,client_id, client_name,db_chargerid,charger_srno,request_date,response_received) values ('" + doclog[0] + "'," + doclog[1] + ",'" + doclog[2] + "'," + doclog[3] + ",'" + doclog[4] + "','" + doclog[5] + "','" + doclog[6] + "','" + doclog[7] + "','" + doclog[8] + "','" +doclog[9] + "','" + doclog[10] + "','" + doclog[11] + "','" + doclog[12]+ "','" + doclog[13] + "','" +  doclog[14] + "','" + date + "','0')";
  try {
    resp = await pool.query(query);
    final_res = {
      status: true,
      message: 'SUCCESS',
      data: resp
    }
  } catch (err) {
    final_res = {
      status: false,
      message: `ERROR : ${err.code}`
    }
  } finally {
    result(null, final_res);
  }
return result;
}

Update_lastPing_Interval=async(chargerId,ConectorId,result)=>{
  query = "call Proc_update_lastping_date('"+chargerId+"','"+ConectorId+"','@OP_ErrorCode','@OP_ErrorDetail')";
  try {
    resp = await pool.query(query);
    final_res = {
      status: true,
      message: 'SUCCESS',
      data: resp
    }
  } catch (err) {
    final_res = {
      status: false,
      message: `ERROR : ${err.code}`
    }
  } finally {
    result(null, final_res);
  }
return result;
}


GetChargerModelType = async(chargerSerialNo,result)=>{
  query = " select charger_model_name from summary_chargers where name='"+chargerSerialNo+"'";
  try {
    resp = await pool.query(query);
    final_res = {
      status: true,
      message: 'SUCCESS',
      data: resp
    }
  } catch (err) {
    final_res = {
      status: false,
      message: `ERROR : ${err.code}`
    }
  } finally {
    result(null, final_res);
  }
return result;
}

InsertTrigger_BootnotificationReq =async(obj,result)=>{
  try
  {
      let date = DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss");
      query = "INSERT INTO public.chargerrequest_log(message_code,message_id,action,requestedmessage,connectorid,charger_id,chargerrequest,station_id,station_name,cpo_id,cpo_name,client_id,client_name,db_chargerid,charger_srno,request_date,response_received,custom_trans_id) values ('" + obj[0]+ "'," + obj[1]+ ",'" + obj[2]+ "','" + obj[3] + "'," + obj[4]+ ",'" + obj[5] + "','" + obj[6]+ "','" + obj[7]+ "','" + obj[8] + "','" + obj[9] + "','" + obj[10]+ "','" + obj[11]+"','" + obj[12] + "','" + obj[13]+ "','" + obj[14] + "','" + date + "',0,'" + obj[15]+ "')";
      resp = await pool.query(query);
      final_res = {
      status: true,
      message: 'SUCCESS',
      data: resp
    }
  }
  catch (err)
  {
    final_res = {
      status: false,
      message: `ERROR : ${err.code}`
    }
  }
  return result;
}

InsertTrigger_StatusnotificationReq = async(obj,result)=>{
  try
  {
      let date = DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss");
      query = "INSERT INTO public.chargerrequest_log  (message_code,message_id,action,requestedmessage,connectorid,charger_id,chargerrequest,station_id,station_name,cpo_id,cpo_name,client_id,client_name,db_chargerid,charger_srno,request_date,response_received,custom_trans_id) values ('" + obj[0] + "'," + obj[1] + ",'" + obj[2] + "','" + obj[3] + "'," + obj[4] + ",'" + obj[5] + "','" + obj[6] + "','" + obj[7] + "','" + obj[8] + "','" + obj[9] + "','" + obj[10] + "','" + obj[11] + "','" + obj[12] + "','" + obj[13] + "','" + obj[14] + "','" + date + "',0,'" + obj[15] + "')";
      resp = await pool.query(query);
      final_res = {
      status: true,
      message: 'SUCCESS',
      data: resp
  }
}
  catch (err)
  {
    final_res = {
      status: false,
      message: `ERROR : ${err.code}`
    }
  }
  return result;
}

InsertTrigger_HeartbeatReq = async(obj,result)=>{
       try
            {
                let date = DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss");
               query = "INSERT INTO public.chargerrequest_log  (message_code,message_id,action,requestedmessage,connectorid,charger_id,chargerrequest,station_id,station_name,cpo_id,cpo_name,client_id,client_name,db_chargerid,charger_srno,request_date,response_received,custom_trans_id) values ('" +obj[0]+ "'," + obj[1] + ",'" +   obj[2] + "','" + obj[3] + "'," + obj[4] + ",'" + obj[5] + "','" + obj[6] + "','" + obj[7] + "','" + obj[8] + "','" + obj[9] + "','" + obj[10] + "','" + obj[11] + "','" + obj[12] + "','" + obj[13]+ "','" + obj[14] + "','" + date + "',0,'" + obj[15]+ "')";
               resp = await pool.query(query);
      final_res = {
      status: true,
      message: 'SUCCESS',
      data: resp
            }
            }
            catch (err)
            {
              final_res = {
                status: false,
                message: `ERROR : ${err.code}`
              }
            }
            return result;
}

InsertDataTransfer_Req = async(obj,result)=>{
                try
                {
                    let date = DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss");
                    query="";
                    if (obj[4] == "GET_S_HSURL")
                    {
                        query = "INSERT INTO public.chargerrequest_log  (message_code,message_id,action,requestedmessage,vendorid,messageid,data,charger_id,chargerrequest,station_id,station_name,cpo_id,cpo_name,client_id,client_name,db_chargerid,charger_srno,request_date,response_received,custom_trans_id) values ('" + obj[0] + "'," + obj[1] + ",'" + obj[2] + "','" + obj[2]+ "','" + obj[3] + "','" + obj[4] + "','" + obj[5] + "','" + obj[6] + "','" + obj[7] + "','" + obj[8] + "','" + obj[9] + "','" + obj[10] + "','" + obj[11] + "','" + obj[12] + "','" + obj[13] + "','" + obj[14] + "','" + obj[15] + "','" + text + "',0,'" + obj[16] + "')";
                    }
                    else
                    {
                        query = "INSERT INTO public.chargerrequest_log  (message_code,message_id,action,requestedmessage,vendorid,messageid,data,charger_id,chargerrequest,station_id,station_name,cpo_id,cpo_name,client_id,client_name,db_chargerid,charger_srno,request_date,custom_trans_id) values ('" + obj[0] + "'," + obj[1] + ",'" + obj[2] + "','" + obj[2] + "','" + obj[3] + "','" + obj[4] + "','" + obj[5] + "','" + obj[6] + "','" + obj[7] + "','" + obj[8] + "','" + obj[9] + "','" + obj[10] + "','" + obj[11] + "','" + obj[12] + "','" + obj[13] + "','" + obj[14]+ "','" + obj[15] + "','" + date + "','" + obj[16] + "')";
                    }
                    resp = await pool.query(query);
                    final_res = {
                    status: true,
                    message: 'SUCCESS',
                  
                    data: resp
                }
              }
                catch (err)
                {
                  final_res = {
                    status: false,
                    message: `ERROR : ${err.code}`
                  }
                }
                return result;
}

InsertRemoteStop_UserHistory_MySql= async(obj,result)=>{
  let query ="call Proc_insert_RemoteStop_UserCharging_log('"+obj[0]+"','"+obj[1]+"','"+obj[2]+"','"+obj[3]+"','"+obj[4]+"','"+obj[5]+"','"+obj[6]+"','"+obj[7]+"','"+obj[8]+"','"+obj[9]+"','"+obj[10]+"','"+obj[11]+"')";
  try
  {
    resp = await pool.query(query);
    final_res = {
        status: true,
        message: 'SUCCESS',
        data: resp
           }
  }
  catch (err)
  {
      final_res = {
             status: false,
             message: `ERROR : ${err.code}`
      }
  }
  return result;
}

InsertRemoteStop_Log=async(obj,result)=>{
   try
   {
      let date = DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss");
      let query = "INSERT INTO public.chargerrequest_log  (message_code,message_id,action,transactionid,charger_id,chargerrequest,station_id,station_name,cpo_id,cpo_name,client_id,client_name,db_chargerid,charger_srno,request_date) values ('" + obj[0] + "'," + obj[1] + ",'" + obj[2] + "'," + obj[3] + ",'" + obj[4] + "','" + obj[5] + "','" + obj[6] + "','" + obj[7] + "','" + obj[8] + "','" + obj[9] + "','" + obj[10] + "','" + obj[11] + "','" + obj[12] + "','" + obj[13] + "','" + date + "')";
      resp = await pool.query(query);
      final_res = {
          status: true,
          message: 'SUCCESS',
          data: resp
             }
   }
   catch (err)
   {
    final_res = {
      status: false,
      message: `ERROR : ${err.code}`
}
    }
    return result;
}

ConfigurationUpdateResponse = async(obj,result)=>{
  dictionary.Add("@IP_messagecode", doclog[0]);
  dictionary.Add("@IP_messageid", doclog[1]);
  dictionary.Add("@IP_key", doclog[2]);
  dictionary.Add("@IP_readonly", doclog[3]);
  dictionary.Add("@IP_unknownkey", doclog[4]);
  dictionary.Add("@IP_value", doclog[5]);
  dictionary.Add("@IP_OriginalVal", doclog[6]);
  let date = DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss");
  let date1 = DateTime.Now.ToString("yyyy-MM-dd'T'HH:mm:ss.ff'Z'");
  try
  {
      let query = "UPDATE chargerrequest_log  set response_messageid=" + obj[1] + ",response_received=1, chargerresponse='" + obj[6] + "',key='" + obj[2] + "',value='" + obj[5] + "',readonly='" + obj[3] + "' ,currenttime='" + date1 + "', reponse_date='" + date + "' where message_code='" + obj[0] + "' and response_received=0 ";
      resp = await pool.query(query);
      final_res = {
          status: true,
          message: 'SUCCESS',
          data: resp
             }
  }
  catch (err)
  {
    final_res = {
      status: false,
      message: `ERROR : ${err.code}`
}
  }
  return result;
}

UpdateResponse = async(obj,result)=>{
  let date = DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss");
            let date1 = DateTime.Now.ToString("yyyy-MM-dd'T'HH:mm:ss.ff'Z'");
            try
            {
                let query = "UPDATE chargerrequest_log set response_messageid=" + obj[1] + ", chargerresponse='" + obj[4] + "',response_received=1 ,currenttime='" + date1 + "',status='" + obj[3] + "',listversion='" + obj[2] + "', reponse_date='" + date + "' where message_code='" + obj[0].ToString() + "'and response_received=0";
                resp = await pool.query(query);
                final_res = {
                    status: true,
                    message: 'SUCCESS',
                    data: resp
                       }
              }
            catch (err)
            {
              final_res = {
                status: false,
                message: `ERROR : ${err.code}`
              }
            }
            return result;
}
GetChargerHeartBeat_InterVal_ByChargerId= async(charerID,result)=>{
            try
            {
                let query = " select * from summary_chargers where name = '"+charerID+"'";
                resp = await pool.query(query);
                final_res = {
                    status: true,
                    message: 'SUCCESS',
                    data: resp
                       }
              }
            catch (err)
            {
              final_res = {
                status: false,
                message: `ERROR : ${err.code}`
              }
            }
            return result;
}