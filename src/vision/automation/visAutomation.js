import { createAndRedirectToNewHub } from "../../utils/phoenix-utils";
import { visHelper } from "../helper/visHelper";
import { serverURL } from "../config/visConfig";
import { fastEntry } from "../config/visFeatureConfig";

export class visAutomation{
    // Sends the hub id back to the web-server in automation step.
    static SendHubIDBackToServer(hubID) {
        if (visHelper.getCookie("automation") != "") {
            document.body.style.display = "none";
            document.cookie = "automation=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";    // Delete the cookie
            
            visHelper.Log(`[Automation] Redirecting back to hubs server with hubID(${visHelper.findGetParameter("hub_id")}) etc.`, 2);
            window.location.replace(`${serverURL}user.php?id=${visHelper.getCookie("id")}&hubID=${hubID}`);
        }
    }

    // Used to automate creation of the room using [createAndRedirectToNewHub] from phoenix-utils.
    static CreateRoom(sceneInfo){
        if(visHelper.findGetParameter("automation") == "true"){
            document.body.style.display = "none";
            document.cookie = "automation=true;";
            document.cookie = `id=${visHelper.findGetParameter("id")};`;
        
            visHelper.Log("[Automation] Started automating creating rooms");
        
            createAndRedirectToNewHub(sceneInfo, true);
        }
    }

    // Used to automate changing name when going through entry steps.
    static changeNameUsingGET(state, finish){

        visHelper.Log(`test123`, 2);

        if(fastEntry){

            visHelper.Log(`test123`, 2);

            // Check if the name parameter is null or not.
            if(visHelper.findGetParameter("name") != null){
                state.displayName = visHelper.findGetParameter("name");
                visHelper.Log(`Changing name to ${visHelper.findGetParameter("name")}`, 2);
            }
            else{
                state.displayName = "N/A";
                visHelper.Log(`Changing name to "N/A" because no name is found!`, 2);
            }
            finish(); // Finish is usually a function inside the profileModal that saves all the state and closes the modal.
        }
    }

    // Used when leave room button is confirmed.
    static redirectLeaveToWebServer(){
        return `${serverURL}`;
    }
}