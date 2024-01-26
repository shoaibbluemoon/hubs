import { showDebug, debugLevel } from "../config/visConfig"

export class visHelper{
    // Helper function to find GET parameters in the current windows URL. (From stackoverflow)
    static findGetParameter(parameterName) {
        var result = null,
            tmp = [];
        var items = location.search.substr(1).split("&");
        for (var index = 0; index < items.length; index++) {
            tmp = items[index].split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        }
        return result;
    }

    // Helper function to get cookies by name.
    static getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
            c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    // Helper function that allows for different levels of debugging.
    static Log(query, level = 1){
        if(showDebug && level <= debugLevel)
            console.log(`[VisionUtils] ${query}`);
    }

    // Helper function that allows for different levels of debugging.
    static LogWarn(query){
        if(showDebug)
            console.warn(`[VisionUtils] ${query}`);
    }

    static logGroup(groupName, level){
        if(showDebug && level <= debugLevel)
            console.groupCollapsed(`[VisionUtils]${groupName}`);
    }

    static logGroupEnd(level){
        if(showDebug && level <= debugLevel)
            console.groupEnd();
    }
}