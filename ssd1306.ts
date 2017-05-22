//% icon="\uf26c"
namespace OLED {

    /**
     * initialises I2C OLED with Splash Tinkercademy Display
     */
    //% blockId=oled_ini
    //% block="initialize OLED height %height|width %width"
    //% icon="\uf1ec" shim=OLED::init
    export function init(height: number, width: number): void {
        return;
    }

    /**
     * initialises I2C OLED for 'Terminal Mode'
     */
    //% blockId=oled_init_terminal
    //% block="initialize OLED text output height %height|width %width"
    //% icon="\uf1ec" shim=OLED::init_terminal
    export function initTerminal(height: number, width: number): void {
        return;
    }

    /**
     * Prints a text on the OLED display, will wrap and scroll upwards
     */
    //% help=basic/show-string 
    //% weight=87 blockGap=8
    //% block="show|string %text" 
    //% async
    //% blockId=oled_print_string
    //% icon="\uf1ec" shim=OLED::showString
    export function showString(text: string): void {
        console.log("display: " + text);
        return;
    }

    /**
     * Print a number on the OLED display
     */
    //% help=basic/show-number
    //% weight=96
    //% blockId=oled_print_number
    //% block="show|number %number" blockGap=8
    //% async shim=OLED::showNumber
    export function showNumber(number: number): void {
        console.log("display: " + number);
        return;
    }
}
