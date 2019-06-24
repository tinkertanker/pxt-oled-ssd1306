//% color=#27b0ba weight=100 icon="\uf26c"
namespace OLED {

    /**
     * initialises the i2c OLED display
     * @param height height (in pixels), eg: 64
     * @param width width (in pixels), eg: 128
     */
    //% blockId=oled_init_terminal
    //% weight=100
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
    //% block="insert newline"
    //% async
    //% shim=OLED::NextLine
    export function nextLine(): void {
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
      * @param text text to display, eg: "Hello, OLED!"
      */
     //% weight=92 blockGap=8
     //% block="show (without newline)|string %text" 
     //% async
     //% blockId=oled_print_stringNoNewLine
     //% icon="\uf1ec"
     //% shim=OLED::showStringNoNewLine
     export function showStringNoNewLine(text: string): void {
        console.log("display: " + text);
        return;
    }
     /**
      * prints a string on the OLED display
      * @param text text to display, eg: "Hello, OLED!"
      */
     //% weight=94 blockGap=8
     //% block="show|string %text" 
     //% async
     //% blockId=oled_print_stringWithNewLine
     //% icon="\uf1ec"
     //% shim=OLED::showStringWithNewLine
     export function showStringWithNewLine(text: string): void {
        console.log("display: " + text);
        return;
    }

    /**
     * prints a number on the OLED display without a newline
     * @param number number to display 
     */
    //% weight=93
    //% blockId=oled_print_number
    //% block="show (without newline)|number %number" blockGap=8
    //% async 
    //% shim=OLED::showNumberWithoutNewLine
    export function showNumberNoNewLine(number: number): void {
        console.log("display: " + number);
        return;
    }
    /**
     * prints a number on the OLED display with a newline
     * @param number number to display 
     */
    //% weight=95
    //% blockId=oled_print_number1
    //% block="show|number %number" blockGap=8
    //% async 
    //% shim=OLED::showNumberWithNewLine
    export function showNumberWithNewLine(number: number): void {
        console.log("display: " + number);
        return;
    }
 

}
