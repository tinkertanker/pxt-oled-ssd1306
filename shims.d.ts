// Auto-generated. Do not edit.



    //% icon="\uf26c"
declare namespace OLED {

    /**
     * initialises I2C OLED with Splash Tinkercademy Display
     */
    //% blockId=oled_init
    //% block="Initialize OLED height %height|width %width"
    //% icon="\uf1ec" shim=OLED::init
    function init(height: number, width: number): void;

    /**
     * initialises I2C OLED for 'Terminal Mode'
     */
    //% blockId=oled_init_terminal
    //% block="Initialize OLED text output height %height|width %width"
    //% icon="\uf1ec" shim=OLED::init_terminal
    function init_terminal(height: number, width: number): void;

    /**
     * Prints a text on the OLED display, will wrap and scroll upwards
     */
    //% help=basic/show-string 
    //% weight=87 blockGap=8
    //% block="show|string %text" 
    //% async
    //% blockId=oled_print_string
    //% icon="\uf1ec" shim=OLED::showString
    function showString(text: string): void;

    /**
     * Print a number on the OLED display
     */
    //% help=basic/show-number
    //% weight=96
    //% blockId=oled_print_number
    //% block="show|number %number" blockGap=8
    //% async shim=OLED::showNumber
    function showNumber(number: number): void;
}

// Auto-generated. Do not edit. Really.
