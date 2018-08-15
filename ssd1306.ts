//% icon="\uf26c"
//% color="255" weight="90"
namespace OLED {

    /**
     * initialises the i2c OLED display
     * @param height height (in pixels)
     * @param width width (in pixels)
     */
    //% blockId=oled_init_terminal
    //% block="initialize OLED with height %height|width %width"
    //% icon="\uf1ec" 
    //% shim=OLED::init_terminal
    export function init(height: number, width: number): void {
        return;
    }

    /**
     *Prints Next Line
     */
    //% blockId=oled_next_line
    //% block="New Line"
    //% async
    //% shim=OLED::NextLine
    export function Next_Line(): void {
        return;
    }

    /**
     *Shows a Loading Screen
     */
    //% blockId=oled_loading_screen
    //% block="Loading Screen"
    //% async
    //% shim=OLED::LoadingScreen
    export function Loading_Screen(): void {
        return;
    }
    
    /**
     * displays a white box
     */
    //% blockId=oled_fill_rectangle
    //% block="fill box on OLED with coordinates x %x|y %y|h %h|w %w"
    //% async 
    //% shim=OLED::fillRect
    export function fillRectangle(x:number,y:number, w: number, h: number): void {
        return;
    }

    /**
     * clears the screen.
     */
    //% blockId=oled_clear_screen
    //% block="clear OLED display"
    //% icon="\uf1ec" 
    //% shim=OLED::clearDisplay
    export function clear(): void {
        return;
    }

    /**
     * prints a string on the OLED display
     * @param text text to display
     */
    //% weight=87 blockGap=8
    //% block="show|string %text" 
    //% async
    //% blockId=oled_print_string
    //% icon="\uf1ec"
    //% shim=OLED::showString
    export function showString(text: string): void {
        console.log("display: " + text);
        return;
    }

    /**
     * prints a number on the OLED display
     * @param number number to display 
     */
    //% weight=96
    //% blockId=oled_print_number
    //% block="show|number %number" blockGap=8
    //% async 
    //% shim=OLED::showNumber
    export function showNumber(number: number): void {
        console.log("display: " + number);
        return;
    }


}
