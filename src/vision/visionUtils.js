import { visionAPI } from "./api/visAPI";
import { visAutomation } from "./automation/visAutomation";
import { visHelper } from "./helper/visHelper";
import { visionInput } from "./helper/visInput";

export class vision{
    static api = visionAPI;
    static automation = visAutomation;
    static helper = visHelper;
    static input = visionInput;

    /**
     *  INFO-NAME: Switch Scene Function
     * 
     *  USAGE: Used to tell the hubsChannel to switch the scene for all users to the provided sceneLink in the GET url parameter.
     * 
     *  NOTES: Requires the user calling the function to have 'update_hub' perms on recticulum side. Will flag warning if called by un-authorized persons.
     * 
     */
    static triedToSwitchScenes = false;
    static checkIfNeedToSwitchScene(hubChannel){
        if(!this.triedToSwitchScenes){          // Use this switch bool to make sure it only runs once.
            visHelper.Log("[Main] Checking if we need to switch scenes");
            let sceneLink = visHelper.findGetParameter("sceneLink");    // Vision Stuff [Getting and applying scene link from GET]
            if (sceneLink != null && hubChannel.can("update_hub")) {
                hubChannel.updateScene(sceneLink);
    
                let url = window.location.href;
                let sceneGET = "&sceneLink=" + sceneLink;
                url = url.replace(sceneGET, "");
                window.location.replace(url);
            }
    
            if(!hubChannel.can("update_hub")){
                visHelper.LogWarn("Tried to update scene without correct hubs perms!");
            }

            this.triedToSwitchScenes = true;
        }
    }

    /**
     *  INFO-NAME: Player Teleport Function
     * 
     *  USAGE: Used to teleport the current player to the target player by their ID.
     * 
     *  NOTES: Requires the targetID, usually found on the client-info-dialog or somewhere that shows each player individually (like a player list.)
     * 
     */
    static teleportToPlayer(characterController, targetID){

            // Get the targets position using their ID.
            let pos;
            for (let a of document.querySelectorAll("[networked-avatar]")) {
                if (a.getAttribute("networked").creator == targetID) {
                    pos = a.getAttribute("position");
                }
            }

            let tpPos = new THREE.Vector3();    // Make inputted pos into vec3.
            tpPos.x = pos.x;
            tpPos.y = pos.y;
            tpPos.z = pos.z;
            visHelper.Log(`Teleporting to ${JSON.stringify(tpPos)}`, 2);
            characterController.teleportTo(tpPos);
    }
}