import {visHelper} from "./visHelper";
import { keyboardMouseUserBindings } from "../../systems/userinput/bindings/keyboard-mouse-user";
import { paths } from "../../systems/userinput/paths";

export class visionInput{
    /**
     *  INFO-NAME: Set Vision Keybindings
     * 
     *  USAGE: Used to overwrite specific keybindings inside of hubs.
     * 
     *  NOTES: Only supports keyboard inputs currently. But can be easily extended later.
     * 
     */
    static setBindings = false;
    static setVisionKeybindings(){
        if(!this.setBindings){
            let keybinds = new Map();
            // Keybinds
            keybinds.set(paths.actions.toggleUI, paths.device.keyboard.key(""));
            keybinds.set(paths.actions.toggleFreeze, paths.device.keyboard.key(""));
            keybinds.set(paths.actions.ensureFrozen, paths.device.keyboard.key(""));
            keybinds.set(paths.actions.thaw, paths.device.keyboard.key(""));
            keybinds.set(paths.actions.toggleFly, paths.device.keyboard.key(""));
            keybinds.set(paths.actions.toggleCamera, paths.device.keyboard.key(""));
            keybinds.set(paths.actions.takeSnapshot, paths.device.keyboard.key(""));
            keybinds.set(paths.actions.logDebugFrame, paths.device.keyboard.key(""));
            keybinds.set(paths.actions.logInteractionState, paths.device.keyboard.key(""));
            keybinds.set(paths.actions.spawnEmoji0, paths.device.keyboard.key(""));
            keybinds.set(paths.actions.spawnEmoji1, paths.device.keyboard.key(""));
            keybinds.set(paths.actions.spawnEmoji2, paths.device.keyboard.key(""));
            keybinds.set(paths.actions.spawnEmoji3, paths.device.keyboard.key(""));
            keybinds.set(paths.actions.spawnEmoji4, paths.device.keyboard.key(""));
            keybinds.set(paths.actions.spawnEmoji5, paths.device.keyboard.key(""));
            keybinds.set(paths.actions.spawnEmoji6, paths.device.keyboard.key(""));
            keybinds.set(paths.actions.startInspectingSelf, paths.device.keyboard.key(""));
            keybinds.set("/vars/mouse-and-keyboard/drop_pen_with_p", paths.device.keyboard.key(""));

            keybinds.set(paths.actions.startGazeTeleport, paths.device.keyboard.key("space"));
            keybinds.set(paths.actions.stopGazeTeleport, paths.device.keyboard.key("space"));


            visHelper.logGroup("Vision-Keyboard-Controls", 2);
            for (let index = 0; index < keyboardMouseUserBindings["global"].length; index++) {
                const element = keyboardMouseUserBindings["global"][index];
                if(keybinds.get(element["dest"]["value"]) != null){
                    visHelper.Log(`Setting: ${JSON.stringify(element["dest"]["value"])} to: ${keybinds.get(element["dest"]["value"])}`, 2);
                    element["src"]["value"] = keybinds.get(element["dest"]["value"]);
                }
            }
            visHelper.logGroupEnd(2);
            this.setBindings = true;
        }
    }
}