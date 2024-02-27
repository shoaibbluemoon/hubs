import $ from "jquery";
import { visHelper } from "../helper/visHelper";
import { serverURL, corsProxyURL, s3bucketURL, authenticationEnabled } from "../config/visConfig";
import { Http } from "../../utils/http";
import configs from "../../utils/configs";
import { BASE_URL } from "../../utils/api";

export class visionAPI {
  // Auth.
  static isAuthenticated = false;
  static useAuthentication = authenticationEnabled;

  // Auth -- Admin
  static isAdmin = false;

  constructor() {
    console.log("[VisionUtils] Init", 2);
  }

  // Helper function to pool all async requests (Called in performDirectEntryFlow() just before entering the room.)
  static async performAsyncAPIRequests() {
    // await this.generateInviteLinkAuth();
    // await this.checkAuthentication();
    // await this.checkUserAdmin();
  }

  // Send API request to web-server to see if the authentication key provided matches stored one.
  static async checkAuthentication() {
    // Make sure to disable authentication on automation requests.
    if (visHelper.getCookie("automation") != "") {
      this.useAuthentication = false;
    }

    if (this.useAuthentication) {
      if (!this.isAuthenticated) {
        visHelper.Log("Sending Authentication Request", 1);
        const res = await this.sendAjaxRequst(
          {
            auth: visHelper.findGetParameter("auth"),
            id: visHelper.findGetParameter("hub_id")
          },
          "hubEndpoint.php"
        );

        visHelper.Log(`Response: ${res}`, 3);

        if (res == "NO.") {
          visHelper.Log(`Bad response, Window Closing!`, 3);
          window.location.href = `${serverURL}`;
        } else if (res == "YES.") {
          visHelper.Log(`Good response!, Authenticated`, 3);
          this.isAuthenticated = true;
        }
      } else {
        return this.isAuthenticated;
      }
    } else {
      visHelper.Log("Authentication Disabled skipping..", 3);
      return true;
    }
  }

  // Send API request to web-server to see if the user is a admin or not depending on their auth key.
  // NOTE: Was used for setting up visionRecording steps etc.
  static async checkUserAdmin() {
    // if(this.useAuthentication){
    //     visHelper.Log("Sending Admin Check Request", 1);

    //     const res  = await this.sendAjaxRequst({
    //         checkAUTH: visHelper.findGetParameter("auth")
    //     }, 'hubEndpoint.php');

    //     visHelper.Log(`Response: ${res}`, 3);

    //     if(res == "NOT AUTHENTICATED"){
    //         visHelper.Log(`User is not admin!`, 3);
    //     }else if(res == "YES"){
    //         visHelper.Log(`User is not admin!. Enabling Features.`, 3);
    //         this.isAdmin = true;
    //     }
    // }else{
    //     this.isAdmin = true;
    //     visHelper.Log(`Skipped checking user admin, setting to ${this.isAdmin}`, 1);
    // }

    const qs = new URLSearchParams(location.search);
    const defaultRoomId = configs.feature("default_room_id");

    const hubId =
      qs.get("hub_id") ||
      (document.location.pathname === "/" && defaultRoomId
        ? defaultRoomId
        : document.location.pathname.substring(1).split("/")[0]);

    try {
      const res = await Http.post(`${BASE_URL}/checkadmin`, { roomid: hubId });
      const { isAdmin } = await res.json();
      this.isAdmin = isAdmin;

      // this.isAdmin = true;
      return isAdmin;
    } catch (e) {
      console.log(e);
      // this.isAdmin = true;
      return false;
    }
  }

  // Used to get the current company logo from the web-server.
  static async getCompanyLogo() {
    visHelper.Log("Sending Admin Check Request", 1);

    const res = await this.sendAjaxRequst(
      {
        companyID: visHelper.findGetParameter("companyID")
      },
      "hubEndpoint.php"
    );

    visHelper.Log(`Response: ${res}`, 3);

    return res;
  }

  static inviteLink = "";
  // Internal function used to generate invite auth from the web-server for this session.
  static async generateInviteLinkAuth() {
    // Skip if we are automating.
    if (visHelper.getCookie("automation") != "") {
      return;
    }

    if (this.inviteLink == "") {
      visHelper.Log("Sending Invite Auth Request", 3);
      const data = {
        auth: visHelper.findGetParameter("auth"),
        hubID: visHelper.findGetParameter("hub_id")
      };
      const res = await this.sendAjaxRequst(data, "");

      if (res == "") {
        visHelper.Log(`User tried to get invite link with incorrect params!`, 3);
        return "";
      }
      visHelper.Log(`Response: ${res}`, 3);

      this.inviteLink = `${res}&companyID=${visHelper.findGetParameter("companyID")}`;
    }
    return this.inviteLink;
  }

  // Used to get the generated auth link from [generateInviteLinkAuth()].
  static getInviteLinkAuth() {
    if (this.inviteLink != "") return this.inviteLink;

    visHelper.Log(
      "Tried to getInviteLink without generating first!. Please generate asynchronously first using [generateInviteLinkAuth]",
      3
    );
  }

  // Resets the current invite link so it can be regenerated.
  static resetInviteLinkAuth() {
    this.inviteLink = "";
    this.generateInviteLinkAuth();
  }

  // Helper function to send ajax requests to our web-server.
  static async sendAjaxRequst(data, endpoint) {
    let url = `${serverURL}/${endpoint}`;

    visHelper.Log(`Request sent to ${url} with ${JSON.stringify(data)} attached`, 3);

    try {
      return $.ajax({
        url: url,
        type: "POST",
        data: data,
        dataType: "text"
      });
    } catch (error) {
      console.error(error);
    }
  }
}
