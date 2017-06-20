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


    /**
     * draws a circle on the OLED display
     * @param x x coordinate of the center of the circle
     * @param y y coordinate of the center of the circle
     * @param r radius of the circle
     */
    //% weight=96
    //% blockId=oled_draw_circle
    //% block="draw circle at center x %x|y %y|radius %radius" blockGap=8
    //% async 
    //% shim=OLED::drawCircle
    export function drawCircle(x: number, y: number, r: number): void {
        return;
    }


    /**
     * fills a circle on the OLED display
     * @param x x coordinate of the center of the circle
     * @param y y coordinate of the center of the circle
     * @param r radius of the circle
     */
    //% weight=96
    //% blockId=oled_fill_circle
    //% block="fill circle at center x %x|y %y|radius %radius" blockGap=8
    //% async 
    //% shim=OLED::fillCircle
    export function fillCircle(x: number, y: number, r: number): void {
        return;
    }


    /**
     * draws a line on the OLED display
     * @param x0 x coordinate of the first point of the line
     * @param y0 y coordinate of the first point of the line
     * @param x1 x coordinate of the second point of the line
     * @param y1 y coordinate of the second point of the line
     */
    //% weight=96
    //% blockId=oled_draw_line
    //% block="draw line from x %x0| y %y0|to x %x1| y %y1" blockGap=8
    //% async 
    //% shim=OLED::drawLine
    export function drawLine(x0: number, y0: number, x1: number, y1: number): void {
        return;
    }

    /**
     * draws a rectangle on the OLED display
     * @param x x coordinate of the top left pixel of the rectangle
     * @param y y coordinate of the top left pixel of the rectangle
     * @param w width of the rectangle
     * @param h height of the rectangle
     */
    //% weight=96
    //% blockId=oled_draw_rect
    //% block="draw rectangle at x %x| y %y|with width %w| height %h" blockGap=8
    //% async 
    //% shim=OLED::drawRect
    export function drawRect(x: number, y: number, w: number, h: number): void {
        return;
    }

    /**
     * fills a rectangle on the OLED display
     * @param x x coordinate of the top left pixel of the rectangle
     * @param y y coordinate of the top left pixel of the rectangle
     * @param w width of the rectangle
     * @param h height of the rectangle
     */
    //% weight=96
    //% blockId=oled_fill_rect
    //% block="fill rectangle at x %x| y %y|with width %w| height %h" blockGap=8
    //% async 
    //% shim=OLED::fillRect
    export function fillRect(x: number, y: number, w: number, h: number): void {
        return;
    }

    /**
     * draws a rounded rectangle on the OLED display
     * @param x x coordinate of the top left pixel of the rectangle
     * @param y y coordinate of the top left pixel of the rectangle
     * @param w width of the rectangle
     * @param h height of the rectangle
     * @param r radiuns of the rectangle corners
     */
    //% weight=96
    //% blockId=oled_draw_round_rect
    //% block="draw rounded rectangle at x %x| y %y|with width %w| height %h" blockGap=8
    //% async 
    //% shim=OLED::drawRoundRect
    export function drawRoundRect(x: number, y: number, w: number, h: number, r:number): void {
        return;
    }

    /**
     * fills a rounded rectangle on the OLED display
     * @param x x coordinate of the top left pixel of the rectangle
     * @param y y coordinate of the top left pixel of the rectangle
     * @param w width of the rectangle
     * @param h height of the rectangle
     * @param r radiuns of the rectangle corners
     */
    //% weight=96
    //% blockId=oled_fill_round_rect
    //% block="fill rounded rectangle at x %x| y %y|with width %w| height %h" blockGap=8
    //% async 
    //% shim=OLED::fillRoundRect
    export function fillRoundRect(x: number, y: number, w: number, h: number, r: number): void {
        return;
    }

    /**
     * draws a triangle on the OLED display
     * @param x0 x coordinate of the first point of the triangle
     * @param y0 y coordinate of the first point of the triangle
     * @param x1 x coordinate of the second point of the triangle
     * @param y1 y coordinate of the second point of the triangle
     * @param x2 x coordinate of the third point of the triangle
     * @param y2 y coordinate of the third point of the triangle
     */
    //% weight=96
    //% blockId=oled_draw_triangle
    //% block="draw triangle with vertices x %x0| y %y0|x %x1| y %y1|x %x2| y %y2" blockGap=8
    //% async 
    //% shim=OLED::drawTriangle
    export function drawTriangle(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number): void {
        return;
    }

    /**
     * fills a triangle on the OLED display
     * @param x0 x coordinate of the first point of the triangle
     * @param y0 y coordinate of the first point of the triangle
     * @param x1 x coordinate of the second point of the triangle
     * @param y1 y coordinate of the second point of the triangle
     * @param x2 x coordinate of the third point of the triangle
     * @param y2 y coordinate of the third point of the triangle
     */
    //% weight=96
    //% blockId=oled_fill_triangle
    //% block="fill triangle with vertices x %x0| y %y0|x %x1| y %y1|x %x2| y %y2" blockGap=8
    //% async 
    //% shim=OLED::fillTriangle
    export function fillTriangle(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number): void {
        return;
    }
}
