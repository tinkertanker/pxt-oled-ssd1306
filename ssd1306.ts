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
     *Shows a Loading Screen
     */
    //% blockId=oled_loading_screen
    //% block="show loading screen"
    //% async
    //% shim=OLED::LoadingScreen
    export function loadingScreen(): void {
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
    /**
     * draws a filled rectangle
     * @param x number of pixels
     * @param y number of pixels
     * @param w number of pixels
     * @param h number of pixels
     */
    //% blockId=oled_fill_rect
    //% block="draw filled box with coordinates |x %x|y %y|w %w|h %h"
    //% async 
    //% shim=OLED::fillRect
    export function fillRectangle(x:number,y:number, w:number, h:number): void {
        return;
    }
    /**
     * draws an outlined rectangle
     * @param x number of pixels
     * @param y number of pixels
     * @param w number of pixels
     * @param h number of pixels
     */
    //% blockId=oled_draw_rect
    //% block="draw outlined box with coordinates |x %x|y %y|w %w|h %h"
    //% async 
    //% shim=OLED::drawRect
    export function drawRectangle(x:number,y:number, w:number, h:number): void {
        return;
    }
    /**
     * draws a filled circle
     * @param x number of pixels
     * @param y number of pixels
     * @param r number of pixels
     */
    //% blockId=oled_fill_circle
    //% block="draw filled circle with coordinates |x %x|y %y|r %r"
    //% async 
    //% shim=OLED::fillCircle
    export function fillCircle(x:number,y:number, r:number): void {
        return;
    }
    /**
     * draws an outlined cirle
     * @param x x-coordinate of centre
     * @param y y-coordinate of centre
     * @param r radius
     */
    //% blockId=oled_draw_circle
    //% block="draw outlined circle with coordinates of centre |x %x|y %y| and radius r %r"
    //% async 
    //% shim=OLED::drawCircle
    export function drawCircle(x:number,y:number, r:number): void {
        return;
    }
    /**
     * draws a line
     * @param x1 coordinate of x1
     * @param y1 coordinate of y1
     * @param x2 coordinate of x2
     * @param y2 coordinate of y2
     */
    //% blockId=oled_draw_line
    //% block="draw line OLED with coordinates |x1 %x1|y1 %y1|x2 %x2|y2 %y2"
    //% async 
    //% shim=OLED::drawLine
    export function drawLine(x1:number,y1:number, x2:number, y2:number): void {
        return;
    }

    /**
     * @param progress current progress
     * Show a progress bar with specified percentage of progress
     */
    //% blockId=oled_show_progress
    //% block="show progress of percentage progress %progress|"
    //% async 
    //% shim=OLED::showProgress
    export function showProgress(progress:number): void {
        return;
    }

}
